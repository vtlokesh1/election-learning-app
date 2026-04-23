import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyVotingMatters from './components/WhyVotingMatters';
import Statistics from './components/Statistics';
import Timeline from './components/Timeline';
import VotingSteps from './components/VotingSteps';
import Quiz from './components/Quiz';
import MockEVM from './components/MockEVM';
import BoothLocator from './components/BoothLocator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import GeminiChatbot from './components/GeminiChatbot';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-pink-500 selection:text-white transition-colors duration-700 overflow-x-hidden">
      <CustomCursor />
      
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main>
          <Hero />
          <WhyVotingMatters />
          <Statistics />
          <Timeline />
          <VotingSteps />
          <BoothLocator />
          <Quiz />
          <MockEVM />
          <Testimonials />
          <FAQ />
          <CTASection />
        </main>
        
        <Footer />
        <GeminiChatbot />
      </div>
    </div>
    </LanguageProvider>
  );
}