import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-pink-600 to-violet-600 rounded-[3rem] p-12 md:p-20 text-center relative shadow-2xl overflow-hidden group">
        {/* Animated background elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0,transparent_50%)] z-0"
        />
        
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-medium"
          >
            Your voice is the foundation of democracy. Register, learn, and cast your vote in the next election.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => document.getElementById('evm')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center gap-3 mx-auto"
            >
              Practice Voting Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
