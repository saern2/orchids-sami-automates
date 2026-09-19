"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { FiverrSetting } from '@/lib/types';

const AboutMe = ({ fiverr }: { fiverr: FiverrSetting | null }) => {
  return (
    <section id="about" className="bg-gradient-dark section-spacing border-t border-white/5 relative overflow-hidden section-pattern">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/sami.png"
                alt="Sami Memon, founder of Sami Automates"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            {/* Abstract shapes */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
              About Sami
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              I build it, I test it, and <span className="text-gradient">I answer when you call.</span>
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                I'm Sami Memon, a computer science graduate (Khalifa University, 2021). I build AI calling agents on Vapi and automations in n8n for businesses that need calls answered and appointments booked without adding staff.
              </p>
              {fiverr && (
                <p>
                  On Fiverr I'm a {fiverr.level} seller with a {fiverr.rating} rating from {fiverr.reviews} reviews, and I've built calling systems for a medical practice (Elite VCM) and a US real estate company (USA BUYS LAND). You deal with me directly, from the first call to go-live.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
