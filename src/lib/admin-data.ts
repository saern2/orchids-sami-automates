import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Project, SiteSettings, Testimonial } from "@/lib/types";

/**
 * Uncached reads for the admin panel (service role, all rows). Only call
 * from server code that has already passed requireAdminUser().
 */
export async function listProjects(): Promise<Project[]> {
  const { data, error } = await createSupabaseAdminClient()
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`listProjects: ${error.message}`);
  return (data ?? []) as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await createSupabaseAdminClient().from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getProjectById: ${error.message}`);
  return (data as Project | null) ?? null;
}

export async function listTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await createSupabaseAdminClient()
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`listTestimonials: ${error.message}`);
  return (data ?? []) as Testimonial[];
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const { data, error } = await createSupabaseAdminClient()
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getTestimonialById: ${error.message}`);
  return (data as Testimonial | null) ?? null;
}

export async function getAllSettings(): Promise<Partial<SiteSettings>> {
  const { data, error } = await createSupabaseAdminClient().from("site_settings").select("key, value");
  if (error) throw new Error(`getAllSettings: ${error.message}`);
  const out: Partial<SiteSettings> = {};
  for (const row of data ?? []) {
    if (row.key === "contact") out.contact = row.value as SiteSettings["contact"];
    if (row.key === "fiverr") out.fiverr = row.value as SiteSettings["fiverr"];
  }
  return out;
}
