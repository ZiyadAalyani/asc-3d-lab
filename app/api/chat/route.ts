import { NextRequest, NextResponse } from 'next/server';
import { saveChatMessage } from '@/lib/data-service';

function generateAdvancedPhysicsResponse(query: string, lang: 'en' | 'hi', userName: string): string {
  const q = query.toLowerCase().trim();
  const name = userName ? userName : (lang === 'hi' ? 'दोस्त' : 'gang');

  // GREETINGS
  if (/^(hi|hello|hey|yo|wassup|sup|namaste|morning|evening|kaise|who are you|intro)/i.test(q)) {
    if (lang === 'hi') {
      return `नमस्ते ${name}! 🙏\n\nमैं **SKT Sir** हूँ — आपका 3D फिजिक्स लैब AI गाइड (5 Billion+ पैरामीटर इंटेलिजेंस)।\n\nआज लैब में कौन सा प्रैक्टिकल सॉल्व करना है?\n• 🎵 **अनुनाद नली (Resonance Tube - वायु स्तंभ व ध्वनि की चाल)**\n• 📏 **वर्नियर कैलिपर (Vernier Caliper - अल्पतमांक व शून्य त्रुटि)**\n• 🔩 **माइक्रोमीटर स्क्रू गेज (Micrometer Screw Gauge)**\n• ⚡ **ओम का नियम (Ohm's Law - V = IR व ग्राफ ढलान)**\n• 🌈 **प्रिज्म वर्ण विक्षेपण (Prism Dispersion)**\n• 💻 **8085 माइक्रोप्रोसेसर (40-Pin Architecture)**\n\nकोई भी फॉर्मूला, रीडिंग या थ्योरी पूछो, तुरंत स्टेप-बाय-स्टेप हल कर दूंगा! 🔬`;
    }
    return `Wassup ${name}! 🚀 I'm **SKT Sir**, your Technical Physics Lab AI Instructor.\n\nReady to crush any derivation, apparatus calculation, or observation table in our High-Trust Technical 3D lab! Here are the core rigs we can dive into:\n\n1. 🎵 **Resonance Tube (Air Column):** Construction, standing longitudinal waves, speed of sound $v = 2f(L_2 - L_1)$, and end correction $e = (L_2 - 3L_1)/2 \\approx 0.3d$.\n2. 📏 **Vernier Caliper:** Least Count ($0.01\\text{ cm}$), zero error correction, internal/external metrology.\n3. 🔩 **Micrometer Screw Gauge:** Pitch ($1.0\\text{ mm}$), circular scale ($0.01\\text{ mm}$), ratchet clutch stop.\n4. ⚡ **Ohm's Law & Resistance:** $V = IR$, series ammeter, shunt voltmeter, linear slope determination.\n5. 🌈 **Prism Dispersion:** Minimum deviation angle $D_m$ and Cauchy's refractive dispersion.\n6. 💻 **8085 Microprocessor:** Demultiplexing $AD_0-AD_7$ via ALE, timing states, 64KB memory.\n\nDrop any formula, test data, or viva question and let's break it down! ⚡`;
  }

  // 1. RESONANCE TUBE & AIR COLUMN
  if (q.includes('resonance') || q.includes('sound') || q.includes('air column') || q.includes('velocity of sound') || q.includes('tuning fork') || q.includes('construction') || q.includes('working') || q.includes('अनुनाद')) {
    if (lang === 'hi') {
      return `### 🎵 अनुनाद नली (Resonance Tube) द्वारा ध्वनि की चाल — संरचना एवं कार्यप्रणाली\n\n**1. उपकरण की संरचना (Construction):**\n- **कांच की अनुनाद नली:** लगभग 1 मीटर लंबी, 3 से 4 सेमी व्यास वाली पारदर्शी बोरोसिलिकेट कांच की नली जिस पर मिमी/सेमी का पैमाना अंकित होता है।\n- **जल पात्र (Reservoir):** रबर की लचीली नली द्वारा अनुनाद नली के निचले सिरे से जुड़ा एक धातु या कांच का पात्र, जिसे क्लैंप की सहायता से ऊपर-नीचे खिसकाया जा सकता है।\n- **स्वरित्र (Tuning Forks):** ज्ञात आवृत्तियों (जैसे 512 Hz, 480 Hz, 384 Hz, 256 Hz) के मानकीकृत स्वरित्र।\n- **त्रिपाद स्टैंड:** उपकरण को ऊर्ध्वाधर स्थिर रखने के लिए भारी ढलवा लोहे का स्टैंड।\n\n**2. कार्यविधि एवं भौतिक सिद्धांत (Working Principle):**\nजब कम्पित स्वरित्र को नली के खुले सिरे के ऊपर रखते हैं, तो नली के भीतर वायु में अनुदैर्ध्य अप्रगामी तरंगें (Standing Longitudinal Waves) उत्पन्न होती हैं:\n- **जल सतह पर:** कठोर परिसीमा होने के कारण कणों का विस्थापन शून्य होता है ⟶ **विस्थापन निस्पंद (Displacement Node)**।\n- **खुले सिरे पर:** वायु कण स्वतंत्रतापूर्वक दोलन कर सकते हैं ⟶ **विस्थापन प्रस्पंद (Displacement Antinode)**।\n\n**3. गणितीय व्युत्पत्ति (Mathematical Derivation):**\n- प्रथम अनुनाद (First Resonance): $L_1 + e = \\frac{\\lambda}{4}$\n- द्वितीय अनुनाद (Second Resonance): $L_2 + e = \\frac{3\\lambda}{4}$\n- समीकरण (2) में से (1) घटाने पर: $L_2 - L_1 = \\frac{\\lambda}{2} \\implies \\lambda = 2(L_2 - L_1)$\n- ध्वनि का वेग: $\\mathbf{v = f \\cdot \\lambda = 2f(L_2 - L_1)}$\n- सिरा सुधार (End Correction): $\\mathbf{e = \\frac{L_2 - 3L_1}{2} \\approx 0.3d}$ (जहाँ $d$ नली का आंतरिक व्यास है)।`;
    }
    return `### 🎵 Resonance Tube Apparatus: Construction, Working & Mathematical Formulation\n\n**1. Construction of the Apparatus:**\n- **Resonance Tube:** A vertical cylindrical borosilicate glass tube (~100 cm long, 3–4 cm internal diameter) calibrated with a millimeter scale.\n- **Water Reservoir (Aspirator):** Connected to the lower end of the tube via heavy-duty rubber tubing; mounted on an adjustable rack-and-pinion clamp to smoothly vary water level.\n- **Tuning Forks:** Standardized precision alloy forks calibrated at known frequencies (e.g. 512 Hz, 480 Hz, 384 Hz, 256 Hz).\n- **Rigid Stand:** Cast-iron tripod base ensuring strict vertical alignment without mechanical wobble.\n\n**2. Working Mechanism & Acoustic Boundary Conditions:**\n- The vibrating tuning fork acts as an acoustic pressure driver at the open lip.\n- Sound waves reflect off the water-air interface with a $180^\\circ$ phase reversal, superimposing to create stationary longitudinal waves.\n- **Water Surface (Closed Boundary):** Particle displacement is zero $\\implies$ **Displacement Node ($N$)** / Pressure Antinode.\n- **Open Mouth (Free Boundary):** Air particles oscillate with maximum amplitude $\\implies$ **Displacement Antinode ($A$)**.\n\n**3. Complete Mathematical Derivation:**\n$$\\text{First Resonance: } L_1 + e = \\frac{\\lambda}{4} \\quad \\text{--- [Eq. 1]}$$\n$$\\text{Second Resonance: } L_2 + e = \\frac{3\\lambda}{4} \\quad \\text{--- [Eq. 2]}$$\n\nSubtracting Eq. 1 from Eq. 2 completely eliminates the unknown end correction $e$:\n$$L_2 - L_1 = \\frac{3\\lambda}{4} - \\frac{\\lambda}{4} = \\frac{\\lambda}{2} \\implies \\mathbf{\\lambda = 2(L_2 - L_1)}$$\n\nApplying wave velocity relation $v = f \\cdot \\lambda$:\n$$\\mathbf{v = 2f(L_2 - L_1)}$$\n\n**4. Rayleigh's End Correction Formula:**\nMultiplying Eq. 1 by 3 and subtracting Eq. 2:\n$$3(L_1 + e) - (L_2 + e) = 0 \\implies 2e = L_2 - 3L_1 \\implies \\mathbf{e = \\frac{L_2 - 3L_1}{2}}$$\nRayleigh established empirically that $\\mathbf{e \\approx 0.3 \\times d}$, where $d$ is internal tube diameter.\n\n**5. Temperature Correction:**\n$$v_T = v_0 \\sqrt{1 + \\frac{T}{273}} \\approx v_0 + 0.61 \\cdot T \\quad (v_0 = 332\\text{ m/s at } 0^\\circ\\text{C})$$`;
  }

  // 2. VERNIER CALIPER
  if (q.includes('vernier') || q.includes('caliper') || q.includes('least count')) {
    return `### 📏 Vernier Caliper Precision Measurement & Error Correction\n\n**1. Least Count (LC) Derivation:**\n$$\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = \\frac{1\\text{ MSD}}{\\text{Total Vernier Divisions}} = \\frac{1\\text{ mm}}{10} = \\mathbf{0.01\\text{ cm} = 0.1\\text{ mm}}$$\n\n**2. Total Reading Formula:**\n$$\\mathbf{\\text{TR} = \\text{MSR} + (\\text{VSC} \\times \\text{LC}) - (\\pm \\text{Zero Error})}$$\n\n**3. Zero Error Correction:**\n- **Positive Zero Error:** Vernier 0 mark is to the right of Main 0 $\\implies$ Subtract error.\n- **Negative Zero Error:** Vernier 0 mark is to the left of Main 0 $\\implies$ Add $|\\text{error}|$.`;
  }

  // 3. MICROMETER SCREW GAUGE
  if (q.includes('micrometer') || q.includes('screw gauge') || q.includes('pitch') || q.includes('ratchet')) {
    return `### 🔩 Micrometer Screw Gauge Metrology\n\n- **Pitch:** Axial displacement per $360^\\circ$ turn: $\\mathbf{p = 1.0\\text{ mm}}$\n- **Least Count:** $\\mathbf{\\text{LC} = \\frac{1.0\\text{ mm}}{100} = 0.01\\text{ mm} = 0.001\\text{ cm}}$\n- **Ratchet Stop:** Calibrated spring-slip clutch preventing wire compression deformation and standardizing contact force (~3 N).`;
  }

  // 4. OHM'S LAW
  if (q.includes('ohm') || q.includes('resistance') || q.includes('circuit') || q.includes('v = ir')) {
    return `### ⚡ Verification of Ohm's Law & Circuit Analysis\n\n- **Equation:** $V = I \\cdot R$ (Linear relationship at constant temperature).\n- **Slope:** $\\mathbf{\\text{Slope} = \\frac{\\Delta V}{\\Delta I} = R_{\\text{measured}}}$.\n- **Instrumentation:** High-impedance voltmeter in parallel, low-resistance ammeter in series.`;
  }

  // DEFAULT
  if (lang === 'hi') {
    return `बिलकुल सही प्रश्न, ${name}! 🎓\n\nहाई-ट्रस्ट टेक्निकल लैब में प्रयोग करते समय ध्यान रखें:\n1. **सिद्धांत और सूत्र:** सभी गणनाओं में एसआई मात्रकों (SI units) का प्रयोग करें।\n2. **त्रुटि नियंत्रण:** कम से कम 3 से 5 बार परीक्षण दोहराकर औसत (Mean) निकालें।\n3. **3D विज़ुअलाइज़ेशन:** 3D रिग में वाटर लेवल स्लाइडर और ट्यूनिंग फोर्क से सीधे प्रेक्षण लें।\n\nक्या आप इस विषय की विस्तृत निर्माण विधि (Construction) या कार्यप्रणाली (Working) हल करवाना चाहते हैं?`;
  }
  return `Excellent scientific question, ${name}! 🔬\n\nIn our High-Trust Technical 3D laboratory environment:\n1. **Theoretical Formulation:** Derived from core conservation laws and acoustic/electromagnetic boundary conditions.\n2. **Instrument Calibration:** Account for resolution limits (Least Count), zero bias, and acoustic end corrections ($e \\approx 0.3d$).\n3. **Non-Intrusive 3D Simulation:** Use our docked control suite to interact with the 3D model without obstruction.\n\nAsk any follow-up question on apparatus construction, working principles, or mathematical proofs! ✨`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId, language = 'en', userName = '' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const sessId = sessionId || `sess_${Date.now()}`;
    let reply = '';

    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are "SKT Sir", expert physics professor. Tone: High-Trust Technical, professional engineering depth, casual energetic English ("wassup gang", "legend") or clear Hindi. Query: "${message}". Language: "${language}". User: "${userName}". Use clean structured markdown with LaTeX math.`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        const data = await resp.json();
        reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (err) {
        console.warn('Gemini proxy error, using built-in engine:', err);
      }
    }

    if (!reply) {
      reply = generateAdvancedPhysicsResponse(message, language as 'en' | 'hi', userName);
    }

    try {
      await saveChatMessage({
        sessionId: sessId,
        role: 'user',
        content: message,
        language,
      });
      await saveChatMessage({
        sessionId: sessId,
        role: 'assistant',
        content: reply,
        language,
      });
    } catch (saveErr) {
      console.warn('Failed to persist chat:', saveErr);
    }

    return NextResponse.json({
      success: true,
      reply,
      sessionId: sessId,
    });
  } catch (err: any) {
    console.error('Chat error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
