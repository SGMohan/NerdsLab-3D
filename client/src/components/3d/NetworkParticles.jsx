import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NetworkParticles = ({ count = 200, converge = false }) => {
  const pointsRef = useRef();

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const greenColor = new THREE.Color('#00F5A0');
    const tealColor = new THREE.Color('#00D4C8');
    const violetColor = new THREE.Color('#8065FF');

    for (let i = 0; i < count; i++) {
      // Spread in 3D volume
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 14;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Color selection
      const rand = Math.random();
      const chosen = rand > 0.6 ? greenColor : rand > 0.3 ? tealColor : violetColor;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, initPos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (converge ? 0.08 : 0.03);
      pointsRef.current.rotation.x += delta * 0.015;

      if (converge) {
        // Converge particles toward a focal ring/core around the center
        const posAttr = pointsRef.current.geometry.attributes.position;
        const currentArr = posAttr.array;
        const targetRadius = 3.2;
        const t = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          // Target position on a swirling cyber torus / sphere
          const angle = (i / count) * Math.PI * 2 + t * 0.4;
          const targetX = Math.cos(angle) * (targetRadius + Math.sin(t * 2 + i) * 0.5);
          const targetY = Math.sin(angle * 2) * 1.2 + Math.cos(t + i) * 0.3;
          const targetZ = Math.sin(angle) * (targetRadius + Math.cos(t * 1.5 + i) * 0.5);

          currentArr[idx] += (targetX - currentArr[idx]) * 0.04;
          currentArr[idx + 1] += (targetY - currentArr[idx + 1]) * 0.04;
          currentArr[idx + 2] += (targetZ - currentArr[idx + 2]) * 0.04;
        }
        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
};
