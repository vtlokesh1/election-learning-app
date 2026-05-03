import { Cloud } from 'lucide-react';

/**
 * Footer — site-wide footer with navigation links and Google services attribution.
 */
export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 border-t border-slate-200 dark:border-white/10 bg-white/30 dark:bg-slate-950/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand description */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg" aria-hidden="true">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">EVM-OS</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
            An ultra-premium, interactive educational platform designed to empower citizens and demystify the democratic process.
          </p>

          {/* Google Services Badges */}
          <div className="flex flex-col gap-3" aria-label="Powered by Google services">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold shadow-sm w-fit"
              data-testid="google-cloud-badge"
            >
              <Cloud size={16} className="text-blue-500" aria-hidden="true" />
              <span>Powered by </span>
              <span className="font-bold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              <span>Cloud ☁️</span>
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold shadow-sm w-fit"
              data-testid="antigravity-badge"
            >
              <span aria-hidden="true">🚀</span>
              <span>Built with </span>
              <span className="font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Google Antigravity
              </span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li><a href="#home" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">Home</a></li>
            <li><a href="#timeline" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">Timeline</a></li>
            <li><a href="#quiz" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">Quiz</a></li>
            <li><a href="#evm" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">Simulator</a></li>
          </ul>
        </nav>

        {/* Resources links */}
        <nav aria-label="Footer resources">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li>
              <a
                href="https://www.nvsp.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500"
                aria-label="Voter Registration (opens in new tab)"
              >
                Voter Registration ↗
              </a>
            </li>
            <li>
              <a
                href="https://electoralsearch.eci.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500"
                aria-label="Find Polling Station (opens in new tab)"
              >
                Find Polling Station ↗
              </a>
            </li>
            <li><a href="#quiz" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">Election Quiz</a></li>
            <li><a href="#faq" className="hover:text-pink-500 transition-colors focus-visible:outline-none focus-visible:text-pink-500">FAQ</a></li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <p data-testid="footer-copyright">© 2026 EVM-OS. All rights reserved. Designed for civic education.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:text-slate-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:text-slate-900">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
