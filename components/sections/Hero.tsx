"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
    </div>
  ),
});

const ROLES = [
  "Embedded Systems Engineer",
  "Firmware Developer",
  "IoT Architect",
  "Hardware Designer",
  "Edge AI Engineer",
];

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = texts[idx % texts.length];

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? 40 : 65);

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="text-cyan-400">
      {display}
      <span className="cursor-blink" />
    </span>
  );
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-space-950"
    >
      {/* 3D Canvas background */}
      <div className="canvas-wrapper">
        <HeroScene />
      </div>

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Pre-label */}
          <motion.div variants={itemVariants} className="section-label mb-6">
            <span className="text-cyan-400/60">⚡</span>
            Embedded Systems · Firmware · IoT · Hardware
          </motion.div>

          {/* Main name */}
          <motion.h1
            variants={itemVariants}
            className="section-title text-white mb-2"
          >
            Vijayarajan A
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold mb-6 h-10"
          >
            <TypeWriter texts={ROLES} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            Building intelligent hardware for the physical world.
            From bare-metal firmware to cloud-connected IoT systems.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary text-base px-8 py-3"
            >
              <span>View Projects</span>
              <span>→</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-8 py-3"
            >
              <span>Download Resume</span>
              <span>↗</span>
            </a>
          </motion.div>

          {/* Tech stack badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {["ESP32", "STM32", "FreeRTOS", "MQTT", "BLE", "KiCad", "TinyML", "AWS IoT"].map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <button onClick={scrollToAbout} className="scroll-indicator group cursor-pointer">
          <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase group-hover:text-cyan-400 transition-colors">
            Scroll
          </span>
          <div className="scroll-indicator__line" />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        </button>
      </motion.div>

      {/* Corner status indicator */}
      <div className="absolute top-24 right-6 z-10 hidden lg:flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Available for Hire</span>
        </div>
        <div className="font-mono text-[10px] text-slate-600">Tamil Nadu, India</div>
      </div>
    </section>
  );
}
