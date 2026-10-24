import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { NetworkParticles } from '../3d/NetworkParticles';

/**
 * ContactBackground
 * The 3D Network Particle Convergence background animation from the Contact page.
 * Used for: About, Training, and CourseDetails pages.
 */
export const ContactBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 3D Network Particle Convergence Layer */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F5A0" />
            <pointLight position={[-10, -10, -10]} intensity={1.0} color="#8065FF" />
            <NetworkParticles count={160} converge={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyber-neonGreen/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-violet/8 blur-[180px] rounded-full pointer-events-none" />

      {/* Vignette Overlay for Crisp Readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(7,10,15,0.7) 70%, rgba(7,10,15,0.95) 100%)',
        }}
      />
    </div>
  );
};
