'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslations } from '@/utils/translations';
import Navbar from '@/components/Navbar';

interface Task {
    id: number;
    titleKey: string;
    descKey: string;
    docsKey: string;
    whereKey: string;
    feeKey: string;
}

const TASKS: Task[] = [
    { id: 1, titleKey: 'task_1_title', descKey: 'task_1_desc', docsKey: 'task_1_docs', whereKey: 'task_1_where', feeKey: 'task_1_fee' },
    { id: 2, titleKey: 'task_2_title', descKey: 'task_2_desc', docsKey: 'task_2_docs', whereKey: 'task_2_where', feeKey: 'task_2_fee' },
    { id: 3, titleKey: 'task_3_title', descKey: 'task_3_desc', docsKey: 'task_3_docs', whereKey: 'task_3_where', feeKey: 'task_3_fee' },
    { id: 4, titleKey: 'task_4_title', descKey: 'task_4_desc', docsKey: 'task_4_docs', whereKey: 'task_4_where', feeKey: 'task_4_fee' },
    { id: 5, titleKey: 'task_5_title', descKey: 'task_5_desc', docsKey: 'task_5_docs', whereKey: 'task_5_where', feeKey: 'task_5_fee' },
    { id: 6, titleKey: 'task_6_title', descKey: 'task_6_desc', docsKey: 'task_6_docs', whereKey: 'task_6_where', feeKey: 'task_6_fee' },
];

const TASK_ICONS = ['🪪', '🏦', '💡', '🚗', '🎓', '🏥'];

export default function ChecklistPage() {
    const { language, dir } = useLanguage();
    const t = getTranslations(language);

    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    const [expandedTask, setExpandedTask] = useState<number | null>(null);

    // Load completed tasks from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('citykey-completed-tasks');
        if (saved) {
            try {
                setCompletedTasks(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse completed tasks:', e);
            }
        }
    }, []);

    // Save completed tasks to localStorage
    useEffect(() => {
        localStorage.setItem('citykey-completed-tasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    const toggleTaskComplete = (taskId: number) => {
        setCompletedTasks(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const toggleExpand = (taskId: number) => {
        setExpandedTask(prev => prev === taskId ? null : taskId);
    };

    const progressPercentage = (completedTasks.length / TASKS.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pb-20 md:pb-8" dir={dir}>
            <Navbar />

            <main className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Header with Progress */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="text-3xl">✅</span>
                        {t.checklist_title}
                    </h1>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-400">
                                {completedTasks.length}/{TASKS.length} {t.checklist_progress}
                            </span>
                            <span className="text-amber-400 font-medium">
                                {Math.round(progressPercentage)}%
                            </span>
                        </div>
                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {TASKS.map((task, index) => {
                        const isCompleted = completedTasks.includes(task.id);
                        const isExpanded = expandedTask === task.id;

                        return (
                            <div
                                key={task.id}
                                className={`
                  bg-slate-800/50 rounded-2xl border transition-all duration-300
                  ${isCompleted
                                        ? 'border-emerald-500/30 bg-emerald-500/5'
                                        : 'border-slate-700 hover:border-slate-600'
                                    }
                `}
                            >
                                {/* Task Header */}
                                <button
                                    onClick={() => toggleExpand(task.id)}
                                    className="w-full p-4 flex items-center gap-4 text-left"
                                >
                                    {/* Checkbox */}
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskComplete(task.id);
                                        }}
                                        className={`
                      w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-200
                      ${isCompleted
                                                ? 'bg-emerald-500 border-emerald-500'
                                                : 'border-slate-500 hover:border-amber-400'
                                            }
                    `}
                                    >
                                        {isCompleted && (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Icon */}
                                    <span className="text-2xl">{TASK_ICONS[index]}</span>

                                    {/* Title & Description */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-semibold transition-colors ${isCompleted ? 'text-emerald-400 line-through' : 'text-white'}`}>
                                            {t[task.titleKey as keyof typeof t]}
                                        </h3>
                                        <p className="text-sm text-slate-400 truncate">
                                            {t[task.descKey as keyof typeof t]}
                                        </p>
                                    </div>

                                    {/* Expand Arrow */}
                                    <svg
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 pt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                        <div className="border-t border-slate-700/50 pt-4 space-y-3">
                                            {/* Documents Needed */}
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 mb-1">{t.checklist_documents_needed}</p>
                                                    <p className="text-sm text-slate-200">{t[task.docsKey as keyof typeof t]}</p>
                                                </div>
                                            </div>

                                            {/* Where to Go */}
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 mb-1">{t.checklist_where}</p>
                                                    <p className="text-sm text-slate-200">{t[task.whereKey as keyof typeof t]}</p>
                                                </div>
                                            </div>

                                            {/* Fee */}
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 mb-1">{t.checklist_fee}</p>
                                                    <p className="text-sm text-slate-200">{t[task.feeKey as keyof typeof t]}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mark Done Button */}
                                        <button
                                            onClick={() => toggleTaskComplete(task.id)}
                                            className={`
                        w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                        ${isCompleted
                                                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                    : 'bg-emerald-500 text-white hover:bg-emerald-400'
                                                }
                      `}
                                        >
                                            {isCompleted ? t.checklist_done + ' ✓' : t.checklist_mark_done}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
