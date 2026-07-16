import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── USE SCROLL ANIMATION ──────────────────────────────────────────────────

export function useScrollAnimation(
  options: {
    duration?: number;
    yFrom?: number;
    xFrom?: number;
    rotateFrom?: number;
    scaleFrom?: number;
    markers?: boolean;
  } = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      duration = 0.8,
      yFrom = 60,
      xFrom = 0,
      rotateFrom = 0,
      scaleFrom = 1,
      markers = false,
    } = options;

    gsap.fromTo(
      ref.current,
      {
        y: yFrom,
        x: xFrom,
        rotation: rotateFrom,
        scale: scaleFrom,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
          markers,
          onUpdate: (self) => {
            if (self.progress === 1) {
              if (ref.current) {
                ref.current.style.willChange = "auto";
              }
            }
          },
        },
        y: 0,
        x: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease: "power2.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return ref;
}

// ─── USE PARALLAX ──────────────────────────────────────────────────────

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        scrub: 1,
      },
      y: -window.innerHeight * speed,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

// ─── USE TYPING ANIMATION ──────────────────────────────────────────────────

export function useTypingAnimation(
  text: string,
  speed = 0.05,
  onComplete?: () => void
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    let index = 0;
    const chars = text.split("");

    const timeline = gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration: chars.length * speed,
        onUpdate(self) {
          const charIndex = Math.floor(self.progress * chars.length);
          ref.current!.textContent = chars.slice(0, charIndex).join("");
        },
        onComplete,
      }
    );

    return () => {
      timeline.kill();
    };
  }, [text, speed, onComplete]);

  return ref;
}

// ─── USE GLOW EFFECT ──────────────────────────────────────────────────────

export function useGlowEffect(intensity = 1, duration = 1.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const timeline = gsap.to(ref.current, {
      boxShadow: `0 0 ${20 * intensity}px rgba(0, 245, 255, 0.8), 0 0 ${30 * intensity}px rgba(10, 255, 157, 0.5)`,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      timeline.kill();
    };
  }, [intensity, duration]);

  return ref;
}

// ─── USE FLOATING ANIMATION ──────────────────────────────────────────────────

export function useFloatingAnimation(
  floatRange = 20,
  duration = 3,
  delay = 0
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const timeline = gsap.to(ref.current, {
      y: floatRange,
      duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });

    return () => {
      timeline.kill();
    };
  }, [floatRange, duration, delay]);

  return ref;
}

// ─── USE HOVER GLOW ──────────────────────────────────────────────────────

export function useHoverGlow(glowColor = "rgba(0, 245, 255, 0.8)") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const onMouseEnter = () => {
      gsap.to(el, {
        boxShadow: `0 0 30px ${glowColor}, inset 0 0 20px ${glowColor}`,
        duration: 0.3,
        overwrite: false,
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        boxShadow: "0 0 0px transparent",
        duration: 0.3,
        overwrite: false,
      });
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [glowColor]);

  return ref;
}

// ─── USE STAGGER CHILDREN ──────────────────────────────────────────────────

export function useStaggerChildren(
  staggerDelay = 0.1,
  direction: "up" | "down" | "left" | "right" = "up"
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    const from: any = { opacity: 0 };

    switch (direction) {
      case "up":
        from.y = 40;
        break;
      case "down":
        from.y = -40;
        break;
      case "left":
        from.x = 40;
        break;
      case "right":
        from.x = -40;
        break;
    }

    gsap.from(children, {
      ...from,
      opacity: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: "power2.out",
    });

    return () => {
      gsap.to(children, { clearProps: "all" });
    };
  }, [staggerDelay, direction]);

  return ref;
}
