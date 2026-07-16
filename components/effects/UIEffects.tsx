import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── NEON BUTTON ──────────────────────────────────────────────────────

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ children, glowColor = "#00f5ff", className = "", ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const finalRef = ref as React.MutableRefObject<HTMLButtonElement> || buttonRef;

    useEffect(() => {
      const el = finalRef.current || buttonRef.current;
      if (!el) return;

      const onMouseEnter = () => {
        gsap.to(el, {
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 15px ${glowColor}`,
          duration: 0.3,
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          boxShadow: `0 0 10px ${glowColor}`,
          duration: 0.3,
        });
      };

      const onMouseDown = () => {
        gsap.to(el, {
          scale: 0.95,
          duration: 0.1,
        });
      };

      const onMouseUp = () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.1,
        });
      };

      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mouseup", onMouseUp);

      return () => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousedown", onMouseDown);
        el.removeEventListener("mouseup", onMouseUp);
      };
    }, [glowColor, finalRef]);

    return (
      <button
        ref={finalRef}
        className={`relative px-6 py-3 font-mono uppercase tracking-wider text-sm border border-current rounded transition-all duration-300 ${className}`}
        style={{
          color: glowColor,
          textShadow: `0 0 10px ${glowColor}`,
          boxShadow: `0 0 10px ${glowColor}`,
          backgroundColor: `${glowColor}05`,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";

// ─── CUSTOM CURSOR ──────────────────────────────────────────────────────

export function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          left: mouseX,
          top: mouseY,
          duration: 0,
          overwrite: false,
        });
      }

      if (trailRef.current) {
        gsap.to(trailRef.current, {
          left: mouseX,
          top: mouseY,
          duration: 0.15,
          overwrite: false,
        });
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full border-2 border-cyan-400 rounded-full shadow-lg shadow-cyan-400" />
        <div className="absolute inset-0 border border-cyan-300 rounded-full animate-pulse" />
      </div>

      {/* Trailing glow */}
      <div
        ref={trailRef}
        className="fixed w-8 h-8 pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 opacity-30"
      >
        <div className="w-full h-full border border-cyan-400/50 rounded-full blur-sm" />
      </div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
    </>
  );
}

// ─── GLOW CARD ──────────────────────────────────────────────────────

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ children, className = "", glowColor = "rgba(0, 245, 255, 0.5)" }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const finalRef = ref as React.MutableRefObject<HTMLDivElement> || cardRef;

    useEffect(() => {
      const el = finalRef.current || cardRef.current;
      if (!el) return;

      const onMouseEnter = () => {
        gsap.to(el, {
          boxShadow: `0 0 30px ${glowColor}, inset 0 0 20px ${glowColor}`,
          borderColor: glowColor,
          duration: 0.3,
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          boxShadow: `0 0 10px ${glowColor}`,
          borderColor: `${glowColor}80`,
          duration: 0.3,
        });
      };

      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    }, [glowColor, finalRef]);

    return (
      <div
        ref={finalRef}
        className={`border rounded-lg backdrop-blur-sm transition-all duration-300 ${className}`}
        style={{
          borderColor: `${glowColor}80`,
          boxShadow: `0 0 10px ${glowColor}`,
        }}
      >
        {children}
      </div>
    );
  }
);

GlowCard.displayName = "GlowCard";

// ─── RIPPLE EFFECT ──────────────────────────────────────────────────────

interface RippleProps {
  x: number;
  y: number;
}

export function useRippleEffect(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.backgroundColor = "rgba(0, 245, 255, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";

      if (container.style.position === "static") {
        container.style.position = "relative";
      }

      container.appendChild(ripple);

      gsap.to(ripple, {
        scale: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [containerRef]);
}

// ─── ANIMATED TEXT ──────────────────────────────────────────────────────

interface AnimatedTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  ({ text, duration = 0.5, delay = 0, className = "" }, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const finalRef = ref as React.MutableRefObject<HTMLSpanElement> || spanRef;

    useEffect(() => {
      const el = finalRef.current || spanRef.current;
      if (!el) return;

      const chars = text.split("");
      el.innerHTML = chars.map((char) => `<span style="opacity: 0">${char}</span>`).join("");

      const charElements = el.querySelectorAll("span");

      gsap.to(charElements, {
        opacity: 1,
        duration: duration / chars.length,
        stagger: duration / chars.length,
        delay,
        ease: "power2.out",
      });
    }, [text, duration, delay, finalRef]);

    return (
      <span ref={finalRef} className={className}>
        {text}
      </span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";
