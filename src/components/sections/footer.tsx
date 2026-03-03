import React from 'react';
import { Linkedin, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
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
                  <img 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sami-automates-logo-1-1766487732151.png?width=8000&height=8000&resize=contain" 
                    alt="Sami Automates" 
                    className="h-32 w-auto object-contain"
                  />
                </div>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[300px]">
              Premier AI Workflow Automation Agency achieving 10x efficiency gains through autonomous systems.
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
              {['Home', 'Services', 'Methodology', 'Recent Work', 'Pricing', 'Blog'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-[15px] font-medium hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Capabilities</h4>
            <ul className="space-y-4">
              {['End-to-End Autonomy', 'AI Agent Design', 'Parallel Systems', 'Workflow Integration', 'Intelligence Outputs'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-[15px] font-medium hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Headquarters</h4>
            <div className="space-y-6">
               <div>
                  <div className="text-white font-bold text-sm mb-1">Global HQ</div>
                  <p className="text-[14px]">Silicon Valley, CA<br />United States</p>
               </div>
                 <div>
                    <div className="text-white font-bold text-sm mb-1">Contact</div>
                    <p className="text-[14px]">samiautomates@gmail.com</p>
                 </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 opacity-50">
          <div className="text-[13px] font-bold tracking-tight mb-4 md:mb-0">
            © 2024 Sami Automates | Redefining Efficiency via Autonomy
          </div>
          <div className="flex gap-8 text-[13px] font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
