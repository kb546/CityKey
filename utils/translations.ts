import { LanguageCode } from '@/context/LanguageContext';

// Import all translation files
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import hi from '@/locales/hi.json';
import ur from '@/locales/ur.json';
import tl from '@/locales/tl.json';
import fr from '@/locales/fr.json';
import bn from '@/locales/bn.json';
import ru from '@/locales/ru.json';

// Type for translation keys
export type TranslationKey = keyof typeof en;

// All translations mapped by language code
const translations: Record<LanguageCode, typeof en> = {
    en,
    ar,
    hi,
    ur,
    tl,
    fr,
    bn,
    ru,
};

/**
 * Get the translation object for a specific language
 */
export function getTranslations(language: LanguageCode): typeof en {
    return translations[language] || translations.en;
}

/**
 * Get a specific translation key for a language
 */
export function t(language: LanguageCode, key: TranslationKey): string {
    const trans = translations[language] || translations.en;
    return trans[key] || translations.en[key] || key;
}
