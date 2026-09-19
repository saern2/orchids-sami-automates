"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneCall, UserPlus, Calendar, Workflow, Zap } from 'lucide-react';

const servicesData = [
  {
    title: 'AI calling agents',
    description: 'Answers every inbound call, handles the usual questions and books the appointment while the caller is still on the line.',
    icon: <PhoneCall className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Follow-up calls',
    description: 'Calls back missed leads, confirms appointments and reminds no-shows, so nobody falls through the cracks.',
    icon: <Zap className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'Appointment booking',
    description: 'Books straight into Google Calendar, Calendly or your CRM and sends the confirmation to the customer.',
    icon: <Calendar className="w-8 h-8 text-accent" />,
  },
  {
    title: 'Lead capture and CRM sync',
    description: 'Every caller and form fill lands in your CRM with notes on what they asked for. No retyping.',
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Website and WhatsApp chatbots',
    description: 'Answers questions and takes bookings in chat, 24 hours a day, in the tone you would use yourself.',
    icon: <MessageSquare className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'Custom n8n workflows',
    description: 'Any repeated task between your tools, automated and monitored, from invoices to reminders.',
    icon: <Workflow className="w-8 h-8 text-accent" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-gradient-purple section-spacing relative overflow-hidden section-pattern">
        <div className="container mx-auto px-6">
          <div className="text-center md:text-left mb-20 max-w-3xl mx-auto md:mx-0">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
              What I <span className="text-gradient">build</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Only the pieces that get a customer from "calling" to "booked".
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
