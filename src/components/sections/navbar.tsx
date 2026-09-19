"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
      { label: 'Home', href: '/' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#portfolio' },
      { label: 'About', href: '#about' }
    ];

  return (
          <div 
            className="navbar w-nav w-full bg-[#080808] px-[20px] md:px-[20px] border-b border-white/5 fixed top-0 left-0 right-0 z-[100]"
            style={{
              height: 'auto',
              minHeight: '60px',
              display: 'block',
            }}
          >
            <div 
              className="container-large w-container mx-auto max-w-[1356px] h-full py-0.5 md:py-1"
            >
            <div 
              className="nav-flex-wrapper flex items-center justify-between w-full h-full"
            >
              {/* Logo Section */}
                <a 
                  href="/" 
                  className="brand-logo w-nav-brand flex items-center shrink-0" 
                  aria-label="home"
                >
                    <Image
                      src="/logo.png"
                      alt="Sami Automates"
                      width={792}
                      height={285}
                      priority
                      className="h-10 md:h-14 w-auto object-contain transition-all"
                    />
                </a>

          {/* Desktop Navigation Links */}
          <nav 
            role="navigation" 
            className="nav-menu w-nav-menu hidden lg:flex items-center gap-x-[32px]"
          >
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="nav-link w-nav-link text-white/70 text-[14px] font-bold uppercase tracking-widest transition-all hover:text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button Section */}
          <div className="flex items-center">
            <a 
              href="#contact" 
              className="cta hidden sm:inline-block bg-primary text-white px-[24px] py-[10px] rounded-full text-[14px] font-bold transition-all hover:bg-accent hover:scale-[1.05] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              style={{ 
                fontFamily: 'var(--font-display)',
              }}
            >
              Book a free call
            </a>

            {/* Mobile Menu Button */}
            <div 
              className="menu-button w-nav-button block lg:hidden ml-4 p-2 cursor-pointer transition-transform active:scale-95" 
              aria-label="menu" 
              role="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <>
                    <path d="M3 12H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] md:top-[65px] bg-[#080808]/95 backdrop-blur-xl z-[99] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col items-center justify-center h-full gap-y-8 pb-32">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-2xl font-bold uppercase tracking-[0.2em] transition-all hover:text-primary"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Book a free call
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
