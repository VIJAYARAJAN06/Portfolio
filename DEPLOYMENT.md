# 🌐 Free Deployment Guide

This guide details how to host Vijayarajan A's 3D Embedded & IoT Portfolio for free using Netlify, GitHub Pages, or Vercel.

---

## Option 1: Deploy to Netlify (Recommended - Fast & Easy)

### Method A: Drag & Drop (Instant)
1. Build the production files:
   ```bash
   npm run build
   ```
2. Log in to [Netlify](https://app.netlify.com/).
3. Drag the generated `dist` folder directly onto the Netlify dashboard upload area.
4. Your website is instantly deployed with an SSL HTTPS URL!

### Method B: Continuous Deployment via GitHub
1. Push your repository to GitHub.
2. In Netlify, click **"Add new site"** -> **"Import an existing project"**.
3. Choose GitHub and select your portfolio repository.
4. Set Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Deploy Site**. Future GitHub pushes will auto-deploy.

---

## Option 2: Deploy to GitHub Pages

1. Install `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Update `vite.config.js` with your repository base path:
   ```javascript
   export default defineConfig({
     base: '/portfolio/', // Replace with your repository name
     plugins: [react()],
   })
   ```
3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run the deploy command:
   ```bash
   npm run deploy
   ```
5. Go to your GitHub Repository -> **Settings** -> **Pages** -> Select `gh-pages` branch.

---

## Option 3: Deploy to Vercel

1. Install Vercel CLI or import via [vercel.com](https://vercel.com).
2. Connect your GitHub repository.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 🔒 Custom Domain Setup (Optional)
If you own a custom domain (e.g. `vijayarajan.dev`):
1. In Netlify / Vercel, go to **Domain Management** -> **Add custom domain**.
2. Update your DNS settings at your domain registrar to point `CNAME` or `A` record to Netlify / Vercel.
