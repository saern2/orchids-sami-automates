import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, MessageCircle } from 'lucide-react';
import type { ContactSetting } from '@/lib/types';

const Footer = ({ contact }: { contact: ContactSetting | null }) => {
  const socialLinks = [
    { Icon: Twitter, href: "https://x.com/MemonSamiullah4" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/samiullahmemon-956393209" },
    { Icon: MessageCircle, href: "https://wa.me/923103011955" }
  ];

  return (
    <footer className="w-full bg-black text-[#A1A1AA] pt-[120px] pb-[60px] border-t border-white/5 font-sans">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 lg:col-span-1">
                <div className="flex items-center gap-3 mb-8">
                  <Image
                    src="/logo.png"
                    alt="Sami Automates"
                    width={792}
                    height={285}
                    className="h-32 w-auto object-contain"
                  />
                </div>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[300px]">
              AI calling agents and automations for businesses that cannot afford to miss a call.
            </p>
            <div className="flex items-center gap-4">
               {socialLinks.map(({ Icon, href }, i) => (
                 <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Services', href: '#services' },
                { label: 'Work', href: '#portfolio' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[15px] font-medium hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">What we build</h4>
            <ul className="space-y-4">
              {['AI calling agents', 'Appointment booking', 'Lead follow-up', 'Chatbots', 'n8n workflows'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-[15px] font-medium hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
            <div className="space-y-6">
                 <div>
                    <div className="text-white font-bold text-sm mb-1">Contact</div>
                    {contact?.email && (
                      <a href={`mailto:${contact.email}`} className="text-[14px] hover:text-white transition-colors">{contact.email}</a>
                    )}
                 </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 opacity-50">
          <div className="text-[13px] font-bold tracking-tight mb-4 md:mb-0">
            © {new Date().getFullYear()} Sami Automates
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
