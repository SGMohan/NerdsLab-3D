import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Compass,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 bg-[#070A0F] text-cyber-text flex items-center justify-center">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-[240px] h-[240px] bg-cyber-neonGreen/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Cyber Perimeter Container (Compact, flexible, no clipping) ── */}
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-red-500/30 bg-gradient-to-b from-[#090F1B]/95 via-[#070A0F]/95 to-[#05070B] p-4 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
          
          {/* Cyber Corner Accents */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500/70 pointer-events-none" />

          {/* ── Top Telemetry Header Bar with Proper Bottom Spacing ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-red-500/20 pb-3 mb-6 sm:mb-8 text-[10px] sm:text-xs font-mono gap-1 sm:gap-0">
            <div className="flex items-center space-x-2 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span className="font-bold tracking-widest uppercase">DEFENSE PERIMETER // ALARM</span>
            </div>
            <div className="flex items-center space-x-3 text-cyber-dim">
              <span>SECTOR: 0x404</span>
              <span className="text-red-400 font-bold">CLEARANCE: DENIED</span>
            </div>
          </div>

          {/* ── Streamlined Central Content ── */}
          <div className="text-center max-w-lg mx-auto space-y-3.5 my-1">
            
            {/* Holographic 404 Orbital Icon */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-red-500/40 animate-[spin_12s_linear_infinite]" />
              <div className="absolute -inset-1.5 rounded-full border border-red-500/25 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-red-600/30 via-red-950/60 to-transparent border border-red-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.45)]">
                <ShieldAlert className="w-5 h-5 sm:w-7 sm:h-7 text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              </div>
            </div>

            {/* Error Status Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <AlertTriangle className="w-3 h-3" />
              <span>404 // ROUTE UNREGISTERED</span>
            </div>

            {/* Main 404 Headline */}
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-none">
              4<span className="text-red-400 animate-pulse">0</span>4
            </h1>

            <h2 className="text-base sm:text-xl font-display font-bold text-cyber-text">
              Target Resource Not Found
            </h2>

            <p className="text-xs sm:text-sm text-cyber-muted max-w-sm mx-auto leading-relaxed">
              The requested cybersecurity sector does not exist within the active <strong className="text-cyber-text">NERDS LAB</strong> network.
            </p>

            {/* Action CTA Button */}
            <div className="pt-3 pb-1 flex items-center justify-center">
              <Link
                to="/trainings"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all flex items-center justify-center space-x-2 group hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Explore Training Tracks</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* ── Bottom Telemetry Footer Strip ── */}
          <div className="border-t border-red-500/20 pt-2.5 mt-5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-cyber-dim gap-1 sm:gap-0">
            <span>NERDS LAB TELEMETRY</span>
            <span className="text-cyber-teal">NETWORK ISOLATED &amp; SECURED</span>
          </div>

        </div>
      </div>
    </div>
  );
};
