import React from 'react';
import { Navigation, ExternalLink, Building } from 'lucide-react';

export const NerdsLabMap = ({ className = '' }) => {
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=VETRI+E-SQUARE,+New+Bus+Stand+back+side,+next+to+Omnibus+Stand,+Thanjavur,+Tamil+Nadu+613005';

  return (
    <div className={`relative rounded-2xl glass-panel-glow border border-cyber-neonGreen/40 overflow-hidden shadow-2xl bg-cyber-card/90 ${className}`}>
      {/* Top HUD Bar with verified location & directions button */}
      <div className="px-5 py-3.5 bg-cyber-surface/95 border-b border-cyber-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyber-neonGreen/10 border border-cyber-neonGreen/40 flex items-center justify-center text-cyber-neonGreen shrink-0">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyber-text tracking-wide flex items-center space-x-1.5">
              <span>NERDS LAB HQ • VETRI E-SQUARE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-neonGreen animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-cyber-dim">
              COORDINATES: 10.7515° N, 79.1125° E • THANJAVUR, TN
            </div>
          </div>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-cyber-neonGreen hover:bg-cyber-teal text-black font-roboto font-bold text-xs uppercase tracking-wider shadow-neon-green transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>

      {/* Interactive Map Iframe — responsive, fully visible, correctly sized */}
      <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] bg-[#070A0F]">
        <iframe
          title="NERDS LAB Headquarters Location - Vetri E-Square, Thanjavur"
          src="https://maps.google.com/maps?q=VETRI+E-SQUARE,+New+Bus+Stand+back+side,+Thanjavur,+Tamil+Nadu+613005&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full block"
        />

        {/* Ambient Dark Corner Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(7,10,15,0.45)]" />
      </div>
    </div>
  );
};
