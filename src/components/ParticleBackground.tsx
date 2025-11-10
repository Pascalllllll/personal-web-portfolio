import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
  mouseVelocity: { x: number; y: number };
}

const ParticleSystem = ({ mousePosition, mouseVelocity }: ParticleSystemProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0.01;
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speed = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
    const isMoving = speed > 0.01;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Forward movement (Z-axis)
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Reset particles that go too far
      if (positions[i3 + 2] > 5) {
        positions[i3 + 2] = -5;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
      }
      
      // Mouse interaction - particles move opposite to cursor
      if (isMoving) {
        const dx = positions[i3] - mousePosition.x * 10;
        const dy = positions[i3 + 1] - mousePosition.y * 10;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        
        if (distance < 5) {
          const force = (1 - distance / 5) * 0.2;
          positions[i3] += mouseVelocity.x * force * 2;
          positions[i3 + 1] -= mouseVelocity.y * force * 2;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a78bfa"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      mouseVelocity.current = {
        x: x - lastPosition.current.x,
        y: y - lastPosition.current.y,
      };
      
      mousePosition.current = { x, y };
      lastPosition.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleSystem 
          mousePosition={mousePosition.current} 
          mouseVelocity={mouseVelocity.current}
        />
      </Canvas>
    </div>
  );
};
