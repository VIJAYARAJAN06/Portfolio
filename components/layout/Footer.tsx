"use client";

import { motion } from "framer-motion";
import { personal } from "@/lib/data/portfolio";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const TECH_STACK = ["Next.js 15", "React 19", "TypeScript", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS"];

export default function Footer() {
  const year = new Date().getFullYear();

  const scroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-800/60 bg-space-950">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulseGlow ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg border-2 border-cyan-400 flex items-center justify-center">
                <span className="font-mono font-bold text-cyan-400 text-sm">VJ</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Vijayarajan A</div>
                <div className="font-mono text-[10px] text-cyan-400/60 tracking-wider">EMBEDDED ENGINEER</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Building intelligent hardware for the physical world.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400">Available for hire</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scroll(link.href)}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-mono"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              {[
                { label: "GitHub", href: personal.github },
                { label: "LinkedIn", href: personal.linkedin },
                { label: "Email", href: `mailto:${personal.email}` },
                { label: "Resume", href: personal.resume },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-mono flex items-center gap-1"
                  >
                    {link.label} <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Built With</h4>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-space-800 border border-slate-700 text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>
            © {year} Vijayarajan A · All rights reserved
          </div>
          <div className="flex items-center gap-4">
            <span>v1.0.0</span>
            <span>·</span>
            <span>Made with ❤️ + ⚡</span>
            <span>·</span>
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
