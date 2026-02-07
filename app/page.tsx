'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';

export default function Home() {
  const { language, setLanguage, dir } = useLanguage();
  const t = getTranslations(language);

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  const languageList = Object.entries(LANGUAGES) as [LanguageCode, typeof LANGUAGES[LanguageCode]][];

  return (
    <div className="min-h-screen bg-aurora text-slate-100 overflow-hidden" dir={dir}>
      {/* Decorative blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-2s' }} />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">

        {/* Logo & Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative w-40 h-40 mx-auto mb-8 drop-shadow-2xl animate-float">
            <Image
              src="/logo.png"
              alt="CityKey Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            <span className="text-white">City</span>
            <span className="gradient-text">Key</span>
          </h1>
          <p className="text-xl text-slate-400 font-light tracking-wide max-w-md mx-auto">
            {t.tagline}
          </p>
        </div>

        {/* Language Selection */}
        <div className="w-full max-w-2xl mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <p className="text-center text-slate-500 mb-6 text-sm uppercase tracking-widest font-semibold">
            {t.select_language}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languageList.map(([code, info], i) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`
                  relative group overflow-hidden p-4 rounded-2xl transition-all duration-300 border
                  ${language === code
                    ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1'
                  }
                `}
              >
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-2xl filter drop-shadow-md">{info.flag}</span>
                  <span className={`text-sm font-medium ${language === code ? 'text-amber-400' : 'text-slate-300 group-hover:text-white'}`} dir={info.dir}>
                    {info.nativeName}
                  </span>
                </div>
                {language === code && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {[
            { href: '/chat', icon: '💬', label: t.nav_chat, desc: 'AI Assistant' },
            { href: '/documents', icon: '📄', label: t.nav_documents, desc: 'Docs Explainer' },
            { href: '/checklist', icon: '✅', label: t.nav_checklist, desc: 'Step-by-step' },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative glass-premium p-8 rounded-3xl text-center transition-all duration-300 hover:scale-105 hover:bg-slate-800/60 hover:border-amber-500/30"
            >
              <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                {item.label}
              </h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-slate-600 text-xs font-medium tracking-widest uppercase flex items-center gap-2 animate-in fade-in delay-500 opacity-60 hover:opacity-100 transition-opacity">
          <span>POWERED BY</span>
          <span className="flex items-center gap-1 text-slate-400">
            LINGO<span className="text-amber-500">.</span>DEV
          </span>
        </div>
      </div>
    </div>
  );
}
