'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
    const { language, setLanguage, dir } = useLanguage();
    const t = getTranslations(language);
    const pathname = usePathname();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { href: '/', label: t.nav_home, icon: '🏠', emoji: true },
        { href: '/chat', label: t.nav_chat, icon: '💬', emoji: true },
        { href: '/documents', label: t.nav_documents, icon: '📄', emoji: true },
        { href: '/checklist', label: t.nav_checklist, icon: '✅', emoji: true },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Top Header Bar - Desktop & Mobile */}
            <header
                className="fixed top-0 left-0 right-0 z-50 glass-premium border-b-0"
                dir={dir}
            >
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                            <Image
                                src="/logo.png"
                                alt="CityKey Logo"
                                fill
                                className="object-contain drop-shadow-lg"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">
                            <span className="text-white">City</span>
                            <span className="text-amber-400">Key</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                  px-4 py-2 rounded-full font-medium text-sm transition-all duration-300
                  ${isActive(item.href)
                                        ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                                    }
                `}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Language Switcher */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm font-medium text-slate-200 transition-all duration-200"
                            aria-label="Change language"
                        >
                            <span className="text-lg">🌐</span>
                            <span className="hidden sm:block">{LANGUAGES[language].nativeName}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Language Dropdown */}
                        {isLangDropdownOpen && (
                            <div
                                className={`
                  absolute top-full mt-2 w-48 py-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl
                  animate-in fade-in slide-in-from-top-2 duration-200
                  ${dir === 'rtl' ? 'left-0' : 'right-0'}
                `}
                            >
                                {(Object.entries(LANGUAGES) as [LanguageCode, typeof LANGUAGES[LanguageCode]][]).map(([code, info]) => (
                                    <button
                                        key={code}
                                        onClick={() => {
                                            setLanguage(code);
                                            setIsLangDropdownOpen(false);
                                        }}
                                        className={`
                      w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors
                      ${language === code
                                                ? 'bg-amber-500/20 text-amber-400'
                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                            }
                    `}
                                        dir={info.dir}
                                    >
                                        <span>{info.nativeName}</span>
                                        {language === code && (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Bottom Navigation Bar - Mobile Only (Thumb-friendly) */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 safe-area-pb"
                dir={dir}
            >
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl min-w-[64px] transition-all duration-200
                ${isActive(item.href)
                                    ? 'text-amber-400 bg-amber-500/10'
                                    : 'text-slate-400 hover:text-slate-200'
                                }
              `}
                        >
                            <span className={`text-xl transition-transform duration-200 ${isActive(item.href) ? 'scale-110' : ''}`}>
                                {item.icon}
                            </span>
                            <span className="text-[10px] font-medium truncate max-w-[60px]">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Spacer for fixed headers */}
            <div className="h-14" />
        </>
    );
}
