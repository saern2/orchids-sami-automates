"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Will it sound like a robot?",
    answer: "No. You choose the voice, we write the script together, and you hear it before it goes live. Callers can always ask for a person and the agent will hand over."
  },
  {
    question: "What happens when it can't answer a question?",
    answer: "It takes a message, books a callback or transfers the call, whichever you prefer. Either way you get a summary of the call."
  },
  {
    question: "What does it connect to?",
    answer: "Google Calendar, Calendly, HubSpot, Airtable, Google Sheets, WhatsApp, Gmail and most tools with an API, through n8n. If you use something else, ask."
  },
  {
    question: "How long until it's live?",
    answer: "It depends on how many tools and rules are involved. You get a go-live date on the free call, before any work starts."
  },
  {
    question: "What does it cost?",
    answer: "It depends on what you need. Book the free call, tell me how things work today, and I'll give you a fixed price before any work starts."
  },
  {
    question: "Is my customers' data safe?",
    answer: "Calls and bookings stay in the tools you already use. I don't keep copies, and my access is removed when the project is handed over."
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
              Questions
            </div>
            <h2 className="text-[48px] md:text-[64px] font-extrabold text-white leading-[1] mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-12 max-w-[500px]">
              Straight answers before you book a call.
            </p>
            
              <div className="mt-auto p-10 rounded-[32px] bg-white/[0.02] border border-white/5">
                <p className="text-sm font-bold text-white mb-2">Something else?</p>
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
