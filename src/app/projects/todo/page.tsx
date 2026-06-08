'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categorizeTask, getCategoryColors, CATEGORIES, Category } from '@/lib/todo/categorize';
import { addTask } from '@/lib/todo/storage';

export default function TodoInputPage() {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastCategory, setLastCategory] = useState<Category | null>(null);
  const [lastTicket, setLastTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predicted = text.trim().length > 2 ? categorizeTask(text) : null;
  const colors = predicted ? getCategoryColors(predicted) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    setSubmitting(true);
    setError(null);
    try {
      const category = categorizeTask(trimmed);
      const task = await addTask({ text: trimmed, category, done: false });
      setLastCategory(category);
      setLastTicket(task.ticketId);
      setText('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } catch {
      setError('Failed to save task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-white/70 backdrop-blur-sm">
        <Link href="/projects" className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 transition">
          ← Projects
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-700">T</span>
          <span className="font-semibold text-gray-800 text-sm">Tappydo</span>
        </div>
        <Link
          href="/projects/todo/dashboard"
          className="text-sm bg-amber-700 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-amber-800 transition"
        >
          View Dashboard →
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            What needs to get done?
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Type your task — Tappydo will figure out where it belongs.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. Pay credit card bill, Read 20 pages, Call mom..."
                className="w-full text-lg px-6 py-5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none bg-white shadow-md placeholder:text-gray-300 text-gray-800 transition"
                autoFocus
                disabled={submitting}
              />
              {predicted && colors && (
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border} transition-all`}>
                  {predicted}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!text.trim() || submitting}
              className="w-full py-4 bg-amber-700 text-white text-base font-semibold rounded-2xl hover:bg-amber-800 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            >
              {submitting ? 'Saving...' : 'Add Task'}
            </button>
          </form>

          {submitted && lastCategory && lastTicket && (
            <div className={`mt-4 px-5 py-3 rounded-xl border text-sm font-medium flex items-center gap-2 ${getCategoryColors(lastCategory).bg} ${getCategoryColors(lastCategory).text} ${getCategoryColors(lastCategory).border}`}>
              <span>✓</span>
              <span><strong>{lastTicket}</strong> added to <strong>{lastCategory}</strong></span>
            </div>
          )}

          {error && (
            <div className="mt-4 px-5 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {CATEGORIES.map((cat) => {
            const c = getCategoryColors(cat);
            return (
              <span key={cat} className={`px-3 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>
                {cat}
              </span>
            );
          })}
        </div>

        <Link
          href="/projects/todo/dashboard"
          className="text-sm text-amber-700 hover:text-amber-900 underline underline-offset-4 transition"
        >
          See all your tasks →
        </Link>
      </div>
    </div>
  );
}
