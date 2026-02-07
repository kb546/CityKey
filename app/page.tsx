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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" dir={dir}>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="CityKey Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">
            {t.app_name}
          </h1>
          <p className="text-xl text-slate-300">
            {t.tagline}
          </p>
        </div>

        {/* Language Selection */}
        <div className="w-full max-w-lg">
          <h2 className="text-center text-slate-400 mb-6 text-lg">
            {t.select_language}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {languageList.map(([code, info]) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`
                  relative p-4 rounded-xl font-medium transition-all duration-200
                  ${language === code
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:scale-102 border border-slate-600'
                  }
                `}
              >
                <span className="text-lg" dir={info.dir}>
                  {info.nativeName}
                </span>
                {language === code && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-12">
          <Link
            href="/chat"
            className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105"
          >
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
              {t.nav_chat}
            </h3>
          </Link>

          <Link
            href="/documents"
            className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105"
          >
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
              {t.nav_documents}
            </h3>
          </Link>

          <Link
            href="/checklist"
            className="group bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-amber-500/50 rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105"
          >
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
              {t.nav_checklist}
            </h3>
          </Link>
        </div>

        {/* Powered by Lingo.dev */}
        <div className="mt-16 text-slate-500 text-sm flex items-center gap-2">
          <span>🌐</span>
          <span>{t.powered_by}</span>
        </div>
      </div>
    </div>
  );
}
