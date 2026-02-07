'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';
import { explainDocument } from '@/utils/ai';
import Navbar from '@/components/Navbar';

export default function DocumentsPage() {
    const { language, dir } = useLanguage();
    const t = getTranslations(language);

    const [documentText, setDocumentText] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasExplained, setHasExplained] = useState(false);

    const loadSampleContract = async () => {
        try {
            const response = await fetch('/sample-contract.txt');
            const text = await response.text();
            setDocumentText(text);
            setExplanation('');
            setHasExplained(false);
        } catch (error) {
            console.error('Failed to load sample contract:', error);
        }
    };

    const handleExplain = async () => {
        if (!documentText.trim() || isLoading) return;

        setIsLoading(true);
        setHasExplained(false);

        try {
            const result = await explainDocument(documentText, language);
            setExplanation(result);
            setHasExplained(true);
        } catch (error) {
            console.error('Failed to explain document:', error);
            setExplanation('Sorry, I encountered an error while analyzing the document. Please try again.');
            setHasExplained(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-aurora pb-20 md:pb-8" dir={dir}>
            <Navbar />
            <main className="max-w-4xl mx-auto p-4 space-y-6 pt-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Page Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center glass-premium animate-float">
                        <span className="text-4xl">📄</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">{t.doc_title}</h1>
                        <p className="text-slate-400 text-sm mt-1">AI-powered document simplifier</p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="glass-premium rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                    <form onSubmit={handleExplain} className="space-y-4 relative z-10">
                        <textarea
                            value={documentText}
                            onChange={(e) => setDocumentText(e.target.value)}
                            placeholder={t.doc_paste_label}
                            className="w-full h-40 bg-slate-900/50 rounded-xl p-4 text-white placeholder-slate-500 border border-white/10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                            dir={language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'}
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || !documentText.trim()}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>{t.chat_thinking}...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t.doc_explain}</span>
                                        <span className="text-xl">✨</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                    <button
                        onClick={loadSampleContract}
                        className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white rounded-full px-5 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t.doc_load_sample}
                    </button>
                </div>

                {/* Explanation Section */}
                {hasExplained && explanation && (
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 space-y-4 shadow-xl animate-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-2xl">✨</span>
                            {t.doc_section}
                        </h2>

                        <div className="prose prose-invert max-w-none">
                            <div className="bg-slate-700/50 rounded-xl p-5 text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-600/50">
                                {explanation}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="flex items-start gap-3 bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                            <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-amber-200/80 text-sm">
                                {t.doc_disclaimer}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>

    );
}
