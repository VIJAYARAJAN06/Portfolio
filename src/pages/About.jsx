import React from 'react';
import { Sparkles, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo, experienceData, educationData } from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function About() {
  return (
    <PageLayout>
      {/* HEADER HERO */}
      <section className="py-16 bg-[#090909] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4">
          <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— BIOGRAPHY & EXPERIENCE</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white leading-tight">
            ABOUT VIJAYARAJAN A
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl">
            Passionate Embedded Systems & IoT Engineer specializing in low-level firmware architecture, microcontrollers, and wireless hardware design.
          </p>
        </div>
      </section>

      {/* DETAILED BIO */}
      <section className="py-20 bg-[#F5F3EF] text-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-[#090909]">
              {personalInfo.aboutTitle}
            </h2>
            <div className="p-6 rounded-2xl bg-white border border-slate-300 space-y-3 font-mono text-xs shadow-md">
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">Degree & Batch</span>
                <span className="font-bold text-[#090909]">{personalInfo.batch}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">Academic CGPA</span>
                <span className="font-bold text-[#C51F1F]">{personalInfo.cgpa}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">GATE EC Status</span>
                <span className="font-bold text-[#090909]">{personalInfo.gateStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-bold text-[#090909]">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            <p>{personalInfo.aboutParagraph1}</p>
            <p>{personalInfo.aboutParagraph2}</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section className="py-20 bg-[#090909] text-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] font-bold uppercase tracking-widest">CAREER PATHWAY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans">WORK EXPERIENCE</h2>
          </div>

          <div className="space-y-8">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="bento-card-editorial p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#C51F1F]" />
                      <span>{exp.role}</span>
                    </h3>
                    <div className="text-xs font-mono text-[#C51F1F] font-extrabold mt-1">{exp.company}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-mono text-xs w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C51F1F] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
