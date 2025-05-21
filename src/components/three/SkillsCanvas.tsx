import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';

type Skill = {
  name: string;
  level: number;
  category: string;
  icon: string;
};

type SkillCloudProps = {
  skills: Skill[];
};

const Word = ({ children, ...props }: any) => {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 1.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
    ...props
  };
  
  const [hovered, setHovered] = useState(false);
  const over = (e: any) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);
  
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => { document.body.style.cursor = 'auto' };
  }, [hovered]);
  
  return (
    <Text
      onPointerOver={over}
      onPointerOut={out}
      {...fontProps}
      color={hovered ? '#f97316' : props.color}
    >
      {children}
    </Text>
  );
};

function Cloud({ skills }: SkillCloudProps) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  // Scale factor based on skill level (higher level = closer to center)
  const getRadiusFromLevel = (level: number) => {
    return 10 - (level / 20); // Normalize to a reasonable radius range
  };

  // Generate positions on a sphere based on skill level
  const positions = skills.map(skill => {
    const radius = getRadiusFromLevel(skill.level);
    const phi = Math.acos(-1 + Math.random() * 2);
    const theta = Math.random() * Math.PI * 2;
    
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    ];
  });

  // Responsive font size adjustment
  const getFontSize = () => {
    return Math.min(1, Math.max(0.5, viewport.width / 50));
  };

  const fontSize = getFontSize();

  return (
    <group ref={ref}>
      {skills.map((skill, i) => (
        <Word 
          key={i} 
          position={positions[i]} 
          fontSize={fontSize * (skill.level / 70)} // Size based on skill level
          color={skill.category === 'backend' ? '#3b82f6' : 
                skill.category === 'database' ? '#10b981' :
                skill.category === 'mobile' ? '#f97316' : '#8b5cf6'}
        >
          {skill.name}
        </Word>
      ))}
    </group>
  );
}

const SkillsCanvas: React.FC<SkillCloudProps> = ({ skills }) => {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 50 }}>
      <fog attach="fog" args={['#202025', 0, 30]} />
      <Cloud skills={skills} />
      <TrackballControls 
        noZoom 
        noPan 
        rotateSpeed={2.5}
        minDistance={10}
        maxDistance={25}
      />
    </Canvas>
  );
};

export default SkillsCanvas;