"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { hobbies } from "@/lib/data/portfolio";

// ── Rubik's Cube ─────────────────────────────────────────────────────────
function RubiksCube() {
  const [rotation, setRotation] = useState({ x: -25, y: 45 });
  const [solving, setSolving] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FACE_COLORS = ["#e53e3e", "#e9a800", "#3b82f6", "#22c55e", "#ffffff", "#f97316"];
  const faces = [
    { transform: "rotateY(0deg)   translateZ(60px)", color: FACE_COLORS[0] },
    { transform: "rotateY(180deg) translateZ(60px)", color: FACE_COLORS[1] },
    { transform: "rotateX(90deg)  translateZ(60px)", color: FACE_COLORS[2] },
    { transform: "rotateX(-90deg) translateZ(60px)", color: FACE_COLORS[3] },
    { transform: "rotateY(90deg)  translateZ(60px)", color: FACE_COLORS[4] },
    { transform: "rotateY(-90deg) translateZ(60px)", color: FACE_COLORS[5] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => ({ x: r.x + 0.3, y: r.y + 0.5 }));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-[120px] h-[120px] relative"
        style={{ perspective: "400px" }}
        onClick={() => setSolving(true)}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: solving ? "transform 2s ease-in-out" : "none",
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                transform: face.transform,
                backfaceVisibility: "hidden",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3px",
                padding: "8px",
                background: "#1a1a1a",
                border: "2px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
              }}
            >
              {Array.from({ length: 9 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    background: face.color,
                    borderRadius: "2px",
                    boxShadow: `inset 0 0 4px rgba(0,0,0,0.3)`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="text-xs font-mono text-slate-500">Click to solve →</span>
    </div>
  );
}

// ── PCB Trace Growth ─────────────────────────────────────────────────────
function PCBTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  const TRACES = [
    { points: [[10, 40], [80, 40], [80, 80], [140, 80]] },
    { points: [[10, 70], [50, 70], [50, 120], [120, 120], [120, 90], [160, 90]] },
    { points: [[10, 100], [60, 100], [60, 40], [160, 40]] },
    { points: [[10, 130], [100, 130], [100, 60], [160, 60]] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // PCB background
      ctx.fillStyle = "#04180a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      progRef.current = Math.min(progRef.current + 0.004, 1);

      TRACES.forEach((trace, ti) => {
        const pts = trace.points;
        let totalLen = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = pts[i + 1][0] - pts[i][0];
          const dy = pts[i + 1][1] - pts[i][1];
          totalLen += Math.sqrt(dx * dx + dy * dy);
        }

        const drawLen = totalLen * Math.min(progRef.current * 1.2 - ti * 0.3, 1);

        ctx.beginPath();
        ctx.strokeStyle = "#00d4ff";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 6;
        ctx.lineCap = "round";

        let remaining = Math.max(drawLen, 0);
        let started = false;

        for (let i = 0; i < pts.length - 1 && remaining > 0; i++) {
          const dx = pts[i + 1][0] - pts[i][0];
          const dy = pts[i + 1][1] - pts[i][1];
          const segLen = Math.sqrt(dx * dx + dy * dy);
          const draw = Math.min(remaining, segLen);
          const frac = draw / segLen;

          if (!started) { ctx.moveTo(pts[i][0], pts[i][1]); started = true; }
          ctx.lineTo(pts[i][0] + dx * frac, pts[i][1] + dy * frac);
          remaining -= draw;
        }
        ctx.stroke();

        // Pad circles at joints
        pts.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
          ctx.fillStyle = "#c0a060";
          ctx.fill();
        });
      });

      if (progRef.current < 1) rafRef.current = requestAnimationFrame(draw);
      else setTimeout(() => { progRef.current = 0; rafRef.current = requestAnimationFrame(draw); }, 2000);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return <canvas ref={canvasRef} width={170} height={170} className="rounded-lg" />;
}

