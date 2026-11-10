'use client';
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function Microprocessor80853D() {
  const [selectedPin, setSelectedPin] = useState('30 (ALE)');

  return (
    <group position={[0, 0, 0]}>
      {/* 40-Pin DIP Ceramic Package Body */}
      <mesh castShadow>
        <boxGeometry args={[4.4, 1.8, 0.45]} />
        <meshStandardMaterial color="#0A192F" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Index Notch at Pin 1 */}
      <mesh position={[-2.15, 0, 0.23]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* 20 Top Pins */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`top-${i}`} position={[-1.9 + i * 0.2, 1.05, 0]}>
          <boxGeometry args={[0.07, 0.4, 0.05]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* 20 Bottom Pins */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`bot-${i}`} position={[-1.9 + i * 0.2, -1.05, 0]}>
          <boxGeometry args={[0.07, 0.4, 0.05]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Gold Label Plate */}
      <mesh position={[0, 0, 0.24]}>
        <planeGeometry args={[2.8, 1.0]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* HUD Pin Inspector */}
      <Html position={[0, -2.0, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl text-slate-100 text-xs w-72 select-none shadow-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-cyan-400 text-[11px]">8085 PINOUT ARCHITECTURE</span>
            <span className="font-mono text-cyan-300 font-bold">{selectedPin}</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2">
            Address Latch Enable demultiplexes AD₀–AD₇ during T₁
          </div>
          <div className="grid grid-cols-3 gap-1">
            {['30 (ALE)', '31 (/WR)', '32 (/RD)', '34 (IO/M)', '37 (CLK)', '40 (Vcc)'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPin(p)}
                className={`py-1 text-[10px] rounded font-bold transition-colors ${
                  selectedPin === p ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
