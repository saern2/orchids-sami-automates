"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Upload } from "lucide-react";
import type { Project } from "@/lib/types";
import { slugify } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveProject, type ActionState } from "./actions";

const SUMMARY_MAX = 200;

export default function ProjectForm({ project }: { project: Project | null }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(saveProject, {});
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!project);
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [coverUrl, setCoverUrl] = useState(project?.cover_url ?? "");
  const [gallery, setGallery] = useState((project?.gallery_urls ?? []).join("\n"));
  const [clientPublic, setClientPublic] = useState(project?.client_public ?? false);
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  async function upload(file: File, kind: "cover" | "gallery") {
    setUploadError(null);
    const effectiveSlug = slug || slugify(title);
    if (!effectiveSlug) {
      setUploadError("Enter a title (or slug) before uploading, so the file can be filed under it.");
      return;
    }
    setUploading(kind);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("slug", effectiveSlug);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !body.url) {
        setUploadError(body.error ?? `Upload failed (${res.status}).`);
        return;
      }
      if (kind === "cover") setCoverUrl(body.url);
      else setGallery((g) => (g ? `${g}\n${body.url}` : body.url!));
    } catch {
      setUploadError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(null);
    }
  }

  const field = "bg-white/[0.03] border-white/10 text-white placeholder:text-white/30";

  return (
    <form action={formAction} className="space-y-8 max-w-4xl">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Basics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              className={field}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              required
              className={field}
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              onBlur={(e) => setSlug(slugify(e.target.value))}
            />
            <p className="text-xs text-[#A1A1AA]">Lowercase letters, digits, hyphens. Must be unique.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" name="subtitle" className={field} defaultValue={project?.subtitle ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" required className={field} defaultValue={project?.category ?? ""} placeholder="Voice AI, Automation, Content AI…" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="use_case">Use case</Label>
            <Input id="use_case" name="use_case" className={field} defaultValue={project?.use_case ?? ""} placeholder="Who this is for" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client_name">Client name</Label>
            <Input id="client_name" name="client_name" className={field} defaultValue={project?.client_name ?? ""} placeholder="Leave empty if not named" />
          </div>
          <div className="flex items-center gap-3 pt-7">
            <Switch id="client_public" name="client_public" checked={clientPublic} onCheckedChange={setClientPublic} />
            <Label htmlFor="client_public">Show client name publicly (otherwise “Private client”)</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Summary (card text)</Label>
              <span className={`text-xs tabular-nums ${summary.length > SUMMARY_MAX ? "text-red-400" : "text-[#A1A1AA]"}`}>
                {summary.length}/{SUMMARY_MAX}
              </span>
            </div>
            <Textarea id="summary" name="summary" required rows={2} maxLength={SUMMARY_MAX} className={field} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">What was built (modal text; blank line = new paragraph)</Label>
            <Textarea id="body" name="body" required rows={8} className={field} defaultValue={project?.body ?? ""} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea id="features" name="features" rows={6} className={field} defaultValue={(project?.features ?? []).join("\n")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="results">Results (one per line, real outcomes only)</Label>
              <Textarea id="results" name="results" rows={6} className={field} defaultValue={(project?.results ?? []).join("\n")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stack">Stack (one per line)</Label>
              <Textarea id="stack" name="stack" rows={6} className={field} defaultValue={(project?.stack ?? []).join("\n")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="cover_url">Cover image URL</Label>
            <div className="flex gap-2">
              <Input id="cover_url" name="cover_url" className={field} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="Paste a URL or upload" />
              <input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f, "cover"); e.target.value = ""; }} />
              <Button type="button" variant="outline" className="shrink-0 border-white/10 text-white bg-transparent hover:bg-white/10" disabled={uploading !== null} onClick={() => coverInput.current?.click()}>
                {uploading === "cover" ? <Loader2 className="animate-spin" /> : <Upload size={16} />} Upload cover
              </Button>
            </div>
            {coverUrl && (
              <img src={coverUrl} alt="" className="mt-2 h-32 w-auto rounded-xl border border-white/10 object-cover" />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery_urls">Gallery image URLs (one per line)</Label>
            <Textarea id="gallery_urls" name="gallery_urls" rows={4} className={field} value={gallery} onChange={(e) => setGallery(e.target.value)} />
            <input ref={galleryInput} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f, "gallery"); e.target.value = ""; }} />
            <Button type="button" variant="outline" className="border-white/10 text-white bg-transparent hover:bg-white/10" disabled={uploading !== null} onClick={() => galleryInput.current?.click()}>
              {uploading === "gallery" ? <Loader2 className="animate-spin" /> : <Upload size={16} />} Add gallery image
            </Button>
          </div>
          {uploadError && (
            <p role="alert" className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{uploadError}</p>
          )}
          <p className="text-xs text-[#A1A1AA]">JPEG, PNG or WebP up to 5 MB. Uploads are stored under media/projects/&lt;slug&gt;/.</p>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/10 text-white">
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Switch id="published" name="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published">Published</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="featured" name="featured" checked={featured} onCheckedChange={setFeatured} />
            <Label htmlFor="featured">Featured on home page</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort order</Label>
            <Input id="sort_order" name="sort_order" type="number" min={0} className={field} defaultValue={project?.sort_order ?? 0} />
          </div>
        </CardContent>
      </Card>

      {state.error && (
        <p role="alert" className="text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{state.error}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending} className="font-bold h-11 px-8">
          {pending ? <Loader2 className="animate-spin" /> : project ? "Save changes" : "Create project"}
        </Button>
        <Button asChild variant="ghost" className="text-white/70">
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
