"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data/portfolio";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "microcontroller", label: "Microcontrollers" },
  { id: "protocol", label: "Protocols" },
  { id: "language", label: "Languages" },
  { id: "hardware", label: "Hardware" },
  { id: "cloud", label: "Cloud / IoT" },
  { id: "ai", label: "AI / ML" },
  { id: "os", label: "OS / RTOS" },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-space-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        >
          <div
            className="absolute inset-0 animate-pulse opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-4 cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? `${skill.color}50` : undefined,
        boxShadow: hovered ? `0 0 30px ${skill.color}20` : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
          style={{ background: `${skill.color}20`, color: skill.color }}
        >
          {skill.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="font-mono text-xs text-slate-500">{skill.level}%</span>
      </div>
      <div className="font-semibold text-white text-sm mb-1">{skill.name}</div>
      <div className="text-xs text-slate-500 capitalize mb-2">{skill.category.replace(/-/g, " ")}</div>
      <div className="h-1 bg-space-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.0, delay: index * 0.05 + 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const topSkills = skills.filter((s) =>
    ["ESP32", "STM32", "Embedded C", "FreeRTOS", "MQTT"].includes(s.name)
  );

  return (
    <section id="skills" className="section relative">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="mb-16">
            <div className="section-label">Skills</div>
            <h2 className="section-title">
              Technical <span className="text-gradient-amber">Arsenal</span>
            </h2>
            <p className="section-subtitle mt-3">// embedded_technologies.map(skill =&gt; skill.master())</p>
          </div>

          {/* Core skills bar chart */}
          <div className="glass-card p-8 mb-12">
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Core Competencies
            </h3>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {topSkills.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} delay={i * 0.1} />
              ))}
              <SkillBar name="PCB Design (KiCad)" level={80} color="#22c55e" delay={0.5} />
              <SkillBar name="Python" level={85} color="#f59e0b" delay={0.6} />
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-cyan-400/15 border-cyan-400/50 text-cyan-400"
                    : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skill cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {filtered.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Currently learning */}
          <div className="mt-12 glass-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Currently Leveling Up
            </h3>
            <div className="flex flex-wrap gap-3">
              {["ESP-IDF (Advanced)", "TinyML / Edge AI", "RTOS Internals", "VLSI Design", "Rust for Embedded"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20"
                  >
                    <span className="text-amber-400 text-xs">→</span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
