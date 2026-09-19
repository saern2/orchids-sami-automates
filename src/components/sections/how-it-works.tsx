"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Zap, CheckCircle, BarChart3 } from 'lucide-react';

const steps = [
  {
    title: "A 20-minute call",
    description: "You tell us how calls, leads and bookings are handled today and where they slip through.",
    icon: <MousePointer2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "We build it",
    description: "A calling agent on Vapi, a chatbot, or an n8n workflow wired to your calendar and CRM. You get a fixed price and a go-live date before any work starts.",
    icon: <Zap className="w-6 h-6 text-secondary" />,
  },
  {
    title: "We test it together",
    description: "You call it, we adjust the script and the rules until it sounds right for your customers.",
    icon: <CheckCircle className="w-6 h-6 text-accent" />,
  },
  {
    title: "Go live",
    description: "It answers, books and follows up. Every call and conversation is logged where you can see it.",
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-indigo section-spacing relative overflow-hidden section-pattern">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Four steps from first call to live system. No technical work on your side.
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
