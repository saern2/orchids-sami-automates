import { z } from "zod";

/** One item per line, trimmed, blanks dropped. */
export const lines = z
  .string()
  .optional()
  .default("")
  .transform((s) => s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean));

const optionalText = z
  .string()
  .trim()
  .max(500)
  .optional()
  .default("")
  .transform((s) => (s === "" ? null : s));

const optionalUrl = z
  .string()
  .trim()
  .max(2000)
  .optional()
  .default("")
  .transform((s) => (s === "" ? null : s))
  .refine((s) => s === null || /^https?:\/\//.test(s), { message: "Must start with http:// or https://" });

const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

export const slugSchema = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, digits and single hyphens only");

export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(120),
  subtitle: optionalText,
  client_name: optionalText,
  client_public: checkbox,
  category: z.string().trim().min(2).max(60),
  summary: z.string().trim().min(10).max(200),
  body: z.string().trim().min(10).max(10000),
  features: lines,
  results: lines,
  stack: lines,
  use_case: optionalText,
  cover_url: optionalUrl,
  gallery_urls: lines.pipe(z.array(z.string().url())),
  featured: checkbox,
  published: checkbox,
  sort_order: z.coerce.number().int().min(0).max(100000).default(0),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const testimonialSchema = z.object({
  author: z.string().trim().min(1).max(120),
  source: z.string().trim().min(1).max(60).default("Fiverr"),
  country: optionalText,
  rating: z.preprocess(
    (v) => (v === "" || v === undefined || v === null ? null : Number(v)),
    z.number().min(1).max(5).multipleOf(0.1).nullable(),
  ),
  quote: z.string().trim().min(2).max(2000),
  source_url: optionalUrl,
  published: checkbox,
  sort_order: z.coerce.number().int().min(0).max(100000).default(0),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;

export const contactSettingSchema = z.object({
  email: z.email().max(254),
  whatsapp: z.string().trim().url().max(500),
  linkedin: z.string().trim().url().max(500),
  x: z.string().trim().url().max(500),
});

export const fiverrSettingSchema = z.object({
  profile_url: z.string().trim().url().max(500),
  rating: z.coerce.number().min(0).max(5),
  reviews: z.coerce.number().int().min(0).max(1000000),
  level: z.string().trim().max(60),
});

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** First readable message from a zod error, for the form banner. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid input.";
  const path = issue.path.length ? `${issue.path.join(".")}: ` : "";
  return `${path}${issue.message}`;
}
