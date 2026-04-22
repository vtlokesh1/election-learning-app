import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Aarav S.",
    role: "First-time Voter",
    content: "This app made understanding the EVM process incredibly simple. I feel completely confident heading to the polls for the first time!",
    avatar: "bg-blue-500"
  },
  {
    name: "Priya M.",
    role: "Civic Educator",
    content: "An absolute masterpiece of design. The interactive timeline is exactly what my students needed to visualize the electoral process.",
    avatar: "bg-pink-500"
  },
  {
    name: "Rahul T.",
    role: "Senior Citizen",
    content: "Very clear and easy to read. The dark mode is gentle on the eyes, and the quiz was surprisingly fun to complete.",
    avatar: "bg-violet-500"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-blue-500/10 via-pink-500/10 to-violet-500/10 blur-[100px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Voices of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">People</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg font-medium leading-relaxed mb-8 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${t.avatar} flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
