"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Hours Saved Weekly", value: "40+", description: "Freeing teams from repetitive manual tasks." },
  { label: "Lead Response Time", value: "<1m", description: "Instant engagement when interest is peak." },
  { label: "Cost Reduction", value: "65%", description: "Slashing operational overhead with AI agents." },
  { label: "Client ROI", value: "10x", description: "Average return on automation investment." }
];

const StatsSection = () => {
  return (
    <section className="section-spacing bg-gradient-purple relative overflow-hidden section-pattern">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Numbers <span className="text-gradient">Don't Lie</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just promise results—we engineer them. Our automation systems deliver measurable growth from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                {stat.label}
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
