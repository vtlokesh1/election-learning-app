import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Counter({ from, to, duration, suffix }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function: easeOutExpo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const currentVal = from + (to - from) * easeOut;
      
      setValue(currentVal);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return (
    <span ref={nodeRef}>
      {Number.isInteger(to) ? Math.round(value) : value.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const { t } = useLanguage();

  const stats = [
    { tKey: "s1", value: 900, suffix: "M+" },
    { tKey: "s2", value: 1.2, suffix: "M" },
    { tKey: "s3", value: 543, suffix: "" },
    { tKey: "s4", value: 5.5, suffix: "M" }
  ];

  return (
    <section id="stats" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h3 className="text-center text-slate-400 font-bold tracking-widest uppercase mb-16 text-sm">
          {t('stats.title')}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
              className="text-center px-4"
            >
              <h4 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-4 tracking-tighter">
                <Counter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
              </h4>
              <p className="text-slate-400 font-medium tracking-widest uppercase text-sm md:text-base">
                {t(`stats.${stat.tKey}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
