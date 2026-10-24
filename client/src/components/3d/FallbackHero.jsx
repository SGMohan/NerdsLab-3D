import React from 'react';
import { Shield, Radio, Activity } from 'lucide-react';

export const FallbackHero = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Outer Pulse Rings */}
      <div className="absolute w-[440px] h-[440px] rounded-full border border-cyber-neonGreen/20 animate-ping opacity-20 pointer-events-none" />
      <div className="absolute w-[380px] h-[380px] rounded-full border border-cyber-teal/30 animate-pulse pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-cyber-violet/40 animate-spin [animation-duration:35s] pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] rounded-full border border-cyber-neonGreen/40 animate-spin [animation-duration:20s] pointer-events-none" />

      {/* Central Cyber Core */}
      <div className="relative z-10 w-44 h-44 rounded-full bg-cyber-surface/90 border-2 border-cyber-neonGreen shadow-neon-green flex flex-col items-center justify-center p-4 backdrop-blur-md">
        <div className="relative mb-2">
          <Shield className="w-14 h-14 text-cyber-neonGreen animate-bounce" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-teal rounded-full animate-ping" />
        </div>
        <span className="text-xs font-mono font-bold tracking-widest text-cyber-text">DEFENSE GRID</span>
        <span className="text-[10px] font-mono text-cyber-neonGreen">STATUS: ACTIVE</span>
      </div>

      {/* Floating telemetry pills */}
      <div className="absolute top-12 right-8 glass-panel px-3 py-1.5 rounded-full flex items-center space-x-2 border border-cyber-neonGreen/30 animate-float">
        <Radio className="w-3.5 h-3.5 text-cyber-neonGreen animate-pulse" />
        <span className="text-xs font-mono text-cyber-muted">THREAT MONITOR: 0 ALERTS</span>
      </div>

      <div className="absolute bottom-14 left-6 glass-panel px-3 py-1.5 rounded-full flex items-center space-x-2 border border-cyber-violet/30 animate-float [animation-delay:2s]">
        <Activity className="w-3.5 h-3.5 text-cyber-violet" />
        <span className="text-xs font-mono text-cyber-muted">SEC OPS: ONLINE</span>
      </div>
    </div>
  );
};
