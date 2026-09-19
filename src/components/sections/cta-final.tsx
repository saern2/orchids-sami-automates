"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
          <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.05] mb-10">
            Ready to stop <br />
            <span className="text-white underline decoration-secondary decoration-4 underline-offset-8">missing calls?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 font-medium mb-12 leading-relaxed">
            Book a free 20-minute call. Tell me how calls and bookings work today, and I'll tell you what I would build and what it would cost.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#contact" 
              className="group flex items-center gap-3 bg-white text-black font-black py-5 px-12 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              Book my free call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
