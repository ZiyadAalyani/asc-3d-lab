'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface ChatbotWidgetProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotWidget({ user, isOpen, onClose }: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Wassup gang! 🚀 I am **SKT Sir**, your Physics Lab AI Tutor (5B Parameter Technical Intelligence).\n\nAsk me anything about:\n• 🎵 **Resonance Tube:** Construction, working, standing acoustic waves, $v = 2f(L_2 - L_1)$, and end correction $e \\approx 0.3d$.\n• 📏 **Vernier Caliper & Micrometer:** Least counts and zero error corrections.\n• ⚡ **Ohm\'s Law & Circuits:** $V = IR$ and linear regression slopes.\n\nDrop your experimental query or viva question below!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#`$]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const newHistory: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newHistory);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language,
          userName: user?.fullName || 'Ziyad',
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'Calculation completed. Check your parameters!';

      setMessages([...newHistory, { role: 'assistant', content: reply }]);
      speakText(reply);
    } catch (err) {
      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: '⚠️ Network connection hiccup. Let me re-calculate that for you in a moment!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (typeof window === 'undefined') return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRec();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (evt: any) => {
      const transcript = evt.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-[#0A192F]/98 backdrop-blur-2xl border-l border-cyan-500/30 z-50 shadow-[-15px_0_50px_rgba(2,132,199,0.3)] flex flex-col animate-in slide-in-from-right duration-300">
      {/* TOP BAR */}
      <div className="p-4 bg-gradient-to-r from-[#0d203d] to-[#132646] border-b border-cyan-500/25 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 border border-cyan-400/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(2,132,199,0.4)]">
            <Bot size={22} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-white">SKT Sir AI Tutor</h3>
              <span className="text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded-full">
                5B ENGINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400">High-Trust Technical Physics Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-2 py-1 bg-[#0A192F] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded-lg text-[10px] font-bold transition-colors"
          >
            {language === 'en' ? 'EN' : 'हिन्दी'}
          </button>

          {/* Voice Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1.5 rounded-lg border transition-colors ${
              voiceEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                : 'bg-[#0A192F] text-slate-500 border-slate-700'
            }`}
            title={voiceEnabled ? 'Mute AI voice' : 'Enable AI voice'}
          >
            {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* QUICK PROMPT CHIPS */}
      <div className="px-4 py-2 bg-[#071324] border-b border-cyan-500/20 flex gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
        {[
          'Resonance tube derivation',
          'End correction formula',
          'Vernier least count',
          'Ohm\'s law graph slope',
        ].map((chip) => (
          <button
            key={chip}
            onClick={() => {
              setInput(chip);
            }}
            className="px-2.5 py-1 bg-[#132646] hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-200 rounded-full border border-cyan-500/25 whitespace-nowrap transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* MESSAGES LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shrink-0 text-xs shadow-md mt-0.5">
                <Bot size={14} />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md'
                  : 'bg-[#132646] text-slate-100 border border-cyan-500/25 rounded-bl-xs shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-800 text-cyan-300 flex items-center justify-center shrink-0 text-xs border border-cyan-500/30 mt-0.5">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 items-center text-xs text-cyan-400 font-mono">
            <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center">
              <Bot size={14} />
            </div>
            <div className="p-3 bg-[#132646] rounded-2xl border border-cyan-500/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SKT Sir is formulating the physical proof...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSend} className="p-3 bg-[#0d203d] border-t border-cyan-500/25 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMic}
          className={`p-2.5 rounded-xl border transition-colors ${
            isListening
              ? 'bg-rose-500/30 border-rose-400 text-rose-300 animate-pulse'
              : 'bg-[#0A192F] text-slate-400 hover:text-cyan-300 border-cyan-500/30'
          }`}
          title="Voice Input"
        >
          {isListening ? <Mic size={16} /> : <MicOff size={16} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === 'hi' ? 'भौतिकी का कोई भी प्रश्न पूछें...' : 'Ask SKT Sir any physics query...'}
          className="flex-1 px-4 py-2.5 bg-[#0A192F] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-white rounded-xl shadow-md transition-all"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
