'use client';
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function VernierCaliper3D() {
  const [jawPositionMm, setJawPositionMm] = useState(24.5); // mm

  const mainScaleCm = Math.floor(jawPositionMm / 10);
  const vernierFractionMm = jawPositionMm % 10;
  const coincidingDivision = Math.round(vernierFractionMm / 0.1) % 10;
  const totalReadingCm = (jawPositionMm / 10).toFixed(2);

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Caliper Main Body (Stainless Steel) */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[5.2, 0.7, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Fixed External Lower Jaw */}
      <mesh position={[-2.4, -0.9, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Fixed Internal Upper Jaw */}
      <mesh position={[-2.4, 0.75, 0]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Sliding Vernier Assembly */}
      <group position={[-2.0 + (jawPositionMm / 50) * 2.8, 0, 0.03]}>
        {/* Vernier Slider Plate */}
        <mesh castShadow>
          <boxGeometry args={[1.3, 0.82, 0.14]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Movable Lower Jaw */}
        <mesh position={[-0.45, -0.9, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Movable Upper Jaw */}
        <mesh position={[-0.45, 0.75, 0]} castShadow>
          <boxGeometry args={[0.3, 0.8, 0.12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Vernier Window Glass */}
        <mesh position={[0.2, 0, 0.08]}>
          <boxGeometry args={[0.7, 0.35, 0.02]} />
          <meshPhysicalMaterial color="#38bdf8" transparent opacity={0.6} roughness={0.1} />
        </mesh>
      </group>

      {/* Test Cylinder between Jaws */}
      {jawPositionMm > 2 && (
        <mesh position={[-2.2 + (jawPositionMm / 100) * 2.8, -0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, (jawPositionMm / 50) * 1.35, 24]} />
          <meshStandardMaterial color="#386cb0" metalness={0.8} roughness={0.3} />
        </mesh>
      )}

      {/* Metric Graduations on Beam */}
      {Array.from({ length: 26 }).map((_, i) => (
        <mesh key={i} position={[-2.2 + i * 0.17, 0.22, 0.07]}>
          <boxGeometry args={[0.015, i % 5 === 0 ? 0.18 : 0.09, 0.01]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
      ))}

      {/* Non-intrusive bottom HUD */}
      <Html position={[0, -2.2, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl text-slate-100 text-xs w-72 select-none shadow-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-cyan-400 text-[11px]">METRIC VERNIER (LC: 0.01 cm)</span>
            <span className="font-mono text-cyan-300 font-bold">{totalReadingCm} cm</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2 flex justify-between">
            <span>MSR: {mainScaleCm} cm</span>
            <span>VSC: {coincidingDivision} div</span>
          </div>
          <input
            type="range"
            min="0"
            max="45"
            step="0.1"
            value={jawPositionMm}
            onChange={(e) => setJawPositionMm(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </Html>
    </group>
  );
}
