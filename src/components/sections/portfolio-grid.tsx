"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, LayoutGrid, Zap, BarChart3 } from 'lucide-react';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const clientLabel = (project: Project) =>
  project.client_public && project.client_name ? project.client_name : "Private client";

const paragraphs = (body: string) => body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

const PortfolioCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_40px_80px_-20px_rgba(139,92,246,0.2)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
        {project.cover_url && (
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-6 left-6">
          <Badge className="bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
            {project.category}
          </Badge>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[4px]">
          <div className="bg-white text-black px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            See details <ArrowRight size={16} />
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-8 line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 2).map((tech, i) => (
              <span key={i} className="text-[9px] text-purple-400/60 font-black uppercase tracking-[0.1em]">
                {tech}
              </span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-300">
            <ArrowRight size={16} className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetailsModal = ({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] sm:max-w-[90vw] xl:max-w-7xl h-[100vh] sm:h-[90vh] overflow-hidden bg-[#050505] border-white/5 text-white p-0 shadow-2xl rounded-none sm:rounded-[48px] outline-none z-[10001]">
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="relative flex flex-col lg:flex-row h-full">
            <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-full bg-[#050505]">
              {project.cover_url && (
                <Image
                  src={project.cover_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#050505] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />

              <button
                onClick={onClose}
                className="absolute top-8 left-8 z-50 p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-purple-500 transition-all duration-300 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto">
              <div className="max-w-xl mx-auto lg:mx-0 space-y-16">
                <div className="space-y-6">
                  <Badge className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                    {project.category}
                  </Badge>
                  <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-white/40 text-xl font-medium tracking-tight">
                      {project.subtitle}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-12">
                  <section className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 flex items-center gap-3">
                      <Zap size={14} /> What was built
                    </h3>
                    {paragraphs(project.body).map((text, i) => (
                      <p key={i} className="text-xl md:text-2xl text-white/90 leading-snug font-medium">
                        {text}
                      </p>
                    ))}
                  </section>

                  <section className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 flex items-center gap-3">
                      <LayoutGrid size={14} /> What it does
                    </h3>
                    <div className="space-y-4">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all">
                          <CheckCircle2 size={18} className="text-purple-400 mt-1 shrink-0" />
                          <p className="text-white font-bold leading-tight">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 flex items-center gap-3">
                      <BarChart3 size={14} /> Results
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.results.map((item, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 flex flex-col justify-center">
                          <p className="text-white font-black text-2xl tracking-tighter">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="pt-12 border-t border-white/5 space-y-10">
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">The Client</h4>
                        <p className="text-xl font-black text-white">{clientLabel(project)}</p>
                        {project.use_case && (
                          <p className="text-white/40 text-xs font-medium">{project.use_case}</p>
                        )}
                      </div>
                      <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, i) => (
                            <span key={i} className="text-[9px] text-purple-400 font-bold uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-white hover:bg-gray-100 text-black h-20 font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
                      <a href="#contact" onClick={onClose}>Get something like this</a>
                    </Button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="bg-[#000000] py-32 md:py-48 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse" />
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">Recent work</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.8]"
            >
              Built and <br /> <span className="text-purple-500">shipped.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl text-white/40 font-medium leading-tight max-w-2xl"
            >
              Real systems for real businesses. Open any card to see what it does.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {projects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <ProjectDetailsModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
