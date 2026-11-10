'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Float } from '@react-three/drei';
import ResonanceTube3D from './models/ResonanceTube3D';
import VernierCaliper3D from './models/VernierCaliper3D';
import MicrometerScrewGauge3D from './models/MicrometerScrewGauge3D';
import OhmsLawCircuit3D from './models/OhmsLawCircuit3D';
import PrismDispersion3D from './models/PrismDispersion3D';
import Microprocessor80853D from './models/Microprocessor80853D';
import {
  Volume2,
  VolumeX,
  Play,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Layers,
  HelpCircle,
  Activity,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';

interface ExperimentViewerProps {
  kind: string;
}

const FORK_FREQUENCIES = [
  { freq: 512, label: '512 Hz (C₅)' },
  { freq: 480, label: '480 Hz (B₄)' },
  { freq: 384, label: '384 Hz (G₄)' },
  { freq: 256, label: '256 Hz (Middle C₄)' },
];

export default function ExperimentViewer({ kind }: ExperimentViewerProps) {
  // Resonance Tube Interactive State
  const [frequency, setFrequency] = useState(512);
  const [waterLevelCm, setWaterLevelCm] = useState(15.5);
  const [isVibrating, setIsVibrating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'controls' | 'construction' | 'working' | 'procedure'>('controls');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Theoretical resonance computations
  const soundSpeed = 343; // m/s
  const tubeDiameterCm = 4.0;
  const endCorrection = 0.3 * tubeDiameterCm; // 1.2 cm
  const wavelengthCm = (soundSpeed / frequency) * 100;
  const targetL1 = wavelengthCm / 4 - endCorrection;
  const targetL2 = (3 * wavelengthCm) / 4 - endCorrection;

  // Proximity to resonance
  const distL1 = Math.abs(waterLevelCm - targetL1);
  const distL2 = Math.abs(waterLevelCm - targetL2);
  const resonanceScore = useMemo(() => {
    const s1 = Math.exp(-(distL1 * distL1) / 3.0);
    const s2 = targetL2 <= 80 ? Math.exp(-(distL2 * distL2) / 3.5) : 0;
    return Math.max(s1, s2);
  }, [distL1, distL2, targetL2]);

  const isResonating = resonanceScore > 0.45;

  // Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const strikeTuningFork = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 4500);

    if (!soundEnabled || typeof window === 'undefined') return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      const baseGain = 0.04;
      const resonanceBoost = isResonating ? 0.35 * resonanceScore : 0.02;
      const initialVol = baseGain + resonanceBoost;

      gain.gain.setValueAtTime(initialVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 4.5);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const calculatedSoundSpeed = useMemo(() => {
    if (distL1 < 1.5 && targetL2 <= 80) {
      return 2 * frequency * ((targetL2 - targetL1) / 100);
    }
    return 2 * frequency * ((targetL2 - targetL1) / 100);
  }, [frequency, targetL1, targetL2, distL1]);

  return (
    <div className="relative w-full h-[680px] bg-[#071324] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_20px_60px_rgba(2,132,199,0.25)] flex flex-col md:flex-row">
      {/* 3D WEBGL CANVAS (UNOBSTRUCTED, CENTERED RIG) */}
      <div className="relative flex-1 h-full">
        {/* Top Control Bar inside 3D Canvas */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="bg-[#0A192F]/90 backdrop-blur-md border border-cyan-400/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
              {kind === 'resonance-tube' ? '3D Acoustic Resonance Rig' : '3D Precision Instrument'}
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-[#0A192F]/90 hover:bg-[#132646] text-cyan-300 hover:text-white border border-cyan-400/30 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
          >
            <Sliders size={13} />
            <span>{isSidebarOpen ? 'Hide Controls' : 'Show Controls'}</span>
          </button>
        </div>

        {/* Live Resonance Alert Banner (Floating at top center, non-intrusive) */}
        {kind === 'resonance-tube' && isResonating && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-cyan-600/90 to-blue-600/90 backdrop-blur-md border border-cyan-300/60 px-4 py-1.5 rounded-full shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center gap-2 text-white text-xs font-extrabold animate-bounce-slow">
            <Sparkles size={14} className="text-cyan-200" />
            <span>⚡ ACOUSTIC RESONANCE AMPLIFIED ({Math.round(resonanceScore * 100)}%)</span>
          </div>
        )}

        {/* 3D Scene */}
        <Canvas
          camera={{ position: [0, 0.4, 4.4], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          shadows
        >
          <color attach="background" args={['#081426']} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <pointLight position={[-4, 4, 3]} intensity={0.9} color="#38bdf8" />
          <pointLight position={[3, -2, 2]} intensity={0.5} color="#0284c7" />

          {/* Grid floor */}
          <Grid
            position={[0, -2.4, 0]}
            args={[12, 12]}
            cellSize={0.6}
            cellThickness={0.8}
            cellColor="#1e3a5f"
            sectionSize={2.4}
            sectionThickness={1.2}
            sectionColor="#0284c7"
            fadeDistance={10}
            fadeStrength={1.5}
          />

          {/* Render selected 3D Instrument without blocking HUD */}
          {kind === 'resonance-tube' && (
            <ResonanceTube3D
              frequency={frequency}
              waterLevelCm={waterLevelCm}
              isVibrating={isVibrating}
              soundEnabled={soundEnabled}
              isResonating={isResonating}
              resonanceScore={resonanceScore}
            />
          )}
          {kind === 'vernier' && <VernierCaliper3D />}
          {kind === 'micrometer' && <MicrometerScrewGauge3D />}
          {kind === 'ohms-law' && <OhmsLawCircuit3D />}
          {kind === 'prism' && <PrismDispersion3D />}
          {kind === 'chip' && <Microprocessor80853D />}
          {kind === 'atom' && <PrismDispersion3D />}

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2.0}
            maxDistance={8.5}
            target={[0, 0, 0]}
          />
        </Canvas>

        {/* 3D Camera Interaction Guide */}
        <div className="absolute bottom-3 left-4 z-20 text-[10px] text-slate-400 font-mono flex items-center gap-2 pointer-events-none bg-[#0A192F]/60 px-2 py-1 rounded-md border border-white/5">
          <span>🖱️ Left-click drag to Orbit · Scroll to Zoom · Right-click to Pan</span>
        </div>
      </div>

      {/* DOCKED SIDEBAR SUITE (HIGH-TRUST TECHNICAL BLUE & SLATE) */}
      {isSidebarOpen && (
        <aside className="w-full md:w-96 bg-[#0A192F]/95 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-cyan-500/25 flex flex-col z-30 transition-all duration-300">
          {/* SIDEBAR TABS */}
          <div className="flex border-b border-cyan-500/20 bg-[#0d203d]/80 text-[11px] font-bold">
            <button
              onClick={() => setSidebarTab('controls')}
              className={`flex-1 py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === 'controls'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Sliders size={13} />
              <span>Controls</span>
            </button>
            <button
              onClick={() => setSidebarTab('construction')}
              className={`flex-1 py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === 'construction'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>Construction</span>
            </button>
            <button
              onClick={() => setSidebarTab('working')}
              className={`flex-1 py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === 'working'
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={13} />
              <span>Working</span>
            </button>
          </div>

          {/* TAB 1: CONTROLS & LIVE TELEMETRY */}
          {sidebarTab === 'controls' && (
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                    Experiment Rig Telemetry
                  </span>
                  <h4 className="text-sm font-bold text-white">Velocity of Sound in Air</h4>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-xl border transition-colors ${
                    soundEnabled
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                  title={soundEnabled ? 'Mute tone' : 'Unmute tone'}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>

              {/* Live Status Card */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  isResonating
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(2,132,199,0.3)]'
                    : 'bg-[#132646]/80 border-slate-700/60 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Activity size={14} className={isResonating ? 'text-cyan-400 animate-pulse' : 'text-slate-400'} />
                    {isResonating ? 'Resonance Node Locked!' : 'Awaiting Acoustic Alignment'}
                  </span>
                  <span className="font-mono text-cyan-300 font-extrabold">{Math.round(resonanceScore * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 rounded-full transition-all duration-150"
                    style={{ width: `${Math.round(resonanceScore * 100)}%` }}
                  />
                </div>
              </div>

              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#071324] p-2.5 rounded-xl border border-cyan-500/20 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">AIR LENGTH (L)</span>
                  <span className="font-mono font-bold text-sm text-cyan-300">{waterLevelCm.toFixed(1)} cm</span>
                </div>
                <div className="bg-[#071324] p-2.5 rounded-xl border border-cyan-500/20 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">1st NODE (L₁)</span>
                  <span className="font-mono font-bold text-sm text-sky-400">{targetL1.toFixed(1)} cm</span>
                </div>
                <div className="bg-[#071324] p-2.5 rounded-xl border border-cyan-500/20 text-center">
                  <span className="text-[10px] text-slate-400 block font-mono">2nd NODE (L₂)</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    {targetL2 <= 80 ? `${targetL2.toFixed(1)} cm` : '—'}
                  </span>
                </div>
              </div>

              {/* Tuning Fork Frequency Buttons */}
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                  Tuning Fork Frequency (f):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {FORK_FREQUENCIES.map((f) => (
                    <button
                      key={f.freq}
                      onClick={() => setFrequency(f.freq)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        frequency === f.freq
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(2,132,199,0.35)]'
                          : 'bg-[#132646] text-slate-300 border-slate-700/80 hover:border-cyan-400/50 hover:text-white'
                      }`}
                    >
                      <span>{f.label}</span>
                      {frequency === f.freq && <CheckCircle2 size={13} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Column Length Slider */}
              <div className="bg-[#132646]/70 p-3.5 rounded-2xl border border-cyan-500/20">
                <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-2">
                  <span>Adjust Water Column Reservoir:</span>
                  <span className="font-mono text-cyan-300 font-extrabold">{waterLevelCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="75.0"
                  step="0.2"
                  value={waterLevelCm}
                  onChange={(e) => setWaterLevelCm(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Full water (2 cm air)</span>
                  <span>Low water (75 cm air)</span>
                </div>
              </div>

              {/* Strike Button */}
              <button
                onClick={strikeTuningFork}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 ${
                  isVibrating
                    ? 'bg-cyan-400 text-[#0A192F] animate-pulse shadow-[0_0_25px_#00e5ff]'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_6px_25px_rgba(2,132,199,0.4)]'
                }`}
              >
                <Play size={14} />
                <span>{isVibrating ? `VIBRATING AT ${frequency} HZ...` : 'STRIKE TUNING FORK & EMIT SOUND'}</span>
              </button>

              {/* Calculated Speed Result Card */}
              <div className="p-3 bg-[#071324] border border-cyan-500/30 rounded-xl text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Computed Velocity of Sound</span>
                <span className="font-mono font-extrabold text-base text-cyan-300">
                  v = 2f(L₂ − L₁) = {calculatedSoundSpeed.toFixed(1)} m/s
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  Standard NTP Air: 343.0 m/s (Error: {Math.abs(calculatedSoundSpeed - 343).toFixed(1)} m/s)
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED APPARATUS CONSTRUCTION */}
          {sidebarTab === 'construction' && (
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div className="border-b border-cyan-500/20 pb-3">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Instrument Architecture
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">Construction of Resonance Tube Rig</h4>
              </div>

              <div className="space-y-3">
                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">1. Calibrated Borosilicate Glass Tube</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    A straight, uniform vertical glass tube of length ~100 cm and internal diameter 3–4 cm. A permanent millimeter scale is laser-graduated along its entire height starting from 0 at the open top lip.
                  </p>
                </div>

                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">2. Movable Water Reservoir (Aspirator Bottle)</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    A glass/metal vessel connected to the bottom of the resonance tube via flexible rubber conduit tubing. Raising or lowering the reservoir smoothly adjusts the water surface elevation in the main tube according to Pascal&apos;s principle.
                  </p>
                </div>

                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">3. Calibrated Tuning Forks Set</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    A suite of high-Q acoustic alloy tuning forks calibrated at standardized frequencies (512 Hz, 480 Hz, 384 Hz, 256 Hz), struck upon a soft vulcanized rubber pad to yield purely sinusoidal acoustic pressure drivers.
                  </p>
                </div>

                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">4. Heavy Cast-Iron Tripod Support Stand</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    A three-point leveling cast-iron base carrying a rigid stainless steel rod and two dual-jaw clamping collars to guarantee vertical alignment and suppress mechanical parasitic vibrations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKING PRINCIPLE & DERIVATIONS */}
          {sidebarTab === 'working' && (
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div className="border-b border-cyan-500/20 pb-3">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Physics & Wave Mechanics
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">Working Principle & Formula Derivation</h4>
              </div>

              <div className="space-y-3.5">
                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">Closed Organ Pipe Boundary Conditions</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    The water surface acts as a rigid boundary: air molecules cannot oscillate longitudinally, forcing a <b>Displacement Node (N)</b>. The open lip provides zero pressure restraint, forcing a <b>Displacement Antinode (A)</b>.
                  </p>
                </div>

                <div className="bg-[#071324] p-3 rounded-xl border border-cyan-500/30 font-mono text-[11px] space-y-1.5 text-cyan-200">
                  <div className="font-bold text-white">Full Algebraic Derivation:</div>
                  <div>1st Resonance: L₁ + e = λ / 4  --- (Eq. 1)</div>
                  <div>2nd Resonance: L₂ + e = 3λ / 4  --- (Eq. 2)</div>
                  <div className="border-t border-cyan-500/20 pt-1 text-sky-300">
                    Subtracting (1) from (2):
                  </div>
                  <div>L₂ − L₁ = (3λ/4) − (λ/4) = λ / 2</div>
                  <div className="font-bold text-emerald-400">λ = 2(L₂ − L₁)</div>
                  <div className="border-t border-cyan-500/20 pt-1 font-bold text-cyan-300">
                    v = f · λ = 2f(L₂ − L₁)
                  </div>
                </div>

                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">Rayleigh&apos;s End Correction (e)</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    Due to air momentum, the stationary wave antinode forms slightly outside the physical glass lip. Rayleigh demonstrated that:
                  </p>
                  <div className="font-mono text-cyan-300 font-bold mt-1 text-[11px]">
                    e = (L₂ − 3L₁) / 2 ≈ 0.3 × d
                  </div>
                </div>

                <div className="bg-[#132646]/70 p-3 rounded-xl border border-cyan-500/20">
                  <b className="text-cyan-300 block mb-1">Temperature Correction</b>
                  <p className="text-[11px] leading-relaxed text-slate-300 m-0">
                    Speed of sound at room temperature T (°C):
                  </p>
                  <div className="font-mono text-cyan-300 font-bold mt-1 text-[11px]">
                    v_T = v_0 + 0.61 · T  (where v_0 = 332 m/s at 0°C)
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
