import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Scale } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyVotingMatters() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: ShieldCheck,
      title: t('whyVoting.c1_title'),
      desc: t('whyVoting.c1_desc'),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: Scale,
      title: t('whyVoting.c2_title'),
      desc: t('whyVoting.c2_desc'),
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    {
      icon: HeartHandshake,
      title: t('whyVoting.c3_title'),
      desc: t('whyVoting.c3_desc'),
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    }
  ];

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
            {t('whyVoting.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto rounded-full" />
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
