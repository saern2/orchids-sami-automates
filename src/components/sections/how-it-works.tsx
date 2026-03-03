"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Zap, CheckCircle, BarChart3 } from 'lucide-react';

const steps = [
  {
    title: "Select Your Agent",
    description: "Choose from our pre-built AI agents or custom-build one tailored to your specific business needs.",
    icon: <MousePointer2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Connect Your Tools",
    description: "Seamlessly integrate with your existing CRM, calendar, and communication channels in one click.",
    icon: <Zap className="w-6 h-6 text-secondary" />,
  },
  {
    title: "Launch & Automate",
    description: "Go live in minutes. Your AI agents start handling leads and booking appointments immediately.",
    icon: <CheckCircle className="w-6 h-6 text-accent" />,
  },
  {
    title: "Scale Efficiency",
    description: "Monitor performance through real-time analytics and scale your operations with 10x ROI.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-indigo section-spacing relative overflow-hidden section-pattern">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Get Started in <span className="text-gradient">Under a Minute</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Our streamlined process ensures you can start capturing leads and booking appointments without the technical headache.
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 group hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center md:items-start md:text-left"
              >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
