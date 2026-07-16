"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { personal, stats } from "@/lib/data/portfolio";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient-cyan font-mono tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const keywords = ["ESP32", "STM32", "FreeRTOS", "MQTT", "BLE", "PCB Design", "TinyML", "AWS IoT", "C/C++", "Python"];

  return (
    <section id="about" className="section bg-space-900/50 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="section-label">About</div>
            <h2 className="section-title">
              Engineering <span className="text-gradient-cyan">Intelligence</span>
              <br />into Hardware
            </h2>
            <p className="section-subtitle mt-3">
              // embedded_systems.engineer.profile
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo + quick info */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-8">
              {/* Profile photo card */}
              <div className="relative group">
                <div className="w-64 h-64 rounded-2xl overflow-hidden glass-card p-1">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-space-700 to-space-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={personal.photo}
                      alt={personal.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>";
                      }}
                    />
                  </div>
                </div>

                {/* Decorative corner lines */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60" />

                {/* Status badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-1.5 rounded-full border border-green-400/30 flex items-center gap-2 whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400">Available · Tamil Nadu, India</span>
                </div>
              </div>

              {/* Terminal bio block */}
              <div className="terminal w-full max-w-sm">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500" />
                  <div className="terminal-dot bg-yellow-400" />
                  <div className="terminal-dot bg-green-500" />
                  <span className="ml-3 font-mono text-xs text-slate-500">profile.json</span>
                </div>
                <div className="terminal-body text-xs">
                  <div className="text-slate-500">{"{"}</div>
                  <div className="pl-4"><span className="text-purple-400">"name"</span>: <span className="text-green-400">"Vijayarajan A"</span>,</div>
                  <div className="pl-4"><span className="text-purple-400">"role"</span>: <span className="text-green-400">"Embedded Systems Engineer"</span>,</div>
                  <div className="pl-4"><span className="text-purple-400">"location"</span>: <span className="text-green-400">"Tamil Nadu, India"</span>,</div>
                  <div className="pl-4"><span className="text-purple-400">"status"</span>: <span className="text-cyan-400">"available"</span>,</div>
                  <div className="pl-4"><span className="text-purple-400">"focus"</span>: [</div>
                  <div className="pl-8 text-green-400">"ESP-IDF", "TinyML",</div>
                  <div className="pl-8 text-green-400">"RTOS", "VLSI"</div>
                  <div className="pl-4">]</div>
                  <div className="text-slate-500">{"}"}</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Bio text */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm an Embedded Systems Engineer passionate about building{" "}
                <span className="text-cyan-400 font-semibold">intelligent hardware</span>{" "}
                that bridges the physical and digital worlds. From writing bare-metal firmware
                in C to designing multi-layer PCBs and deploying cloud-connected IoT systems.
              </p>
              <p className="text-slate-400 leading-relaxed">
                My expertise spans{" "}
                <span className="text-white font-medium">microcontroller firmware</span> (ESP32, STM32),{" "}
                <span className="text-white font-medium">real-time operating systems</span> (FreeRTOS),{" "}
                <span className="text-white font-medium">wireless protocols</span> (BLE, MQTT, LoRa),
                and{" "}
                <span className="text-white font-medium">edge AI</span> (TinyML, TensorFlow Lite).
                I enjoy the challenge of making constrained hardware do more with less.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Currently exploring{" "}
                <span className="text-amber-400 font-medium">ESP-IDF deep dives</span>,{" "}
                <span className="text-amber-400 font-medium">TinyML on microcontrollers</span>, and{" "}
                <span className="text-amber-400 font-medium">VLSI design principles</span>.
              </p>

              {/* Skills keywords */}
              <div className="flex flex-wrap gap-2 pt-2">
                {keywords.map((kw) => (
                  <span key={kw} className="tech-tag">{kw}</span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-4 pt-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost py-2.5 px-5 text-sm"
                >
                  GitHub ↗
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost py-2.5 px-5 text-sm"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-sm"
                >
                  Resume ↓
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 glass-card p-8"
          >
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
