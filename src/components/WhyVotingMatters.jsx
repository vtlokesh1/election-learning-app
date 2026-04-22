import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

const cards = [
  {
    icon: ShieldCheck,
    title: "Protect Your Rights",
    desc: "Voting is your most powerful tool to protect your fundamental rights and shape policies that affect your daily life.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: Scale,
    title: "Ensure Equality",
    desc: "Every vote carries the exact same weight. The ballot box is the ultimate equalizer in our democratic society.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  },
  {
    icon: HeartHandshake,
    title: "Build the Future",
    desc: "Your vote decides who builds our schools, hospitals, and infrastructure for the next generation.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20"
  }
];

export default function WhyVotingMatters() {
  return (
    <section id="impact" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
            Why Your Vote <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Matters</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A single vote has the power to shift history. Discover the monumental impact of participating in democracy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              className="group relative"
            >
              {/* Background Glow */}
              <div className={cn(
                "absolute inset-0 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-[3rem]",
                card.bg
              )} />
              
              <div className="relative h-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", card.bg, card.border, "border")}>
                  <card.icon size={32} className={card.color} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
