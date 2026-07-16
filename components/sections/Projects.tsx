"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data/portfolio";

function ArchitectureDiagram({ nodes, edges }: { nodes: string[]; edges: [number, number][] }) {
  const width = 320;
  const height = 140;
  const positions = nodes.map((_, i) => ({
    x: 30 + (i / (nodes.length - 1)) * (width - 60),
    y: i % 2 === 0 ? 40 : 100,
  }));

  return (
    <svg width={width} height={height} className="overflow-visible">
      {edges.map(([from, to], i) => {
        const f = positions[from], t = positions[to];
        const mx = (f.x + t.x) / 2;
        return (
          <motion.path
            key={i}
            d={`M${f.x},${f.y} Q${mx},${(f.y + t.y) / 2 - 20} ${t.x},${t.y}`}
            fill="none"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
          />
        );
      })}
      {nodes.map((name, i) => (
        <g key={i} transform={`translate(${positions[i].x},${positions[i].y})`}>
          <circle r="6" fill="rgba(0, 212, 255, 0.2)" stroke="rgba(0, 212, 255, 0.6)" strokeWidth="1.5" />
          <motion.circle
            r="6"
            fill="none"
            stroke="rgba(0, 212, 255, 0.8)"
            strokeWidth="1"
            animate={{ r: [6, 12, 6], opacity: [1, 0, 1] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
          <text
            y={i % 2 === 0 ? -12 : 18}
            textAnchor="middle"
            fill="rgba(148, 163, 184, 0.9)"
            fontSize="9"
            className="font-mono"
          >
            {name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ProjectCard({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer group"
      style={{
        borderColor: hovered ? `${project.color}40` : undefined,
        boxShadow: hovered ? `0 8px 40px ${project.color}15, 0 0 0 1px ${project.color}20` : undefined,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {project.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                FEATURED
              </span>
            )}
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-space-700 border border-slate-600">
              {project.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-gradient-cyan transition-all">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 font-mono">{project.subtitle}</p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
          style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
        >
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

      {/* Architecture mini-diagram */}
      <div className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
        <ArchitectureDiagram nodes={project.architecture.nodes} edges={project.architecture.edges as [number, number][]} />
      </div>

      {/* Stats */}
      {project.stats && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(project.stats).map(([k, v]) => (
            <div key={k} className="bg-space-800/60 rounded-lg px-3 py-2">
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{k}</div>
              <div className="font-mono text-xs text-white font-medium mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className="tech-tag text-[10px]">{t}</span>
        ))}
        {project.tech.length > 5 && (
          <span className="tech-tag text-[10px] text-slate-500">+{project.tech.length - 5}</span>
        )}
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-slate-400 hover:text-white font-mono transition-colors flex items-center gap-1"
        >
          <span>GitHub</span><span>↗</span>
        </a>
        <button
          className="text-xs font-medium transition-colors flex items-center gap-1"
          style={{ color: project.color }}
        >
          <span>View Details</span><span>→</span>
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
        className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: `${project.color}30` }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-space-700 text-slate-400 hover:text-white flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6">
          {project.featured && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
              style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
              FEATURED
            </span>
          )}
          <span className="text-xs font-mono text-slate-500">{project.category}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
        <p className="font-mono text-sm text-slate-400 mb-6">{project.subtitle}</p>

        <p className="text-slate-300 leading-relaxed mb-6">{project.longDescription}</p>

        {/* Architecture */}
        <div className="glass p-4 rounded-xl mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
            System Architecture
          </h3>
          <ArchitectureDiagram
            nodes={project.architecture.nodes}
            edges={project.architecture.edges as [number, number][]}
          />
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(project.stats).map(([k, v]) => (
              <div key={k} className="bg-space-800 rounded-xl p-4">
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-1">{k}</div>
                <div className="font-mono text-sm text-white font-medium">{v}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center">
            View on GitHub ↗
          </a>
          <button onClick={onClose} className="btn-ghost px-6">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="section bg-space-900/30 relative">
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
            <div className="section-label">Projects</div>
            <h2 className="section-title">
              Engineering <span className="text-gradient-cyan">Projects</span>
            </h2>
            <p className="section-subtitle mt-3">// projects.filter(p =&gt; p.builds_real_hardware)</p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-500 text-sm mb-4 font-mono">// More projects on GitHub</p>
            <a
              href="https://github.com/vijayarajan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              View All Projects on GitHub ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
