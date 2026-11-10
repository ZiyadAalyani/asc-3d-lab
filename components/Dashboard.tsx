'use client';
import { useState, useEffect } from 'react';
import {
  Atom,
  BookOpen,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  Search,
  CheckCircle2,
  ArrowLeft,
  Clock3,
  Star,
  BrainCircuit,
  Lock,
  LogOut,
  Sliders,
  Cpu,
  Waves,
  Sparkles,
  HelpCircle,
  Award,
  Activity,
  Layers,
  ShieldCheck,
  Compass,
  Gauge,
  Zap
} from 'lucide-react';
import ExperimentViewer from './ExperimentViewer';
import AINotesSection from './AINotesSection';
import ChatbotWidget from './ChatbotWidget';
import CuteBotCompanion from './CuteBotCompanion';
import AuthModal from './AuthModal';
import ScientificBackground3D from './ScientificBackground3D';

export const topics = [
  {
    id: 'resonance-tube',
    title: 'Resonance Tube (Air Column Velocity of Sound)',
    subject: 'Acoustics & Waves',
    level: 'Core Research Practical',
    time: '15 min',
    kind: 'resonance-tube',
    desc: 'Perform smooth acoustic resonance: strike tuning forks (512Hz, 480Hz, 384Hz, 256Hz), slide the water column, observe stationary sound waves, and measure velocity of sound.',
    tag: 'Standing Waves',
    formula: 'v = 2f (L₂ − L₁)  |  e = (L₂ − 3L₁) / 2',
    icon: Waves,
    steps: [
      'Fill the glass resonance tube with water using the adjustable reservoir.',
      'Select a tuning fork frequency and click "Strike Tuning Fork" to initiate vibration.',
      'Slowly adjust the water slider to vary air column length until first resonance (L₁) peaks.',
      'Lower the water level further to locate the second resonance position (L₂).',
      'Compute the speed of sound in air: v = 2f (L₂ − L₁) and check against 343 m/s.'
    ]
  },
  {
    id: 'vernier',
    title: 'Vernier Caliper Precision Measurement',
    subject: 'Mechanics & Metrology',
    level: 'Core Practical',
    time: '12 min',
    kind: 'vernier',
    desc: 'Measure internal/external diameters and depth. Understand Least Count (0.01 cm) and Zero Error correction.',
    tag: 'Metrology',
    formula: 'TR = MSR + (VSC × 0.01 cm) ± Zero Error',
    icon: Compass,
    steps: [
      'Find the Least Count: 1 MSD / Total Vernier Divisions = 0.01 cm.',
      'Check for zero error by completely closing the measuring jaws.',
      'Place the cylindrical test specimen snugly between the external jaws.',
      'Read the Main Scale Reading (MSR) before the Vernier zero mark.',
      'Find the coinciding Vernier line (VSC) and compute Total Reading (TR).'
    ]
  },
  {
    id: 'micrometer',
    title: 'Micrometer Screw Gauge Precision',
    subject: 'Mechanics & Metrology',
    level: 'Core Practical',
    time: '14 min',
    kind: 'micrometer',
    desc: 'Determine thin wire diameter and metal sheet thickness with 0.01 mm precision and ratchet contact.',
    tag: 'Precision Metrology',
    formula: 'TR = PSR + (CSR × 0.01 mm) − Zero Error',
    icon: Gauge,
    steps: [
      'Rotate the thimble until the anvil and spindle touch to inspect zero error.',
      'Note the pitch (1.0 mm) and calculate Least Count (0.01 mm).',
      'Position wire between anvil and spindle.',
      'Turn the ratchet until it clicks for uniform standardized pressure.',
      'Read Pitch Scale (PSR) and Circular Scale (CSR) to compute total thickness.'
    ]
  },
  {
    id: 'ohms-law',
    title: "Ohm's Law & Resistance Determination",
    subject: 'Electricity & Circuits',
    level: 'Core Practical',
    time: '15 min',
    kind: 'ohms-law',
    desc: 'Verify V = IR with variable DC supply, ammeter in series, voltmeter in parallel, and linear regression slope.',
    tag: 'Circuit Analysis',
    formula: 'V = I · R  (Slope = ΔV / ΔI)',
    icon: Zap,
    steps: [
      'Connect battery, rheostat, and ammeter in series; voltmeter in parallel across resistor.',
      'Vary the rheostat slider to set current through the test resistor.',
      'Record corresponding voltage drops on the calibrated voltmeter.',
      'Plot V vs I graph; a straight line passing through origin confirms Ohm’s Law.'
    ]
  },
  {
    id: 'prism',
    title: 'Prism Refraction & Dispersion',
    subject: 'Wave Optics',
    level: 'Intermediate',
    time: '10 min',
    kind: 'prism',
    desc: 'Observe white light split into spectral wavelengths (VIBGYOR) through crown glass prism.',
    tag: 'Wave Optics',
    formula: 'n = sin((A + Dm)/2) / sin(A/2)',
    icon: FlaskConical,
    steps: [
      'Direct collimated white incident beam at angle i onto the refracting surface.',
      'Observe refraction inside the optical glass according to Snell’s Law.',
      'Inspect the emerging spectral fan and determine the angle of minimum deviation (Dm).'
    ]
  },
  {
    id: 'chip8085',
    title: '8085 Microprocessor Pinout Architecture',
    subject: 'Digital Systems',
    level: 'Core Engineering',
    time: '16 min',
    kind: 'chip',
    desc: 'Inspect the 40-pin DIP package: multiplexed AD0-AD7, ALE address latch, control signals, and power pins.',
    tag: 'Microprocessors',
    formula: 'Memory space = 2¹⁶ = 64 KB',
    icon: Cpu,
    steps: [
      'Observe the dual-inline 40 pins with notch orientation marker.',
      'Upper address lines A8-A15 carry high-order memory address.',
      'Lower lines AD0-AD7 multiplex address and data using ALE (Address Latch Enable).'
    ]
  }
];

