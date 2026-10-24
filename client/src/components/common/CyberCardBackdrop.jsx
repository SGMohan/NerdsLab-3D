import React from 'react';

/**
 * CyberCardBackdrop
 * Renders subtle cybersecurity-inspired animated backgrounds on the left and right flanks
 * of card sections. Keeps the center area clean so cards and typography remain 100% readable.
 *
 * Props:
 *  - variant: 'green' | 'teal' | 'violet' (accent hue)
 *  - className: extra wrapper styling
 */
export const CyberCardBackdrop = ({ variant = 'green', className = '' }) => {
  const accentColor =
    variant === 'violet' ? '#8065FF' : variant === 'teal' ? '#00D4C8' : '#00F5A0';

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      {/* ── LEFT FLANK: Circuit Lines, Data Stream & Pulsing Nodes ── */}
      <div className="absolute top-0 bottom-0 left-0 w-48 sm:w-72 md:w-96 overflow-hidden">
        {/* Soft radial glow */}
        <div
          className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Animated SVG Circuit Lines */}
        <svg
          className="w-full h-full opacity-45"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`grad-left-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.85" />
              <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
            <pattern id={`dots-left-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={accentColor} fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* Background grid dots on left */}
          <rect width="180" height="100%" fill={`url(#dots-left-${variant})`} />

          {/* Circuit Traces */}
          <path
            d="M 10 0 L 10 240 L 60 290 L 60 520 L 120 580 L 120 800"
            fill="none"
            stroke={`url(#grad-left-${variant})`}
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
          <path
            d="M 40 80 L 40 380 L 90 430 L 90 800"
            fill="none"
            stroke={`url(#grad-left-${variant})`}
            strokeWidth="1"
            strokeDasharray="12 8"
          />
          <path
            d="M 0 160 L 70 160 L 110 200 L 110 400"
            fill="none"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          {/* Pulsing Nodes */}
          <circle cx="10" cy="240" r="3.5" fill={accentColor} className="animate-pulse" />
          <circle cx="60" cy="290" r="2.5" fill="#00D4C8" />
          <circle cx="60" cy="520" r="4" fill={accentColor} className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="120" cy="580" r="3" fill="#8065FF" />
          <circle cx="40" cy="380" r="3" fill={accentColor} />
          <circle cx="90" cy="430" r="2.5" fill="#00F5A0" />
        </svg>

        {/* Ambient Binary / Hex Data Stream */}
        <div className="absolute top-12 left-4 font-mono text-[9px] text-cyber-neonGreen/45 tracking-widest leading-loose select-none hidden sm:block">
          <div>0x7F // SEC_LAB</div>
          <div>NET: 10.0.4.12</div>
          <div>PORT: 443 [EST]</div>
          <div>SYN_ACK // OK</div>
          <div>SIG: SHA256</div>
          <div>PACKET: 1024B</div>
          <div>LAT: 12MS // P0</div>
        </div>
      </div>

      {/* ── RIGHT FLANK: Radar Grid, Scanner Crosshairs & Telemetry ── */}
      <div className="absolute top-0 bottom-0 right-0 w-48 sm:w-72 md:w-96 overflow-hidden">
        {/* Soft radial glow */}
        <div
          className="absolute top-1/3 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Animated SVG Radar & Grid */}
        <svg
          className="w-full h-full opacity-45"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`grad-right-${variant}`} x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.85" />
              <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
            <pattern id={`dots-right-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="2" r="1" fill={accentColor} fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* Background grid dots on right */}
          <rect x="120" width="180" height="100%" fill={`url(#dots-right-${variant})`} />

          {/* Right Circuit Traces */}
          <path
            d="M 290 0 L 290 280 L 240 330 L 240 560 L 180 620 L 180 800"
            fill="none"
            stroke={`url(#grad-right-${variant})`}
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
          <path
            d="M 260 120 L 260 420 L 210 470 L 210 800"
            fill="none"
            stroke={`url(#grad-right-${variant})`}
            strokeWidth="1"
            strokeDasharray="10 8"
          />

          {/* Concentric Radar Rings in top right */}
          <g transform="translate(260, 200)">
            <circle r="40" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
            <circle r="80" fill="none" stroke={accentColor} strokeWidth="1" strokeOpacity="0.2" />
            <circle r="120" fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.1" />
            <line x1="-130" y1="0" x2="130" y2="0" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.25" />
            <line x1="0" y1="-130" x2="0" y2="130" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.25" />
          </g>

          {/* Pulsing Nodes */}
          <circle cx="290" cy="280" r="3.5" fill={accentColor} className="animate-pulse" />
          <circle cx="240" cy="330" r="2.5" fill="#00D4C8" />
          <circle cx="240" cy="560" r="4" fill={accentColor} className="animate-ping" style={{ animationDuration: '3.5s' }} />
          <circle cx="180" cy="620" r="3" fill="#8065FF" />
          <circle cx="260" cy="420" r="3" fill={accentColor} />
        </svg>

        {/* Ambient Right Telemetry Info */}
        <div className="absolute top-20 right-4 font-mono text-[9px] text-cyber-teal/45 tracking-widest leading-loose text-right select-none hidden sm:block">
          <div>[DEFENSE GRID]</div>
          <div>ENCR: AES-GCM</div>
          <div>NODE_STATUS: UP</div>
          <div>TELEMETRY: LIVE</div>
          <div>SCAN: ACTIVE</div>
          <div>THANJAVUR HQ</div>
        </div>
      </div>
    </div>
  );
};
