import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 6000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#d946ef'),
      new THREE.Color('#14b8a6'),
      new THREE.Color('#818cf8'),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.2;
    ref.current.rotation.y = t * 0.03;

    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(t * 0.5 + i * 0.01) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
};

const FloatingOrb = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.3 + position[1]) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} />
    </mesh>
  );
};

const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-primary-950/50 via-transparent to-accent-950/30" />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <ParticleField />
        <FloatingOrb position={[-4, 2, -3]} color="#6366f1" scale={2} />
        <FloatingOrb position={[5, -1, -4]} color="#d946ef" scale={1.5} />
        <FloatingOrb position={[0, -3, -2]} color="#14b8a6" scale={1.8} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
