"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Scale, Home, Wrench, Smile, Scissors } from 'lucide-react';

const industries = [
  { name: "Medical clinics", icon: <Stethoscope className="w-8 h-8" />, color: "text-red-400" },
  { name: "Real estate", icon: <Home className="w-8 h-8" />, color: "text-blue-400" },
  { name: "Home services", icon: <Wrench className="w-8 h-8" />, color: "text-amber-400" },
  { name: "Law firms", icon: <Scale className="w-8 h-8" />, color: "text-purple-400" },
  { name: "Dental practices", icon: <Smile className="w-8 h-8" />, color: "text-green-400" },
  { name: "Salons and spas", icon: <Scissors className="w-8 h-8" />, color: "text-indigo-400" }
];

  const IndustriesSection = () => {
    return (
      <section className="section-spacing bg-gradient-indigo relative overflow-hidden section-pattern">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Built for businesses that <span className="text-gradient">live on the phone</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Clinics, agencies and trades lose bookings every day to voicemail. These are the businesses I build for.
            </p>
          </div>
          <div className="flex -space-x-4 opacity-50">
             {/* Decorative element or logos can go here */}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all duration-300"
            >
              <div className={`mb-6 p-4 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300 ${industry.color}`}>
                {industry.icon}
              </div>
              <span className="text-white/80 font-bold group-hover:text-white transition-colors">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
