/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#03060d",
          bgLight: "#080e1a",
          card: "rgba(10, 16, 30, 0.75)",
          cardHover: "rgba(16, 26, 48, 0.85)",
          border: "rgba(0, 243, 255, 0.2)",
          cyan: "#00f3ff",
          cyanGlow: "rgba(0, 243, 255, 0.5)",
          purple: "#9d4edd",
          purpleGlow: "rgba(157, 78, 221, 0.5)",
          green: "#00ff9d",
          gold: "#ffd166",
          pink: "#ff007f",
          text: "#f1f5f9",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 243, 255, 0.35)',
        'neon-purple': '0 0 25px rgba(157, 78, 221, 0.35)',
        'neon-green': '0 0 25px rgba(0, 255, 157, 0.35)',
        'cyber-glass': '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-laser': 'pulseLaser 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-rain': 'matrixRain 10s linear infinite',
        'grid-slide': 'gridSlide 20s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        pulseLaser: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 12px #00f3ff)' },
          '50%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px #00f3ff)' },
        },
        gridSlide: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        }
      }
    },
  },
  plugins: [],
}
