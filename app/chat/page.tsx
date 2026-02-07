'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';
import { sendChatMessage } from '@/utils/ai';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const { language, dir } = useLanguage();
    const t = getTranslations(language);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: t.chat_welcome,
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Update welcome message when language changes
    useEffect(() => {
        setMessages([
            {
                id: '1',
                role: 'assistant',
                content: t.chat_welcome,
            },
        ]);
    }, [language, t.chat_welcome]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const response = await sendChatMessage(input.trim(), language, history);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800" dir={dir}>
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                    <span className="text-sm">{t.nav_home}</span>
                </Link>
                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">🔑</span>
                    {t.app_name}
                </h1>
                <div className="w-20"></div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-amber-500 text-white rounded-br-sm'
                                    : 'bg-slate-700 text-slate-100 rounded-bl-sm'
                                }`}
                        >
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {message.content}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 text-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                                <span className="text-sm text-slate-400">{t.chat_thinking}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-slate-800/50 border-t border-slate-700">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.chat_placeholder}
                        className="flex-1 bg-slate-700 text-white rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-full px-6 py-3 font-medium transition-colors flex items-center gap-2"
                    >
                        <span>{t.chat_send}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'rtl' ? "M10 19l-7-7m0 0l7-7m-7 7h18" : "M14 5l7 7m0 0l-7 7m7-7H3"} />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
