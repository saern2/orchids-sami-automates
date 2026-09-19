"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { saveTestimonial, type ActionState } from "./actions";

export default function TestimonialForm({ item }: { item: Testimonial | null }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveTestimonial, {});
  const [published, setPublished] = useState(item?.published ?? false);
  const field = "bg-white/[0.03] border-white/10 text-white placeholder:text-white/30";

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      {item && <input type="hidden" name="id" value={item.id} />}
      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardContent className="grid gap-6 md:grid-cols-2 pt-6">
          <div className="space-y-2">
            <Label htmlFor="author">Author (name or handle)</Label>
            <Input id="author" name="author" required className={field} defaultValue={item?.author ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input id="source" name="source" required className={field} defaultValue={item?.source ?? "Fiverr"} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" className={field} defaultValue={item?.country ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1–5)</Label>
            <Input id="rating" name="rating" type="number" min={1} max={5} step={0.1} className={field} defaultValue={item?.rating ?? ""} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="quote">Quote (verbatim)</Label>
            <Textarea id="quote" name="quote" required rows={4} className={field} defaultValue={item?.quote ?? ""} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="source_url">Source URL</Label>
            <Input id="source_url" name="source_url" className={field} defaultValue={item?.source_url ?? ""} placeholder="https://www.fiverr.com/…" />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="published" name="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published">Published</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort order</Label>
            <Input id="sort_order" name="sort_order" type="number" min={0} className={field} defaultValue={item?.sort_order ?? 0} />
          </div>
        </CardContent>
      </Card>

      {state.error && (
        <p role="alert" className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending} className="font-bold h-11 px-8">
          {pending ? <Loader2 className="animate-spin" /> : item ? "Save changes" : "Create testimonial"}
        </Button>
        <Button asChild variant="ghost" className="text-white/70">
          <Link href="/admin/testimonials">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
