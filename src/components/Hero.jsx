import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-pink-500/20 dark:bg-pink-600/30 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/20 rounded-full blur-[150px] mix-blend-screen"
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 mb-8 text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          <Sparkles size={16} className="text-pink-500" />
          <span>The Future of Civic Education</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight"
        >
          <span className="text-slate-900 dark:text-white">Empower Your </span>
          <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 animate-gradient-x">
            Democratic Voice
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Experience an award-winning, interactive journey through the electoral process. 
          Learn, engage, and cast your mock vote in our hyper-realistic simulator.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => document.getElementById('evm')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-full font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Launch Simulator</span>
          </button>

          <button
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 rounded-full font-bold text-slate-900 dark:text-white bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-xl w-full sm:w-auto"
          >
            Explore Timeline
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
