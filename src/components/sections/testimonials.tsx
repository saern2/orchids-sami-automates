import { getTestimonials } from "@/lib/content";
import type { FiverrSetting, Testimonial } from "@/lib/types";

// Server component. Renders nothing at all until at least one testimonial is published.

function Stars({ rating }: { rating: number }) {
  const value = Math.round(rating * 2) / 2; // nearest half
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i)); // 0, 0.5 or 1
        return (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`star-${i}-${fill}`} x1="0" x2="1">
                <stop offset={`${fill * 100}%`} stopColor="#C084FC" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${fill})`}
              d="M12 2.5l2.9 6.1 6.7.8-4.85 4.6 1.3 6.6L12 17.3l-6 3.3 1.3-6.6L2.4 9.4l6.7-.8L12 2.5z"
            />
          </svg>
        );
      })}
    </div>
  );
}

function Card({ item, profileUrl }: { item: Testimonial; profileUrl: string | null }) {
  const attribution = [item.author, item.country].filter(Boolean).join(", ");
  const via = `via ${item.source}`;
  return (
    <figure className="glass-card p-8 md:p-10 flex flex-col gap-6">
      {item.rating !== null && <Stars rating={item.rating} />}
      <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
        {"“"}
        {item.quote}
        {"”"}
      </blockquote>
      <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-2 text-sm text-dim-text">
        <span className="font-bold text-white/80">{attribution}</span>
        {item.source_url || profileUrl ? (
          <a
            href={item.source_url ?? profileUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-widest text-[11px] font-bold hover:text-white transition-colors"
          >
            {via}
          </a>
        ) : (
          <span className="uppercase tracking-widest text-[11px] font-bold">{via}</span>
        )}
      </figcaption>
    </figure>
  );
}

export default async function TestimonialsSection({ fiverr }: { fiverr: FiverrSetting | null }) {
  const items = await getTestimonials();
  if (items.length === 0) return null;

  const cols = items.length === 1 ? "md:grid-cols-1 max-w-2xl mx-auto" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="testimonials" className="bg-gradient-purple section-spacing relative overflow-hidden section-pattern">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
            Client feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">What clients say</h2>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${cols}`}>
          {items.map((item) => (
            <Card key={item.id} item={item} profileUrl={fiverr?.profile_url ?? null} />
          ))}
        </div>
      </div>
    </section>
  );
}
