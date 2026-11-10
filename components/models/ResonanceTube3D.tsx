'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ResonanceTube3DProps {
  frequency: number;
  waterLevelCm: number;
  isVibrating: boolean;
  soundEnabled: boolean;
  isResonating: boolean;
  resonanceScore: number;
}

export default function ResonanceTube3D({
  frequency,
  waterLevelCm,
  isVibrating,
  isResonating,
  resonanceScore,
}: ResonanceTube3DProps) {
  const tubeHeight3D = 4.5;
  const maxAirCm = 80;
  const airColumnRatio = Math.max(0.04, Math.min(0.96, waterLevelCm / maxAirCm));
  const airHeight3D = airColumnRatio * (tubeHeight3D * 0.88);
  const waterHeight3D = Math.max(0.1, tubeHeight3D - airHeight3D);
  const waterSurfaceY = 1.95 - airHeight3D;

  const forkTinesRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (forkTinesRef.current) {
      if (isVibrating) {
        const vib = Math.sin(clock.elapsedTime * 110) * 0.03;
        forkTinesRef.current.scale.set(1 + vib, 1, 1);
      } else {
        forkTinesRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* CAST-IRON TRIPOD STAND & CHROME VERTICAL ROD */}
      <group position={[-1.35, -1.9, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.75, 0.95, 0.18, 3]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.85} />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 5.0, 24]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.12} />
        </mesh>
        <mesh position={[0.68, 4.0, 0]} castShadow>
          <boxGeometry args={[1.35, 0.13, 0.18]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.68, 1.2, 0]} castShadow>
          <boxGeometry args={[1.35, 0.13, 0.18]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* GRADUATED BOROSILICATE GLASS TUBE (OUTER SHELL) */}
      <group position={[0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, tubeHeight3D, 40, 1, true]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.34}
            roughness={0.05}
            transmission={0.94}
            thickness={0.45}
            ior={1.5}
            reflectivity={0.95}
          />
        </mesh>

        {/* Laser Graduations on Glass (Electric Cyan) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={i} position={[0.304, 2.0 - i * 0.14, 0]}>
            <boxGeometry args={[0.015, i % 5 === 0 ? 0.065 : 0.03, 0.005]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={i % 5 === 0 ? 0.8 : 0.3}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* WATER COLUMN INSIDE THE TUBE */}
        <group position={[0, -tubeHeight3D / 2 + waterHeight3D / 2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.278, 0.278, waterHeight3D, 36]} />
            <meshPhysicalMaterial
              color="#0284c7"
              transparent
              opacity={0.82}
              roughness={0.08}
              transmission={0.65}
              ior={1.33}
            />
          </mesh>
          <mesh position={[0, waterHeight3D / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.01, 0.278, 32]} />
            <meshStandardMaterial
              color="#38bdf8"
              roughness={0.02}
              metalness={0.2}
              emissive="#0284c7"
              emissiveIntensity={isResonating ? 1.5 : 0.4}
            />
          </mesh>
        </group>

        {/* STANDING ACOUSTIC SOUND WAVES */}
        {isVibrating && (
          <group position={[0, (1.95 + waterSurfaceY) / 2, 0]}>
            {Array.from({ length: 9 }).map((_, i) => {
              const yFrac = i / 8;
              const yPos = waterSurfaceY + yFrac * (1.95 - waterSurfaceY);
              const waveAmp = Math.sin((yFrac * Math.PI) / 2) * (isResonating ? 0.24 : 0.09);

              return (
                <group key={i} position={[0, yPos - (1.95 + waterSurfaceY) / 2, 0]}>
                  <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[Math.max(0.01, waveAmp - 0.018), waveAmp + 0.018, 28]} />
                    <meshStandardMaterial
                      color={isResonating ? '#00e5ff' : '#38bdf8'}
                      emissive={isResonating ? '#00e5ff' : '#0284c7'}
                      emissiveIntensity={isResonating ? 3.2 : 0.9}
                      transparent
                      opacity={isResonating ? 0.9 : 0.45}
                    />
                  </mesh>
                </group>
              );
            })}
          </group>
        )}
      </group>

      {/* TUNING FORK & VIBRATING ALLOY TINES */}
      <group ref={forkTinesRef} position={[0, 2.38, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.38, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.22, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.32, 0.065, 0.065]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[-0.13, -0.18, 0]} castShadow>
          <boxGeometry args={[0.045, 0.72, 0.055]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[0.13, -0.18, 0]} castShadow>
          <boxGeometry args={[0.045, 0.72, 0.055]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>

        {isResonating && (
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.18} />
          </mesh>
        )}
      </group>

      {/* WATER RESERVOIR (ASPIRATOR BOTTLE) CONNECTED ON SIDE */}
      <group position={[1.4, waterSurfaceY, 0]}>
        <mesh position={[-0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.14]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.9, 24]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transparent
            opacity={0.4}
            roughness={0.05}
            transmission={0.9}
            thickness={0.4}
          />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.7, 24]} />
          <meshPhysicalMaterial
            color="#0284c7"
            transparent
            opacity={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* FLEXIBLE RUBBER CONDUIT TUBING */}
      <group position={[0.7, -1.8, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.4, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
