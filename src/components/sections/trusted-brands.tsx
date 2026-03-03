import React from 'react';
import Image from 'next/image';

const TrustedBrands = () => {
  const logos = [
    { name: "TechCorp", color: "text-white/40" },
    { name: "InnovateAI", color: "text-primary/40" },
    { name: "FutureSystems", color: "text-secondary/40" },
    { name: "GlobalFlow", color: "text-white/40" },
    { name: "SmartLogic", color: "text-accent/40" },
    { name: "AutonomousInc", color: "text-white/40" },
  ];

  return (
    <section className="relative overflow-hidden bg-black/40 py-10 md:py-16 border-y border-white/10 section-pattern">
      <div className="container relative z-10 px-6 mx-auto">
            <div className="flex flex-col items-center">
                <p className="text-sm md:text-base font-black tracking-[0.4em] text-white uppercase mb-12 opacity-90">
                  Trusted by Innovative Enterprises Worldwide
                </p>

              <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12">

            {logos.map((logo, index) => (
              <div 
                key={index}
                className={`text-3xl md:text-4xl font-black tracking-tighter transition-all duration-500 hover:opacity-100 hover:scale-110 cursor-default opacity-60 ${logo.color.replace('/40', '/80')}`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
