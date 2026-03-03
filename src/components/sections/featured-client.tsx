"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FeaturedClient = () => {
  return (
    <section className="bg-black py-16 md:py-24 border-y border-white/5 relative overflow-hidden section-pattern">
       {/* Decorative gradient */}
       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
       
      <div className="container mx-auto px-6 max-w-[1248px] relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Left Side: Professional Mockup/Headshot */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[450px] flex-shrink-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                alt="Client Leader"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10">
                 <div className="text-white text-2xl font-black italic tracking-tighter uppercase">Enterprise Scaled</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Impact Statement */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="max-w-[720px]">
              <div className="text-primary font-black text-6xl md:text-8xl opacity-20 leading-none mb-6">“</div>
              <p className="text-white font-display text-[24px] md:text-[32px] leading-[1.4] font-bold mb-10 tracking-tight italic">
                Sami Automates didn&apos;t just provide a tool; they redefined our operational framework. Their autonomous agents now handle 80% of our complex logic, allowing our talent to focus on pure innovation.
              </p>
              
              <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-2xl text-primary">SA</div>
                <div>
                  <h4 className="text-[20px] font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Jonathan Aris</h4>
                  <p className="text-primary text-[14px] font-bold tracking-widest uppercase">Director of Innovation, Global Logistics</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClient;
