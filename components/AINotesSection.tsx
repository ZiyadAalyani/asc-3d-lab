'use client';
import { useState } from 'react';
import {
  BookOpen,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  HelpCircle,
  Table,
  Cpu,
  Waves,
  Zap,
  Gauge,
  Compass,
  CheckCircle2
} from 'lucide-react';

const TOPIC_NOTES = [
  {
    id: 'resonance-tube',
    title: 'Velocity of Sound in Air via Resonance Tube',
    category: 'Acoustics & Wave Mechanics',
    icon: Waves,
    aim: 'To determine the speed of sound in air at room temperature and the acoustic end correction of a closed organ pipe using a resonance tube and tuning forks of known frequencies.',
    apparatus: [
      'Graduated Borosilicate Resonance Tube (100 cm length, ~4 cm internal diameter)',
      'Adjustable Water Reservoir Bottle with rack-and-pinion clamp',
      'Flexible Rubber Tubing Conduit with pinch cock',
      'Set of 4 Standard Alloy Tuning Forks (512 Hz, 480 Hz, 384 Hz, 256 Hz)',
      'Vulcanized Rubber Striking Pad',
      'Heavy Cast-Iron Leveling Tripod Stand with Dual Clamps',
      'Laboratory Thermometer (0–50°C, Least Count 0.1°C)',
      'Internal Vernier Caliper (for measuring tube inner diameter d)'
    ],
    construction: [
      'The apparatus consists of a uniform vertical glass tube (~1 m length) with millimeter laser graduations along its length starting with 0 at the open upper mouth.',
      'A reservoir bottle filled with clean water is linked to the bottom of the tube via heavy-walled flexible rubber tubing.',
      'The reservoir can be smoothly elevated or depressed on the support rod to control the water meniscus level inside the glass tube.',
      'A set of high-Q acoustic alloy tuning forks provides pure single-frequency sinusoidal pressure excitation when struck on the rubber pad and held horizontally just above the tube mouth.'
    ],
    working: [
      'When a vibrating tuning fork is held over the open mouth of the tube, longitudinal sound waves travel down the air column.',
      'At the water-air interface, waves reflect with a 180° phase inversion, forming a rigid closed boundary where particle displacement is zero: a Displacement Node (N) / Pressure Antinode.',
      'At the open mouth, air particles oscillate freely with maximum amplitude, forming a Displacement Antinode (A).',
      'Because of air inertia, the antinode does not form exactly at the physical lip, but slightly outside by an End Correction: e ≈ 0.3d.',
      'First resonance occurs at air length L₁: L₁ + e = λ / 4.',
      'Second resonance occurs at air length L₂: L₂ + e = 3λ / 4.',
      'Subtracting equations eliminates the unknown end correction: L₂ − L₁ = λ / 2, yielding λ = 2(L₂ − L₁).',
      'Speed of sound is therefore given by: v = f · λ = 2f(L₂ − L₁).'
    ],
    formulae: [
      {
        name: 'Speed of Sound (Eliminating End Correction)',
        formula: 'v = 2f (L₂ − L₁)',
        note: 'Where f is tuning fork frequency, L₁ is first resonance length, L₂ is second resonance length.'
      },
      {
        name: 'Acoustic End Correction (Rayleigh Formula)',
        formula: 'e = (L₂ − 3L₁) / 2 ≈ 0.3 × d',
        note: 'Where d is the internal diameter of the resonance tube measured with a Vernier caliper.'
      },
      {
        name: 'Temperature Correction to 0°C',
        formula: 'v₀ = v_T − 0.61 × T(°C)',
        note: 'Speed of sound increases by 0.61 m/s per degree Celsius rise in ambient temperature.'
      }
    ],
    procedure: [
      '1. Clamp the glass resonance tube vertically on the tripod stand using a plumb line or spirit level.',
      '2. Fill the reservoir with water and raise it to fill the resonance tube to within 2 cm of the open top.',
      '3. Strike the 512 Hz tuning fork on the rubber pad and hold its vibrating prongs horizontally ~1 cm above the tube mouth.',
      '4. Slowly lower the reservoir to lower the water surface until a loud acoustic resonance roar is heard. Note this position as L₁.',
      '5. Continue lowering the water level until the second resonance is reached. Note this position as L₂.',
      '6. Repeat readings twice for each tuning fork (both while lowering and raising the water column) and record average values.',
      '7. Measure room temperature T using the thermometer, and internal tube diameter d using Vernier calipers.'
    ],
    tableHeaders: ['Fork Frequency f (Hz)', 'First Resonance L₁ (cm)', 'Second Resonance L₂ (cm)', '(L₂ − L₁) (cm)', 'Calculated Velocity v (m/s)', 'End Correction e (cm)'],
    tableRows: [
      ['512 Hz', '15.5', '49.0', '33.5', '343.0 m/s', '1.25 cm'],
      ['480 Hz', '16.7', '52.4', '35.7', '342.7 m/s', '1.15 cm'],
      ['384 Hz', '21.1', '65.7', '44.6', '342.5 m/s', '1.20 cm'],
      ['256 Hz', '32.3', '— (>80 cm)', '—', '—', '—']
    ],
    viva: [
      {
        q: 'Why does the antinode form slightly outside the open end of the tube?',
        a: 'Due to the inertia of moving air particles at the open boundary, sound waves cannot reflect sharply at the geometric edge of the tube. Reflection occurs slightly outside in free space at a distance e ≈ 0.3d.'
      },
      {
        q: 'Why is the formula v = 2f(L₂ − L₁) superior to v = 4f(L₁ + e)?',
        a: 'Because subtracting L₁ from L₂ completely eliminates the unknown and empirically variable end correction e, drastically minimizing measurement uncertainty.'
      },
      {
        q: 'What is the phase difference between incident and reflected sound waves at the water surface?',
        a: 'The phase difference is 180° (π radians) because water is an acoustically denser medium than air, acting as a rigid fixed boundary.'
      }
    ]
  },
  {
    id: 'vernier',
    title: 'Vernier Caliper Metrology & Zero Error Analysis',
    category: 'Precision Mechanics',
    icon: Compass,
    aim: 'To determine the volume and density of a cylindrical metallic specimen using a metric Vernier caliper, and to determine the Least Count and zero error of the instrument.',
    apparatus: ['Metric Vernier Caliper (15 cm range)', 'Solid Brass Cylindrical Specimen', 'Chemical Balance & Weight Box', 'Magnifying Reading Glass'],
    construction: [
      'The instrument consists of a main beam scale graduated in centimeters and millimeters, with a fixed jaw on one end.',
      'A sliding Vernier frame moves smoothly along the beam and carries the movable jaw and an auxiliary Vernier scale divided into 10 divisions coinciding with 9 main scale divisions.',
      'External jaws measure outside diameter/length; internal jaws measure inside diameter of hollow cylinders; a thin tail strip measures depth.'
    ],
    working: [
      'Least Count (LC) = 1 MSD − 1 VSD = (1 mm) / 10 = 0.1 mm = 0.01 cm.',
      'Total Reading (TR) = MSR + (VSC × LC) − (± Zero Error).',
      'When jaws touch with no object, if Vernier zero aligns with Main zero, Zero Error is nil.',
      'Positive Zero Error: Vernier zero is to the right of Main zero (+e, subtracted).',
      'Negative Zero Error: Vernier zero is to the left of Main zero (−e, added).'
    ],
    formulae: [
      { name: 'Least Count', formula: 'LC = 1 MSD − 1 VSD = (1 MSD) / n = 0.01 cm', note: 'n = total Vernier scale divisions.' },
      { name: 'Corrected Reading', formula: 'TR = MSR + (VSC × 0.01 cm) − (± Zero Error)', note: 'VSC = coinciding division.' }
    ],
    procedure: [
      '1. Determine the Least Count: 1 mm / 10 = 0.01 cm.',
      '2. Inspect zero error by bringing external jaws in gentle contact.',
      '3. Grip the cylindrical specimen gently between external jaws.',
      '4. Note Main Scale Reading (MSR) before the Vernier zero mark.',
      '5. Identify coinciding division (VSC) with a magnifying lens.',
      '6. Calculate Total Reading and repeat for 3 orthogonal positions.'
    ],
    tableHeaders: ['Observation No.', 'MSR (cm)', 'Coinciding VSC', 'VSR = VSC × LC (cm)', 'Observed Length (cm)', 'Corrected Length (cm)'],
    tableRows: [
      ['1', '2.4', '5', '0.05', '2.45', '2.45 cm'],
      ['2', '2.4', '6', '0.06', '2.46', '2.46 cm'],
      ['3', '2.4', '5', '0.05', '2.45', '2.45 cm']
    ],
    viva: [
      { q: 'What is the principle of a Vernier scale?', a: 'It utilizes the principle that the human eye can judge the alignment of two collinear lines with 10 times higher accuracy than estimating fractional spacing between lines.' },
      { q: 'How do you handle negative zero error?', a: 'If the 6th line coincides to the left of zero, Error = −(10 − 6) × LC = −0.04 cm. This value is added to the observed reading.' }
    ]
  },
  {
    id: 'micrometer',
    title: 'Micrometer Screw Gauge Metrology',
    category: 'Precision Mechanics',
    icon: Gauge,
    aim: 'To measure the diameter of a thin copper wire and thickness of a glass plate using a micrometer screw gauge.',
    apparatus: ['Micrometer Screw Gauge (0–25 mm, Pitch 1 mm)', 'Thin Copper Test Wire', 'Glass Plate Specimen', 'Magnifying Glass'],
    construction: [
      'U-shaped rigid cast-iron frame carrying a fixed flat anvil on the left.',
      'A threaded spindle driven by a rotating thimble along an internal linear pitch barrel (sleeve).',
      'A ratchet stop at the end of the thimble featuring a calibrated spring-slip clutch mechanism to apply uniform contact pressure.'
    ],
    working: [
      'Pitch = Linear displacement per 360° revolution = 1.0 mm.',
      'Least Count (LC) = Pitch / Circular Divisions = 1.0 mm / 100 = 0.01 mm = 0.001 cm.',
      'Total Thickness = PSR + (CSR × LC) − Zero Error.'
    ],
    formulae: [
      { name: 'Least Count', formula: 'LC = Pitch / Total Head Divisions = 1.0 mm / 100 = 0.01 mm', note: 'Linear resolution 10 micrometers.' },
      { name: 'Total Thickness', formula: 'Thickness = PSR + (CSR × 0.01 mm) − (± Zero Error)', note: 'Ratchet ensures repeatable contact.' }
    ],
    procedure: [
      '1. Turn ratchet until anvil and spindle meet to inspect zero error.',
      '2. Place wire between anvil and spindle.',
      '3. Rotate thimble until ratchet clicks three times.',
      '4. Read Pitch Scale Reading (PSR) and Circular Scale Division (CSR).'
    ],
    tableHeaders: ['Trial No.', 'PSR (mm)', 'CSR Division', 'CSR × 0.01 (mm)', 'Observed Diameter (mm)', 'Corrected Diameter (mm)'],
    tableRows: [
      ['1', '4.0', '28', '0.28', '4.28 mm', '4.28 mm'],
      ['2', '4.0', '29', '0.29', '4.29 mm', '4.29 mm'],
      ['3', '4.0', '28', '0.28', '4.28 mm', '4.28 mm']
    ],
    viva: [
      { q: 'Why is the ratchet essential?', a: 'It slips at standardized contact pressure (~3 N), preventing user error and plastic deformation of thin wires.' },
      { q: 'What is backlash error and how is it avoided?', a: 'Backlash error occurs due to wear in screw threads. It is eliminated by always turning the thimble in one continuous direction during final reading.' }
    ]
  },
  {
    id: 'ohms-law',
    title: "Verification of Ohm's Law & Specific Resistance",
    category: 'Electricity & Magnetism',
    icon: Zap,
    aim: "To verify Ohm's law and determine the resistance per unit length of an unknown metallic conductor wire.",
    apparatus: ['Regulated DC Power Supply (0–12V)', 'High-Resistance DC Voltmeter (0–10V)', 'Low-Resistance DC Ammeter (0–2A)', 'Wire-Wound Rheostat (100Ω, 2A)', 'Unknown Resistance Coil', 'Plug Key & Connecting Leads'],
    construction: [
      'The circuit connects the DC voltage source, variable rheostat slider, plug key, and ammeter in series with the test resistor.',
      'A high-impedance voltmeter is connected in parallel across the terminals of the test resistor to measure potential drop without diverting significant current.'
    ],
    working: [
      "Ohm's Law: At constant temperature and physical dimensions, current I is directly proportional to applied potential difference V: V = I · R.",
      'Plotting V on Y-axis against I on X-axis yields a straight line passing through the origin. The slope equals the resistance R.'
    ],
    formulae: [
      { name: "Ohm's Law", formula: 'V = I · R  →  R = V / I', note: 'Linear relationship across ohmic conductors.' },
      { name: 'Slope Resistance', formula: 'R = ΔV / ΔI', note: 'Extracted from linear regression of V vs I graph.' }
    ],
    procedure: [
      '1. Connect circuit elements in series and voltmeter in parallel across resistor.',
      '2. Adjust rheostat to set current at 0.2A, 0.4A, 0.6A, 0.8A, 1.0A.',
      '3. Record corresponding voltmeter readings.',
      '4. Calculate R for each step and plot V vs I graph.'
    ],
    tableHeaders: ['Trial No.', 'Current I (A)', 'Voltage V (V)', 'Resistance R = V/I (Ω)', 'Mean Resistance (Ω)'],
    tableRows: [
      ['1', '0.20', '2.0', '10.0 Ω', '10.0 Ω'],
      ['2', '0.40', '4.0', '10.0 Ω', '10.0 Ω'],
      ['3', '0.60', '6.0', '10.0 Ω', '10.0 Ω'],
      ['4', '0.80', '8.0', '10.0 Ω', '10.0 Ω']
    ],
    viva: [
      { q: 'Why is ammeter connected in series and voltmeter in parallel?', a: 'Ammeter has near-zero internal resistance to measure total current without causing voltage drop; voltmeter has very high internal resistance to avoid shunting current away from the circuit.' }
    ]
  }
];

