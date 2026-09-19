export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  client_name: string | null;
  client_public: boolean;
  category: string;
  summary: string;
  body: string;
  features: string[];
  results: string[];
  stack: string[];
  use_case: string | null;
  cover_url: string | null;
  gallery_urls: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author: string;
  source: string;
  country: string | null;
  rating: number | null;
  quote: string;
  source_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSetting {
  email: string;
  whatsapp: string;
  linkedin: string;
  x: string;
}

export interface FiverrSetting {
  profile_url: string;
  rating: number;
  reviews: number;
  level: string;
}

export interface SiteSettings {
  contact: ContactSetting;
  fiverr: FiverrSetting;
}
