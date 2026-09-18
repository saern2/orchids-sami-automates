"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["AI Chatbots", "AI Calling Agents", "Lead Capture Systems", "Appointment Booking"];
  const [wordIndex, setWordIndex] = useState(0);
  
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          pauseTimer = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [typedText, isDeleting, wordIndex]);

  return (
    <section 
      id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-dark pt-[100px] md:pt-[120px] pb-16 section-pattern"
    >
      {/* Background Glows */}
      <div className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] left-[-5%] w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[180px] pointer-events-none animate-pulse delay-700" />

      <div className="container relative z-10 flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="max-w-[1300px] w-full text-center"
              >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 block"
                  >
                    For business owners who plan to upscale their business with efficient workflows
                  </motion.span>
                  <h1 
                    className="text-[36px] md:text-[64px] lg:text-[85px] font-black tracking-tighter leading-[1.1] text-center mb-10"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="text-white block">12x your revenue and retain</span> 
                    <span className="text-white block">40Hrs per week with smarter</span>
                    <div className="mt-6 md:mt-8">
                        <span 
                          style={{ 
                            background: 'linear-gradient(to right, #A855F7, #60A5FA)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            display: 'inline-block'
                          }}
                        >
                          {typedText}
                        </span>
                      <span className="w-[3px] h-[40px] md:h-[60px] lg:h-[80px] bg-primary ml-4 animate-pulse inline-block align-middle" />
                    </div>
                  </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-[20px] md:text-[24px] font-medium text-white/70 mb-14 max-w-[900px] mx-auto leading-relaxed"
                >
                  We build smart AI automation tailored to your business which maximize revenue and minimise workload
                </motion.p>


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-accent text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              style={{ fontSize: '17px' }}
            >
              Start Your Journey
            </a>
            <a 
              href="#services" 
              className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full border border-white/10 transition-all duration-300"
              style={{ fontSize: '17px' }}
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
