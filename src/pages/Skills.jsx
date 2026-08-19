import React from 'react';
import { Cpu, Zap } from 'lucide-react';
import { domains, technicalToolkit, engineeringInterests } from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function Skills() {
  return (
    <PageLayout>
      {/* HEADER */}
      <section className="py-16 bg-[#090909] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4">
          <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— HARDWARE & TECHNICAL MATRIX</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white leading-tight">
            TECHNICAL SKILLS & HARDWARE
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl">
            Comprehensive overview of embedded programming languages, protocols, hardware microcontrollers, and IoT cloud toolkits.
          </p>
        </div>
      </section>

      {/* CORE DOMAINS */}
      <section className="py-20 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">ENGINEERING CORE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">WHAT I BUILD</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {domains.map((dom, idx) => (
              <div key={idx} className="bento-card-editorial p-8 flex flex-col justify-between space-y-6 group">
                <div>
                  <div className="text-xs font-mono text-[#C51F1F] font-extrabold">{dom.number}</div>
                  <h3 className="text-2xl font-bold text-white font-sans mt-2 group-hover:text-[#C51F1F] transition-colors">
                    {dom.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed mt-4">
                    {dom.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {dom.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-lg bg-[#260606] text-white font-mono text-[11px] font-medium border border-[#C51F1F]/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL TOOLKIT GRID */}
      <section className="py-20 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">CATEGORIZED TOOLKIT</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">HARDWARE & FIRMWARE STACK</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalToolkit.map((tool, idx) => (
              <div key={idx} className="bento-card-editorial p-7 space-y-4">
                <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2 border-b border-white/10 pb-3">
                  <Cpu className="w-5 h-5 text-[#C51F1F]" />
                  <span>{tool.category}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-black border border-white/10 text-slate-200 font-mono text-xs font-semibold hover:border-[#C51F1F] transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING COMPETENCIES */}
      <section className="py-16 bg-[#260606] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">SPECIALIZED TOPICS</span>
          <h2 className="text-3xl font-extrabold font-sans">CURRENTLY EXPLORING & ADVANCING</h2>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {engineeringInterests.map((interest, idx) => (
              <span key={idx} className="px-5 py-2.5 rounded-full bg-black/60 border border-white/20 font-mono text-xs font-bold tracking-wider hover:border-[#C51F1F] transition-all">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
