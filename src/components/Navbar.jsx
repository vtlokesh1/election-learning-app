import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Impact', id: 'impact' },
    { name: 'Stats', id: 'stats' },
    { name: 'Timeline', id: 'timeline' },
    { name: 'How to Vote', id: 'voting' },
    { name: 'Quiz', id: 'quiz' },
    { name: 'Mock EVM', id: 'evm' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled 
            ? "py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <span className="text-white font-black text-xl">V</span>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 hidden sm:block">
              EVM-OS
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/40 dark:border-white/10 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeSection === item.id 
                    ? "text-slate-900 dark:text-white" 
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/5"
                )}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl lg:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "text-left text-2xl font-bold py-4 border-b border-slate-200 dark:border-white/5",
                    activeSection === item.id ? "text-pink-500" : "text-slate-800 dark:text-white"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
