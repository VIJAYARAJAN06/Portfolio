import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#020408",
          900: "#0a0e1a",
          800: "#0d1424",
          700: "#111827",
          600: "#1a2540",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          glow: "#00d4ff33",
          muted: "#00d4ff88",
        },
        amber: {
          DEFAULT: "#f59e0b",
          glow: "#f59e0b33",
        },
        purple: {
          DEFAULT: "#a855f7",
          glow: "#a855f733",
        },
        green: {
          DEFAULT: "#10b981",
          glow: "#10b98133",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "space-gradient": "linear-gradient(135deg, #020408 0%, #0a0e1a 50%, #0d1424 100%)",
        "hero-gradient": "radial-gradient(ellipse at 50% 0%, #00d4ff15 0%, transparent 60%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 4s ease-in-out infinite",
        "type": "type 3s steps(40, end)",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.7), 0 0 80px rgba(0, 212, 255, 0.2)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
        type: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-cyan": "0 0 30px rgba(0, 212, 255, 0.3)",
        "glow-amber": "0 0 30px rgba(245, 158, 11, 0.3)",
        "glow-purple": "0 0 30px rgba(168, 85, 247, 0.3)",
        "card": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
