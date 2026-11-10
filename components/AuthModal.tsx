'use client';
import { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: emailOrUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate.');
      }
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          role,
          rollNumber: rollNumber || (role === 'student' ? 'B001' : 'FACULTY-01'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register.');
      }
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (roleType: 'student' | 'instructor') => {
    setIsLogin(true);
    if (roleType === 'student') {
      setEmailOrUsername('student@asc.edu');
      setPassword('student123');
    } else {
      setEmailOrUsername('instructor@asc.edu');
      setPassword('instructor123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#0A192F] rounded-3xl shadow-[0_25px_60px_rgba(2,132,199,0.35)] border border-cyan-500/35 overflow-hidden">
        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-[#0d203d] to-[#132646] p-6 text-white text-center relative border-b border-cyan-500/25">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-400/50 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(2,132,199,0.3)]">
            <Lock size={22} className="text-cyan-300" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">ASC Laboratory Portal</h2>
          <p className="text-xs text-cyan-300/80 mt-1 font-mono">
            High-Trust Technical Authentication
          </p>
        </div>

        {/* TABS */}
        <div className="flex border-b border-cyan-500/20 text-xs font-bold bg-[#071324]">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              isLogin ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10' : 'border-transparent text-slate-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              !isLogin ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10' : 'border-transparent text-slate-400'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* FORM CONTENT */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <span className="font-bold text-rose-400">Error:</span> {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Email or Username</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="student@asc.edu or ziyad"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-[0_6px_20px_rgba(2,132,199,0.35)] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Laboratory'} <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="student1"
                    className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@asc.edu"
                  className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Roll / ID</label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="B001"
                    className="w-full px-3 py-2 bg-[#071324] border border-cyan-500/25 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Creating Account...' : 'Register in Laboratory'} <CheckCircle2 size={14} />
              </button>
            </form>
          )}

          {/* QUICK DEMO LOGIN */}
          <div className="mt-5 pt-4 border-t border-cyan-500/20">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block text-center mb-2">
              ⚡ Quick Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('student')}
                className="py-1.5 px-2 bg-[#071324] hover:bg-cyan-500/10 hover:border-cyan-400/50 text-slate-300 text-[11px] font-semibold rounded-lg border border-cyan-500/20 transition-colors"
              >
                👨‍🎓 Student Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemo('instructor')}
                className="py-1.5 px-2 bg-[#071324] hover:bg-cyan-500/10 hover:border-cyan-400/50 text-slate-300 text-[11px] font-semibold rounded-lg border border-cyan-500/20 transition-colors"
              >
                👨‍🏫 Instructor Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
