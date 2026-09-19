"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CONTENT_TAG } from "@/lib/content";
import { projectSchema, firstIssue } from "@/lib/validation";

export type ActionState = { error?: string; ok?: boolean };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function afterWrite() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/admin/projects");
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

/** Create (no id) or update (id) a project from the form. */
export async function saveProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const raw = Object.fromEntries(formData.entries());
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const supabase = createSupabaseAdminClient();
  const values = parsed.data;

  // Slug uniqueness (excluding the row being edited).
  const dup = supabase.from("projects").select("id").eq("slug", values.slug).limit(1);
  const { data: existing, error: dupError } = id ? await dup.neq("id", id) : await dup;
  if (dupError) return { error: dupError.message };
  if (existing && existing.length > 0) return { error: `slug: "${values.slug}" is already used by another project.` };

  if (id) {
    if (!uuid.test(id)) return { error: "Invalid project id." };
    const { error } = await supabase.from("projects").update(values).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("projects").insert(values);
    if (error) return { error: error.message };
  }
  afterWrite();
  redirect("/admin/projects?saved=1");
}

async function setFlag(id: string, column: "published" | "featured", value: boolean): Promise<void> {
  await requireAdminUser();
  if (!uuid.test(id)) throw new Error("Invalid project id.");
  const { error } = await createSupabaseAdminClient().from("projects").update({ [column]: value }).eq("id", id);
  if (error) throw new Error(error.message);
  afterWrite();
}

export async function setPublished(formData: FormData): Promise<void> {
  await setFlag(String(formData.get("id")), "published", formData.get("value") === "true");
}

export async function setFeatured(formData: FormData): Promise<void> {
  await setFlag(String(formData.get("id")), "featured", formData.get("value") === "true");
}

/** Swap sort_order with the neighbour above (-1) or below (+1) in the current order. */
export async function moveProject(formData: FormData): Promise<void> {
  await requireAdminUser();
  const id = String(formData.get("id"));
  const direction = formData.get("direction") === "up" ? -1 : 1;
  if (!uuid.test(id)) throw new Error("Invalid project id.");

  const supabase = createSupabaseAdminClient();
  const { data: rows, error } = await supabase
    .from("projects")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);

  const list = rows ?? [];
  const index = list.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= list.length) return;

  // Normalise to 1..n so swaps are unambiguous even when orders collide.
  const ordered = list.map((r, i) => ({ id: r.id, sort_order: i + 1 }));
  [ordered[index].sort_order, ordered[target].sort_order] = [ordered[target].sort_order, ordered[index].sort_order];
  const changed = ordered.filter((r, i) => r.sort_order !== list[i].sort_order);
  for (const row of changed) {
    const { error: updateError } = await supabase.from("projects").update({ sort_order: row.sort_order }).eq("id", row.id);
    if (updateError) throw new Error(updateError.message);
  }
  afterWrite();
}

/**
 * Deletes the row and any uploads under media/projects/<slug>/ so storage does
 * not accumulate orphans. External (non-storage) URLs are left alone.
 */
export async function deleteProject(formData: FormData): Promise<void> {
  await requireAdminUser();
  const id = String(formData.get("id"));
  if (!uuid.test(id)) throw new Error("Invalid project id.");

  const supabase = createSupabaseAdminClient();
  const { data: project, error: readError } = await supabase.from("projects").select("slug").eq("id", id).maybeSingle();
  if (readError) throw new Error(readError.message);

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (project?.slug) {
    try {
      const prefix = `projects/${project.slug}`;
      const { data: files } = await supabase.storage.from("media").list(prefix, { limit: 1000 });
      if (files && files.length > 0) {
        await supabase.storage.from("media").remove(files.map((f) => `${prefix}/${f.name}`));
      }
    } catch (storageError) {
      console.error("deleteProject: storage cleanup failed:", errorMessage(storageError));
    }
  }
  afterWrite();
}
