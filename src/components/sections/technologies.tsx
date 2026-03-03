"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Technologies = () => {
  return (
    <section 
      id="methodology" 
      className="bg-[#0a0a0a] section-spacing px-6 overflow-hidden relative"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(124,58,237,0.1)_0%,transparent_50%)]" />

      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
        {/* Left Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex flex-col items-start"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
            Our Edge
          </div>
          <h2 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] text-white mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
            Proprietary <span className="text-gradient">&quot;Wide Research&quot;</span> Methodology
          </h2>
          <p className="text-[#A1A1AA] text-[18px] md:text-[20px] leading-[1.7] mb-10">
            We don&apos;t just code; we investigate. Our methodology dives deep into your enterprise logic to find every automation opportunity. Through adaptive AI agents and massive parallel processing, we scale your operations 10x faster than traditional software agencies.
          </p>
          
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5">
                <div className="text-white font-bold text-lg mb-2">Adaptive Agents</div>
                <div className="text-sm text-[#A1A1AA]">Systems that learn and self-correct based on your logic.</div>
            </div>
            <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5">
                <div className="text-white font-bold text-lg mb-2">Parallel Grid</div>
                <div className="text-sm text-[#A1A1AA]">Executing complex tasks across thousands of nodes instantly.</div>
            </div>
          </div>
        </motion.div>

        {/* Right Animation Column */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative min-h-[500px]">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            {/* Pulsing Orbits */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[10%] border border-primary/20 rounded-full"
            />
            
            {/* Orbiting nodes */}
            <div className="absolute inset-0">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-black border border-primary/40 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  <div className="text-primary font-black text-xl">AI</div>
               </div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-black border border-secondary/40 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <div className="text-secondary font-black text-xl">AG</div>
               </div>
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-black border border-accent/40 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <div className="text-accent font-black text-xl">WF</div>
               </div>
            </div>

            {/* Central Core */}
            <div className="relative w-48 h-48 rounded-[48px] flex items-center justify-center overflow-hidden z-20 shadow-[0_0_80px_rgba(124,58,237,0.4)] border border-primary/30">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary animate-pulse"
              ></div>
              <div className="relative z-10 flex flex-col items-center">
                 <span className="text-4xl font-black text-white tracking-tighter italic">10X</span>
                 <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mt-1">Efficiency</span>
              </div>
            </div>

            <div className="absolute w-[300px] h-[300px] bg-primary blur-[120px] opacity-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
