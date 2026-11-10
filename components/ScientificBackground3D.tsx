'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TechnicalNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const polyRef = useRef<THREE.LineSegments>(null);

  const [particles, colors] = useMemo(() => {
    const count = 140;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#38bdf8');
    const steelBlue = new THREE.Color('#386cb0');
    const deepCyan = new THREE.Color('#0284c7');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;

      const c = Math.random() > 0.5 ? cyan : (Math.random() > 0.5 ? steelBlue : deepCyan);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  const wireGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(7, 1);
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.035;
      pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.06;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.08;
      ring1Ref.current.rotation.y = t * 0.06;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.07;
      ring2Ref.current.rotation.y = -t * 0.05;
    }
    if (polyRef.current) {
      polyRef.current.rotation.y = t * 0.04;
      polyRef.current.rotation.x = t * 0.02;
    }
  });

  return (
    <group position={[0, 0, -4]}>
      <lineSegments ref={polyRef}>
        <primitive object={wireGeo} attach="geometry" />
        <lineBasicMaterial color="#386cb0" transparent opacity={0.12} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[8.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.25} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[11.5, 0.015, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function ScientificBackground3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <TechnicalNetwork />
      </Canvas>
    </div>
  );
}
