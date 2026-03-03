"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const RecentProjects = () => {
  const projects = [
    {
      title: "Real Estate Voice Agent",
      description: "Implemented a custom AI calling agent for a major real estate firm that handles inbound inquiries, qualifies leads, and books showings 24/7.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073",
      tag: "AI Calling Agent"
    },
    {
      title: "E-commerce Support Bot",
      description: "Developed an intelligent chatbot ecosystem that handles customer queries, processes returns, and recommends products, reducing human support tickets by 85%.",
      image: "https://images.unsplash.com/photo-1556742049-63456d708f12?q=80&w=2070",
      tag: "Intelligent Chatbot"
    },
    {
      title: "Automated Lead Funnel",
      description: "Created an end-to-end lead capture and nurturing pipeline that identifies high-intent prospects and schedules discovery calls automatically.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      tag: "Workflow Automation"
    }
  ];

  return (
    <section id="work" className="bg-gradient-purple section-spacing text-white overflow-hidden section-pattern">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto max-w-[1280px] px-6 relative z-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left mb-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-sm font-bold tracking-widest uppercase">
            Case Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            Our Recent <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-lg leading-relaxed text-white/60 max-w-2xl">
            Explore how we've helped businesses achieve 10x ROI through bespoke AI agents and intelligent workflow transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full glass-card overflow-hidden transition-all duration-500 hover:border-primary/30"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-primary">
                    {project.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow items-center text-center md:items-start md:text-left">
                <h3 className="text-2xl font-bold leading-tight mb-4 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-base leading-relaxed text-white/60">
                  {project.description}
                </p>
                <div className="mt-8 pt-6 border-t border-white/5 w-full">
                  <a href="#contact" className="text-primary text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                    View Project Details →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
