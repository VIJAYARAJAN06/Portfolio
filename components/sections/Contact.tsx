"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/data/portfolio";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

function ContactCard({
  icon, label, value, href, color, delay,
}: {
  icon: string; label: string; value: string; href: string; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref as any}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}25` }}
      className="glass-card p-5 flex items-center gap-4 group no-underline"
      style={{ borderColor: `${color}20` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-mono text-slate-500 mb-0.5">{label}</div>
        <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
          {value}
        </div>
      </div>
      <span className="ml-auto text-slate-500 group-hover:text-white transition-colors">↗</span>
    </motion.a>
  );
}

// Animated transmission visual
function TransmissionAnimation({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pointer-events-none"
        >
          <div className="text-center">
            {/* Satellite dish */}
            <motion.div
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📡
            </motion.div>

            {/* Signal rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-24 rounded-full border border-cyan-400/30"
                style={{ left: "50%", top: "45%", marginLeft: -48, marginTop: -48 }}
                animate={{ scale: [1, i * 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-cyan-400 text-sm"
            >
              Transmitting message...
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-mono text-green-400 text-sm mt-2"
            >
              ✓ Signal locked · Message delivered
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [transmitting, setTransmitting] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState("submitting");
    setTransmitting(true);

    // Simulate transmission animation
    await new Promise((r) => setTimeout(r, 2500));
    setTransmitting(false);

    // TODO: Replace with actual EmailJS or API call
    // Example: await emailjs.send(...)
    setState("success");
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-space-800/60 border rounded-xl px-4 py-3 text-white placeholder-slate-600 font-mono text-sm outline-none transition-all duration-200 focus:border-cyan-400/50 focus:shadow-glow-cyan ${
      errors[field] ? "border-red-400/50" : "border-slate-700 hover:border-slate-600"
    }`;

  const CONTACT_CARDS = [
    { icon: "🐙", label: "GitHub", value: "github.com/vijayarajan", href: personal.github, color: "#f0f6fc" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/vijayarajan", href: personal.linkedin, color: "#0a66c2" },
    { icon: "📧", label: "Email", value: personal.email, href: `mailto:${personal.email}`, color: "#00d4ff" },
    { icon: "📄", label: "Resume", value: "Download PDF", href: personal.resume, color: "#10b981" },
    { icon: "📍", label: "Location", value: personal.location, href: "#", color: "#a855f7" },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Transmission animation overlay */}
      <TransmissionAnimation active={transmitting} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="section-label justify-center">Contact</div>
            <h2 className="section-title">
              Mission <span className="text-gradient-cyan">Control</span>
            </h2>
            <p className="section-subtitle mt-3">
              // transmission.send(message) → orbit → receive
            </p>

            {/* Availability status */}
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full border border-green-400/20 mt-6">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-sm font-medium">
                Available for Internship / Full-time Embedded Roles
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-cyan-400">📡</span>
                Send Transmission
              </h3>

              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-10 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-white mb-2">Transmission Received!</h4>
                  <p className="text-slate-400">
                    Your message has been successfully beamed to mission control.
                    I'll get back to you within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-ghost mt-6"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Subject — e.g. Internship Opportunity"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className={inputClass("subject")}
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1 font-mono">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Your message... tell me about the opportunity or project."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary justify-center py-4 text-base relative overflow-hidden disabled:opacity-70"
                  >
                    {state === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⚡
                        </motion.span>
                        Launching transmission...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>🚀</span>
                        Launch Message
                      </span>
                    )}
                  </motion.button>

                  <p className="text-xs text-slate-600 text-center font-mono">
                    Your message travels securely through the embedded network.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Right: Contact cards + status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">🛰️</span>
                Communication Channels
              </h3>

              <div className="flex flex-col gap-3">
                {CONTACT_CARDS.map((card, i) => (
                  <ContactCard key={card.label} {...card} delay={0.1 * i} />
                ))}
              </div>

              {/* Developer status */}
              <div className="glass-card p-5 mt-2">
                <h4 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Developer Status
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "Availability", value: "Open to Offers", color: "#22c55e", dot: true },
                    { label: "Role Type", value: "Embedded / Firmware / IoT", color: "#00d4ff", dot: false },
                    { label: "Currently Studying", value: "ESP-IDF · TinyML · RTOS", color: "#f59e0b", dot: false },
                    { label: "Response Time", value: "Within 24–48 hours", color: "#a855f7", dot: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500">{item.label}</span>
                      <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: item.color }}>
                        {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
