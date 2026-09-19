import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { publicSupabaseEnv } from "@/lib/supabase/env";
import type { Project, SiteSettings, Testimonial } from "@/lib/types";

export const CONTENT_TAG = "content";

/** Cache entries also expire on their own, so a missed tag revalidation self-heals within an hour. */
const REVALIDATE_SECONDS = 3600;

/**
 * Plain anon client for public reads. It carries no cookies (cached functions
 * cannot read request data), so RLS limits it to published rows.
 */
function anonClient() {
  const { url, anonKey } = publicSupabaseEnv();
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

/**
 * The public page must never fail because of the database. Every read logs the
 * failure once (with its name) and falls back to an empty result; sections
 * render their own fallback for that case.
 */
async function safely<T>(name: string, fallback: T, read: () => Promise<T>): Promise<T> {
  try {
    return await read();
  } catch (error) {
    console.error(`${name} failed:`, error instanceof Error ? error.message : String(error));
    return fallback;
  }
}

export const getFeaturedProjects = unstable_cache(
  () =>
    safely<Project[]>("getFeaturedProjects", [], async () => {
      const { data, error } = await anonClient()
        .from("projects")
        .select("*")
        .eq("published", true)
        .eq("featured", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as Project[];
    }),
  ["content", "featured-projects"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getAllPublishedProjects = unstable_cache(
  () =>
    safely<Project[]>("getAllPublishedProjects", [], async () => {
      const { data, error } = await anonClient()
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as Project[];
    }),
  ["content", "published-projects"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getTestimonials = unstable_cache(
  () =>
    safely<Testimonial[]>("getTestimonials", [], async () => {
      const { data, error } = await anonClient()
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as Testimonial[];
    }),
  ["content", "testimonials"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getSetting = unstable_cache(
  <K extends keyof SiteSettings>(key: K) =>
    safely<SiteSettings[K] | null>(`getSetting(${key})`, null, async () => {
      const { data, error } = await anonClient().from("site_settings").select("value").eq("key", key).maybeSingle();
      if (error) throw new Error(error.message);
      return (data?.value as SiteSettings[K] | undefined) ?? null;
    }),
  ["content", "setting"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);
