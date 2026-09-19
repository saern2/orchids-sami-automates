/**
 * Prints row counts and bucket status using the service role. Local only:
 * `npx tsx scripts/db-status.ts`. Never prints keys.
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnv, requireEnv } from "./lib/env";

loadEnv();

const supabase = createClient(requireEnv("NEXT_PUBLIC_SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const { data: projects, error: pErr } = await supabase
    .from("projects")
    .select("slug, published, featured, sort_order, client_name, client_public")
    .order("sort_order");
  if (pErr) throw pErr;
  const { data: testimonials, error: tErr } = await supabase.from("testimonials").select("id");
  if (tErr) throw tErr;
  const { data: settings, error: sErr } = await supabase.from("site_settings").select("key");
  if (sErr) throw sErr;
  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  if (bErr) throw bErr;

  const rows = projects ?? [];
  console.log(
    `projects: ${rows.length} rows, ${rows.filter((r) => r.published).length} published, ${rows.filter((r) => r.featured).length} featured`,
  );
  console.log("featured order:", rows.filter((r) => r.featured).map((r) => `${r.sort_order}:${r.slug}`).join(", "));
  console.log(
    "public clients:",
    rows.filter((r) => r.client_public).map((r) => r.client_name).join(" | "),
    "| named-but-private:",
    rows.filter((r) => r.client_name && !r.client_public).length,
    "| unnamed:",
    rows.filter((r) => !r.client_name).length,
  );
  console.log(`testimonials: ${(testimonials ?? []).length} | site_settings: ${(settings ?? []).length} (${(settings ?? []).map((r) => r.key).join(", ")})`);
  console.log("buckets:", (buckets ?? []).map((b) => `${b.name}${b.public ? " (public)" : ""}`).join(", "));
}

main().catch((error: unknown) => {
  console.error("db-status failed:", error instanceof Error ? error.message : String(error));
  process.exit(1);
});
