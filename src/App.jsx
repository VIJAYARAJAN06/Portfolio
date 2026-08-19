import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Cpu, Zap, Code, Layers, Radio, Award, GraduationCap, 
  MapPin, Mail, Phone, Github, Linkedin, ExternalLink, ArrowRight, 
  CheckCircle2, Download, ShieldCheck, Activity, Menu, X, FileText, Send,
  ArrowUpRight, ArrowDown, Sparkles, Sliders, ChevronRight, Loader2, Eye
} from 'lucide-react';
import { 
  personalInfo, heroKeywords, domains, technicalToolkit, selectedProjects, 
  experienceData, educationData, achievementsData, engineeringInterests, toolsMarquee,
  gateAchievement, nptelCertificates
} from './data/portfolioData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const formRef = useRef();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#090909] text-[#F5F3EF] min-h-screen font-sans selection:bg-[#C51F1F] selection:text-white">
      
      {/* ==================================================================== */}
      {/* MAIN HERO CONTAINER (BURGUNDY EDITORIAL DESIGN)                       */}
      {/* ==================================================================== */}
      <div className="p-3 sm:p-6 lg:p-8">
        <section id="home" className="hero-editorial-panel min-h-[92vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
          
          {/* Subtle Grain & Faint Circuit Background Overlay */}
          <div className="absolute inset-0 hero-grain-overlay opacity-30 pointer-events-none" />
          
          {/* Faint Keyword Trace Matrix Behind Portrait */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 opacity-10 pointer-events-none font-mono text-xs font-extrabold text-[#C51F1F] select-none p-12">
            {heroKeywords.map((kw, i) => (
              <span key={i} className="tracking-widest">{kw}</span>
            ))}
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* FLOATING NAVIGATION BAR INSIDE HERO                                */}
          {/* ------------------------------------------------------------------ */}
          <nav className="flex items-center justify-between relative z-30 pb-6">
            
            {/* Left: Brand Monogram & Name */}
            <div className="flex items-center gap-3">
              <img
                src="/profile.jpg"
                alt="VIJAYARAJAN A"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#C51F1F]/60 shadow-md"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white font-sans tracking-tight">
                  {personalInfo.name}
                </div>
                <div className="text-[10px] font-mono text-[#C51F1F] font-bold uppercase tracking-wider">
                  EMBEDDED & IoT ENGINEER
                </div>
              </div>
            </div>

            {/* Center/Right Desktop Links */}
            <div className="hidden md:flex items-center gap-6 font-mono text-xs font-medium text-slate-300">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`transition-colors hover:text-white ${
                    activeTab === link.id ? 'text-[#C51F1F] font-bold border-b border-[#C51F1F]' : ''
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold font-mono text-xs hover:bg-[#F5F3EF] transition-all shadow-lg flex items-center gap-1.5"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-black/60 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-6 right-6 z-40 bg-[#260606] border border-[#C51F1F]/40 rounded-2xl p-6 space-y-3 font-mono text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full text-left py-2 text-slate-200 hover:text-[#C51F1F] font-bold"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full mt-4 py-3 rounded-xl bg-white text-black font-extrabold text-center block"
              >
                Let's Talk ↗
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* OVERSIZED TYPOGRAPHY & CENTER PORTRAIT                             */}
          {/* ------------------------------------------------------------------ */}
          <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center my-auto py-8">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-xl lg:text-2xl font-mono text-white font-extrabold uppercase tracking-[0.25em] mb-3 py-1 px-4 rounded-full bg-[#C51F1F]/20 border border-[#C51F1F]/60 shadow-[0_0_20px_rgba(197,31,31,0.3)] inline-block"
            >
              ELECTRONICS & COMMUNICATION
            </motion.div>

            {/* OVERSIZED "ENGINEER" TEXT WITH CENTER PORTRAIT OVERLAY */}
            <div className="relative w-full flex justify-center items-center my-4 min-h-[240px] sm:min-h-[360px] lg:min-h-[440px]">
              
              {/* Huge Background Text "ENGINEER" (Fully Readable) */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[17vw] sm:text-[15vw] lg:text-[13vw] font-extrabold text-white leading-none tracking-tight font-sans select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-0"
              >
                ENGINEER
              </motion.h1>

              {/* Centered Real User Suit Portrait Image inside Rounded Card Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute z-10 w-48 sm:w-64 lg:w-80 h-60 sm:h-80 lg:h-[380px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bottom-[-10%]"
              >
                <img
                  src="/profile.jpg"
                  alt="VIJAYARAJAN A Real Portrait"
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
                {/* Soft Bottom Fade Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80 pointer-events-none" />
              </motion.div>

            </div>

          </div>

          {/* ------------------------------------------------------------------ */}
          {/* HERO BOTTOM CONTENT & BUTTONS                                      */}
          {/* ------------------------------------------------------------------ */}
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
              <a
                href={personalInfo.vercelUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white text-black font-extrabold hover:bg-[#F5F3EF] transition-all shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C51F1F]" />
                <span>Live Vercel Site</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#C51F1F] text-white font-extrabold hover:bg-[#a01818] transition-all shadow-lg flex items-center gap-2"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="px-6 py-3.5 rounded-2xl bg-black/80 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <span>Email Me</span>
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

        </section>
      </div>

      {/* ==================================================================== */}
      {/* ABOUT ME SECTION                                                     */}
      {/* ==================================================================== */}
      <section id="about" className="py-24 bg-[#F5F3EF] text-[#090909]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">
                  — ABOUT ME
                </span>
                <a
                  href={personalInfo.vercelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-full bg-[#C51F1F]/10 text-[#C51F1F] font-mono text-[11px] font-bold border border-[#C51F1F]/30 hover:bg-[#C51F1F] hover:text-white transition-all inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Vercel Live App ↗</span>
                </a>
              </div>
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
      {/* ENGINEERING DOMAINS (WHAT I BUILD)                                  */}
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
      {/* TECHNICAL SKILLS                                                     */}
      {/* ==================================================================== */}
      <section id="skills" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">TECHNICAL STACK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">TECHNICAL SKILLS</h2>
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
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-black border border-white/10 text-slate-200 font-mono text-xs font-semibold">
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
      {/* FEATURED PROJECTS                                                    */}
      {/* ==================================================================== */}
      <section id="projects" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">SELECTED WORK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">FEATURED PROJECTS</h2>
          </div>

          <div className="space-y-12">
            {selectedProjects.map((project) => (
              <div key={project.id} className="bento-card-editorial p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
                
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
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* CASE STUDY MODAL                                                     */}
      {/* ==================================================================== */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-4xl bg-[#141414] border border-[#C51F1F]/40 rounded-3xl p-6 sm:p-10 space-y-8 max-h-[90vh] overflow-y-auto font-sans">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-[#C51F1F] font-bold">{activeCaseStudy.number} • CASE STUDY</span>
                <h3 className="text-3xl font-extrabold text-white mt-1">{activeCaseStudy.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">{activeCaseStudy.subtitle}</p>
              </div>
              <button onClick={() => setActiveCaseStudy(null)} className="p-2.5 rounded-xl bg-black text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[#C51F1F] font-bold block mb-1">REAL-WORLD PROBLEM:</span>
                  <p>{activeCaseStudy.caseStudy.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-white font-bold block mb-1">ENGINEERING OBJECTIVE:</span>
                  <p>{activeCaseStudy.caseStudy.objective}</p>
                </div>
                <div>
                  <span className="font-mono text-[#C51F1F] font-bold block mb-1">SYSTEM ARCHITECTURE:</span>
                  <p>{activeCaseStudy.caseStudy.architecture}</p>
                </div>
                <div>
                  <span className="font-mono text-white font-bold block mb-1">ALGORITHM & LOGIC:</span>
                  <p>{activeCaseStudy.caseStudy.algorithm}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[#C51F1F] font-bold block mb-1">HARDWARE COMPONENTS:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeCaseStudy.caseStudy.hardware.map((h, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-[#260606] text-white font-mono text-[11px] border border-[#C51F1F]/30">{h}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-white font-bold block mb-1">MEASURABLE RESULTS:</span>
                  <p className="text-white font-bold">{activeCaseStudy.caseStudy.results}</p>
                </div>
                <div>
                  <span className="font-mono text-[#C51F1F] font-bold block mb-1">TECHNICAL CHALLENGES OVERCOME:</span>
                  <p>{activeCaseStudy.caseStudy.challenges}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 font-mono text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl bg-[#C51F1F] text-white font-extrabold hover:bg-[#a01818] transition-all flex items-center gap-2"
              >
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button onClick={() => setActiveCaseStudy(null)} className="px-6 py-3 rounded-2xl bg-white text-black font-bold">
                ← Back to Projects
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* INTERNSHIP EXPERIENCE TIMELINE                                        */}
      {/* ==================================================================== */}
      <section id="experience" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">WORK HISTORY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">INTERNSHIP EXPERIENCE</h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="bento-card-editorial p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="px-3 py-0.5 rounded-full bg-[#C51F1F]/20 text-[#C51F1F] font-mono text-xs font-bold uppercase">
                      {exp.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-sans mt-2">{exp.role}</h3>
                    <p className="text-slate-300 font-mono text-sm font-bold">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">{exp.duration}</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-[#C51F1F] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-[#260606] text-slate-300 font-mono text-[11px] border border-[#C51F1F]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* EDUCATION SECTION                                                    */}
      {/* ==================================================================== */}
      <section id="education" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">ACADEMIC BACKGROUND</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">EDUCATION</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {educationData.map((edu, idx) => (
              <div key={idx} className="bento-card-editorial p-8 space-y-4">
                <GraduationCap className="w-10 h-10 text-[#C51F1F]" />
                <h3 className="text-xl font-bold text-white font-sans">{edu.degree}</h3>
                <p className="text-xs font-mono text-slate-300 font-bold">{edu.institution}</p>
                <p className="text-xs font-mono text-slate-400">{edu.duration} • {edu.status}</p>
                
                <div className="pt-4 border-t border-white/10 font-mono text-xs text-[#C51F1F] font-bold">
                  {edu.score}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* CERTIFICATIONS & GATE EC HIGHLIGHTS                                  */}
      {/* ==================================================================== */}
      <section id="certifications" className="py-24 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#C51F1F] uppercase font-bold tracking-widest">CREDENTIALS & ACCOMPLISHMENTS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">GATE & NPTEL CERTIFICATIONS</h2>
          </div>

          {/* DEDICATED GATE EC QUALIFIED HIGHLIGHT BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3A0909] via-[#260606] to-[#090909] border-2 border-[#C51F1F] p-8 sm:p-10 shadow-[0_0_50px_rgba(197,31,31,0.25)] flex flex-col md:flex-row items-center justify-between gap-8 group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C51F1F]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C51F1F]/20 transition-all" />

            <div className="space-y-4 max-w-2xl relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C51F1F] text-white font-mono text-xs font-extrabold uppercase tracking-widest shadow-lg animate-pulse">
                <Award className="w-4 h-4 text-amber-300" />
                <span>{gateAchievement.badge}</span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                {gateAchievement.title}
              </h3>
              
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {gateAchievement.desc}
              </p>
            </div>

            <div className="relative z-10 shrink-0 text-center md:text-right font-mono bg-black/60 p-6 rounded-2xl border border-white/10 space-y-1 backdrop-blur-md">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Qualified Year</div>
              <div className="text-4xl font-extrabold text-[#C51F1F] tracking-tight">{gateAchievement.year}</div>
              <div className="text-[11px] text-slate-300 font-semibold pt-1">EC (Electronics & Communication)</div>
            </div>
          </motion.div>

          {/* NPTEL INDIVIDUAL CERTIFICATES CAROUSEL / CARDS WITH POPUP MODAL */}
          <div className="space-y-6">
            <h3 className="text-xl font-mono text-white font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C51F1F]" />
              <span>NPTEL Online Certifications (IIT & IIIT Courses)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nptelCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bento-card-editorial p-6 flex flex-col justify-between space-y-4 border border-white/10 hover:border-[#C51F1F]/60 group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <span className="px-3 py-1 rounded-full bg-[#C51F1F]/20 text-[#C51F1F] font-mono text-xs font-bold border border-[#C51F1F]/30">
                        {cert.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-bold">{cert.period}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white font-sans leading-snug group-hover:text-[#C51F1F] transition-colors">
                      {cert.title}
                    </h4>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                      <div><span className="text-slate-500">Offered By:</span> <strong className="text-white">{cert.offeredBy}</strong></div>
                      <div><span className="text-slate-500">Score:</span> <strong className="text-[#C51F1F] font-extrabold">{cert.score}</strong></div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {cert.tags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded bg-black text-slate-300 font-mono text-[11px] border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Click to View Certificate Button */}
                  <button
                    onClick={() => setActiveCertModal(cert)}
                    className="w-full py-3 rounded-xl bg-white text-black font-extrabold font-mono text-xs hover:bg-[#C51F1F] hover:text-white transition-all flex items-center justify-center gap-2 shadow-md mt-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Official Certificate</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* OTHER HONORS AND ACTIVITIES */}
          <div className="space-y-6 pt-6 border-t border-white/5">
            <h3 className="text-xl font-mono text-white font-bold">Leadership & Technical Achievements</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievementsData.map((ach, idx) => (
                <div key={idx} className="bento-card-editorial p-6 space-y-2">
                  <Award className="w-8 h-8 text-[#C51F1F] mb-2" />
                  <span className="text-[11px] font-mono text-[#C51F1F] font-bold">{ach.year}</span>
                  <h4 className="font-bold text-white text-base font-sans">{ach.title}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* NPTEL CERTIFICATE POPUP MODAL */}
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

      {/* ==================================================================== */}
      {/* CURRENTLY EXPLORING & TOOLS MARQUEE                                  */}
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
      {/* CONTACT SECTION                                                      */}
      {/* ==================================================================== */}
      <section id="contact" className="py-24 bg-[#090909]">
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
                <p className="text-xs text-slate-400">Thank you! Your message has been sent directly to vijayrajan2006@gmail.com. I will get back to you shortly.</p>
                <button onClick={() => setContactSubmitted(false)} className="mt-4 px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={async (e) => {
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
                      // Fallback mailto if keys not yet set in .env
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
                    setSendError("Failed to send automatically. Opening your email app instead...");
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
                }}
                className="space-y-6 font-sans text-xs sm:text-sm"
              >
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-center">
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <div className="text-slate-400">Email</div>
              <a href={`mailto:${personalInfo.email}`} className="text-white font-bold block mt-1">{personalInfo.email}</a>
            </div>
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <div className="text-slate-400">Location</div>
              <div className="text-[#C51F1F] font-bold mt-1">{personalInfo.location}</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* FOOTER                                                               */}
      {/* ==================================================================== */}
      <footer className="py-12 bg-[#260606] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">
          <div>
            <div className="font-extrabold text-white text-sm">{personalInfo.name}</div>
            <div className="text-[11px] text-slate-300">{personalInfo.subtitle}</div>
          </div>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-white transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <div>
            © 2026 Vijayarajan A. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
