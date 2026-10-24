import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * QuestionMark3DBackgroundCore
 * Futuristic 3D holographic Question Mark floating in 3D space
 * with multiple rotating telemetry rings, glowing core, and cyber particles.
 */
const HolographicQuestionMark = () => {
  const groupRef = useRef();
  const qmarkRef = useRef();
  const dotRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particlesRef = useRef();

  // Generate 120 cosmic ambient floating particles
  const particlePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 140; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3.5 + Math.random() * 4.5;
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Subtle breathing float & steady 3D rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.28;
      groupRef.current.position.y = Math.sin(t * 0.75) * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    }

    if (dotRef.current) {
      dotRef.current.rotation.y += delta * 0.85;
      const dotScale = 1.0 + Math.sin(t * 2.2) * 0.06;
      dotRef.current.scale.set(dotScale, dotScale, dotScale);
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.45;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.35;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.25;
      ring3Ref.current.rotation.z += delta * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.035;
      particlesRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.25}>
      {/* ── 3D Question Mark Body ── */}
      <group ref={qmarkRef} position={[0, 0.1, 0]}>
        {/* Upper curved arch of '?' */}
        <mesh position={[0, 1.0, 0]}>
          <torusGeometry args={[1.05, 0.24, 28, 56, Math.PI * 1.3]} />
          <meshStandardMaterial
            color="#00F5A0"
            emissive="#00D4C8"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Vertical hook stem of '?' */}
        <mesh position={[0.32, 0.24, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.9, 28]} />
          <meshStandardMaterial
            color="#00D4C8"
            emissive="#00F5A0"
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.75}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Lower floating beacon dot of '?' */}
        <mesh ref={dotRef} position={[0.32, -0.92, 0]}>
          <sphereGeometry args={[0.32, 28, 28]} />
          <meshStandardMaterial
            color="#8065FF"
            emissive="#8065FF"
            emissiveIntensity={0.9}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>

      {/* ── Concentric Orbital Telemetry Rings ── */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3.2, 0, 0]}>
        <ringGeometry args={[2.8, 2.86, 80]} />
        <meshBasicMaterial color="#00F5A0" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, Math.PI / 6, 0]}>
        <ringGeometry args={[3.45, 3.52, 80]} />
        <meshBasicMaterial color="#8065FF" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
        <ringGeometry args={[4.1, 4.16, 80]} />
        <meshBasicMaterial color="#00D4C8" side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>

      {/* Floating cyber particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00F5A0" size={0.065} transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
};

/**
 * FAQBackground
 * Full-screen fixed 3D question mark background animation for the FAQ page.
 * Creates an immersive holographic cybersecurity environment behind the FAQ content.
 */
export const FAQBackground = () => {
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
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[8, 8, 8]} intensity={2.2} color="#00F5A0" />
        <pointLight position={[-8, -8, -6]} intensity={1.6} color="#8065FF" />
        <directionalLight position={[0, 6, 6]} intensity={1.0} color="#00D4C8" />

        <HolographicQuestionMark />
      </Canvas>

      {/* Soft gradient veil to keep FAQ text and cards 100% readable while keeping the 3D question mark visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 35%, rgba(5,7,11,0.55) 0%, rgba(5,7,11,0.85) 60%, rgba(5,7,11,0.96) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

