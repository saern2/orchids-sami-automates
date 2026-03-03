"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "How long until we see the 10x efficiency gains?",
    answer: "Most enterprises start seeing measurable efficiency improvements within 4-6 weeks of deployment. Our 'Wide Research' phase ensures we target the highest impact areas first for immediate ROI."
  },
  {
    question: "Do your autonomous agents integrate with legacy software?",
    answer: "Yes. Our systems are designed to bridge the gap between legacy infrastructure and modern AI intelligence. We use multi-format intelligence to read and interact with existing data without requiring a full system overhaul."
  },
  {
    question: "What is the 'Wide Research' methodology?",
    answer: "It is our proprietary deep-dive audit process. We map out your entire business logic, identifying hidden bottlenecks and parallel processing opportunities that standard automation tools miss."
  },
  {
    question: "Is our data secure during the automation process?",
    answer: "Security is built into our core. We implement enterprise-grade encryption and can deploy agents within your private cloud environment to ensure data never leaves your secure perimeter."
  },
  {
    question: "Can these agents handle complex decision-making?",
    answer: "Absolutely. We build 'Adaptive AI Agents' that follow your specific business logic and heuristics. They don't just follow static paths; they analyze context and make informed decisions within your pre-defined guardrails."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-8 text-left group"
      >
        <span className={`text-[18px] md:text-[22px] font-bold leading-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary rotate-180 text-white' : 'text-[#A1A1AA]'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-[17px] text-[#A1A1AA] leading-relaxed max-w-[90%]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-gradient-blue section-spacing px-6 relative overflow-hidden section-pattern">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[100px] gap-y-16">
          {/* Left Side */}
          <div className="flex flex-col">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase self-start">
              Knowledge Base
            </div>
            <h2 className="text-[48px] md:text-[64px] font-extrabold text-white leading-[1] mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-12 max-w-[500px]">
              Everything you need to know about the transition to an autonomous business model.
            </p>
            
              <div className="mt-auto p-10 rounded-[32px] bg-white/[0.02] border border-white/5">
                <p className="text-sm font-bold text-white mb-2">Still curious?</p>
                <a 
                  href="mailto:samiautomates@gmail.com" 
                  className="text-primary text-[18px] font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
                >
                  samiautomates@gmail.com
                </a>
              </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