const questions = [
  {
    q: 'In a resonance tube experiment, why does the antinode form slightly outside the open end?',
    a: [
      'Due to air friction on the glass wall',
      'Because of air inertia requiring an acoustic end correction e ≈ 0.3d',
      'Because water evaporates inside the tube',
      'Because the tuning fork absorbs sound'
    ],
    correct: 1,
    why: 'Due to particle momentum, sound waves reflect slightly beyond the physical lip of the tube, creating an end correction e ≈ 0.3 × diameter.'
  },
  {
    q: 'What is the speed of sound formula using two consecutive resonance lengths L₁ and L₂?',
    a: ['v = f(L₂ − L₁)', 'v = 2f(L₂ − L₁)', 'v = 4f(L₂ + L₁)', 'v = f(L₂ + 3L₁)/2'],
    correct: 1,
    why: 'Since L₂ − L₁ = λ/2, wavelength λ = 2(L₂ − L₁). Multiplying by frequency gives v = 2f(L₂ − L₁).'
  },
  {
    q: 'What is the least count of a metric Vernier Caliper having 10 Vernier divisions?',
    a: ['0.1 cm', '0.01 cm (0.1 mm)', '0.001 cm', '1.0 mm'],
    correct: 1,
    why: 'Least Count = 1 MSD - 1 VSD = 1 mm / 10 = 0.1 mm = 0.01 cm.'
  },
  {
    q: 'Why is the ratchet stop essential when measuring with a Micrometer Screw Gauge?',
    a: [
      'To rotate the screw faster',
      'To ensure uniform, standardized contact pressure and avoid deformation',
      'To lock the circular scale permanently',
      'To change the pitch of the screw'
    ],
    correct: 1,
    why: 'The ratchet slips with a click when the calibrated contact force is reached, preventing wire deformation.'
  },
  {
    q: 'In the 8085 microprocessor, what is the role of the ALE pin?',
    a: [
      'Enables the crystal clock',
      'Pulses HIGH to latch lower address AD0-AD7 into an external 74LS373 latch',
      'Generates a hardware interrupt acknowledge',
      'Resets the program counter'
    ],
    correct: 1,
    why: 'ALE (Address Latch Enable) signals that valid lower address bits are on the multiplexed AD0-AD7 bus.'
  }
];

