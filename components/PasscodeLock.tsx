
import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Fingerprint, Lock } from 'lucide-react';

interface PasscodeLockProps {
  onSuccess: () => void;
}

const PasscodeLock: React.FC<PasscodeLockProps> = ({ onSuccess }) => {
  const [passcode, setPasscode] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const CORRECT_CODE = 'TIME IS GOLD';
  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    if (!isLocked) inputRef.current?.focus();
    const handleGlobalClick = () => !isLocked && inputRef.current?.focus();
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isLocked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) return;
    const val = e.target.value.toUpperCase();
    // Allow letters, numbers, and spaces
    if (/^[A-Z0-9\s]*$/.test(val)) {
      setPasscode(val);
      if (error) setError(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLocked || !passcode) return;

    if (passcode.trim() === CORRECT_CODE) {
      onSuccess();
    } else {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      setError(true);
      if (nextAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
      } else {
        setTimeout(() => {
          setPasscode('');
          setError(false);
        }, 1000);
      }
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-600">
        <ShieldAlert size={64} className="animate-pulse mb-6" />
        <h1 className="text-2xl font-black tracking-[1em] uppercase italic">System_Halt</h1>
        <p className="mt-4 text-[10px] opacity-40 font-mono">UNAUTHORIZED_ACCESS_LOCKDOWN_ACTIVE</p>
        <button onClick={() => window.location.reload()} className="mt-12 px-8 py-2 border border-red-900 text-[10px] uppercase tracking-[0.4em] hover:bg-red-950 transition-all">Reboot</button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white overflow-hidden relative transition-colors duration-1000 ${error ? 'bg-red-950/20' : ''}`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 ${error ? 'bg-red-600/5' : 'bg-yellow-400/5'}`} />
      </div>

      {/* The Core Visual (Thumbnail) */}
      <div className="relative z-10 flex flex-col items-center group">
        <div className="relative w-64 h-64 mb-16">
          {/* Rotating Rings */}
          <div className={`absolute inset-0 border border-white/[0.03] rounded-full animate-[spin_10s_linear_infinite] ${error ? 'border-red-500/20' : ''}`} />
          <div className={`absolute inset-4 border border-dashed border-white/[0.05] rounded-full animate-[spin_15s_linear_infinite_reverse] ${error ? 'border-red-500/20' : ''}`} />
          <div className={`absolute inset-12 border-2 border-white/[0.02] rounded-full flex items-center justify-center transition-all duration-700 ${passcode ? 'scale-110 border-yellow-400/20' : ''}`}>
             <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${error ? 'bg-red-500 text-black border-red-400' : passcode ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-white/5 border-white/10 text-white/20'}`}>
                {error ? <ShieldAlert size={20} /> : <Lock size={20} />}
             </div>
          </div>
          
          {/* Progress Indicators (Mapped to CORRECT_CODE length) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(CORRECT_CODE.length)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-full" 
                style={{ transform: `rotate(${(i / CORRECT_CODE.length) * 360}deg)` }}
              >
                <div className={`w-1 h-3 rounded-full mx-auto transition-all duration-500 ${i < passcode.length ? (error ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-yellow-400 shadow-[0_0_10px_yellow]') : 'bg-white/5'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Input Interface */}
        <div className={`flex flex-col items-center transition-all duration-500 ${error ? 'animate-shake' : ''}`}>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={passcode}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="absolute inset-0 opacity-0 cursor-default"
              maxLength={CORRECT_CODE.length}
            />
            <div className="flex flex-col items-center gap-4">
              <div className={`text-2xl md:text-3xl font-black italic tracking-[0.2em] font-mono h-16 flex items-center transition-colors duration-300 ${error ? 'text-red-500' : 'text-white'}`}>
                {passcode || <span className="text-white/5 tracking-[0.5em] animate-pulse uppercase">SECRET_KEY</span>}
              </div>
              <div className={`h-px transition-all duration-1000 ${error ? 'w-full bg-red-500' : passcode ? 'w-full bg-yellow-400' : 'w-24 bg-white/10'}`} />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className={`mt-16 group flex flex-col items-center gap-3 transition-all duration-500 ${passcode.length >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
              <Fingerprint size={24} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-yellow-400 transition-colors">Authorize_Access</span>
          </button>
        </div>
      </div>

      {/* Edge Details */}
      <div className="fixed bottom-12 left-12 flex flex-col gap-1 opacity-20 group">
        <div className="h-0.5 w-8 bg-white group-hover:w-16 transition-all" />
        <span className="text-[8px] font-black uppercase tracking-widest italic">Node_Status: OK</span>
      </div>

      <div className="fixed bottom-12 right-12 text-right opacity-20">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] italic block mb-1 text-yellow-400">Vault_Security</span>
        <div className="flex gap-1 justify-end">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-1 h-1 rounded-full ${i < (MAX_ATTEMPTS - failedAttempts) ? 'bg-white' : 'bg-red-500'}`} />
           ))}
        </div>
      </div>
    </div>
  );
};

export default PasscodeLock;
