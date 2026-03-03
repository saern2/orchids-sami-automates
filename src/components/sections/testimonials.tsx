"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Testimonial {
  rating: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    quote: "Sami Automates transformed our entire document processing pipeline. We've seen a literal 10x gain in efficiency since deploying their autonomous agents.",
    author: "Elena Soroka",
    role: "COO, Nexus Enterprise",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974"
  },
  {
    rating: 5,
    quote: "The multi-format intelligence they built is spooky good. It handles everything from CSVs to raw video data autonomously. Best investment in AI we've made.",
    author: "Marcus Chen",
    role: "Founder, DataStream AI",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070"
  },
  {
    rating: 5,
    quote: "Their 'Wide Research' methodology is the real deal. They identified bottlenecks in our systems we didn't even know existed and automated them in weeks.",
    author: "Sarah Jenkins",
    role: "VP of Product, CloudScale",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"
  },
  {
    rating: 5,
    quote: "We achieved complete autonomy in our customer support logic. It's not just a chatbot; it's an intelligent system that executes tasks. Unbeatable 10x ROI.",
    author: "David Miller",
    role: "CEO, GrowthLogic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
  }
];

const RatingStars = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#A855F7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[420px] bg-[#050505] rounded-[32px] p-10 border border-white/5 flex flex-col justify-between hover:border-primary/30 transition-all duration-500">
      <div>
        <RatingStars count={testimonial.rating} />
        <p className="text-[18px] leading-[1.6] text-[#A1A1AA] font-normal mb-10 italic">
          &quot;{testimonial.quote}&quot;
        </p>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-primary/20">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-[18px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {testimonial.author}
          </h4>
          <p className="text-[14px] text-primary font-bold tracking-widest uppercase mt-1">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

  const TestimonialsSection = () => {
    return (
      <section className="bg-gradient-slate section-spacing overflow-hidden border-t border-white/5 section-pattern">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 mb-20 text-center relative z-10">
         <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
            Testimonials
          </div>
          <h2 className="text-[40px] md:text-[56px] font-extrabold text-white leading-[1.1] tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
            Voices of <span className="text-gradient">Autonomy</span>
          </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex gap-6 animate-scroll-rtl py-10">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`scroll-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-444px * ${testimonials.length})); }
        }
        .animate-scroll-rtl {
          animation: scroll-rtl 30s linear infinite;
        }
        .animate-scroll-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
