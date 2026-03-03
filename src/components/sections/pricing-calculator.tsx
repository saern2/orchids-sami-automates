"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Zap, Target, Gauge } from "lucide-react";
import { motion } from "framer-motion";

const PricingCalculator = () => {
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("Medium");
  const [projectSize, setProjectSize] = useState("Medium");
  const [speed, setSpeed] = useState("Standard");
  const [estimate, setEstimate] = useState({ from: 0, to: 0 });

  useEffect(() => {
    let base = 0;
    switch (service) {
      case "AI Chatbot Implementation": base = 3500; break;
      case "AI Calling Agent Setup": base = 5500; break;
      case "Lead Capture Funnel": base = 4000; break;
      case "Appointment Booking System": base = 4500; break;
      case "Custom Workflow Blueprint": base = 8000; break;
      default: base = 0;
    }

    if (base === 0) {
      setEstimate({ from: 0, to: 0 });
      return;
    }

    const multipliers = {
      complexity: complexity === "Low" ? 0.7 : complexity === "High" ? 1.6 : 1,
      size: projectSize === "Small" ? 0.6 : projectSize === "Global" ? 2.5 : 1.2,
      speed: speed === "Priority" ? 1.5 : 1,
    };

    const finalBase = base * multipliers.complexity * multipliers.size * multipliers.speed;
    setEstimate({
      from: Math.round(finalBase),
      to: Math.round(finalBase * 1.35),
    });
  }, [service, complexity, projectSize, speed]);

  const services = [
    "AI Chatbot Implementation",
    "AI Calling Agent Setup",
    "Lead Capture Funnel",
    "Appointment Booking System",
    "Custom Workflow Blueprint",
  ];

  const ToggleRow = ({ label, options, current, onChange, icon }: any) => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[12px] uppercase tracking-widest text-dim-text font-black">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option: string) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
              current === option 
                ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]" 
                : "bg-white/5 border-white/10 text-dim-text hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

    return (
      <section id="pricing" className="bg-gradient-indigo section-spacing relative overflow-hidden section-pattern">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase" style={{ fontSize: '12px' }}>
            ROI Estimator
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Discover Your <span className="text-gradient">Investment</span>
          </h2>
        </div>

        <div className="max-w-[1000px] mx-auto glass-card p-8 lg:p-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
            <label className="text-[14px] uppercase tracking-widest text-white font-black min-w-[180px]">
              Automation Track:
            </label>
            <div className="relative flex-1">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-[16px] focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="" disabled className="bg-black">Select an option</option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-black">{s}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div className="space-y-12">
              <ToggleRow 
                label="COMPLEXITY" 
                options={["Low", "Medium", "High"]} 
                current={complexity} 
                onChange={setComplexity} 
                icon={<Target className="w-4 h-4 text-primary" />}
              />
              <ToggleRow 
                label="BUSINESS SCALE" 
                options={["Small", "Mid-Market", "Global"]} 
                current={projectSize} 
                onChange={setProjectSize} 
                icon={<Zap className="w-4 h-4 text-secondary" />}
              />
            </div>
            <div className="space-y-12">
               <ToggleRow 
                label="DEPLOYMENT SPEED" 
                options={["Standard", "Priority"]} 
                current={speed} 
                onChange={setSpeed} 
                icon={<Gauge className="w-4 h-4 text-accent" />}
              />
              
              <div className="p-8 rounded-[32px] bg-primary/5 border border-primary/20">
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">Efficiency Guarantee</div>
                <div className="text-3xl font-black text-white tracking-tighter italic">10X ROI PROJECTED</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={false}
              animate={{ opacity: service ? 1 : 0.5 }}
              className="bg-white/5 rounded-[32px] p-10 text-center border border-white/5 backdrop-blur-sm"
            >
              <div className="text-[12px] uppercase tracking-widest text-primary font-black mb-6">ESTIMATED START</div>
              <div className="text-[42px] md:text-[48px] font-black text-white leading-none tracking-tighter">
                {service ? `$${estimate.from.toLocaleString()}` : "—"}
              </div>
            </motion.div>
            <motion.div 
              initial={false}
              animate={{ opacity: service ? 1 : 0.5 }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] p-10 text-center border border-primary/20"
            >
              <div className="text-[12px] uppercase tracking-widest text-white font-black mb-6">OPTIMIZED DEPLOYMENT</div>
              <div className="text-[42px] md:text-[48px] font-black text-white leading-none tracking-tighter">
                {service ? `$${estimate.to.toLocaleString()}` : "—"}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;
