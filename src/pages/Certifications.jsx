import React, { useState } from 'react';
import { GraduationCap, Award, Eye, X, CheckCircle2 } from 'lucide-react';
import { gateAchievement, nptelCertificates, educationData } from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function Certifications() {
  const [activeCertModal, setActiveCertModal] = useState(null);

  return (
    <PageLayout>
      {/* HEADER */}
      <section className="py-16 bg-[#090909] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4">
          <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— CREDENTIALS & ACADEMICS</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white leading-tight">
            EDUCATION & CERTIFICATIONS
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl">
            GATE EC 2026 Rank Credentials, NPTEL Certifications, and Academic Honors.
          </p>
        </div>
      </section>

      {/* GATE EXAM BANNER */}
      <section className="py-12 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="bento-card-editorial p-8 bg-gradient-to-r from-[#260606] to-[#090909] border-2 border-[#C51F1F]/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-md bg-[#C51F1F] text-white font-mono text-xs font-bold">
                NATIONAL RANKING EXAM
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">{gateAchievement.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">{gateAchievement.desc}</p>
            </div>
            <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="text-xs font-mono text-slate-400">Score & Percentile</div>
              <div className="text-2xl sm:text-3xl font-mono text-[#C51F1F] font-extrabold mt-1">{gateAchievement.score}</div>
              <div className="text-[11px] font-mono text-slate-300">{gateAchievement.percentile}</div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION DEGREES */}
      <section className="py-16 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] font-bold uppercase tracking-widest">ACADEMICS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white">DEGREES & BACKGROUND</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationData.map((edu, idx) => (
              <div key={idx} className="bento-card-editorial p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <GraduationCap className="w-6 h-6 text-[#C51F1F]" />
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{edu.degree}</h3>
                    <div className="text-xs font-mono text-[#C51F1F]">{edu.institution}</div>
                  </div>
                </div>
                <div className="flex justify-between font-mono text-xs text-slate-300">
                  <span>Year: <strong>{edu.year}</strong></span>
                  <span>CGPA / Grade: <strong className="text-[#C51F1F]">{edu.score}</strong></span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NPTEL CERTIFICATES */}
      <section className="py-16 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] font-bold uppercase tracking-widest">OFFICIAL CERTIFICATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-white">NPTEL COURSE CREDENTIALS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nptelCertificates.map((cert) => (
              <div key={cert.id} className="bento-card-editorial p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#C51F1F] font-bold">{cert.offeredBy}</span>
                    <span className="px-2 py-0.5 rounded bg-[#C51F1F]/20 text-[#C51F1F] font-mono text-[10px] font-bold">
                      Score: {cert.score}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans">{cert.title}</h3>
                  <div className="text-[11px] font-mono text-slate-400">Roll: {cert.rollNo}</div>
                </div>

                <button
                  onClick={() => setActiveCertModal(cert)}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-extrabold font-mono text-xs hover:bg-[#C51F1F] hover:text-white transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-4xl bg-[#141414] border border-[#C51F1F]/40 rounded-3xl p-6 space-y-6 max-h-[95vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#C51F1F] font-bold">NPTEL OFFICIAL CERTIFICATE</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{activeCertModal.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">{activeCertModal.offeredBy} • Roll No: {activeCertModal.rollNo}</p>
              </div>
              <button onClick={() => setActiveCertModal(null)} className="p-2.5 rounded-xl bg-black text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white p-2">
              <img
                src={activeCertModal.image}
                alt={activeCertModal.title}
                className="w-full h-auto object-contain max-h-[70vh] mx-auto rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center pt-2 font-mono text-xs">
              <span className="text-slate-400">Score: <strong className="text-[#C51F1F] font-bold">{activeCertModal.score}</strong></span>
              <button onClick={() => setActiveCertModal(null)} className="px-6 py-2.5 rounded-xl bg-white text-black font-bold">
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
