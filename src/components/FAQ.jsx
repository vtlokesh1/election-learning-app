import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  { q: "What is the minimum age to vote?", a: "In India, you must be at least 18 years old on January 1st of the year of the revision of electoral rolls to be eligible to vote." },
  { q: "What is NOTA?", a: "NOTA stands for 'None of the Above'. It allows voters to officially register a vote of rejection for all candidates contesting in the election, promoting accountability." },
  { q: "Can I vote without a voter ID card?", a: "Yes, you can vote if your name is on the electoral roll. You will need to show alternative officially approved photo ID proofs like a Passport, Driving License, or Aadhar Card." },
  { q: "How is EVM security maintained?", a: "EVMs are standalone machines not connected to any network or internet. They undergo rigorous multi-level checks, mock polls, and are sealed in the presence of political representatives." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-32 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Questions</span>
        </h2>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md",
                isOpen ? "border-blue-500/50 dark:border-blue-500/50" : "border-slate-200 dark:border-white/5"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <h3 className={cn(
                  "text-xl font-bold transition-colors",
                  isOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-white"
                )}>
                  {faq.q}
                </h3>
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isOpen ? "bg-blue-500/10 text-blue-500" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
