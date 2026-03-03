"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="section-spacing bg-gradient-blue relative overflow-hidden text-center section-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm uppercase tracking-widest mb-10">
            <Zap className="w-4 h-4 text-secondary fill-secondary" />
            Limited Availability for Q1
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.05] mb-10">
            Ready to Get Your <br />
            <span className="text-white underline decoration-secondary decoration-4 underline-offset-8">Life Back?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 font-medium mb-12 leading-relaxed">
            Stop trading your time for repetitive tasks. Let Sami Automates install the autonomous infrastructure your business deserves.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#contact" 
              className="group flex items-center gap-3 bg-white text-black font-black py-5 px-12 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              Book Your Free Audit
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-white/40 font-bold italic">
              *Only 3 spots remaining for this month
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
