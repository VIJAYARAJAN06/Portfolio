import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowUpRight, Mail, Cpu, Layers, Award, ChevronRight 
} from 'lucide-react';
import { 
  personalInfo, heroKeywords, domains, selectedProjects, toolsMarquee, engineeringInterests 
} from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      {/* HERO CONTAINER */}
      <div className="p-3 sm:p-6 lg:p-8">
        <section className="hero-editorial-panel min-h-[85vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative rounded-3xl overflow-hidden border border-[#C51F1F]/30 shadow-2xl">
          
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 hero-grain-overlay opacity-30 pointer-events-none" />
          
          {/* Faint Keyword Trace Matrix */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 opacity-10 pointer-events-none font-mono text-xs font-extrabold text-[#C51F1F] select-none p-12">
            {heroKeywords.map((kw, i) => (
              <span key={i} className="tracking-widest">{kw}</span>
            ))}
          </div>

          {/* OVERSIZED TYPOGRAPHY & CENTER PORTRAIT */}
          <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm sm:text-lg lg:text-xl font-mono text-white font-extrabold uppercase tracking-[0.25em] mb-3 py-1.5 px-6 rounded-full bg-[#C51F1F]/20 border border-[#C51F1F]/60 shadow-[0_0_20px_rgba(197,31,31,0.3)] inline-block"
            >
              ELECTRONICS & COMMUNICATION
            </motion.div>

            {/* OVERSIZED "ENGINEER" TEXT WITH CENTER PORTRAIT OVERLAY */}
            <div className="relative w-full flex justify-center items-center my-4 min-h-[220px] sm:min-h-[320px] lg:min-h-[380px]">
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[17vw] sm:text-[15vw] lg:text-[13vw] font-extrabold text-white leading-none tracking-tight font-sans select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-0"
              >
                ENGINEER
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute z-10 w-44 sm:w-60 lg:w-72 h-56 sm:h-72 lg:h-[340px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bottom-[-8%]"
              >
                <img
                  src="/profile.jpg"
                  alt="VIJAYARAJAN A Portrait"
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80 pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* HERO BOTTOM CONTENT & BUTTONS */}
          <div className="relative z-20 pt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7 space-y-2">
              <div className="text-[11px] font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">
                {personalInfo.welcomeTag}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
                {personalInfo.summary}
              </p>
              <p className="text-xs font-mono text-white font-bold italic pt-1">
                "{personalInfo.tagline}"
              </p>
            </div>

            <div className="md:col-span-5 flex flex-wrap items-center md:justify-end gap-3 font-mono text-xs">
              <Link
                to="/projects"
                className="px-6 py-3.5 rounded-2xl bg-[#C51F1F] text-white font-extrabold hover:bg-[#a01818] transition-all shadow-lg flex items-center gap-2"
              >
                <span>View All Projects</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-2xl bg-white text-black font-extrabold hover:bg-[#F5F3EF] transition-all shadow-lg flex items-center gap-2"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* QUICK HIGHLIGHT CARDS SECTION */}
      <section className="py-16 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card-editorial p-6 space-y-3">
            <Cpu className="w-8 h-8 text-[#C51F1F]" />
            <h3 className="text-xl font-bold text-white">Hardware & Firmware</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specializing in ESP32, STM32, PIC16F, RTOS, FreeRTOS, and Custom PCB Circuit Architecture.
            </p>
            <Link to="/skills" className="inline-flex items-center gap-1 font-mono text-xs text-[#C51F1F] font-bold hover:underline pt-2">
              Explore Tech Stack →
            </Link>
          </div>

          <div className="bento-card-editorial p-6 space-y-3">
            <Layers className="w-8 h-8 text-[#C51F1F]" />
            <h3 className="text-xl font-bold text-white">Featured Projects</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Industrial IoT edge systems, Smart Grid monitoring, LoRa mesh node telemetry, and automated robotics.
            </p>
            <Link to="/projects" className="inline-flex items-center gap-1 font-mono text-xs text-[#C51F1F] font-bold hover:underline pt-2">
              See Case Studies →
            </Link>
          </div>

          <div className="bento-card-editorial p-6 space-y-3">
            <Award className="w-8 h-8 text-[#C51F1F]" />
            <h3 className="text-xl font-bold text-white">Credentials & GATE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              GATE EC 2026 Qualified, 8.42 CGPA, and NPTEL Gold & Elite Certifications in Embedded Systems.
            </p>
            <Link to="/certifications" className="inline-flex items-center gap-1 font-mono text-xs text-[#C51F1F] font-bold hover:underline pt-2">
              View Certificates →
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 bg-[#260606] text-white overflow-hidden border-y border-white/10">
        <div className="animate-marquee font-mono text-xs font-bold text-slate-300 space-x-12 uppercase tracking-widest">
          {toolsMarquee.concat(toolsMarquee).map((tool, i) => (
            <span key={i} className="inline-flex items-center gap-4">
              <span>{tool}</span>
              <span className="text-[#C51F1F]">◆</span>
            </span>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
