"use client";

import React from 'react';
import { motion } from 'framer-motion';

const IntroSection = () => {
  return (
    <section className="relative w-full bg-[#080808] section-spacing overflow-hidden">
      <div className="container relative mx-auto px-6 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-24 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] pointer-events-none" />
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
            Start Automating in Record Time
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Transforming Complex Workflows into <span className="text-gradient">Simple Success</span>
          </h2>
          
          <div className="text-xl md:text-2xl font-medium text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto">
            Sami Automates is your partner in the AI revolution. We specialize in building autonomous systems that handle the heavy lifting, so you can focus on growth.
          </div>
          
          <p className="max-w-4xl mx-auto text-lg text-white/60 leading-relaxed mb-16">
            From intelligent voice agents that sound like real humans to complex lead capture pipelines that never sleep, we provide a complete ecosystem for business autonomy. Achieving 10x efficiency isn't just a goal—it's what we deliver every day.
          </p>

          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-transparent border border-white/20 rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            Start Your Transformation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
