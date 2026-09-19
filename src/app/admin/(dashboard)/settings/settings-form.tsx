"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import type { ContactSetting, FiverrSetting } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveSettings, type ActionState } from "./actions";

export default function SettingsForm({
  contact,
  fiverr,
}: {
  contact: ContactSetting | null;
  fiverr: FiverrSetting | null;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveSettings, {});
  const field = "bg-white/[0.03] border-white/10 text-white placeholder:text-white/30";

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact_email">Email</Label>
            <Input id="contact_email" name="contact_email" type="email" required className={field} defaultValue={contact?.email ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_whatsapp">WhatsApp link</Label>
            <Input id="contact_whatsapp" name="contact_whatsapp" required className={field} defaultValue={contact?.whatsapp ?? ""} placeholder="https://wa.me/…" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_linkedin">LinkedIn URL</Label>
            <Input id="contact_linkedin" name="contact_linkedin" required className={field} defaultValue={contact?.linkedin ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_x">X (Twitter) URL</Label>
            <Input id="contact_x" name="contact_x" required className={field} defaultValue={contact?.x ?? ""} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Fiverr</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fiverr_profile_url">Profile URL</Label>
            <Input id="fiverr_profile_url" name="fiverr_profile_url" required className={field} defaultValue={fiverr?.profile_url ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fiverr_rating">Rating (0–5)</Label>
            <Input id="fiverr_rating" name="fiverr_rating" type="number" min={0} max={5} step={0.1} required className={field} defaultValue={fiverr?.rating ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fiverr_reviews">Review count</Label>
            <Input id="fiverr_reviews" name="fiverr_reviews" type="number" min={0} step={1} required className={field} defaultValue={fiverr?.reviews ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fiverr_level">Level</Label>
            <Input id="fiverr_level" name="fiverr_level" className={field} defaultValue={fiverr?.level ?? ""} placeholder="Level 2" />
          </div>
        </CardContent>
      </Card>

      {state.error && (
        <p role="alert" className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{state.error}</p>
      )}
      {state.ok && !state.error && (
        <p role="status" className="text-sm font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
          Saved.
        </p>
      )}

      <Button type="submit" disabled={pending} className="font-bold h-11 px-8">
        {pending ? <Loader2 className="animate-spin" /> : "Save settings"}
      </Button>
    </form>
  );
}
