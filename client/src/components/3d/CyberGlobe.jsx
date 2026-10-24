import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fibonacci sphere distribution for nodes
function generateSpherePoints(count, radius) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

// Generate quadratic bezier curve arc between two sphere points
function createArc(p1, p2, altitude = 0.4) {
  const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const distance = p1.distanceTo(p2);
  mid.normalize().multiplyScalar(p1.length() + distance * altitude);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const points = curve.getPoints(24);
  return new THREE.BufferGeometry().setFromPoints(points);
}

export const CyberGlobe = ({ radius = 2.4, position = [0, 0, 0] }) => {
  const groupRef = useRef();
  const innerGlobeRef = useRef();
  const ringRef = useRef();

  // Generate nodes on the globe
  const nodeCount = 90;
  const nodes = useMemo(() => generateSpherePoints(nodeCount, radius), [radius]);

  // Connect pairs of nodes with arcs to simulate threat intelligence telemetry
  const arcs = useMemo(() => {
    const arcGeometries = [];
    // select 12 pairs of nodes
    for (let i = 0; i < 14; i++) {
      const idx1 = (i * 7) % nodeCount;
      const idx2 = (i * 13 + 5) % nodeCount;
      arcGeometries.push(createArc(nodes[idx1], nodes[idx2], 0.35));
    }
    return arcGeometries;
  }, [nodes]);

  // Node point positions buffer
  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3);
    nodes.forEach((pt, i) => {
      arr[i * 3] = pt.x;
      arr[i * 3 + 1] = pt.y;
      arr[i * 3 + 2] = pt.z;
    });
    return arr;
  }, [nodes]);

  // Scroll tracking for scroll-driven rotation and zoom
  const scrollYRef = useRef(0);
  const startTimeRef = useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.getElapsedTime();
    }
    const elapsed = state.clock.getElapsedTime() - startTimeRef.current;
    // Smooth boot-up scale entrance (0.75 -> 1.0) over 1.2s
    const entranceProgress = Math.min(elapsed / 1.2, 1);
    const entranceEase = 1 - Math.pow(1 - entranceProgress, 3);
    const entranceScale = THREE.MathUtils.lerp(0.78, 1, entranceEase);

    // Scroll progress normalized to hero height
    const scrollFactor = Math.min(scrollYRef.current / (window.innerHeight || 800), 2);

    if (groupRef.current) {
      // Base continuous rotation + scroll-accelerated rotation
      groupRef.current.rotation.y += delta * 0.18 + scrollFactor * 0.008;

      // Mouse parallax
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = -(state.pointer.y * Math.PI) / 8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetX, 0.05);

      // Scroll-driven scale zoom transition multiplied by entrance scale
      const targetScale = (1 + scrollFactor * 0.35) * entranceScale;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y -= delta * (0.08 + scrollFactor * 0.04);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.12 + scrollFactor * 0.08);
      ringRef.current.rotation.x = Math.PI / 3 + scrollFactor * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 28, 28]} />
        <meshBasicMaterial
          color="#00F5A0"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner Dense Core Sphere */}
      <mesh ref={innerGlobeRef}>
        <sphereGeometry args={[radius * 0.98, 18, 18]} />
        <meshBasicMaterial
          color="#00D4C8"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Dark inner occluder for depth */}
      <mesh>
        <sphereGeometry args={[radius * 0.96, 24, 24]} />
        <meshBasicMaterial color="#070A0F" transparent opacity={0.85} />
      </mesh>

      {/* Surface Network Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#00F5A0"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Major Cyber Hubs (larger pulsing spheres) */}
      {[0, 15, 30, 48, 65, 82].map((idx) => (
        <mesh key={idx} position={nodes[idx]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#8065FF" />
        </mesh>
      ))}

      {/* Cyber Arcs */}
      {arcs.map((geo, index) => (
        <line key={index} geometry={geo}>
          <lineBasicMaterial
            color={index % 2 === 0 ? "#00F5A0" : "#00D4C8"}
            transparent
            opacity={0.45}
            linewidth={1.5}
          />
        </line>
      ))}

      {/* Orbital Cyber Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[radius * 1.3, radius * 1.32, 64]} />
        <meshBasicMaterial
          color="#00F5A0"
          side={THREE.DoubleSide}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Second Violet Ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[radius * 1.45, radius * 1.46, 64]} />
        <meshBasicMaterial
          color="#8065FF"
          side={THREE.DoubleSide}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};
