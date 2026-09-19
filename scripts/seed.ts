/**
 * Idempotent seed: upserts projects by slug and site_settings by key using
 * the service role. Rows that already match are left untouched, so a second
 * run reports 0 changes. Testimonials are intentionally not seeded.
 *
 * Local use only: `npm run db:seed`.
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnv, requireEnv } from "./lib/env";
import { projectSeeds, settingSeeds, type ProjectSeed } from "./seed-data";

loadEnv();

const supabase = createClient(requireEnv("NEXT_PUBLIC_SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
  auth: { persistSession: false, autoRefreshToken: false },
});

const PROJECT_FIELDS = [
  "slug", "title", "subtitle", "client_name", "client_public", "category", "summary", "body",
  "features", "results", "stack", "use_case", "cover_url", "featured", "published", "sort_order",
] as const;

function sameProject(existing: Record<string, unknown>, seed: ProjectSeed): boolean {
  return PROJECT_FIELDS.every((f) => JSON.stringify(existing[f] ?? null) === JSON.stringify(seed[f] ?? null));
}

async function seedProjects(): Promise<void> {
  const { data: existingRows, error } = await supabase.from("projects").select("*");
  if (error) throw error;
  const existing = new Map((existingRows ?? []).map((r) => [r.slug as string, r as Record<string, unknown>]));

  let inserted = 0;
  let updated = 0;
  let unchanged = 0;
  const toUpsert: ProjectSeed[] = [];
  for (const seed of projectSeeds) {
    const row = existing.get(seed.slug);
    if (!row) {
      inserted += 1;
      toUpsert.push(seed);
    } else if (sameProject(row, seed)) {
      unchanged += 1;
    } else {
      updated += 1;
      toUpsert.push(seed);
    }
  }
  if (toUpsert.length > 0) {
    const { error: upsertError } = await supabase.from("projects").upsert(toUpsert, { onConflict: "slug" });
    if (upsertError) throw upsertError;
  }
  console.log(`projects: ${inserted} inserted, ${updated} updated, ${unchanged} unchanged (${projectSeeds.length} in seed)`);
}

async function seedSettings(): Promise<void> {
  const { data: existingRows, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw error;
  const existing = new Map((existingRows ?? []).map((r) => [r.key as string, r.value]));

  // jsonb reorders object keys, so compare canonical (key-sorted) forms.
  const canonical = (v: unknown): string =>
    JSON.stringify(v, (_k, val) =>
      val && typeof val === "object" && !Array.isArray(val)
        ? Object.fromEntries(Object.keys(val as object).sort().map((k) => [k, (val as Record<string, unknown>)[k]]))
        : val,
    );

  let changed = 0;
  let unchanged = 0;
  for (const seed of settingSeeds) {
    if (existing.has(seed.key) && canonical(existing.get(seed.key)) === canonical(seed.value)) {
      unchanged += 1;
      continue;
    }
    const { error: upsertError } = await supabase.from("site_settings").upsert(seed, { onConflict: "key" });
    if (upsertError) throw upsertError;
    changed += 1;
  }
  console.log(`site_settings: ${changed} written, ${unchanged} unchanged (${settingSeeds.length} in seed)`);
}

seedProjects()
  .then(seedSettings)
  .then(() => console.log("testimonials: not seeded (empty by design)"))
  .catch((error: unknown) => {
    console.error("seed failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
