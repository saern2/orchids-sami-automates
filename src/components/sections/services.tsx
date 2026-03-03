"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  PhoneCall, 
  UserPlus, 
  Calendar, 
  Workflow, 
  Zap, 
  BrainCircuit, 
  ShieldCheck, 
  LineChart 
} from 'lucide-react';

const servicesData = [
  {
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that handle customer queries, qualify leads, and provide 24/7 support across all platforms.',
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
  },
  {
    title: 'AI Calling Agents',
    description: 'Autonomous voice systems capable of making and receiving calls, handling appointments, and conducting follow-ups with human-like naturality.',
    icon: <PhoneCall className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'Lead Capture Systems',
    description: 'End-to-end automation for identifying, capturing, and nurturing leads directly into your CRM without human intervention.',
    icon: <UserPlus className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Appointment Booking',
    description: 'Automated scheduling systems that sync with your team\'s calendar to book meetings and consultations around the clock.',
    icon: <Calendar className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Custom AI Workflows',
    description: 'Bespoke automation blueprints tailored to your specific business logic, connecting all your favorite tools.',
    icon: <Workflow className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'Rapid Deployment',
    description: 'Get your AI infrastructure up and running in record time. Most systems deployed in under 24 hours.',
    icon: <Zap className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Intelligent Adaptation',
    description: 'AI agents that learn from every interaction, constantly improving their performance and accuracy for your business.',
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Secure Data Pipelines',
    description: 'Enterprise-grade security ensuring all customer interactions and business data remain private and protected.',
    icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'ROI Analytics',
    description: 'Real-time dashboards demonstrating the performance and efficiency gains achieved through your automated systems.',
    icon: <LineChart className="w-8 h-8 text-accent" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-gradient-purple section-spacing relative overflow-hidden section-pattern">
        <div className="container mx-auto px-6">
          <div className="text-center md:text-left mb-20 max-w-3xl mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              Our <span className="text-gradient">Core Capabilities</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Sami Automates provides the tools you need to dominate your industry. We don't just build scripts; we design intelligent systems that think, adapt, and scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative glass-card p-10 flex flex-col items-center text-center md:items-start md:text-left transition-all duration-500 hover:border-primary/50"
              >
              <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
