'use client';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface CuteBotCompanionProps {
  onOpenChat: () => void;
}

const HINTS = [
  'Wassup gang! Need help finding the resonance node?',
  'Notice how v = 2f(L₂ − L₁) cancels the unknown end correction!',
  'Rayleigh end correction e ≈ 0.3d accounts for acoustic inertia outside the tube lip.',
  'Least count for Vernier = 1 MSD − 1 VSD = 0.01 cm.',
  'Micrometer ratchet click prevents wire deformation pressure!',
  'Click me to ask SKT Sir any formula derivation!',
];

export default function CuteBotCompanion({ onOpenChat }: CuteBotCompanionProps) {
  const [pos, setPos] = useState({ x: 40, y: 75 });
  const [speech, setSpeech] = useState<string | null>(HINTS[0]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  const botRef = useRef<HTMLDivElement>(null);
  const targetEyeRef = useRef({ x: 0, y: 0 });
  const currentEyeRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist > 0) {
        const maxOffset = 5.5;
        const norm = Math.min(dist / 300, 1);
        targetEyeRef.current = {
          x: (deltaX / dist) * maxOffset * norm,
          y: (deltaY / dist) * maxOffset * norm,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const updateEyes = () => {
      currentEyeRef.current.x += (targetEyeRef.current.x - currentEyeRef.current.x) * 0.15;
      currentEyeRef.current.y += (targetEyeRef.current.y - currentEyeRef.current.y) * 0.15;
      setEyeOffset({ x: currentEyeRef.current.x, y: currentEyeRef.current.y });
      animId = requestAnimationFrame(updateEyes);
    };
    animId = requestAnimationFrame(updateEyes);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4000 + Math.random() * 2500);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let step = 0;
    const moveInterval = setInterval(() => {
      step += 1;
      const randomHint = HINTS[step % HINTS.length];
      setSpeech(randomHint);

      setPos((prev) => ({
        x: Math.max(20, Math.min(120, prev.x + (Math.random() - 0.5) * 40)),
        y: Math.max(30, Math.min(110, prev.y + (Math.random() - 0.5) * 30)),
      }));
    }, 9000);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div
      ref={botRef}
      style={{
        right: `${pos.x}px`,
        bottom: `${pos.y}px`,
        transition: 'right 3s cubic-bezier(0.25, 1, 0.5, 1), bottom 3s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="fixed z-40 select-none flex flex-col items-end pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HIGH-TRUST TECHNICAL SPEECH BUBBLE */}
      {speech && (
        <div className="relative mb-3 max-w-[270px] bg-[#0A192F]/95 backdrop-blur-xl border border-cyan-400/40 p-3 rounded-2xl shadow-[0_8px_30px_rgba(2,132,199,0.35)] text-slate-100 text-xs animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setSpeech(null)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white p-0.5 rounded-full"
          >
            <X size={12} />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1 text-[11px] tracking-wide uppercase">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>SKT Sir AI Guide</span>
          </div>
          <p className="text-slate-200 leading-relaxed text-[11px] m-0">{speech}</p>
          <button
            onClick={onOpenChat}
            className="mt-2 text-[10px] font-bold text-cyan-300 hover:text-white flex items-center gap-1 bg-cyan-950/60 hover:bg-cyan-900/80 px-2 py-1 rounded-lg border border-cyan-500/30 transition-colors"
          >
            Ask a Question <ChevronRight size={10} />
          </button>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0A192F] border-r border-b border-cyan-400/40 transform rotate-45" />
        </div>
      )}

      {/* CUTE ROBOT AVATAR IN HIGH-TRUST TECHNICAL THEME */}
      <div
        onClick={onOpenChat}
        className="relative cursor-pointer group transition-transform duration-300 transform hover:scale-110 active:scale-95"
        title="Click to chat with SKT Sir (5B Parameter AI Physics Tutor)"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-sky-500/30 to-blue-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />

        <div className="relative animate-bounce-slow">
          {/* Antenna */}
          <div className="flex flex-col items-center justify-center -mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#00e5ff] animate-ping" />
            <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-slate-700 rounded-t" />
          </div>

          {/* Bot Head Hull (Deep Navy #0A192F with Steel Blue #386CB0 Trim) */}
          <div className="w-16 h-14 bg-gradient-to-b from-[#132646] to-[#0A192F] border-2 border-cyan-400/60 rounded-3xl p-1.5 shadow-[0_8px_25px_rgba(2,132,199,0.45)] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-1 left-2 right-2 h-2.5 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none" />

            {/* Electronic Screen / Visor */}
            <div className="w-full h-full bg-[#050D1A] rounded-2xl border border-cyan-500/30 flex items-center justify-around px-2 relative">
              {/* Left Eye */}
              <div
                className={`w-3.5 bg-cyan-300 rounded-full flex items-center justify-center shadow-[0_0_10px_#00e5ff] transition-all duration-75 ${
                  isBlinking ? 'h-0.5 opacity-30' : isHovered ? 'h-3.5 rounded-t-full' : 'h-3.5'
                }`}
              >
                {!isBlinking && (
                  <div
                    className="w-1.5 h-1.5 bg-[#050D1A] rounded-full transition-transform duration-75"
                    style={{
                      transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                    }}
                  />
                )}
              </div>

              {/* Right Eye */}
              <div
                className={`w-3.5 bg-cyan-300 rounded-full flex items-center justify-center shadow-[0_0_10px_#00e5ff] transition-all duration-75 ${
                  isBlinking ? 'h-0.5 opacity-30' : isHovered ? 'h-3.5 rounded-t-full' : 'h-3.5'
                }`}
              >
                {!isBlinking && (
                  <div
                    className="w-1.5 h-1.5 bg-[#050D1A] rounded-full transition-transform duration-75"
                    style={{
                      transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                    }}
                  />
                )}
              </div>

              {isHovered && (
                <>
                  <div className="absolute left-1 bottom-1 w-1.5 h-1 bg-cyan-400/50 rounded-full blur-[0.5px]" />
                  <div className="absolute right-1 bottom-1 w-1.5 h-1 bg-cyan-400/50 rounded-full blur-[0.5px]" />
                </>
              )}
            </div>
          </div>

          {/* Bot Body */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-3.5 bg-[#0A192F] border border-cyan-400/40 rounded-b-xl flex items-center justify-center shadow-md">
              <div className="w-2 h-1 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <div className="w-3 h-2.5 bg-gradient-to-b from-cyan-300 to-transparent rounded-b-full opacity-80 blur-[0.5px] animate-pulse" />
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0A192F] border border-cyan-400/50 text-cyan-300 font-mono font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap tracking-wider">
          SKT SIR
        </div>
      </div>
    </div>
  );
}
