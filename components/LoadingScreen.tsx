"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const BOOT_LINES = [
  { text: "VJ-OS v1.0 — Embedded Systems Portfolio", delay: 0, type: "title" },
  { text: "", delay: 200, type: "gap" },
  { text: "[ OK ] Initializing hardware interface...", delay: 400, type: "ok" },
  { text: "[ OK ] Loading CPU architecture: ARM Cortex-M4", delay: 600, type: "ok" },
  { text: "[ OK ] Memory check: 512KB FLASH, 128KB SRAM", delay: 800, type: "ok" },
  { text: "[ OK ] Connecting embedded network (MQTT)...", delay: 1000, type: "ok" },
  { text: "[ OK ] Loading firmware modules...", delay: 1200, type: "ok" },
  { text: "[ OK ] Initializing BLE provisioning stack...", delay: 1400, type: "ok" },
  { text: "[ OK ] Mounting engineering database...", delay: 1600, type: "ok" },
  { text: "[ OK ] Loading AI inference engine (TinyML)...", delay: 1800, type: "ok" },
  { text: "[ OK ] Calibrating signal processing unit...", delay: 2000, type: "ok" },
  { text: "[ OK ] PCB design library: loaded (847 components)", delay: 2200, type: "ok" },
  { text: "[ OK ] Initializing 3D render pipeline...", delay: 2400, type: "ok" },
  { text: "", delay: 2600, type: "gap" },
  { text: "System ready. Welcome, Engineer.", delay: 2800, type: "ready" },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Start showing skip button after 1 second
    const skipTimer = setTimeout(() => setCanSkip(true), 1000);
    timers.push(skipTimer);

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));

        // Animate progress bar
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${Math.round(((i + 1) / BOOT_LINES.length) * 100)}%`,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }, line.delay);
      timers.push(t);
    });

    // Complete
    const finishTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        // Glitch effect before transition
        if (terminalRef.current) {
          gsap.to(terminalRef.current, {
            x: 5,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
            onComplete: onComplete,
          });
        }
      }, 300);
    }, 3500);
    timers.push(finishTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    setDone(true);
    setTimeout(() => {
      // Glitch effect
      if (terminalRef.current) {
        gsap.to(terminalRef.current, {
          x: 8,
          duration: 0.08,
          repeat: 4,
          yoyo: true,
          onComplete: onComplete,
        });
      }
    }, 100);
  };

  const getColor = (type: string) => {
    switch (type) {
      case "title": return "text-cyan-400 font-bold";
      case "ok": return "text-slate-300";
      case "ready": return "text-green-400 font-semibold";
      default: return "text-slate-500";
    }
  };

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,245,255,0.05)_25%,rgba(0,245,255,0.05)_26%,transparent_27%,transparent_74%,rgba(0,245,255,0.05)_75%,rgba(0,245,255,0.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px] animate-pulse" />
            <div className="animate-scanline absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>

          {/* Glowing corner brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-500 shadow-lg shadow-cyan-500/50" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-500 shadow-lg shadow-cyan-500/50" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-500 shadow-lg shadow-cyan-500/50" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-500 shadow-lg shadow-cyan-500/50" />

          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-12 flex items-center gap-3 z-10"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 10px rgba(0,245,255,0.5)", "0 0 20px rgba(0,245,255,0.8)", "0 0 10px rgba(0,245,255,0.5)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded border-2 border-cyan-400 flex items-center justify-center"
            >
              <span className="text-cyan-400 font-mono font-bold text-sm">VJ</span>
            </motion.div>
            <span className="font-mono text-xs text-cyan-300 tracking-[0.3em] uppercase">OS v1.0</span>
          </motion.div>

          {/* Terminal window */}
          <div
            ref={terminalRef}
            className="w-full max-w-2xl mx-4 rounded-lg border border-cyan-500/40 bg-slate-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-cyan-500/20 relative z-10"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/20 bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 font-mono text-xs text-slate-400">vj@embedded-os:~ boot_sequence</span>
            </div>

            {/* Terminal body */}
            <div className="p-4 min-h-[320px] max-h-[400px] overflow-y-auto font-mono text-sm">
              {BOOT_LINES.map((line, i) =>
                visibleLines.includes(i) ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${getColor(line.type)} leading-relaxed whitespace-pre-wrap break-words`}
                  >
                    {line.text || "\u00a0"}
                  </motion.div>
                ) : null
              )}
              {visibleLines.length > 0 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-cyan-400 cursor"
                >
                  █
                </motion.span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <motion.div className="mt-8 w-full max-w-2xl mx-4 relative z-10">
            <div className="flex justify-between font-mono text-xs text-slate-500 mb-3">
              <span>Initializing neural cortex</span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/30">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-green-400 rounded-full shadow-lg shadow-cyan-500/50"
                style={{ width: "0%" }}
              />
            </div>
          </motion.div>

          {/* Skip button */}
          <AnimatePresence>
            {canSkip && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleSkip}
                className="mt-6 px-6 py-2 font-mono text-xs uppercase tracking-wider text-cyan-400 border border-cyan-500/60 rounded hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 relative z-10"
              >
                [SKIP] Enter system
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
