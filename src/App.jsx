import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-[#090909] text-[#F5F3EF] min-h-screen font-sans flex flex-col justify-between selection:bg-[#C51F1F] selection:text-white">
      {/* Sticky Animated Top Navigation Header */}
      <Navbar />

      {/* Main Content Area with Animated Page Route Switching */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
