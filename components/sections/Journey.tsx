"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/lib/data/portfolio";

const ICONS: Record<string, string> = {
  "graduation-cap": "🎓",
  "book-open": "📖",
  "briefcase": "💼",
  "cpu": "💻",
  "flask-conical": "🔬",
  "rocket": "🚀",
};

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="section-label">Journey</div>
          <h2 className="section-title">
            Engineering <span className="text-gradient-amber">Journey</span>
          </h2>
          <p className="section-subtitle mt-3">// timeline.sort(event =&gt; event.date)</p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/30 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={i}
                  isLeft={isLeft}
                />
              );
            })}
          </div>
        </div>

        {/* Future goals strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 glass-card p-8 border-amber-400/20"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
            <span>🚀</span>
            <span>Where I'm Headed</span>
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { goal: "Embedded Systems Engineer @ Product Company", tag: "Career" },
              { goal: "Master VLSI & chip-level design", tag: "Learning" },
              { goal: "Open-source embedded library contributions", tag: "Community" },
              { goal: "Build a TinyML product end-to-end", tag: "Project" },
              { goal: "Research in Edge AI & neuromorphic chips", tag: "Research" },
              { goal: "Contribute to RTOS kernel projects", tag: "Open Source" },
            ].map((g) => (
              <div key={g.goal} className="flex items-start gap-3 p-3 rounded-lg bg-space-800/50">
                <span className="text-amber-400 text-lg leading-none mt-0.5">→</span>
                <div>
                  <div className="text-sm text-slate-300 leading-snug">{g.goal}</div>
                  <div className="text-[10px] font-mono text-amber-400/70 mt-1">{g.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, isLeft }: { item: typeof timeline[0]; index: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const ICONS: Record<string, string> = {
    "graduation-cap": "🎓", "book-open": "📖", "briefcase": "💼",
    "cpu": "💻", "flask-conical": "🔬", "rocket": "🚀",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <div className={`ml-14 md:ml-0 md:w-[calc(50%-48px)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
        <div
          className="glass-card p-5 group hover:border-cyan-400/30"
          style={{ borderColor: `${item.color}20` }}
        >
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
            <span
              className="font-mono text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: `${item.color}20`, color: item.color }}
            >
              {item.year}
            </span>
          </div>
          <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
          <p className="font-mono text-xs text-slate-400 mb-2">{item.subtitle}</p>
          <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Center node */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 w-12 h-12 flex items-center justify-center z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border-2 shadow-lg"
          style={{ background: `${item.color}15`, borderColor: `${item.color}60`, boxShadow: `0 0 20px ${item.color}30` }}
        >
          {ICONS[item.icon] || "●"}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-[calc(50%-48px)]" />
    </motion.div>
  );
}
