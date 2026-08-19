import React, { useState } from 'react';
import { ExternalLink, X, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { selectedProjects } from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  return (
    <PageLayout>
      {/* HEADER */}
      <section className="py-16 bg-[#090909] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4">
          <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— EMBEDDED & IOT PORTFOLIO</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white leading-tight">
            FEATURED PROJECTS & INNOVATIONS
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl">
            Detailed breakdown of real-world hardware design, firmware protocols, and IoT edge deployments.
          </p>
        </div>
      </section>

      {/* PROJECTS LIST */}
      <section className="py-20 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          {selectedProjects.map((project) => (
            <div key={project.id} className="bento-card-editorial p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-2xl font-mono text-[#C51F1F] font-extrabold">{project.number}</div>
                <h2 className="text-3xl font-extrabold text-white font-sans group-hover:text-[#C51F1F] transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs font-mono text-slate-400 font-bold">{project.subtitle}</p>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-lg bg-[#260606] text-white font-mono text-xs border border-[#C51F1F]/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveCaseStudy(project)}
                  className="px-6 py-3 rounded-2xl bg-white text-black font-extrabold font-mono text-xs hover:bg-[#C51F1F] hover:text-white transition-all shadow-md inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Full Case Study</span>
                </button>
              </div>

              <div className="lg:col-span-6">
                <div 
                  onClick={() => setActiveCaseStudy(project)}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141414] aspect-video cursor-pointer relative group/img"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                  <div className="absolute bottom-4 right-4 bg-black/80 border border-white/20 text-white font-mono text-[11px] px-3 py-1 rounded-lg">
                    Click to inspect →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-4xl bg-[#141414] border border-[#C51F1F]/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#C51F1F] font-bold">{activeCaseStudy.number} • CASE STUDY</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{activeCaseStudy.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">{activeCaseStudy.subtitle}</p>
              </div>
              <button onClick={() => setActiveCaseStudy(null)} className="p-2.5 rounded-xl bg-black text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="font-mono text-[#C51F1F] font-bold uppercase tracking-wider">Project Architecture & Details</h4>
              <p className="leading-relaxed">{activeCaseStudy.fullDetails.architecture}</p>

              <h4 className="font-mono text-[#C51F1F] font-bold uppercase tracking-wider pt-2">Key Technical Achievements</h4>
              <ul className="space-y-2 font-sans">
                {activeCaseStudy.fullDetails.keyMetrics.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C51F1F]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10 font-mono text-xs">
              <button onClick={() => setActiveCaseStudy(null)} className="px-6 py-2.5 rounded-xl bg-white text-black font-bold">
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
