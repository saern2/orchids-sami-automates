import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { slugSchema } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAGIC: Record<string, (b: Uint8Array) => boolean> = {
  "image/jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  "image/webp": (b) =>
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
};

/**
 * POST multipart/form-data { file, slug } -> { url }.
 * Session + allowlist checked here (never trust the middleware alone).
 * Files are renamed to projects/<slug>/<uuid>.<ext> in the public `media` bucket.
 */
export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const slugResult = slugSchema.safeParse(form.get("slug"));
  if (!slugResult.success) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  const ext = TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPEG, PNG or WebP images are allowed." }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be between 1 byte and 5 MB." }, { status: 413 });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!MAGIC[file.type](bytes)) {
    return NextResponse.json({ error: "File content does not match its image type." }, { status: 415 });
  }

  const path = `projects/${slugResult.data}/${randomUUID()}.${ext}`;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage.from("media").upload(path, bytes, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) {
    console.error("upload failed:", error.message);
    return NextResponse.json({ error: "Upload failed." }, { status: 502 });
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
