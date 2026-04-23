import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Lock, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

const candidates = [
  { name: 'Candidate A', party: 'Party X', symbol: '🌟' },
  { name: 'Candidate B', party: 'Party Y', symbol: '⚡' },
  { name: 'Candidate C', party: 'Party Z', symbol: '🍃' }
];

export default function MockEVM() {
  const { t } = useLanguage();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showEvmPopup, setShowEvmPopup] = useState(false);
  const [pendingCandidate, setPendingCandidate] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  // Note: For a real premium feel, we could add small UI sounds here if we had audio files
  // const playBeep = () => new Audio('/beep.mp3').play().catch(() => {});

  const handleVoteClick = (candidate) => {
    if (isLocked) return;
    setPendingCandidate(candidate);
    setShowEvmPopup(true);
  };

  const confirmVote = () => {
    setSelectedCandidate(pendingCandidate);
    setShowEvmPopup(false);
    setIsLocked(true);
    // playBeep();
  };

  return (
    <section id="evm" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 -skew-y-3 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            {t('evm.title').split(' ')[0]} {t('evm.title').split(' ')[1]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{t('evm.title').split(' ')[2] || ''}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience the tactile, secure process of casting a vote on a realistic Mock EVM interface.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          style={{ perspective: 2000 }}
          className="max-w-2xl mx-auto"
        >
          {/* Main EVM Body */}
          <div className="bg-slate-200 dark:bg-slate-800 rounded-[3rem] p-4 md:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-t border-l border-white/50 dark:border-white/10 border-b-8 border-r-8 border-slate-300 dark:border-slate-950 relative overflow-hidden">
            {/* Top Indicator Panel */}
            <div className="flex justify-between items-center bg-slate-300/50 dark:bg-slate-900/50 rounded-2xl p-6 mb-8 border border-white/40 dark:border-white/5 shadow-inner">
              <div className="flex flex-col">
                 <span className="text-slate-500 dark:text-slate-500 text-xs font-black tracking-[0.3em] uppercase">Ballot Unit</span>
                 <span className="text-slate-800 dark:text-white text-2xl font-black tracking-widest font-mono mt-1">EVM-V2.0</span>
              </div>
              <div className="flex items-center gap-6 bg-slate-200 dark:bg-slate-950 px-6 py-3 rounded-full shadow-inner border border-white/50 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{t('evm.statusReady')}</span>
                  <div className={cn("w-3 h-3 rounded-full transition-all duration-300", !isLocked ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" : "bg-slate-400 dark:bg-slate-700")} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{t('evm.statusVoted')}</span>
                  <div className={cn("w-3 h-3 rounded-full transition-all duration-300", isLocked ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-pulse" : "bg-slate-400 dark:bg-slate-700")} />
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center gap-4 md:gap-6 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border transition-all duration-300 shadow-sm",
                    selectedCandidate === candidate.name ? "border-blue-500 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-700"
                  )}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl md:text-2xl font-black text-slate-400 border border-slate-200 dark:border-slate-700 shadow-inner">
                    {index + 1}
                  </div>
                  <div className="flex-grow flex items-center justify-between">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wide">{candidate.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">{candidate.party}</p>
                    </div>
                    <div className="text-4xl filter drop-shadow-md hidden sm:block opacity-80">{candidate.symbol}</div>
                  </div>
                  
                  {/* The Physical Button */}
                  <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-950 p-2 md:p-3 rounded-2xl shadow-inner border border-slate-200 dark:border-white/5">
                    <div className={cn(
                      "w-4 h-4 rounded-full transition-all duration-200",
                      selectedCandidate === candidate.name ? "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,1)]" : "bg-slate-300 dark:bg-slate-800"
                    )} />
                    <button
                      disabled={isLocked}
                      onClick={() => handleVoteClick(candidate.name)}
                      aria-label={`Vote for ${candidate.name}`}
                      className={cn(
                        "relative w-16 h-12 md:w-24 md:h-16 rounded-xl flex-shrink-0 shadow-[0_8px_0_rgba(0,0,0,0.2)] transition-all duration-100 border-2 active:shadow-[0_0px_0_rgba(0,0,0,0)] active:translate-y-2",
                        isLocked 
                          ? "bg-slate-300 dark:bg-slate-800 border-slate-400 dark:border-slate-700 opacity-50 cursor-not-allowed shadow-[0_2px_0_rgba(0,0,0,0.2)] translate-y-1.5"
                          : "bg-blue-500 hover:bg-blue-400 border-blue-400 dark:border-blue-600"
                      )}
                    >
                      <div className="absolute inset-x-2 top-2 h-1/3 bg-white/20 rounded-full blur-[2px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Overlay Panel */}
            <AnimatePresence>
              {isLocked && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck size={100} />
                  </div>
                  <CheckCircle className="mx-auto text-emerald-500 mb-4" size={48} />
                  <h3 className="font-black text-emerald-700 dark:text-emerald-400 text-2xl mb-2">
                    {t('evm.successTitle')}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-300 font-medium">
                    {t('evm.successDesc')} <span className="font-bold">"{selectedCandidate}"</span>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-emerald-600/60 dark:text-emerald-400/60 text-sm font-bold uppercase tracking-widest">
                    <Lock size={16} /> Secure Transaction
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showEvmPopup && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t('evm.confirmTitle')}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
                  {t('evm.confirmDesc1')} <br/>
                  <span className="font-black text-2xl text-slate-900 dark:text-white block mt-4 bg-slate-100 dark:bg-slate-800 py-3 rounded-xl border border-slate-200 dark:border-slate-700">{pendingCandidate}</span>
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setShowEvmPopup(false);
                      setPendingCandidate('');
                    }}
                    className="px-6 py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-1"
                  >
                    {t('evm.btnCancel')}
                  </button>
                  <button 
                    onClick={confirmVote}
                    className="px-6 py-4 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/30 flex-1 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">{t('evm.btnCast')}</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
