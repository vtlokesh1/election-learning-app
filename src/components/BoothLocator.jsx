import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BoothLocator() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('Connaught Place, New Delhi');
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184285!2d77.21595625000001!3d28.62890165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1684824368598!5m2!1sen!2sin"
  );
  const iframeRef = useRef(null);
  const handleSearch = () => {
    if (!query || !query.trim()) return;
    const q = encodeURIComponent(query.trim());
    const url = `https://www.google.com/maps?q=${q}&output=embed`;
    setMapSrc(url);
    if (iframeRef.current) iframeRef.current.src = url;
  };
  return (
    <section id="locator" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6 text-sm font-bold tracking-wide uppercase">
            <MapPin size={16} /> {t('locator.tag')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            {t('locator.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{t('locator.title2')}</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('locator.desc')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('locator.searchTitle')}</h3>
            <div className="relative mb-6">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
                placeholder={t('locator.placeholder')}
                aria-label="Search for polling station"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <button onClick={() => handleSearch()} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50">
              {t('locator.btn')}
            </button>
            
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t('locator.nearby')}</h4>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      {i}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white">Public School #{i}</h5>
                      <p className="text-sm text-slate-500">{t('locator.away')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-[500px] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-slate-200 dark:bg-slate-800"
          >
            {/* Google Maps Iframe Embed - Using a generic query for demo purposes */}
            <iframe
              title="Google Maps Polling Booth Locator"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              ref={iframeRef}
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[20%] contrast-[1.1]"
            ></iframe>
            
            {/* Frosty Overlay for premium feel */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
