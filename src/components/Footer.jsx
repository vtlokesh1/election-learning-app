export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-slate-200 dark:border-white/10 bg-white/30 dark:bg-slate-950/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">
              EVM-OS
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
            An ultra-premium, interactive educational platform designed to empower citizens and demystify the democratic process.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><a href="#home" className="hover:text-pink-500 transition-colors">Home</a></li>
            <li><a href="#timeline" className="hover:text-pink-500 transition-colors">Timeline</a></li>
            <li><a href="#quiz" className="hover:text-pink-500 transition-colors">Quiz</a></li>
            <li><a href="#evm" className="hover:text-pink-500 transition-colors">Simulator</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><a href="#" className="hover:text-pink-500 transition-colors">Voter Registration</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Find Polling Station</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Know Your Candidate</a></li>
            <li><a href="#faq" className="hover:text-pink-500 transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <p>© 2026 EVM-OS. All rights reserved. Designed for civic education.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
