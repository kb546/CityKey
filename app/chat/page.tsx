'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';
import { sendChatMessage } from '@/utils/ai';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';

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

    const history = messages; // Alias messages to history for the new rendering logic

    return (
        <div className="flex flex-col min-h-screen bg-aurora" dir={dir}>
            <Navbar />

            {/* Messages - adjusted for navbar spacing */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 md:pb-32 pt-24">
                {/* Welcome Message if empty */}
                {history.length === 0 && (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-in fade-in duration-700">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-float">
                            <span className="text-4xl">💬</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            {t.chat_welcome}
                        </h2>
                        <p className="text-slate-400 max-w-md">
                            Ask me anything about documents, fees, or locations in Abu Dhabi.
                        </p>
                    </div>
                )}

                {history.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                    >
                        <div
                            className={`
                                max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-lg relative
                                ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-tr-sm'
                                    : 'glass-premium text-gray-100 rounded-tl-sm border-white/5'
                                }
                            `}
                        >
                            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                                <ReactMarkdown>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                            {/* Tiny glowing dot decoration */}
                            <div className={`absolute top-0 w-2 h-2 rounded-full ${msg.role === 'user' ? 'right-0 -mr-1 -mt-1 bg-white/50' : 'left-0 -ml-1 -mt-1 bg-amber-500/50'}`} />
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start animate-in fade-in">
                        <div className="glass-premium p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-0" />
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-150" />
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-300" />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input - fixed at bottom */}
            <div className="fixed bottom-20 md:bottom-6 left-0 right-0 p-4 z-40">
                <div className="max-w-4xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-center gap-2 glass-premium p-2 rounded-full shadow-2xl shadow-black/50 border-white/10"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t.chat_placeholder}
                            disabled={isLoading}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-400 px-6 py-3"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-amber-500 hover:bg-amber-400 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