export default function AINotesSection() {
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_NOTES[0]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A192F]/90 backdrop-blur-xl border border-cyan-500/25 p-6 rounded-3xl shadow-[0_10px_35px_rgba(2,132,199,0.15)]">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles size={14} className="text-cyan-400" />
            <span>AI Curriculum Study Notes & Derivations</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Laboratory Engineering Notes</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Topic-wise mathematical formulations, apparatus construction, working principles, observation tables, and viva-voce questions.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#132646] hover:bg-[#1a3258] text-cyan-300 hover:text-white px-4 py-2.5 rounded-xl border border-cyan-500/30 text-xs font-bold transition-all shadow-md self-start md:self-auto"
        >
          <Printer size={15} />
          <span>Print Study Guide</span>
        </button>
      </div>

      {/* TOPIC SELECTOR PILLS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TOPIC_NOTES.map((topic) => {
          const Icon = topic.icon;
          const isActive = selectedTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-[0_4px_18px_rgba(2,132,199,0.35)]'
                  : 'bg-[#0A192F]/80 text-slate-400 border-cyan-500/15 hover:border-cyan-500/40 hover:text-white'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-white' : 'text-cyan-400'} />
              <span>{topic.title}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC NOTE CONTENT CARD */}
      <div className="bg-[#0A192F]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* TOPIC TITLE HEADER */}
        <div className="border-b border-cyan-500/20 pb-4">
          <span className="text-[11px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest">
            {selectedTopic.category}
          </span>
          <h3 className="text-2xl font-black text-white mt-1">{selectedTopic.title}</h3>
        </div>

        {/* 1. AIM & APPARATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
              🔬 Practical Aim
            </span>
            <p className="text-xs leading-relaxed text-slate-300 m-0">{selectedTopic.aim}</p>
          </div>
          <div className="bg-[#071324] border border-cyan-500/20 p-4 rounded-2xl">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
              🧰 Apparatus & Instruments Required
            </span>
            <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside m-0">
              {selectedTopic.apparatus.slice(0, 5).map((app, i) => (
                <li key={i}>{app}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. CONSTRUCTION DETAILS */}
        <div className="bg-[#071324] border border-cyan-500/20 p-5 rounded-2xl space-y-2">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            🏗️ Apparatus Construction & Design
          </span>
          <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside">
            {selectedTopic.construction.map((c, i) => (
              <li key={i} className="leading-relaxed">{c}</li>
            ))}
          </ul>
        </div>

        {/* 3. WORKING PRINCIPLE & DERIVATION */}
        <div className="bg-[#071324] border border-cyan-500/20 p-5 rounded-2xl space-y-2">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            ⚡ Working Principle & Mathematical Formulation
          </span>
          <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside mb-4">
            {selectedTopic.working.map((w, i) => (
              <li key={i} className="leading-relaxed">{w}</li>
            ))}
          </ul>

          {/* FORMULAE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {selectedTopic.formulae.map((f, i) => (
              <div key={i} className="bg-[#0A192F] border border-cyan-500/30 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block mb-1">
                  {f.name}
                </span>
                <div className="font-mono font-extrabold text-sm text-white mb-1">{f.formula}</div>
                <p className="text-[10px] text-slate-400 m-0 leading-normal">{f.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. STANDARD OBSERVATION TABLE */}
        <div className="bg-[#071324] border border-cyan-500/20 p-5 rounded-2xl space-y-3">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            📊 Standard Laboratory Observation Table Template
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-cyan-500/20 rounded-xl overflow-hidden">
              <thead className="bg-[#0A192F] text-cyan-300 font-mono text-[11px] uppercase border-b border-cyan-500/20">
                <tr>
                  {selectedTopic.tableHeaders.map((h, i) => (
                    <th key={i} className="py-2.5 px-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {selectedTopic.tableRows.map((row, i) => (
                  <tr key={i} className="hover:bg-cyan-500/5 transition-colors font-mono text-slate-300">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2.5 px-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. VIVA-VOCE QUESTIONS & ANSWERS */}
        <div className="bg-[#071324] border border-cyan-500/20 p-5 rounded-2xl space-y-3">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            🎯 Oral Viva-Voce Examination Questions & Model Answers
          </span>
          <div className="space-y-3">
            {selectedTopic.viva.map((item, i) => (
              <div key={i} className="bg-[#0A192F] p-3.5 rounded-xl border border-cyan-500/25">
                <b className="text-cyan-300 text-xs block mb-1">
                  Q{i + 1}: {item.q}
                </b>
                <p className="text-xs text-slate-300 leading-relaxed m-0">
                  <span className="text-emerald-400 font-bold font-mono">Answer: </span>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
