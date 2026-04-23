import { motion } from 'framer-motion';
import { UserPlus, FileText, Megaphone, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function Timeline() {
  const { t } = useLanguage();

  const timeline = [
    {
      title: t('timeline.p1_title'),
      desc: t('timeline.p1_desc'),
      icon: UserPlus,
      color: 'text-blue-500',
      bg: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/50'
    },
    {
      title: t('timeline.p2_title'),
      desc: t('timeline.p2_desc'),
      icon: FileText,
      color: 'text-violet-500',
      bg: 'from-violet-500/20 to-purple-500/20',
      border: 'border-violet-500/50'
    },
    {
      title: t('timeline.p3_title'),
      desc: t('timeline.p3_desc'),
      icon: Megaphone,
      color: 'text-pink-500',
      bg: 'from-pink-500/20 to-rose-500/20',
      border: 'border-pink-500/50'
    },
    {
      title: t('timeline.p4_title'),
      desc: t('timeline.p4_desc'),
      icon: BarChart,
      color: 'text-emerald-500',
      bg: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/50'
    }
  ];

  return (
    <section id="timeline" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
          {t('timeline.title')}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-6" />
      </motion.div>

      <div className="relative">
        {/* Animated Connecting Line */}
        <div className="hidden md:block absolute top-[48px] left-[12.5%] right-[12.5%] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center text-center group perspective-1000"
            >
              {/* Icon Node */}
              <motion.div 
                whileHover={{ rotateY: 15, rotateX: -15, scale: 1.1 }}
                className={cn(
                  "w-24 h-24 rounded-full shadow-2xl flex items-center justify-center mb-8 relative z-10 transition-transform duration-300 bg-gradient-to-br border-[3px] bg-white dark:bg-slate-900",
                  item.bg,
                  item.border
                )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <item.icon size={40} className={item.color} style={{ transform: 'translateZ(20px)' }} />
                {/* Progress Pulse */}
                <div className="absolute inset-0 rounded-full border border-current scale-100 group-hover:scale-[1.3] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>

              {/* Card Content */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl w-full flex-grow relative overflow-hidden group-hover:shadow-2xl transition-all duration-300"
              >
                <div className={cn("absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r opacity-50 transition-opacity group-hover:opacity-100", item.bg)} />
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
