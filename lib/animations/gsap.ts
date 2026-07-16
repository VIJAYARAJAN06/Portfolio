import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── TIMELINE BUILDERS ──────────────────────────────────────────────────

export function createMasterTimeline() {
  return gsap.timeline({ paused: false });
}

// ─── TEXT ANIMATIONS ──────────────────────────────────────────────────

export function animateTypingText(
  element: HTMLElement,
  text: string,
  duration = 0.05,
  onComplete?: () => void
) {
  let index = 0;
  const chars = text.split("");
  
  return gsap.to(element, {
    duration: chars.length * duration,
    onUpdate() {
      if (index < chars.length) {
        element.textContent += chars[index];
        index++;
      }
    },
    onComplete,
  });
}

export function animateParticleText(
  element: HTMLElement,
  delay = 0
) {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay,
    ease: "power3.out",
  });
}

// ─── SCROLL ANIMATIONS ──────────────────────────────────────────────────

export function createScrollReveal(
  element: HTMLElement | string,
  options: {
    duration?: number;
    yFrom?: number;
    opacity?: boolean;
    stagger?: boolean;
    markers?: boolean;
  } = {}
) {
  const {
    duration = 0.8,
    yFrom = 60,
    opacity = true,
    stagger = false,
    markers = false,
  } = options;

  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 50%",
      scrub: false,
      markers,
    },
    duration,
    y: 0,
    opacity: opacity ? 1 : undefined,
    initial: {
      y: yFrom,
      opacity: opacity ? 0 : 1,
    },
  });
}

export function createParallaxScroll(
  element: HTMLElement | string,
  speed = 0.5
) {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: 1,
    },
    y: -window.innerHeight * speed,
    ease: "none",
  });
}

// ─── STAGGER ANIMATIONS ──────────────────────────────────────────────────

export function staggerFadeIn(
  elements: HTMLElement[] | NodeListOf<Element>,
  staggerDelay = 0.1,
  duration = 0.6
) {
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger: staggerDelay,
    ease: "power2.out",
  });
}

export function staggerScaleUp(
  elements: HTMLElement[] | NodeListOf<Element>,
  staggerDelay = 0.08
) {
  gsap.to(elements, {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    stagger: staggerDelay,
    ease: "back.out(1.5)",
  });
}

// ─── 3D ANIMATIONS ──────────────────────────────────────────────────

export function createRotationLoop(
  ref: any,
  duration = 8,
  axis: "x" | "y" | "z" = "y"
) {
  return gsap.to(ref.current?.rotation || {}, {
    [axis]: Math.PI * 2,
    duration,
    repeat: -1,
    ease: "none",
  });
}

export function animateCameraZoom(
  camera: any,
  fromZ: number,
  toZ: number,
  duration = 3
) {
  return gsap.to(camera.position, {
    z: toZ,
    duration,
    ease: "power1.inOut",
  });
}

// ─── GLITCH EFFECT ──────────────────────────────────────────────────

export function glitchEffect(
  element: HTMLElement,
  duration = 0.6,
  intensity = 3
) {
  const tl = gsap.timeline();

  for (let i = 0; i < intensity; i++) {
    tl.to(
      element,
      {
        x: Math.random() * 20 - 10,
        y: Math.random() * 20 - 10,
        duration: duration / intensity / 2,
      },
      0
    );
  }

  tl.to(element, {
    x: 0,
    y: 0,
    duration: duration / intensity,
  });

  return tl;
}

// ─── GLOW PULSE ──────────────────────────────────────────────────

export function glowPulse(
  element: HTMLElement,
  intensity = 1,
  duration = 1.5
) {
  return gsap.to(element, {
    boxShadow: `0 0 ${20 * intensity}px rgba(0, 245, 255, 1)`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// ─── CURSOR TRAIL ──────────────────────────────────────────────────

export function createCursorTrail() {
  const trail: { x: number; y: number }[] = [];
  const trailLength = 20;

  document.addEventListener("mousemove", (e) => {
    trail.unshift({ x: e.clientX, y: e.clientY });
    if (trail.length > trailLength) trail.pop();
  });

  return trail;
}

// ─── WAVE TEXT EFFECT ──────────────────────────────────────────────────

export function waveTextEffect(
  elements: HTMLElement[] | NodeListOf<Element>,
  amplitude = 30,
  frequency = 0.05
) {
  const tl = gsap.timeline({ repeat: -1 });

  Array.from(elements).forEach((el, i) => {
    tl.to(
      el,
      {
        y: Math.sin(i * frequency) * amplitude,
        duration: 0.5,
        ease: "sine.inOut",
      },
      i * 0.05
    );
  });

  return tl;
}

// ─── SCROLL TRIGGER CLEANUP ──────────────────────────────────────────────────

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function killAllAnimations() {
  gsap.killTweensOf("*");
}
