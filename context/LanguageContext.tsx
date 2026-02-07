'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Supported languages with their metadata
export const LANGUAGES = {
    en: { name: 'English', nativeName: 'English', dir: 'ltr' },
    ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
    hi: { name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
    ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
    tl: { name: 'Tagalog', nativeName: 'Tagalog', dir: 'ltr' },
    fr: { name: 'French', nativeName: 'Français', dir: 'ltr' },
    bn: { name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
    ru: { name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    dir: 'ltr' | 'rtl';
    languageInfo: typeof LANGUAGES[LanguageCode];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<LanguageCode>('en');

    // Load saved language from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('citykey-language') as LanguageCode;
        if (saved && LANGUAGES[saved]) {
            setLanguageState(saved);
        }
    }, []);

    // Update document direction when language changes
    useEffect(() => {
        const dir = LANGUAGES[language].dir;
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('citykey-language', lang);
    };

    const value: LanguageContextType = {
        language,
        setLanguage,
        dir: LANGUAGES[language].dir,
        languageInfo: LANGUAGES[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
