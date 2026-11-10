'use client';
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function PrismDispersion3D() {
  const [angle, setAngle] = useState(48); // Incident angle in degrees

  return (
    <group position={[0, -0.2, 0]}>
      {/* Triangular Optical Crown Glass Prism */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 2.0, 3]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transparent
          opacity={0.55}
          roughness={0.04}
          transmission={0.92}
          thickness={1.2}
          ior={1.52}
          reflectivity={0.95}
        />
      </mesh>

      {/* Incident White Ray */}
      <mesh position={[-2.4, 0, 0.4]} rotation={[0, 0, (angle * Math.PI) / 180]}>
        <cylinderGeometry args={[0.025, 0.025, 2.2, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Emerging Dispersed Spectral Rays (VIBGYOR Fan) */}
      {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'].map((col, idx) => (
        <mesh
          key={col}
          position={[1.8, 0.1 - idx * 0.12, 0.2]}
          rotation={[0, 0, -Math.PI / 4 + idx * 0.06]}
        >
          <cylinderGeometry args={[0.02, 0.02, 2.4, 12]} />
          <meshBasicMaterial color={col} />
        </mesh>
      ))}

      {/* Spectrometer Circular Turntable Base */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.2, 36]} />
        <meshStandardMaterial color="#0A192F" metalness={0.8} />
      </mesh>

      {/* HUD */}
      <Html position={[0, -1.9, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl text-slate-100 text-xs w-72 select-none shadow-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-cyan-400 text-[11px]">PRISM REFRACTION (SNELL&apos;S LAW)</span>
            <span className="font-mono text-cyan-300 font-bold">i = {angle}°</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2">
            Refractive Index Crown Glass n ≈ 1.52
          </div>
          <input
            type="range"
            min="30"
            max="65"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </Html>
    </group>
  );
}
