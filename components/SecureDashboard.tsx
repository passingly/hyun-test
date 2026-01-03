
import React, { useState, useEffect } from 'react';
import { 
  Send, 
  LogOut,
  RefreshCw,
  Zap,
  Terminal,
  Clock as ClockIcon,
  Cpu,
  User,
  ShieldCheck,
  Activity,
  Plus
} from 'lucide-react';
import { generateStudioContent } from '../services/gemini';
import { AppStatus, Character } from '../types';

const INITIAL_CHARACTERS: Character[] = [
  {
    id: '1',
    name: '클락 (CLOCK)',
    class: 'CHIEF_EXECUTIVE_OFFICER',
    specialty: 'Visionary Strategy',
    description: '이 회사의 대표. 전체적인 시스템 설계와 최종 승인 권한을 가진 절대적인 통제자입니다.',
    imageUrl: 'https://igx.kr/r/3C/0/0',
    stats: { power: 85, intel: 99, speed: 70 },
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: '루엔 (LUEN)',
    class: 'COLLECTION_AGENT_G1',
    specialty: 'Elite Debt Retrieval',
    description: '회사에 소속된 1등급 징수직원. 미납된 자산을 회수하는 데 있어 타의 추종을 불허하는 신속함을 보여줍니다.',
    imageUrl: 'https://igx.kr/r/3C/0/1',
    stats: { power: 88, intel: 80, speed: 95 },
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: '유티 (UT)',
    class: 'COLLECTION_AGENT_G1',
    specialty: 'Advanced Liquidation',
    description: '회사에 소속된 1등급 징수직원. 고도의 기술력을 바탕으로 복잡한 자산 동결 및 징수 절차를 완벽하게 수행합니다.',
    imageUrl: 'https://igx.kr/r/3C/0/2',
    stats: { power: 92, intel: 85, speed: 60 },
    status: 'ACTIVE'
  },
  {
    id: '4',
    name: '시넨 (SINEN)',
    class: 'COLLECTION_AGENT_G2',
    specialty: 'System Enforcement',
    description: '회사에 소속된 2등급 징수직원. 데이터 마이닝을 통해 잠재적 채무를 식별하고 현장 징수를 지원합니다.',
    imageUrl: 'https://igx.kr/r/3C/0/3',
    stats: { power: 75, intel: 90, speed: 82 },
    status: 'ACTIVE'
  },
  {
    id: '5',
    name: '버트 (BERT)',
    class: 'OFFICE_ADMIN_G1',
    specialty: 'Logistics & Data',
    description: '회사에 소속된 1등급 사무직. 모든 징수 기록과 내부 문서를 관리하며 사무실의 질서를 유지하는 핵심 인력입니다.',
    imageUrl: 'https://igx.kr/r/3C/0/4',
    stats: { power: 45, intel: 95, speed: 40 },
    status: 'ACTIVE'
  }
];

