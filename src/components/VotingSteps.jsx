import { motion } from 'framer-motion';
import { UserCheck, ClipboardList, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function VotingSteps() {
  const { t } = useLanguage();

  const steps = [
    { 
      icon: UserCheck, 
      title: t('steps.s1_title'), 
      desc: t('steps.s1_desc'), 
      color: 'text-blue-500', 
      bg: 'from-blue-500/20 to-cyan-500/20' 
    },
    { 
      icon: ClipboardList, 
      title: t('steps.s2_title'), 
      desc: t('steps.s2_desc'), 
      color: 'text-violet-500', 
      bg: 'from-violet-500/20 to-purple-500/20' 
    },
    { 
      icon: CheckCircle, 
      title: t('steps.s3_title'), 
      desc: t('steps.s3_desc'), 
      color: 'text-emerald-500', 
      bg: 'from-emerald-500/20 to-green-500/20' 
    }
  ];

  return (
    <section id="voting" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
          {t('steps.title')}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 mx-auto rounded-full mb-6" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, type: "spring", bounce: 0.4 }}
            className="group bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
          >
             <div className={cn(
               "absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700",
               item.bg
             )} />
             
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500">
                <item.icon className={item.color} size={40} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
