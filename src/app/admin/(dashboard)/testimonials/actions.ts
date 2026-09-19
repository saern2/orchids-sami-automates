"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CONTENT_TAG } from "@/lib/content";
import { testimonialSchema, firstIssue } from "@/lib/validation";

export type ActionState = { error?: string; ok?: boolean };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function afterWrite() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/admin/testimonials");
}

export async function saveTestimonial(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: firstIssue(parsed.error) };

  const supabase = createSupabaseAdminClient();
  if (id) {
    if (!uuid.test(id)) return { error: "Invalid testimonial id." };
    const { error } = await supabase.from("testimonials").update(parsed.data).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("testimonials").insert(parsed.data);
    if (error) return { error: error.message };
  }
  afterWrite();
  redirect("/admin/testimonials?saved=1");
}

export async function setTestimonialPublished(formData: FormData): Promise<void> {
  await requireAdminUser();
  const id = String(formData.get("id"));
  if (!uuid.test(id)) throw new Error("Invalid testimonial id.");
  const { error } = await createSupabaseAdminClient()
    .from("testimonials")
    .update({ published: formData.get("value") === "true" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  afterWrite();
}

export async function moveTestimonial(formData: FormData): Promise<void> {
  await requireAdminUser();
  const id = String(formData.get("id"));
  const direction = formData.get("direction") === "up" ? -1 : 1;
  if (!uuid.test(id)) throw new Error("Invalid testimonial id.");

  const supabase = createSupabaseAdminClient();
  const { data: rows, error } = await supabase
    .from("testimonials")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);

  const list = rows ?? [];
  const index = list.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= list.length) return;

  const ordered = list.map((r, i) => ({ id: r.id, sort_order: i + 1 }));
  [ordered[index].sort_order, ordered[target].sort_order] = [ordered[target].sort_order, ordered[index].sort_order];
  const changed = ordered.filter((r, i) => r.sort_order !== list[i].sort_order);
  for (const row of changed) {
    const { error: updateError } = await supabase.from("testimonials").update({ sort_order: row.sort_order }).eq("id", row.id);
    if (updateError) throw new Error(updateError.message);
  }
  afterWrite();
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  await requireAdminUser();
  const id = String(formData.get("id"));
  if (!uuid.test(id)) throw new Error("Invalid testimonial id.");
  const { error } = await createSupabaseAdminClient().from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  afterWrite();
}
