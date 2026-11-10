'use client';
import { useState } from 'react';
import { Html } from '@react-three/drei';

export default function OhmsLawCircuit3D() {
  const [voltage, setVoltage] = useState(5.0); // Volts
  const resistance = 10.0; // Ohms
  const current = voltage / resistance; // Amperes

  return (
    <group position={[0, -0.3, 0]}>
      {/* Circuit Breadboard / Lab Bench */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.2, 3.2]} />
        <meshStandardMaterial color="#0A192F" roughness={0.7} />
      </mesh>

      {/* DC Regulated Power Supply */}
      <group position={[-1.6, 0.45, -0.8]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.0, 1.0]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.25, 0.51]}>
          <planeGeometry args={[0.7, 0.35]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Ammeter in Series */}
      <group position={[0.2, 0.45, -0.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.5, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Voltmeter in Parallel */}
      <group position={[1.6, 0.45, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.5, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Wire Resistor (Color Bands) */}
      <group position={[0, 0.15, 0.6]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 1.2, 24]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.2} roughness={0.8} />
        </mesh>
      </group>

      {/* HUD Control */}
      <Html position={[0, -1.9, 0]} center style={{ pointerEvents: 'auto' }}>
        <div className="bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl text-slate-100 text-xs w-72 select-none shadow-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-cyan-400 text-[11px]">OHM&apos;S LAW (V = I · R)</span>
            <span className="font-mono text-cyan-300 font-bold">R = {resistance} Ω</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-2 flex justify-between">
            <span>VOLTAGE (V): {voltage.toFixed(1)} V</span>
            <span>CURRENT (I): {current.toFixed(2)} A</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="12.0"
            step="0.5"
            value={voltage}
            onChange={(e) => setVoltage(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </Html>
    </group>
  );
}
