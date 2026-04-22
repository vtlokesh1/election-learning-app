import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
      >
        <div className="relative flex flex-col items-center">
          {/* Glowing orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-pink-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 border-t-2 border-b-2 border-blue-500/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-500/20 rounded-full animate-[spin_7s_linear_infinite]" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-violet-400 mb-8 z-10 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          >
            EVM-OS
          </motion.div>
          
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              className="h-full bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 rounded-full relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50 animate-pulse" />
            </motion.div>
          </div>
          <div className="mt-4 text-slate-400 font-mono text-sm uppercase tracking-widest z-10">
            Initializing System ... {Math.min(progress, 100)}%
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
