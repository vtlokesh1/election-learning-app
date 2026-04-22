import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { label: "Eligible Voters", value: 900, suffix: "M+" },
  { label: "Polling Stations", value: 1, suffix: "M+" },
  { label: "EVMs Used", value: 5, suffix: "M+" },
  { label: "Poll Workers", value: 15, suffix: "M+" }
];

function Counter({ from, to, duration, suffix }) {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime;
    let animationFrame;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section id="stats" className="py-32 relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