export default function Dashboard() {
  const [tab, setTab] = useState('Home');
  const [selected, setSelected] = useState<typeof topics[number] | null>(null);
  const [query, setQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const openTopic = (t: typeof topics[number]) => {
    setSelected(t);
    setTab('Experiment');
  };

  const filtered = topics.filter((t) =>
    (t.title + ' ' + t.subject + ' ' + t.tag + ' ' + t.desc).toLowerCase().includes(query.toLowerCase())
  );

  const quiz = questions[quizIndex];

  const choose = (i: number) => {
    if (answer !== null) return;
    setAnswer(i);
    if (i === quiz.correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (quizIndex === questions.length - 1) {
      setDone(true);
    } else {
      setQuizIndex((i) => i + 1);
      setAnswer(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <div className="site">
      {/* 3D SCIENTIFIC FLOATING BACKGROUND (CYAN & STEEL BLUE PARTICLES) */}
      <ScientificBackground3D />

      {/* TOP NAVIGATION IN HIGH-TRUST TECHNICAL (DEEP NAVY & ELECTRIC CYAN) */}
      <header className="nav-bar">
        <div
          className="brand cursor-pointer"
          onClick={() => {
            setTab('Home');
            setSelected(null);
          }}
        >
          <div className="brand-icon">
            <Atom size={22} />
          </div>
          <span>
            ASC <b>Technical Lab</b>
          </span>
        </div>

        <nav>
          {['Home', '3D Labs', 'AI Study Notes', 'Formula Sheet', 'Quiz'].map((n) => (
            <button
              className={
                tab === n ||
                (tab === 'Experiment' && n === '3D Labs') ||
                (tab === '3D Labs' && n === '3D Labs')
                  ? 'nav-link active'
                  : 'nav-link'
              }
              key={n}
              onClick={() => {
                if (n === '3D Labs') {
                  setTab('3D Labs');
                } else {
                  setTab(n);
                }
                if (n !== 'Experiment') setSelected(null);
              }}
            >
              {n}
            </button>
          ))}
        </nav>

        {/* AUTH BUTTONS & STATUS */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5 bg-[#0d203d]/90 border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-lg">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'ST'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-white block leading-none">{user.fullName}</span>
                <span className="text-[10px] text-cyan-400 block leading-none mt-0.5 font-mono">
                  {user.role === 'instructor' ? 'Faculty Instructor' : `Roll: ${user.rollNumber || 'B001'}`}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors ml-1"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-[0_4px_18px_rgba(2,132,199,0.35)] transition-all"
            >
              <Lock size={13} /> Sign In
            </button>
          )}
        </div>
      </header>

      {/* 3D EXPERIMENT DETAIL PAGE */}
      {tab === 'Experiment' && selected ? (
        <main className="page experiment-page">
          <button
            className="back-link"
            onClick={() => {
              setTab('3D Labs');
              setSelected(null);
            }}
          >
            <ArrowLeft size={16} /> Back to all laboratory instruments
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0A192F]/80 p-5 rounded-2xl border border-cyan-500/20">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                {selected.subject} · {selected.level}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{selected.title}</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{selected.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-xl font-bold">
                {selected.formula}
              </span>
            </div>
          </div>

          {/* 3D VIEWER CONTAINER */}
          <ExperimentViewer kind={selected.kind} />
        </main>
      ) : null}

      {/* HOME PAGE */}
      {tab === 'Home' ? (
        <main className="page">
          <section className="hero">
            <div className="hero-pill">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Next-Gen 3D Engineering & Physics Simulator</span>
            </div>
            <h1>
              Virtual <span>Physics Laboratory</span> & Engineering Studio
            </h1>
            <p>
              Perform high-precision acoustic, optical, and mechanical experiments in true real-time 3D WebGL.
              Featuring our flagship Resonance Tube apparatus, Vernier calibers, micrometer screw gauges, and the SKT Sir AI tutor.
            </p>
            <div className="hero-actions">
              <button
                className="solid-button"
                onClick={() => {
                  const resTopic = topics.find((t) => t.id === 'resonance-tube') || topics[0];
                  openTopic(resTopic);
                }}
              >
                <Waves size={16} /> Launch Resonance Tube Lab <ChevronRight size={16} />
              </button>
              <button className="ghost-button" onClick={() => setTab('AI Study Notes')}>
                <BookOpen size={16} /> Open AI Study Notes
              </button>
            </div>
          </section>

          {/* FEATURED APPARATUS CARDS */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Core Interactive Rigs
                </span>
                <h2 className="text-xl font-extrabold text-white">Laboratory Workbenches</h2>
              </div>
              <button
                onClick={() => setTab('3D Labs')}
                className="text-xs font-bold text-cyan-400 hover:text-white flex items-center gap-1"
              >
                View all 6 rigs <ChevronRight size={14} />
              </button>
            </div>

            <div className="card-grid">
              {topics.map((t) => {
                const Icon = t.icon;
                const isFeatured = t.id === 'resonance-tube';
                return (
                  <div
                    key={t.id}
                    onClick={() => openTopic(t)}
                    className={`topic-card ${isFeatured ? 'topic-card-featured' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="topic-tag">{t.tag}</span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock3 size={12} /> {t.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                        <Icon size={18} />
                      </div>
                      <h3>{t.title}</h3>
                    </div>

                    <p>{t.desc}</p>
                    <div className="topic-formula">{t.formula}</div>

                    <div className="mt-auto pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs font-bold text-cyan-400">
                      <span>Launch 3D Rig</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      ) : null}

      {/* 3D LABS PAGE */}
      {tab === '3D Labs' ? (
        <main className="page">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Full Apparatus Catalog
              </span>
              <h2 className="text-2xl font-black text-white">Virtual 3D Laboratory Workstations</h2>
            </div>
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search apparatus, formulas, topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0A192F] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="card-grid">
            {filtered.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.id} onClick={() => openTopic(t)} className="topic-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="topic-tag">{t.tag}</span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock3 size={12} /> {t.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <Icon size={18} />
                    </div>
                    <h3>{t.title}</h3>
                  </div>
                  <p>{t.desc}</p>
                  <div className="topic-formula">{t.formula}</div>
                  <div className="mt-auto pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span>Launch 3D Instrument</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      ) : null}

      {/* AI STUDY NOTES PAGE */}
      {tab === 'AI Study Notes' ? (
        <main className="page">
          <AINotesSection />
        </main>
      ) : null}

      {/* FORMULA SHEET PAGE */}
      {tab === 'Formula Sheet' ? (
        <main className="page">
          <div className="bg-[#0A192F]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Comprehensive Reference
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Physics & Engineering Master Formula Sheet</h2>
              <p className="text-xs text-slate-400 mt-1">Quick-revision reference for laboratory examinations and numerical proofs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Waves size={15} /> Resonance Tube & Velocity of Sound
                </span>
                <div className="font-mono text-xs text-slate-200 space-y-1">
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30 font-bold text-cyan-300">
                    v = 2f (L₂ − L₁)
                  </div>
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30">
                    End Correction: e = (L₂ − 3L₁) / 2 ≈ 0.3d
                  </div>
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30">
                    Temperature Shift: v_T = v₀ + 0.61 · T(°C)
                  </div>
                </div>
              </div>

              <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Compass size={15} /> Vernier Caliper Precision
                </span>
                <div className="font-mono text-xs text-slate-200 space-y-1">
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30 font-bold text-cyan-300">
                    LC = 1 MSD − 1 VSD = (1 mm) / 10 = 0.01 cm
                  </div>
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30">
                    Total Reading = MSR + (VSC × LC) − (± Zero Error)
                  </div>
                </div>
              </div>

              <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Gauge size={15} /> Micrometer Screw Gauge
                </span>
                <div className="font-mono text-xs text-slate-200 space-y-1">
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30 font-bold text-cyan-300">
                    LC = Pitch / Circular Divisions = 1.0 mm / 100 = 0.01 mm
                  </div>
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30">
                    Total Thickness = PSR + (CSR × 0.01 mm) − Zero Error
                  </div>
                </div>
              </div>

              <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Zap size={15} /> Ohm&apos;s Law & Circuit Analysis
                </span>
                <div className="font-mono text-xs text-slate-200 space-y-1">
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30 font-bold text-cyan-300">
                    V = I · R &rarr; R = V / I (Slope = ΔV / ΔI)
                  </div>
                  <div className="p-2 bg-[#0A192F] rounded-lg border border-cyan-500/30">
                    Resistivity: ρ = (R · A) / L = (R · πd²) / (4L)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : null}

      {/* QUIZ PAGE */}
      {tab === 'Quiz' ? (
        <main className="page">
          <div className="max-w-2xl mx-auto bg-[#0A192F]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Laboratory Assessment
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Physics Conceptual Mastery Quiz</h2>
            </div>

            {done ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-300 shadow-xl">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-extrabold text-white">Quiz Completed!</h3>
                <p className="text-sm text-slate-300">
                  You scored <span className="text-cyan-300 font-extrabold font-mono text-lg">{score}</span> out of {questions.length} questions correctly.
                </p>
                <button
                  className="solid-button mx-auto"
                  onClick={() => {
                    setQuizIndex(0);
                    setAnswer(null);
                    setScore(0);
                    setDone(false);
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>QUESTION {quizIndex + 1} OF {questions.length}</span>
                  <span>{Math.round((quizIndex / questions.length) * 100)}% complete</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-200"
                    style={{ width: `${((quizIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{quiz.q}</h3>

                <div className="space-y-2 pt-2">
                  {quiz.a.map((option, idx) => {
                    const isSelected = answer === idx;
                    const isCorrect = idx === quiz.correct;
                    let style = 'bg-[#071324] border-cyan-500/20 text-slate-200 hover:border-cyan-400/50';
                    if (answer !== null) {
                      if (isCorrect) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      else if (isSelected) style = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={answer !== null}
                        onClick={() => choose(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${style}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] text-cyan-300 font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {answer !== null && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {answer !== null && (
                  <div className="p-4 bg-[#071324] border border-cyan-500/30 rounded-xl space-y-2 text-xs">
                    <b className={answer === quiz.correct ? 'text-emerald-400' : 'text-rose-400'}>
                      {answer === quiz.correct ? 'Correct! Excellent scientific reasoning.' : 'Not quite. Here is the physical reasoning:'}
                    </b>
                    <p className="text-slate-300 leading-relaxed m-0">{quiz.why}</p>
                    <button
                      onClick={nextQuestion}
                      className="solid-button mt-3"
                    >
                      <span>{quizIndex === questions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      ) : null}

      {/* FOOTER WITH CLEAN BRANDING & ZIYAD AALYANI CREDIT */}
      <footer className="site-footer">
        <div className="brand">
          <div className="brand-icon">
            <Atom size={19} />
          </div>
          <span>
            ASC <b>Technical Lab</b>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
          <Award size={15} className="text-cyan-400" />
          <span>Made by <b className="text-cyan-300 font-extrabold">Ziyad Aalyani · Roll No. B001</b></span>
        </div>
      </footer>

      {/* CUTE WANDERING BOT COMPANION (SKT SIR) */}
      <CuteBotCompanion onOpenChat={() => setChatOpen(true)} />

      {/* SKT SIR AI CHATBOT MODAL/DRAWER */}
      <ChatbotWidget user={user} isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </div>
  );
}
