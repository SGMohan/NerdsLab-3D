import React, { useState, useEffect } from 'react';
import { prefersReducedMotion } from '../../hooks/useScrollAnimation';

/**
 * WebsiteLoader
 * Premium full-screen cybersecurity loading animation featuring the authentic nerdslab-logo.png.
 * Fast, responsive (~1.1s total duration), with smooth scale/fade exit transition.
 */
export const WebsiteLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING DEFENSE SYSTEMS...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, finish immediately
    if (prefersReducedMotion()) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    // Trigger slow, smooth logo reveal shortly after mount
    const logoTimer = setTimeout(() => {
      setLogoRevealed(true);
    }, 80);

    const startTime = Date.now();
    const duration = 1200; // ~1.2s smooth loading duration

    const statusUpdates = [
      { at: 15, text: 'AUTHENTICATING ENCRYPTED LABS...' },
      { at: 40, text: 'SYNCHRONIZING THREAT INTELLIGENCE...' },
      { at: 70, text: 'ACTIVATING 3D HOLOGRAPHIC GLOBE...' },
      { at: 92, text: 'CALIBRATING DEFENSE TELEMETRY...' },
      { at: 99, text: 'ACCESS GRANTED // NERDS LAB ACADEMY' },
    ];

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      for (let i = statusUpdates.length - 1; i >= 0; i--) {
        if (pct >= statusUpdates[i].at) {
          setStatusText(statusUpdates[i].text);
          break;
        }
      }

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 450);
        }, 180);
      }
    }, 25);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(timer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading NERDS LAB Cybersecurity Academy"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05080E] transition-all duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Ambient Radiance */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-cyber-neonGreen/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute w-[380px] h-[380px] bg-cyber-violet/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Rotating Cyber Radar Rings & Slow Smooth Logo Reveal */}
      <div className="relative flex items-center justify-center">
        {/* Outer Orbiting Ring */}
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyber-neonGreen/20 border-dashed animate-[spin_12s_linear_infinite] pointer-events-none" />
        
        {/* Second Reverse Ring */}
        <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-cyber-teal/30 border-t-transparent border-l-transparent animate-[spin_8s_linear_infinite_reverse] pointer-events-none" />

        {/* Third Glowing Pulse Ring */}
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-cyber-neonGreen/40 shadow-[0_0_30px_rgba(0,245,160,0.3)] pointer-events-none animate-ping opacity-25" />

        {/* Central Logo Container with Slow Smooth Reveal & Neon-Green Glow */}
        <div
          className={`relative z-10 p-5 sm:p-6 rounded-2xl bg-[#090E17]/90 backdrop-blur-xl border border-cyber-neonGreen/60 shadow-[0_0_40px_rgba(0,245,160,0.35)] flex items-center justify-center transition-all duration-1000 ease-out transform ${
            logoRevealed
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-2'
          }`}
        >
          {/* Subtle neon scan beam over logo */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyber-neonGreen/60 to-transparent animate-[scanLaser_2.4s_ease-in-out_infinite]" />
          </div>

          <img
            src="/nerdslab-logo.png"
            alt="NERDS LAB"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_18px_rgba(0,245,160,0.55)]"
          />
        </div>
      </div>

      {/* Progress & Telemetry Info */}
      <div className="relative z-10 mt-9 flex flex-col items-center text-center px-4 max-w-sm w-full space-y-3">
        {/* Brand Label */}
        <div className="flex items-center space-x-2 text-cyber-neonGreen font-mono text-xs tracking-[0.25em] uppercase">
          <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-ping" />
          <span className="font-bold">NERDS LAB</span>
          <span className="text-cyber-dim">•</span>
          <span className="text-cyber-teal font-semibold">CYBER ACADEMY</span>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-full h-1.5 bg-[#0C121C] rounded-full overflow-hidden border border-cyber-border/80 shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-cyber-neonGreen via-cyber-teal to-cyber-violet rounded-full transition-all duration-75 ease-out shadow-[0_0_14px_rgba(0,245,160,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry Status Readout & Counter */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-cyber-dim pt-1">
          <span className="text-cyber-muted tracking-wider truncate max-w-[240px]">
            {statusText}
          </span>
          <span className="text-cyber-neonGreen font-bold ml-2">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
