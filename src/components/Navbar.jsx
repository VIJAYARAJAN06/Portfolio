import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#090909]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Brand Monogram & Name */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group text-left">
          <img
            src="/profile.jpg"
            alt={personalInfo.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#C51F1F]/70 shadow-md group-hover:scale-105 transition-transform"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <div className="font-extrabold text-sm sm:text-base text-white font-sans tracking-tight group-hover:text-[#C51F1F] transition-colors">
              {personalInfo.name}
            </div>
            <div className="text-[10px] font-mono text-[#C51F1F] font-bold uppercase tracking-wider">
              EMBEDDED & IoT ENGINEER
            </div>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 font-mono text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-[#C51F1F] text-white font-bold shadow-[0_0_12px_rgba(197,31,31,0.5)]'
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 rounded-full bg-white text-black font-extrabold font-mono text-xs hover:bg-[#C51F1F] hover:text-white transition-all shadow-lg flex items-center gap-1.5 group"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-black/60 border border-white/10 text-white hover:bg-[#C51F1F] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-[#170404] border border-[#C51F1F]/40 rounded-2xl p-5 space-y-2 font-mono text-xs shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`block w-full text-left py-2.5 px-4 rounded-xl font-bold transition-all ${
                activeSection === link.id
                  ? 'bg-[#C51F1F] text-white'
                  : 'text-slate-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-extrabold text-center block hover:bg-[#C51F1F] hover:text-white transition-colors"
          >
            Let's Talk ↗
          </button>
        </div>
      )}
    </header>
  );
}
