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
 * The public page must never fail because of the database. The cached readers
 * below THROW on failure so that nothing empty is ever stored in the cache; this
 * wrapper sits outside the cache, logs once with the reader's name and returns
 * the fallback for that one render. The next request tries the database again.
 */
async function safely<T>(name: string, fallback: T, read: () => Promise<T>): Promise<T> {
  try {
    return await read();
  } catch (error) {
    console.error(`${name} failed:`, error instanceof Error ? error.message : String(error));
    return fallback;
  }
}

const cachedFeaturedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await anonClient()
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Project[];
  },
  ["content", "featured-projects"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

const cachedPublishedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await anonClient()
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Project[];
  },
  ["content", "published-projects"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

const cachedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const { data, error } = await anonClient()
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Testimonial[];
  },
  ["content", "testimonials"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

const cachedSetting = unstable_cache(
  async (key: keyof SiteSettings): Promise<unknown> => {
    const { data, error } = await anonClient().from("site_settings").select("value").eq("key", key).maybeSingle();
    if (error) throw new Error(error.message);
    return data?.value ?? null;
  },
  ["content", "setting"],
  { tags: [CONTENT_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getFeaturedProjects = () => safely<Project[]>("getFeaturedProjects", [], cachedFeaturedProjects);

export const getAllPublishedProjects = () => safely<Project[]>("getAllPublishedProjects", [], cachedPublishedProjects);

export const getTestimonials = () => safely<Testimonial[]>("getTestimonials", [], cachedTestimonials);

export const getSetting = <K extends keyof SiteSettings>(key: K) =>
  safely<SiteSettings[K] | null>(`getSetting(${key})`, null, async () => (await cachedSetting(key)) as SiteSettings[K] | null);
