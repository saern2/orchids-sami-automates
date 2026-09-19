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
            What you get
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            Your phone gets answered. Your calendar fills up. <span className="text-gradient">You stay on the job.</span>
          </h2>
          
          <div className="text-xl md:text-2xl font-medium text-white/80 mb-12 leading-relaxed max-w-4xl mx-auto">
            A missed call is usually a lost customer. An AI agent picks up on the first ring, answers the usual questions, books the appointment and sends you the details. The same systems follow up on leads, confirm bookings and keep your CRM current.
          </div>
          
          <p className="max-w-4xl mx-auto text-lg text-white/60 leading-relaxed mb-16">
            Everything is built around how your business already works: your calendar, your CRM, your opening hours and the way you speak to customers. You approve the script and hear it before it goes live.
          </p>

          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-transparent border border-white/20 rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            Tell us about your business
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
