import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CyberGlobe } from './CyberGlobe';
import { NetworkParticles } from './NetworkParticles';
import { CyberGrid } from './CyberGrid';
import { FallbackHero } from './FallbackHero';

// Check if WebGL is supported
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

/**
 * HeroScene renders the 3D CyberGlobe scene.
 *
 * Props:
 *   fullscreen {boolean} — When true, the canvas fills its parent container
 *                          (used for the full-screen hero background).
 *                          When false (default), uses fixed-height sizing for
 *                          embedded / sidebar usage.
 */
export const HeroScene = ({ fullscreen = false }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!hasWebGL || hasError || prefersReducedMotion) {
    return <FallbackHero />;
  }

  return (
    <div
      className={
        fullscreen
          ? 'relative w-full h-full pointer-events-none'
          : 'relative w-full h-[520px] md:h-[620px] lg:h-[720px] pointer-events-auto'
      }
    >
      <Canvas
        camera={{ position: [0, 0, fullscreen ? 8.0 : 7.5], fov: fullscreen ? 48 : 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={fullscreen ? 0.35 : 0.4} />
          <pointLight position={[10, 10, 10]} intensity={fullscreen ? 1.5 : 1.2} color="#00F5A0" />
          <pointLight position={[-10, -10, -10]} intensity={fullscreen ? 1.0 : 0.8} color="#8065FF" />
          <directionalLight position={[0, 8, 5]} intensity={0.6} color="#00D4C8" />

          {/* 3D Elements — centrally placed holographic globe */}
          <CyberGlobe radius={fullscreen ? 2.6 : 2.2} position={[0, 0, 0]} />
          <NetworkParticles count={fullscreen ? 200 : 140} />
          <CyberGrid />
        </Suspense>
      </Canvas>

      {/* HUD Overlays — only shown in sidebar (non-fullscreen) mode */}
      {!fullscreen && (
        <>
          <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center space-x-2 glass-panel px-3 py-1.5 rounded border border-cyber-neonGreen/30">
            <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-ping" />
            <span className="font-mono text-xs tracking-wider text-cyber-neonGreen font-semibold">
              DEFENSE TELEMETRY LIVE
            </span>
          </div>

          <div className="absolute bottom-6 left-6 pointer-events-none hidden md:block">
            <div className="font-mono text-[11px] text-cyber-dim space-y-0.5">
              <p>LATENCY: 12ms // PACKET LOSS: 0.00%</p>
              <p>SEC PROTOCOL: TLS 1.3 / ENCRYPTED</p>
              <p>LOC: 10.7870° N, 79.1378° E (THANJAVUR HQ)</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
