"use client";

import React, { useState } from "react";
import { User, Mail, MessageSquare, Zap, Loader2, CheckCircle2, Phone } from "lucide-react";

const ContactFormSection = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://n8n.srv861058.hstgr.cloud/webhook/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-gradient-cyan section-spacing border-t border-white/5 section-pattern">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto max-w-[1280px] px-6 relative z-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Left Side: Content & Form */}
          <div className="relative z-10 w-full lg:w-1/2">
            <div className="mb-12">
               <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-bold tracking-widest uppercase">
                Collaboration
              </div>
              <h2 className="mb-6 font-display text-[48px] md:text-[64px] font-extrabold tracking-tighter text-white leading-none">
                Design Your <br /><span className="text-gradient">Autonomy</span>
              </h2>
              <p className="font-sans text-[18px] md:text-[20px] leading-[1.6] text-[#A1A1AA] max-w-[500px]">
                Discover the power of a custom AI workflow that puts you 10x ahead. Talk directly with our automation architects.
              </p>
            </div>

            {status === "success" ? (
              <div className="bg-white/[0.03] border border-primary/20 rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Received!</h3>
                <p className="text-[#A1A1AA] mb-8">
                  Our architects are reviewing your request. We'll be in touch within 24 hours to schedule your strategy session.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6" 
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-[#A1A1AA] uppercase" htmlFor="name">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-[#A1A1AA] group-focus-within:text-primary transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sami Automates"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-[#A1A1AA] uppercase" htmlFor="email">Work Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-[#A1A1AA] group-focus-within:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hi@enterprise.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black tracking-widest text-[#A1A1AA] uppercase" htmlFor="phone">Phone Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center text-[#A1A1AA] group-focus-within:text-primary transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black tracking-widest text-[#A1A1AA] uppercase" htmlFor="message">Message</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-4 text-[#A1A1AA] group-focus-within:text-primary transition-colors">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the complex processes you want to automate..."
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="md:col-span-2 text-red-400 text-sm font-bold bg-red-400/10 py-3 px-4 rounded-xl border border-red-400/20">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative w-full h-16 rounded-full bg-primary overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(124,58,237,0.4)] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 text-white font-black text-xl tracking-tight flex items-center justify-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Book Call With Architects"
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side: High Tech Graphic */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
               {/* Animated rings */}
               <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse" />
               <div className="absolute inset-[15%] border border-secondary/20 rounded-full animate-pulse delay-75" />
               
               {/* Core Visual */}
               <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,transparent_70%)]" />
               
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-16 rounded-[60px] bg-black border border-white/10 shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-700">
                     <Zap className="w-24 h-24 text-primary fill-primary/20" />
                     <div className="mt-8 space-y-4">
                        <div className="h-2 w-32 bg-primary/20 rounded-full" />
                        <div className="h-2 w-48 bg-secondary/20 rounded-full" />
                        <div className="h-2 w-40 bg-accent/20 rounded-full" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
