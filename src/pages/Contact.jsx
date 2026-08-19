import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import PageLayout from '../components/PageLayout';

export default function Contact() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    try {
      if (serviceId !== 'YOUR_SERVICE_ID' && publicKey !== 'YOUR_PUBLIC_KEY') {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
        setContactSubmitted(true);
      } else {
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") || formData.get("name");
        const email = formData.get("user_email") || formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        
        const mailtoLink = `mailto:vijayrajan2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        setContactSubmitted(true);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSendError("Failed to send automatically. Opening your default email client...");
      setTimeout(() => {
        const formData = new FormData(formRef.current);
        const name = formData.get("user_name") || formData.get("name");
        const email = formData.get("user_email") || formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        window.location.href = `mailto:vijayrajan2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      }, 1500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <PageLayout>
      {/* HEADER */}
      <section className="py-16 bg-[#090909] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-4 text-center">
          <span className="text-xs font-mono text-[#C51F1F] font-extrabold uppercase tracking-widest">— CONNECT & COLLABORATE</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-white leading-tight">
            GET IN TOUCH WITH VIJAYARAJAN
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto">
            Have an open engineering position, embedded IoT project, or technical query? Drop a message below.
          </p>
        </div>
      </section>

      {/* FORM & DETAILS */}
      <section className="py-20 bg-[#090909]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          
          <div className="bento-card-editorial p-8 sm:p-12">
            {contactSubmitted ? (
              <div className="py-12 text-center font-mono space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#C51F1F] mx-auto" />
                <h3 className="text-2xl font-bold text-white">MESSAGE SENT SUCCESSFULLY</h3>
                <p className="text-xs text-slate-400">Thank you! Your message has been sent directly to vijayrajan2006@gmail.com.</p>
                <button onClick={() => setContactSubmitted(false)} className="mt-4 px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-[#C51F1F] hover:text-white transition-all">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 font-sans text-xs sm:text-sm">
                {sendError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 font-mono text-xs text-center">
                    {sendError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-slate-300 mb-2 font-bold">Name</label>
                    <input required name="user_name" type="text" placeholder="Your Name" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                  </div>
                  <div>
                    <label className="block font-mono text-slate-300 mb-2 font-bold">Email</label>
                    <input required name="user_email" type="email" placeholder="your.email@domain.com" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-2 font-bold">Subject</label>
                  <input required name="subject" type="text" placeholder="Opportunity / Project Discussion" className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F]" />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-2 font-bold">Message</label>
                  <textarea required name="message" rows={5} placeholder="Write your message..." className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#C51F1F] resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-2xl bg-[#C51F1F] text-white font-extrabold font-mono text-sm hover:bg-[#a01818] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-center">
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <div className="text-slate-400">Direct Email</div>
              <a href={`mailto:${personalInfo.email}`} className="text-white font-bold block mt-1 hover:text-[#C51F1F]">{personalInfo.email}</a>
            </div>
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <div className="text-slate-400">Current Location</div>
              <div className="text-[#C51F1F] font-bold mt-1">{personalInfo.location}</div>
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  );
}
