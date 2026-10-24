import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, ShieldCheck, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useModal } from '../../context/ModalContext';
import { api } from '../../services/api';

const demoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number with at least 10 digits'),
  selectedCourse: z.string().min(1, 'Please select a training programme'),
  message: z.string().optional(),
});

export const DemoModal = () => {
  const { isDemoModalOpen, closeDemoModal, preselectedCourse } = useModal();
  const [serverState, setServerState] = useState({ loading: false, success: false, error: null });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      selectedCourse: 'Ethical Hacking Nerd (C-EHN)',
      message: '',
    },
  });

  useEffect(() => {
    if (preselectedCourse) {
      setValue('selectedCourse', preselectedCourse);
    }
  }, [preselectedCourse, setValue]);

  if (!isDemoModalOpen) return null;

  const onSubmit = async (data) => {
    setServerState({ loading: true, success: false, error: null });
    try {
      await api.submitEnquiry({
        ...data,
        enquiryType: 'Free Demo Request',
        subject: `Free Demo Request: ${data.selectedCourse}`,
      });

      setServerState({ loading: false, success: true, error: null });

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F5A0', '#00D4C8', '#8065FF'],
      });

      reset();
    } catch (err) {
      setServerState({
        loading: false,
        success: false,
        error: err.message || 'Failed to submit demo request. Please try again.',
      });
    }
  };

  const handleClose = () => {
    setServerState({ loading: false, success: false, error: null });
    closeDemoModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-glow bg-cyber-surface/95 border border-cyber-neonGreen/40 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-cyber-card transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {serverState.success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyber-neonGreen/10 border-2 border-cyber-neonGreen flex items-center justify-center mx-auto shadow-neon-green">
              <CheckCircle2 className="w-8 h-8 text-cyber-neonGreen" />
            </div>
            <h3 className="text-2xl font-display font-bold text-cyber-text">Demo Session Reserved!</h3>
            <p className="text-sm text-cyber-muted max-w-sm mx-auto leading-relaxed">
              Your free demo inquiry has been registered in the NERDS LAB defense training portal. Our academic coordinator will contact you via WhatsApp / Call shortly.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase tracking-wider shadow-neon-green"
              >
                Back to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyber-neonGreen/10 border border-cyber-neonGreen/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyber-neonGreen" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-cyber-text">Request a Free Demo</h3>
                <p className="text-xs text-cyber-muted">Experience our hands-on live training labs before enrolling.</p>
              </div>
            </div>

            {serverState.error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 flex items-center space-x-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{serverState.error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyber-muted mb-1">Full Name *</label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="e.g. Alex Hunter"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-card border border-cyber-border focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.fullName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-cyber-muted mb-1">Email Address *</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-card border border-cyber-border focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-cyber-muted mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-card border border-cyber-border focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyber-muted mb-1">Training Programme *</label>
                <select
                  {...register('selectedCourse')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cyber-card border border-cyber-border focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen outline-none text-sm text-cyber-text transition-colors"
                >
                  <option value="Ethical Hacking Nerd (C-EHN)">Ethical Hacking Nerd (C-EHN) — ₹22,000 + GST</option>
                  <option value="Penetration Testing Nerd (C-PTN)">Penetration Testing Nerd (C-PTN) — ₹75,000 + GST</option>
                  <option value="Web Application Security Nerd (C-WASN)">Web Application Security Nerd (C-WASN) — ₹75,000 + GST</option>
                  <option value="Cloud Security Nerd (C-CSN)">Cloud Security Nerd (C-CSN) — ₹75,000 + GST</option>
                  <option value="SOC Analysis Nerd (C-SAN)">SOC Analysis Nerd (C-SAN) — ₹75,000 + GST</option>
                </select>
                {errors.selectedCourse && (
                  <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.selectedCourse.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-cyber-muted mb-1">Message or Queries (Optional)</label>
                <textarea
                  {...register('message')}
                  rows={2}
                  placeholder="Tell us about your learning goals or schedule preference..."
                  className="w-full px-3.5 py-2 rounded-lg bg-cyber-card border border-cyber-border focus:border-cyber-neonGreen focus:ring-1 focus:ring-cyber-neonGreen outline-none text-sm text-cyber-text placeholder:text-cyber-dim transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={serverState.loading}
                  className="w-full py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {serverState.loading ? (
                    <span className="animate-pulse">TRANSMITTING REQUEST...</span>
                  ) : (
                    <>
                      <span>Confirm Free Demo Booking</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
