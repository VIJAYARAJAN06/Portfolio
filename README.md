# ⚡ Vijayarajan A - Interactive 3D Embedded Systems & IoT Portfolio

A modern, futuristic 3D web experience built using React.js, Vite, Three.js, React Three Fiber, Tailwind CSS, and Framer Motion to showcase Embedded Systems and IoT hardware projects.

![3D Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-00f3ff)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Three.js%20%7C%20Tailwind-b026ff)

---

## 🎯 Features

- 🎮 **Interactive 3D Hardware Canvas**: 3D procedural ESP32 Microcontroller chip model with metallic shields, GPIO pin headers, glowing LEDs, and parallax tilt.
- 🔍 **Interactive 3D Hardware Inspector**: CAD model viewer allowing users to rotate and inspect STM32 (ARM Cortex-M) and Arduino boards.
- 📜 **Interactive Terminal Bio**: Cyberpunk terminal tabs (`bio.txt`, `education.json`, `achievements.log`) displaying Vijayarajan A's background (CGPA 8.12, GATE EC Qualified).
- 🛠️ **Categorized Skills Matrix**: Visual hardware chip cards and progress meters across Microcontrollers, Protocols, Cloud/IoT, Software & Debugging.
- 🚀 **Projects Showcase**: Filterable gallery featuring SENTINEL, Flowra, Smart Shopping System, and Smart Phase Shifter with deep-dive technical modals.
- 💼 **Internships Timeline**: Explicitly highlights 3 internships (Nanostar Technologies, Tech UC Automation, EMGLitz Automation) and Placement Coordinator role.
- 📄 **Resume Hub & PDF Parser**: Client-side drag-and-drop resume PDF analysis, automatic skill extraction, and instant resume download.
- ✉️ **Contact Cyber Station**: Form with real-time validation and confetti celebration feedback.
- 🔊 **Web Audio Synthesizer**: Subtle UI audio feedback (with toggle).
- ⚡ **Low-Power GPU Mode**: Fallback rendering for mobile devices and low-end GPUs.

---

## 📁 Folder Structure

```
Portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── DEPLOYMENT.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── portfolioData.js         # Single source of truth for portfolio profile
│   ├── utils/
│   │   └── resumeParser.js          # Client-side PDF parser & resume download helper
│   ├── canvas/
│   │   ├── HeroCanvas.jsx           # R3F Canvas container with camera & parallax
│   │   ├── ESP32Chip.jsx            # 3D ESP32 board model with pin headers & LEDs
│   │   ├── CircuitGrid.jsx          # 3D glowing ground plane grid
│   │   ├── FloatingParticles.jsx    # Animated IoT signal data particles
│   │   └── HardwareInspector.jsx    # Interactive 3D CAD model orbit viewer
│   └── components/
│       ├── Loader.jsx               # Cyberpunk system boot sequence
│       ├── CustomCursor.jsx         # Micro-interactive laser cursor
│       ├── Navbar.jsx               # Sticky header with status badge & sound toggle
│       ├── Hero.jsx                 # Hero section with typewriter text & CTAs
│       ├── About.jsx                # Terminal bio & education tabbed viewer
│       ├── Skills.jsx               # Skills matrix & 3D inspector integration
│       ├── Projects.jsx             # Filterable projects gallery
│       ├── ProjectModal.jsx         # Detailed project hardware specs popup
│       ├── Experience.jsx           # Timeline for 3 internships & leadership
│       ├── ResumeSection.jsx        # Resume PDF drag-and-drop & parser
│       ├── Contact.jsx              # Cyberpunk form & social cards
│       └── Footer.jsx               # System clock & GitHub telemetry widget
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- npm or yarn

### 1. Install Dependencies
Run the following command inside the `Portfolio` root directory:
```bash
npm install
```

### 2. Run Development Server
Start the local development server with hot-reloading:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Build for Production
To generate optimized production bundle files in `dist/`:
```bash
npm run build
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](file:///c:/Users/vijay/Downloads/Portfolio/DEPLOYMENT.md) for step-by-step instructions on deploying for free to Netlify or GitHub Pages.
