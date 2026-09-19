/**
 * Applies every SQL file in supabase/migrations/ (sorted by name) against
 * SUPABASE_DB_URL, recording applied files in public._migrations so a second
 * run applies nothing. Then makes sure the public `media` storage bucket
 * exists (via the Storage API with the service role).
 *
 * Local use only: `npm run db:migrate`. SUPABASE_DB_URL is never needed on
 * the host.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";
import { loadEnv, requireEnv } from "./lib/env";

loadEnv();

const MIGRATIONS_DIR = resolve(process.cwd(), "supabase/migrations");
const BUCKET = "media";

function redact(message: string): string {
  return message.replace(/:\/\/[^@\s]+@/g, "://***@");
}

async function runMigrations(): Promise<void> {
  const url = requireEnv("SUPABASE_DB_URL");
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(`
      create table if not exists _migrations (
        name       text primary key,
        applied_at timestamptz not null default now()
      )
    `);
    const applied = new Set(
      (await client.query<{ name: string }>("select name from _migrations")).rows.map((r) => r.name),
    );
    const files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    let count = 0;
    for (const file of files) {
      if (applied.has(file)) {
        console.log(`skip    ${file} (already applied)`);
        continue;
      }
      const sql = readFileSync(resolve(MIGRATIONS_DIR, file), "utf8");
      await client.query("begin");
      try {
        await client.query(sql);
        await client.query("insert into _migrations (name) values ($1)", [file]);
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      }
      console.log(`applied ${file}`);
      count += 1;
    }
    console.log(`${count} migration(s) applied, ${files.length - count} already applied`);
  } finally {
    await client.end();
  }
}

async function ensureBucket(): Promise<void> {
  const supabase = createClient(requireEnv("NEXT_PUBLIC_SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;
  if (buckets.some((b) => b.name === BUCKET)) {
    console.log(`bucket  ${BUCKET} exists`);
    return;
  }
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (error) throw error;
  console.log(`bucket  ${BUCKET} created (public read; writes only via service role)`);
}

runMigrations()
  .then(ensureBucket)
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error("migration failed:", redact(message));
    process.exit(1);
  });
