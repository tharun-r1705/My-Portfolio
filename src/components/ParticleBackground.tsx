import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 200; // Reduced from 1000
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80; // Smaller spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01; // Much slower rotation
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4A00E0"
        size={0.3} // Smaller particles
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4} // Much more transparent
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const lineCount = 50; // Reduced from 200
    const positions = new Float32Array(lineCount * 6);
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      // Start point
      positions[i6] = (Math.random() - 0.5) * 40; // Smaller area
      positions[i6 + 1] = (Math.random() - 0.5) * 40;
      positions[i6 + 2] = (Math.random() - 0.5) * 40;
      // End point
      positions[i6 + 3] = (Math.random() - 0.5) * 40;
      positions[i6 + 4] = (Math.random() - 0.5) * 40;
      positions[i6 + 5] = (Math.random() - 0.5) * 40;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.005; // Much slower
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial 
        color="#00E5FF" 
        transparent 
        opacity={0.08} // Much more subtle
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 opacity-60"> {/* Added overall opacity reduction */}
      <Canvas
        camera={{ position: [0, 0, 35], fov: 60 }} // Pulled camera back slightly
        style={{ background: 'transparent' }}
      >
        <ParticleField />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}