const SecureDashboard: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGenerate = async () => {
    if (!input.trim() || status === AppStatus.LOADING) return;
    setStatus(AppStatus.LOADING);
    
    try {
      const prompt = `Create a detailed sci-fi character named "${input}". Return the response in a JSON-like structure (but as natural text) including: Class, Specialty, and a one-sentence background. Keep it very cool and high-tech sounding.`;
      const result = await generateStudioContent(prompt);
      
      const newChar: Character = {
        id: Date.now().toString(),
        name: input.toUpperCase().replace(/\s/g, '_'),
        class: result.match(/Class:\s*([^\n\r]+)/)?.[1] || 'Agent',
        specialty: result.match(/Specialty:\s*([^\n\r]+)/)?.[1] || 'Unknown',
        description: result.split('\n').find(l => l.length > 50) || 'Dossier encrypted or unavailable.',
        stats: {
          power: Math.floor(Math.random() * 40) + 60,
          intel: Math.floor(Math.random() * 40) + 60,
          speed: Math.floor(Math.random() * 40) + 60,
        },
        status: 'ACTIVE'
      };
      
      setCharacters(prev => [...prev, newChar]);
      setInput('');
      setStatus(AppStatus.IDLE);
    } catch (err) {
      setStatus(AppStatus.ERROR);
      setTimeout(() => setStatus(AppStatus.IDLE), 3000);
    }
  };

  const formatTime = (date: Date) => date.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="flex h-screen bg-[#010101] text-white">
      {/* Sidebar */}
      <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 bg-black/40 backdrop-blur-3xl z-50">
        <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)] mb-12">
          <Zap className="text-black w-5 h-5 fill-current" />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="p-3 text-yellow-400 border border-yellow-400/20 rounded-xl bg-yellow-400/5">
            <User size={20} />
          </div>
          <div className="p-3 text-slate-500 hover:text-white transition-colors cursor-pointer">
            <Cpu size={20} />
          </div>
          <div className="p-3 text-slate-500 hover:text-white transition-colors cursor-pointer">
            <Activity size={20} />
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-3 text-slate-500 hover:text-white transition-colors">
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

        <header className="h-20 flex items-center justify-between px-12 border-b border-white/5 bg-black/40 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Vault_Dossier_Control</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Active_Profiles</span>
              <span className="text-sm font-mono text-yellow-400">{characters.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-xs font-mono tracking-widest text-slate-400">
              {formatTime(now)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {characters.map((char) => (
              <div key={char.id} className="group relative glass-panel rounded-[2rem] border border-white/5 hover:border-yellow-400/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col">
                
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0a0a0a]">
                  {char.imageUrl ? (
                    <>
                      <img 
                        src={char.imageUrl} 
                        alt={char.name} 
                        className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/10 to-transparent opacity-80" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                       <User size={48} className="text-white/5" />
                    </div>
                  )}
                  
                  {/* Status Overlay */}
                  <div className="absolute top-6 right-6">
                    <div className={`px-3 py-1 rounded-md text-[8px] font-black tracking-widest border backdrop-blur-md ${char.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-slate-500 border-white/10 bg-black/20'}`}>
                      {char.status}
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-4 flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className="text-[9px] font-black text-yellow-500/50 uppercase tracking-[0.3em] mb-1 block">{char.class}</span>
                    <h3 className="text-2xl font-black italic tracking-tighter text-white group-hover:text-yellow-400 transition-colors uppercase">{char.name}</h3>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div>
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-2">Specialty</span>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{char.specialty}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                        <span>Tactical_Stats</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(char.stats).map(([key, val]) => (
                          <div key={key} className="bg-white/[0.02] border border-white/5 p-2 rounded-lg text-center">
                            <div className="text-[7px] text-slate-600 mb-1 uppercase">{key}</div>
                            <div className="text-xs font-mono text-white">{val}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 leading-relaxed italic line-clamp-2">
                        "{char.description}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-8 opacity-10 pointer-events-none group-hover:opacity-40 transition-opacity">
                   <Terminal size={14} />
                </div>
              </div>
            ))}

            <div className="border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-12 min-h-[400px] group cursor-pointer hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-700 mb-4 group-hover:text-white group-hover:border-white/20 transition-all">
                    <Plus size={24} />
                </div>
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em]">Waiting_Deployment</span>
            </div>
          </div>
        </div>

        <div className="p-12 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-yellow-400/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative glass-panel rounded-[2rem] border border-white/10 p-2 flex items-center gap-2 bg-black/90 backdrop-blur-3xl shadow-2xl">
              <div className="pl-6 text-yellow-500">
                <Terminal size={18} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="새로운 요원 식별명 입력..."
                className="flex-1 bg-transparent px-4 py-5 outline-none text-white placeholder-slate-700 font-bold text-lg"
              />
              <button
                onClick={handleGenerate}
                disabled={status === AppStatus.LOADING || !input.trim()}
                className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-slate-900 disabled:text-slate-700 px-10 py-5 rounded-[1.6rem] font-black text-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-xl flex items-center gap-3"
              >
                {status === AppStatus.LOADING ? <RefreshCw className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Plus size={16} />
                    Deploy_Agent
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecureDashboard;
