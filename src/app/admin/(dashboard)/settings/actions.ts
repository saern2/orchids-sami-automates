"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CONTENT_TAG } from "@/lib/content";
import { contactSettingSchema, fiverrSettingSchema, firstIssue } from "@/lib/validation";

export type ActionState = { error?: string; ok?: boolean };

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdminUser();

  const contact = contactSettingSchema.safeParse({
    email: formData.get("contact_email"),
    whatsapp: formData.get("contact_whatsapp"),
    linkedin: formData.get("contact_linkedin"),
    x: formData.get("contact_x"),
  });
  if (!contact.success) return { error: `contact.${firstIssue(contact.error)}` };

  const fiverr = fiverrSettingSchema.safeParse({
    profile_url: formData.get("fiverr_profile_url"),
    rating: formData.get("fiverr_rating"),
    reviews: formData.get("fiverr_reviews"),
    level: formData.get("fiverr_level"),
  });
  if (!fiverr.success) return { error: `fiverr.${firstIssue(fiverr.error)}` };

  const { error } = await createSupabaseAdminClient()
    .from("site_settings")
    .upsert(
      [
        { key: "contact", value: contact.data },
        { key: "fiverr", value: fiverr.data },
      ],
      { onConflict: "key" },
    );
  if (error) return { error: error.message };

  revalidateTag(CONTENT_TAG);
  revalidatePath("/admin/settings");
  return { ok: true };
}
