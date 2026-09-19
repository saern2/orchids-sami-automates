import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { publicSupabaseEnv } from "@/lib/supabase/env";
import type { Project, SiteSettings, Testimonial } from "@/lib/types";

export const CONTENT_TAG = "content";

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

export const getFeaturedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await anonClient()
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(`getFeaturedProjects: ${error.message}`);
    return (data ?? []) as Project[];
  },
  ["content", "featured-projects"],
  { tags: [CONTENT_TAG] },
);

export const getAllPublishedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await anonClient()
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(`getAllPublishedProjects: ${error.message}`);
    return (data ?? []) as Project[];
  },
  ["content", "published-projects"],
  { tags: [CONTENT_TAG] },
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const { data, error } = await anonClient()
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(`getTestimonials: ${error.message}`);
    return (data ?? []) as Testimonial[];
  },
  ["content", "testimonials"],
  { tags: [CONTENT_TAG] },
);

export const getSetting = unstable_cache(
  async <K extends keyof SiteSettings>(key: K): Promise<SiteSettings[K] | null> => {
    const { data, error } = await anonClient().from("site_settings").select("value").eq("key", key).maybeSingle();
    if (error) throw new Error(`getSetting(${key}): ${error.message}`);
    return (data?.value as SiteSettings[K] | undefined) ?? null;
  },
  ["content", "setting"],
  { tags: [CONTENT_TAG] },
);
