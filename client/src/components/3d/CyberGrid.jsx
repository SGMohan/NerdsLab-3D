import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const CyberGrid = () => {
  const gridRef = useRef();

  useFrame((_, delta) => {
    if (gridRef.current) {
      const scrollBonus = Math.min((window.scrollY || 0) / 1200, 1) * 0.6;
      gridRef.current.position.z = (gridRef.current.position.z + delta * (0.4 + scrollBonus)) % 1;
    }
  });

  return (
    <group position={[0, -3.2, 0]}>
      <gridHelper
        ref={gridRef}
        args={[30, 30, '#00F5A0', '#1B2636']}
        position={[0, 0, 0]}
      />
    </group>
  );
};
