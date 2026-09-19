"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { FiverrSetting } from '@/lib/types';
import HeroDemo from './hero-demo';

const HeroSection = ({ fiverr }: { fiverr: FiverrSetting | null }) => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["AI calling agents", "automated follow-ups", "chat and WhatsApp bots", "n8n workflows"];
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
        className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-gradient-dark pt-[110px] md:pt-[130px] pb-16 lg:pb-20 section-pattern"
    >
      {/* Background glows (static; the demo card carries the motion) */}
      <div className="absolute top-[5%] right-[-10%] w-[700px] h-[700px] bg-primary/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-14 lg:gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full text-center lg:text-left"
              >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 block"
                  >
                    For businesses that lose customers to voicemail and slow follow-up
                  </motion.span>
                  <h1 
                    className="text-[36px] sm:text-[46px] md:text-[56px] lg:text-[48px] xl:text-[56px] 2xl:text-[62px] font-black tracking-tighter leading-[1.06] mb-8"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="text-white lg:block">Calls answered. </span>
                    <span className="text-white lg:block">Leads followed up. </span>
                    <span className="text-white lg:block lg:whitespace-nowrap">Bookings made, with</span>
                    <div className="mt-2 md:mt-3 min-h-[1.15em] text-[0.88em] leading-[1.1]">
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
                      <span className="w-[3px] h-[0.9em] bg-primary ml-3 animate-pulse inline-block align-middle" />
                    </div>
                  </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-[18px] md:text-[21px] font-medium text-white/70 mb-10 max-w-[640px] mx-auto lg:mx-0 leading-relaxed"
                >
                  Sami Automates builds AI calling agents, chatbots and automations that pick up the phone, qualify every lead and book the appointment, then keep your CRM up to date. Day, night and weekends.
                </motion.p>


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start"
          >
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-accent text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              style={{ fontSize: '17px' }}
            >
              Book a free call
            </a>
            <a 
              href="#services" 
              className="inline-block bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full border border-white/10 transition-all duration-300"
              style={{ fontSize: '17px' }}
            >
              See what we build
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-y-3 sm:gap-y-2 text-[11px] font-bold uppercase tracking-[0.18em] text-dim-text"
          >
            {fiverr && (
              <li className="sm:pr-5 sm:mr-5 sm:border-r sm:border-white/15">
                <a
                  href={fiverr.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {fiverr.rating} from {fiverr.reviews} reviews on Fiverr
                </a>
              </li>
            )}
            <li className="sm:pr-5 sm:mr-5 sm:border-r sm:border-white/15 text-center">Calling systems live for Elite VCM and USA BUYS LAND</li>
            <li>Built on Vapi, Retell and n8n</li>
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="w-[calc(100%+1.5rem)] -mx-3 sm:w-full sm:mx-0 lg:justify-self-end"
        >
          <HeroDemo />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
