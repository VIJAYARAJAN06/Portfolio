# 🚀 Quick Start Guide - Cinematic 3D Portfolio

## ⚡ Installation & Setup

### 1. **Install Dependencies**
```bash
npm install
```

All required packages are already in `package.json`:
- GSAP 3.15 for animations
- Three.js + R3F for 3D
- Lenis for smooth scroll
- Framer Motion for React animations
- Tailwind CSS 4 for styling

### 2. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio in action!

### 3. **Build for Production**
```bash
npm run build
npm start
```

## 🎬 What You Get

### ✨ **Cinematic Features Activated**

#### 1. **Boot Sequence** (3.5 seconds)
- Animated loading screen with typing effect
- Progress bar with gradient
- Skip button with neon glow
- Glitch transition effect

#### 2. **Hero Section 3D**
- Nebula background with procedural generation
- Glowing AI core sphere with Fresnel shader
- Rotating energy rings
- Mouse parallax camera control
- Bloom post-processing effect

#### 3. **Smooth Scrolling**
- Lenis smooth scroll (not janky!)
- Scroll-triggered animations
- GSAP ScrollTrigger integration
- Works great on mobile

#### 4. **Custom Cursor**
- Futuristic design with glow
- Trailing effect
- Auto-hides default cursor

#### 5. **Interactive Elements**
- Neon glowing buttons
- Glow cards with hover effects
- Ripple click animations
- Animated text reveals

#### 6. **Engineering Lab**
- 3D interactive models (ESP32, PCB, Oscilloscope)
- Hover-triggered animations
- Real-time glow effects
- Click to select and view info

## 📊 Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

⚠️ Note: Best experience on modern browsers with WebGL support

## 🎨 Customization

### Colors
Edit color variables in `app/globals.css`:
```css
:root {
  --color-cyan: #00d4ff;
  --color-green: #0aff9d;
  --color-purple: #a855f7;
  --color-amber: #f59e0b;
}
```

### Animation Speed
Modify timing in component files:
- `LoadingScreen.tsx` - Boot sequence timing
- `lib/animations/gsap.ts` - Default durations
- `app/globals.css` - Global animation speeds

### 3D Scene
Adjust camera, lighting, and effects in:
- `components/three/HeroScene.tsx`
- `components/sections/EngineeringLab.tsx`

## 📁 Key Files to Know

```
🎬 ANIMATIONS & EFFECTS:
lib/animations/gsap.ts          ← Core GSAP utilities
lib/hooks/useAnimation.ts       ← React animation hooks
lib/hooks/useLenisScroll.ts     ← Smooth scroll setup

🎨 UI COMPONENTS:
components/effects/UIEffects.tsx     ← Neon buttons, cursor, cards
components/effects/FloatingCard.tsx  ← Glowing cards

🌌 3D SCENES:
components/three/HeroScene.tsx       ← Main hero 3D scene
components/effects/GlowingSphere.tsx ← 3D glow sphere
components/effects/EnergyRings.tsx   ← Rotating rings
components/sections/EngineeringLab.tsx ← Interactive lab

📱 MAIN PAGES:
app/page.tsx          ← Home page with all features
components/LoadingScreen.tsx ← Boot sequence

📖 STYLING:
app/globals.css       ← Global styles + 20+ animations
tailwind.config.ts    ← Tailwind configuration
```

## 🔧 Performance Tips

1. **Monitor 60fps**: Check DevTools Performance tab
2. **Lazy Load Components**: Images and sections load on scroll
3. **Optimize Images**: Use WebP with fallbacks
4. **Cache 3D Models**: Three.js caches textures
5. **Test on Mobile**: Use Chrome DevTools device emulation

## 🐛 Troubleshooting

### Canvas Not Rendering?
- Check browser console for WebGL errors
- Ensure GPU drivers are updated
- Clear browser cache and reload

### Animations Stuttering?
- Check CPU usage in DevTools
- Reduce particle count in 3D scenes
- Disable bloom effect if needed

### Cursor Not Showing?
- CSS hides default cursor - this is intentional
- Custom cursor uses absolute positioning
- Check z-index if overlapped

### Smooth Scroll Not Working?
- Ensure Lenis is initialized in `page.tsx`
- Check for conflicting scroll libraries
- Verify ScrollTrigger is registered

## 📊 File Size Optimization

```
Bundle Optimization:
- GSAP: ~200KB (production build)
- Three.js: ~150KB
- Framer Motion: ~70KB
- Lenis: ~20KB

Total estimated: ~1.2MB (gzipped: ~300-400KB)
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
npm run build
# Upload 'out' folder to Netlify
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📞 Support & Resources

- **GSAP Docs**: https://gsap.com/
- **Three.js**: https://threejs.org/
- **R3F**: https://docs.pmnd.rs/react-three-fiber/
- **Lenis**: https://github.com/darkroom-labs/lenis

## ✨ Next Steps

1. **Add Your Content**
   - Update portfolio data in `lib/data/portfolio.ts`
   - Replace placeholder images

2. **Customize Colors**
   - Edit color variables in `app/globals.css`
   - Update theme colors in components

3. **Add Projects**
   - Use `FloatingCard` component for projects
   - Add 3D models if desired

4. **Performance Testing**
   - Test on mobile devices
   - Check Lighthouse scores
   - Optimize images

5. **Deploy**
   - Push to GitHub
   - Connect to Vercel/Netlify
   - Celebrate! 🎉

---

**Ready to impress recruiters?** Your cinematic 3D portfolio is ready to go! 🚀✨