// ── Neural Network ────────────────────────────────────────────────────────
function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;

    const layers = [[3, 1], [5, 1], [5, 1], [3, 1]];
    const nodes: { x: number; y: number; pulse: number }[] = [];

    layers.forEach(([count], li) => {
      const x = 20 + li * (W - 40) / (layers.length - 1);
      for (let j = 0; j < count; j++) {
        const y = H / 2 + (j - (count - 1) / 2) * (H / (count + 1));
        nodes.push({ x, y, pulse: Math.random() * Math.PI * 2 });
      }
    });

    let t = 0;
    const raf = setInterval(() => {
      t += 0.04;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#020408";
      ctx.fillRect(0, 0, W, H);

      // Connections
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (Math.abs(m.x - n.x) < 60 && m.x > n.x) {
            const alpha = 0.1 + 0.2 * Math.sin(t + i + j);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        });
      });

      // Nodes
      nodes.forEach((n) => {
        const intensity = 0.5 + 0.5 * Math.sin(t * 1.5 + n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + intensity * 0.7})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8 + intensity * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${intensity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }, 40);

    return () => clearInterval(raf);
  }, []);

  return <canvas ref={canvasRef} width={170} height={170} className="rounded-lg" />;
}

// ── Code Terminal ────────────────────────────────────────────────────────
function CodeTerminal() {
  const lines = [
    { text: "$ gcc -o firmware main.c", color: "#00d4ff" },
    { text: "Compiling embedded C...", color: "#a0aec0" },
    { text: "[OK] Build successful", color: "#22c55e" },
    { text: "$ flash --port /dev/ttyUSB0", color: "#00d4ff" },
    { text: "Flashing ESP32...", color: "#a0aec0" },
    { text: "[OK] Flash complete ✓", color: "#22c55e" },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) { setTimeout(() => setVisible(0), 1500); return v; }
        return v + 1;
      });
    }, 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="terminal w-[170px] h-[170px]">
      <div className="terminal-header py-2 px-3 gap-1">
        <div className="terminal-dot w-2 h-2 bg-red-500" />
        <div className="terminal-dot w-2 h-2 bg-yellow-400" />
        <div className="terminal-dot w-2 h-2 bg-green-500" />
      </div>
      <div className="terminal-body p-3 text-[10px] space-y-1">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} style={{ color: l.color }}>{l.text}</div>
        ))}
        <span className="cursor-blink" />
      </div>
    </div>
  );
}

export default function Hobbies() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    {
      id: "rubiks",
      title: "Rubik's Cube",
      description: "Average solve < 30s. Systematic algorithms feel just like debugging firmware.",
      color: "#f59e0b",
      visual: <RubiksCube />,
    },
    {
      id: "pcb",
      title: "PCB Design",
      description: "Routing copper traces in KiCad. Multi-layer boards from schematic to fab.",
      color: "#00d4ff",
      visual: <PCBTrace />,
    },
    {
      id: "ai",
      title: "AI & TinyML",
      description: "Neural networks on microcontrollers. Making tiny chips think.",
      color: "#a855f7",
      visual: <NeuralNetwork />,
    },
    {
      id: "coding",
      title: "Programming",
      description: "Firmware, open-source tools, automating everything I can.",
      color: "#10b981",
      visual: <CodeTerminal />,
    },
  ];

  return (
    <section id="hobbies" className="section bg-space-900/30 relative">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-label">Beyond Engineering</div>
          <h2 className="section-title">
            Hobbies &amp; <span className="text-gradient-cyan">Interests</span>
          </h2>
          <p className="section-subtitle mt-3">// when(!working) =&gt; explore()</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center gap-4 group"
              style={{ borderColor: `${item.color}20` }}
              whileHover={{ borderColor: `${item.color}50`, boxShadow: `0 0 40px ${item.color}15` }}
            >
              <div className="w-[170px] h-[170px] flex items-center justify-center">
                {item.visual}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
              <div className="w-8 h-0.5 rounded-full" style={{ background: item.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
