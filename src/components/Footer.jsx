import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="py-12 bg-[#260606] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">
        <div>
          <div className="font-extrabold text-white text-sm">{personalInfo.name}</div>
          <div className="text-[11px] text-slate-300">{personalInfo.subtitle}</div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {footerLinks.map((link) => (
            <Link key={link.path} to={link.path} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="text-center md:text-right">
          © {new Date().getFullYear()} Vijayarajan A. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
