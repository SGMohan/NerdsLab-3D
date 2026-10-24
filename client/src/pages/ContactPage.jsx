import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { NetworkParticles } from '../components/3d/NetworkParticles';
import { useRevealOnScroll, useStaggerReveal } from '../hooks/useScrollAnimation';
import { NerdsLabMap } from '../components/common/NerdsLabMap';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (at least 10 digits)'),
  selectedCourse: z.string().min(1, 'Please choose a course of interest'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Please enter a message with at least 10 characters'),
});

export const ContactPage = () => {
  const [formState, setFormState] = useState({ loading: false, success: false, error: null });

  const headerRef = useRef(null);
  const infoCardsRef = useRef(null);
  const formRef = useRef(null);

  useRevealOnScroll('.contact-header', headerRef, { y: 25, duration: 0.8 });
  useStaggerReveal(infoCardsRef, '.info-card', { y: 25, stagger: 0.1 });
  useRevealOnScroll('.contact-form-panel', formRef, { y: 30, duration: 0.85 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      selectedCourse: 'Ethical Hacking Nerd (C-EHN)',
      subject: 'Inquiry regarding cybersecurity training',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setFormState({ loading: true, success: false, error: null });
    try {
      await api.submitEnquiry({
        ...data,
        enquiryType: 'General Contact',
      });

      setFormState({ loading: false, success: true, error: null });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F5A0', '#00D4C8', '#8065FF'],
      });
      reset();
    } catch (err) {
      setFormState({
        loading: false,
        success: false,
        error: err.message || 'Failed to submit message. Please try again.',
      });
    }
  };

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      {/* 3D Network Particle Convergence Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00F5A0" />
            <NetworkParticles count={140} converge={true} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none z-0" />

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="contact-header text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNICATIONS GRID</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-cyber-text">
            Have Questions or <span className="text-gradient-neon">Inquiries?</span>
          </h1>
          <p className="text-sm sm:text-base text-cyber-muted leading-relaxed">
            We're here to help! Reach out to us using the contact information below, and a member of our cybersecurity training team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Verified Contact Cards & Map */}
          <div ref={infoCardsRef} className="lg:col-span-5 space-y-6">
            {/* Office Address */}
            <div className="info-card p-6 rounded-2xl glass-panel border border-cyber-border hover:border-cyber-neonGreen/40 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-neonGreen/10 border border-cyber-neonGreen/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-cyber-neonGreen" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-mono font-bold text-cyber-neonGreen uppercase">Office Address</h4>
                  <p className="text-xs text-cyber-text leading-relaxed">
                    Ground Floor, Nerds Hive, VETRI E-SQUARE,<br />
                    New Bus Stand back side, next to Omnibus Stand,<br />
                    Thanjavur, Tamil Nadu 613005
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3V9yQiP5iL3hRmH46"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-mono text-cyber-teal hover:underline pt-1"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Telephone Number */}
            <div className="info-card p-6 rounded-2xl glass-panel border border-cyber-border hover:border-cyber-teal/40 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-teal/10 border border-cyber-teal/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-cyber-teal" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-mono font-bold text-cyber-teal uppercase">Telephone Hotline</h4>
                  <p className="text-sm font-mono font-bold text-cyber-text">
                    +91 89395 31337
                  </p>
                  <a
                    href="tel:+918939531337"
                    className="inline-flex items-center text-xs font-mono text-cyber-neonGreen hover:underline pt-1"
                  >
                    <span>Click to Call Directly</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Send Mail */}
            <div className="info-card p-6 rounded-2xl glass-panel border border-cyber-border hover:border-cyber-violet/40 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-violet/10 border border-cyber-violet/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-cyber-violet" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-mono font-bold text-cyber-violet uppercase">Email Inquiries</h4>
                  <p className="text-sm font-mono font-bold text-cyber-text">
                    enroll@nerdslab.in
                  </p>
                  <a
                    href="mailto:enroll@nerdslab.in"
                    className="inline-flex items-center text-xs font-mono text-cyber-teal hover:underline pt-1"
                  >
                    <span>Send Email Now</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="info-card p-4 rounded-xl bg-cyber-surface/70 border border-cyber-border/70 flex items-center space-x-3 text-xs text-cyber-muted font-mono">
              <Clock className="w-4 h-4 text-cyber-dim shrink-0" />
              <span>Training Hours: Monday – Saturday (9:00 AM – 7:30 PM IST)</span>
            </div>
          </div>

          {/* Right Column: Full Contact Form */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="contact-form-panel p-8 sm:p-10 rounded-2xl glass-panel-glow border border-cyber-neonGreen/30 bg-cyber-card/90">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-cyber-text">Send Us a Direct Transmission</h3>
                <p className="text-xs text-cyber-muted mt-1">
                  Fill out the form below. All messages are securely routed directly to our admission counseling unit.
                </p>
              </div>

              {formState.success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-neonGreen/10 border-2 border-cyber-neonGreen flex items-center justify-center mx-auto shadow-neon-green">
                    <CheckCircle2 className="w-8 h-8 text-cyber-neonGreen" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-cyber-text">Message Received!</h4>
                  <p className="text-sm text-cyber-muted max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to NERDS LAB. Our team in Thanjavur has received your message and will respond via email or phone within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState({ loading: false, success: false, error: null })}
                    className="px-6 py-2.5 rounded-lg bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {formState.error && (
                    <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{formState.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1">Full Name *</label>
                      <input
                        type="text"
                        {...register('fullName')}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1">Email Address *</label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="alex@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+91 89395 31337"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-cyber-muted mb-1">Course of Interest *</label>
                      <select
                        {...register('selectedCourse')}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text transition-colors"
                      >
                        <option value="Ethical Hacking Nerd (C-EHN)">Ethical Hacking Nerd (C-EHN)</option>
                        <option value="Penetration Testing Nerd (C-PTN)">Penetration Testing Nerd (C-PTN)</option>
                        <option value="Web Application Security Nerd (C-WASN)">Web Application Security Nerd (C-WASN)</option>
                        <option value="Cloud Security Nerd (C-CSN)">Cloud Security Nerd (C-CSN)</option>
                        <option value="SOC Analysis Nerd (C-SAN)">SOC Analysis Nerd (C-SAN)</option>
                        <option value="General Inquiries">General / Other Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted mb-1">Subject *</label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. Schedule and batch details for Penetration Testing"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cyber-muted mb-1">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your background, prerequisites, or questions..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className="w-full py-3.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {formState.loading ? (
                        <span className="animate-pulse">TRANSMITTING TRANSMISSION...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Verified Location Map */}
        <div className="mt-16">
          <NerdsLabMap />
        </div>
      </div>
    </div>
  );
};
