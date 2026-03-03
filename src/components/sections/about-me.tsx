"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutMe = () => {
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
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974"
                alt="Sami Automates Founder"
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
              Meet the Visionary
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Driven by <span className="text-gradient">Innovation</span>, Guided by Results
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                At Sami Automates, we believe the future of business isn't just about AI—it's about how we integrate that intelligence into the DNA of every operation.
              </p>
              <p>
                Our mission is to empower ambitious entrepreneurs and enterprises with the tools they need to achieve complete autonomy. By combining cutting-edge LLMs with bespoke workflow blueprints, we turn complex challenges into automated victories.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/5">
                <div>
                  <div className="text-3xl font-black text-white mb-2">50+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-dim-text">Agents Deployed</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-2">95%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-dim-text">Efficiency Gain</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
