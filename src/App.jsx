import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Cpu, Briefcase, GraduationCap, MapPin, Mail, Sparkles, 
  ChevronRight, ArrowUpRight, CheckCircle2, FileText, X, Eye, Loader2, ArrowRight
} from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { 
  personalInfo, heroKeywords, domains, technicalToolkit, selectedProjects, 
  experienceData, educationData, achievementsData, engineeringInterests, toolsMarquee,
  gateAchievement, nptelCertificates
} from './data/portfolioData';

// Framer motion scroll animation variants
const fadeInUp = {
  hidden: { opacity: 1, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const formRef = useRef();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    try {
      if (serviceId !== 'YOUR_SERVICE_ID' && publicKey !== 'YOUR_PUBLIC_KEY') {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setContactSubmitted(true);
      } else {
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") || formData.get("name");
        const email = formData.get("user_email") || formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        
        const mailtoLink = `mailto:vijayrajan2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        setContactSubmitted(true);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSendError("Failed to send automatically. Opening your email app...");
      setTimeout(() => {
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") || formData.get("name");
        const email = formData.get("user_email") || formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        window.location.href = `mailto:vijayrajan2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      }, 1500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#090909] text-[#F5F3EF] min-h-screen font-sans selection:bg-[#C51F1F] selection:text-white">
      
      {/* STICKY HEADER */}
      <Navbar />

      {/* ==================================================================== */}
      {/* 1. HERO SECTION                                                      */}
      {/* ==================================================================== */}
      <div className="p-3 sm:p-6 lg:p-8">
        <section id="home" className="hero-editorial-panel min-h-[90vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative rounded-3xl overflow-hidden border border-[#C51F1F]/30 shadow-2xl">
          
          <div className="absolute inset-0 hero-grain-overlay opacity-30 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 opacity-10 pointer-events-none font-mono text-xs font-extrabold text-[#C51F1F] select-none p-12">
            {heroKeywords.map((kw, i) => (
              <span key={i} className="tracking-widest">{kw}</span>
            ))}
          </div>

          <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-xl lg:text-2xl font-mono text-white font-extrabold uppercase tracking-[0.25em] mb-3 py-1 px-4 rounded-full bg-[#C51F1F]/20 border border-[#C51F1F]/60 shadow-[0_0_20px_rgba(197,31,31,0.3)] inline-block"
            >
              ELECTRONICS & COMMUNICATION
            </motion.div>

            <div className="relative w-full flex justify-center items-center my-4 min-h-[240px] sm:min-h-[360px] lg:min-h-[440px]">
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
                className="absolute z-10 w-48 sm:w-64 lg:w-80 h-60 sm:h-80 lg:h-[380px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bottom-[-10%]"
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

          <div className="relative z-20 pt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
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
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 rounded-2xl bg-[#C51F1F] text-white font-extrabold hover:bg-[#a01818] transition-all shadow-lg flex items-center gap-2"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-2xl bg-white text-black font-extrabold hover:bg-[#F5F3EF] transition-all shadow-lg flex items-center gap-2"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================================== */}
      {/* 2. ABOUT ME SECTION                                                  */}
      {/* ==================================================================== */}
      <section 
        id="about" 
        className="py-24 bg-[#F5F3EF] text-[#090909]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— ABOUT ME</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-[#090909] leading-tight">
                {personalInfo.aboutTitle}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
              <p>{personalInfo.aboutParagraph1}</p>
              <p>{personalInfo.aboutParagraph2}</p>
              
              <div className="pt-6 border-t border-slate-300 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
                <div>
                  <div className="text-slate-500">Degree & Batch</div>
                  <div className="font-bold text-[#090909] mt-0.5">{personalInfo.batch}</div>
                </div>
                <div>
                  <div className="text-slate-500">Academic CGPA</div>
                  <div className="font-bold text-[#C51F1F] mt-0.5">{personalInfo.cgpa}</div>
                </div>
                <div>
                  <div className="text-slate-500">GATE EC Status</div>
                  <div className="font-bold text-[#090909] mt-0.5">{personalInfo.gateStatus}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. ENGINEERING DOMAINS (WHAT I BUILD)                                  */}
      {/* ==================================================================== */}
      <section id="domains" className="py-24 bg-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">ENGINEERING CORE</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">WHAT I BUILD</h2>
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

      {/* ==================================================================== */}
      {/* 4. TECHNICAL SKILLS                                                  */}
      {/* ==================================================================== */}
      <section id="skills" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">TECHNICAL STACK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">TECHNICAL SKILLS & HARDWARE</h2>
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

      {/* ==================================================================== */}
      {/* 5. FEATURED PROJECTS                                                 */}
      {/* ==================================================================== */}
      <section id="projects" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">SELECTED WORK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">FEATURED PROJECTS</h2>
          </div>

          <div className="space-y-12">
            {selectedProjects.map((project) => (
              <div 
                key={project.id} 
                className="bento-card-editorial p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="text-2xl font-mono text-[#C51F1F] font-extrabold">{project.number}</div>
                  <h3 className="text-3xl font-extrabold text-white font-sans group-hover:text-[#C51F1F] transition-colors">
                    {project.title}
                  </h3>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. WORK EXPERIENCE TIMELINE                                          */}
      {/* ==================================================================== */}
      <section id="experience" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] font-bold uppercase tracking-widest">CAREER PATHWAY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-white">WORK EXPERIENCE</h2>
          </div>

          <div className="space-y-8">
            {experienceData.map((exp, idx) => (
              <div 
                key={idx} 
                className="bento-card-editorial p-8 space-y-4"
              >
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

      {/* ==================================================================== */}
      {/* 7. CREDENTIALS & CERTIFICATIONS                                       */}
      {/* ==================================================================== */}
      <section id="certifications" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
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

          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] font-bold uppercase tracking-widest">OFFICIAL CERTIFICATIONS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-white">NPTEL COURSE CREDENTIALS</h2>
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

      {/* ==================================================================== */}
      {/* 8. MARQUEE & INTERESTS                                                */}
      {/* ==================================================================== */}
      <section className="py-20 bg-[#260606] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8 text-center">
          <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">ENGINEERING COMPETENCIES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans">CURRENTLY EXPLORING</h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-4">
            {engineeringInterests.map((interest, idx) => (
              <span key={idx} className="px-5 py-2.5 rounded-full bg-black/60 border border-white/20 font-mono text-xs sm:text-sm font-bold tracking-wider hover:border-[#C51F1F] transition-all">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 py-4 bg-black/80 border-y border-white/10 overflow-hidden">
          <div className="animate-marquee font-mono text-xs font-bold text-slate-300 space-x-12 uppercase tracking-widest">
            {toolsMarquee.concat(toolsMarquee).map((tool, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span>{tool}</span>
                <span className="text-[#C51F1F]">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. CONTACT SECTION                                                   */}
      {/* ==================================================================== */}
      <section 
        id="contact" 
        className="py-24 bg-[#090909]"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">GET IN TOUCH</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">HAVE A PROJECT OR OPPORTUNITY?</h2>
          </div>

          <div className="bento-card-editorial p-8 sm:p-12">
            {contactSubmitted ? (
              <div className="py-12 text-center font-mono space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#C51F1F] mx-auto" />
                <h3 className="text-2xl font-bold text-white">MESSAGE SENT SUCCESSFULLY</h3>
                <p className="text-xs text-slate-400">Thank you! Your message has been sent directly to vijayrajan2006@gmail.com.</p>
                <button onClick={() => setContactSubmitted(false)} className="mt-4 px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-6 font-sans text-xs sm:text-sm">
                {sendError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 font-mono text-xs text-center">
                    {sendError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-slate-300 mb-2 font-bold">Name</label>
                    <input required name="user_name" type="text" placeholder="Your Name" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                  </div>
                  <div>
                    <label className="block font-mono text-slate-300 mb-2 font-bold">Email</label>
                    <input required name="user_email" type="email" placeholder="your.email@domain.com" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-2 font-bold">Subject</label>
                  <input required name="subject" type="text" placeholder="Opportunity / Project Discussion" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-2 font-bold">Message</label>
                  <textarea required name="message" rows={5} placeholder="Write your message..." className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F] resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-2xl bg-[#C51F1F] text-white font-extrabold font-mono text-sm hover:bg-[#a01818] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* POPUP MODALS */}
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

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
