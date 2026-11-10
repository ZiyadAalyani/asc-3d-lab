'use client';
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function MicrometerScrewGauge3D() {
  const [screwMm, setScrewMm] = useState(4.28); // mm

  const psrMm = Math.floor(screwMm);
  const csr = Math.round((screwMm - psrMm) * 100);

  return (
    <group position={[0, 0, 0]}>
      {/* Heavy C-Frame (High-Trust Deep Navy / Steel Blue) */}
      <mesh position={[-0.8, -0.4, 0]} castShadow>
        <torusGeometry args={[1.5, 0.22, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#0A192F" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Fixed Anvil Stud */}
      <mesh position={[-2.3, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.7, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Main Sleeve Barrel */}
      <mesh position={[0.7, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 2.0, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Movable Spindle */}
      <mesh position={[-1.6 + (screwMm / 25) * 1.5, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.8, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Rotating Circular Thimble */}
      <mesh position={[1.8 + (screwMm / 25) * 0.8, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.34, 0.29, 1.4, 32]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Ratchet Stop Knob */}
      <mesh position={[2.7 + (screwMm / 25) * 0.8, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 20]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Test Specimen Wire */}
      {screwMm > 0.5 && (
        <mesh position={[-1.95 + (screwMm / 50) * 0.7, 0.35, 0]}>
          <cylinderGeometry args={[0.12, 0.12, (screwMm / 25) * 1.3, 16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
      )}

      {/* Non-intrusive bottom HUD */}
      <Html position={[0, -2.1, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl text-slate-100 text-xs w-72 select-none shadow-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-cyan-400 text-[11px]">SCREW GAUGE (LC: 0.01 mm)</span>
            <span className="font-mono text-cyan-300 font-bold">{screwMm.toFixed(2)} mm</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2 flex justify-between">
            <span>Pitch Scale (PSR): {psrMm} mm</span>
            <span>Circular (CSR): {csr} div</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="15.0"
            step="0.05"
            value={screwMm}
            onChange={(e) => setScrewMm(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </Html>
    </group>
  );
}
