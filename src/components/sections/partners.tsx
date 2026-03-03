import React from 'react';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: 'OpenAI',
      logo: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
      width: 140,
      height: 60,
    },
    {
      name: 'AWS',
      logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
      width: 140,
      height: 60,
    },
    {
      name: 'GitHub',
      logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg',
      width: 140,
      height: 60,
    },
    {
      name: 'Google Cloud',
      logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg',
      width: 140,
      height: 60,
    },
    {
      name: 'Salesforce',
      logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
      width: 140,
      height: 60,
    },
    {
      name: 'Vercel',
      logo: 'https://cdn.worldvectorlogo.com/logos/vercel.svg',
      width: 140,
      height: 60,
    }
  ];

  return (
    <section className="py-[120px] bg-black flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
           <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-bold tracking-widest uppercase">
            Technology Stack
          </div>
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-center text-white tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
            Integrated with the <span className="text-gradient">Best</span>
          </h2>
        </div>

        {/* Logos Grid Container */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-[1200px] mx-auto">
          {partners.map((partner, i) => (
             <div key={i} className="group bg-[#050505] rounded-[32px] border border-white/5 flex items-center justify-center p-10 min-w-[200px] h-[120px] transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.02] grayscale hover:grayscale-0">
                <div className="text-2xl font-black text-white/40 group-hover:text-white transition-colors tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  {partner.name}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
