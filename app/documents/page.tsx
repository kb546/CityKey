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
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 md:pb-8" dir={dir}>
            <Navbar />

            <main className="max-w-4xl mx-auto p-4 space-y-6">
                {/* Page Header */}
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📄</span>
                    <h1 className="text-2xl font-bold text-white">{t.doc_title}</h1>
                </div>

                {/* Document Input Section */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
                    <label className="block text-slate-300 mb-3 font-medium">
                        {t.doc_paste_label}
                    </label>
                    <textarea
                        value={documentText}
                        onChange={(e) => setDocumentText(e.target.value)}
                        placeholder="الصق النص العربي هنا..."
                        className="w-full h-48 bg-slate-700/80 text-white rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400 resize-none border border-slate-600 transition-all duration-200"
                        dir="rtl"
                    />

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

                        <button
                            onClick={handleExplain}
                            disabled={!documentText.trim() || isLoading}
                            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-full px-5 py-2.5 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                    <span>{t.chat_thinking}</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {t.doc_explain}
                                </>
                            )}
                        </button>
                    </div>
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
