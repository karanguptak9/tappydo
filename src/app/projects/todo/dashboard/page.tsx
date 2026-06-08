'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, Category, getCategoryColors } from '@/lib/todo/categorize';
import { loadTasks, toggleTask, deleteTask, updateTaskCategory, Task } from '@/lib/todo/storage';

const CATEGORY_ICONS: Record<Category, string> = {
  Personal:    '👤',
  Finance:     '💰',
  Learning:    '📚',
  Ideas:       '💡',
  Health:      '❤️',
  Urgent:      '🔥',
  'Assign me': '📌',
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expanded, setExpanded] = useState<Category | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  function refresh() {
    setTasks(loadTasks());
  }

  function handleToggle(id: string) {
    toggleTask(id);
    refresh();
  }

  function handleDelete(id: string) {
    deleteTask(id);
    refresh();
  }

  function handleCategoryChange(id: string, category: Category) {
    updateTaskCategory(id, category);
    setEditingId(null);
    refresh();
  }

  function toggleExpand(cat: Category) {
    setExpanded((prev) => (prev === cat ? null : cat));
  }

  const countFor = (cat: Category) => tasks.filter((t) => t.category === cat).length;
  const doneFor  = (cat: Category) => tasks.filter((t) => t.category === cat && t.done).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <Link href="/projects" className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 transition">
          ← Projects
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-700">T</span>
          <span className="font-semibold text-gray-800">Tappydo Dashboard</span>
        </div>
        <Link
          href="/projects/todo"
          className="text-sm bg-amber-700 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-amber-800 transition"
        >
          + Add Task
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR — accordion categories */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-4 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Categories</p>

            {CATEGORIES.map((cat) => {
              const c = getCategoryColors(cat);
              const isOpen = expanded === cat;
              const catTasks = tasks.filter((t) => t.category === cat);
              const total = countFor(cat);
              const done = doneFor(cat);

              return (
                <div key={cat} className="mb-1">
                  <button
                    onClick={() => toggleExpand(cat)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition flex items-center gap-2 ${isOpen ? `${c.bg} ${c.text}` : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span className="text-base">{CATEGORY_ICONS[cat]}</span>
                    <span className="flex-1">{cat}</span>
                    <span className="text-xs font-normal text-gray-400">{total}</span>
                    <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>›</span>
                  </button>

                  {isOpen && (
                    <div className="mt-1 mb-2 ml-3 pl-3 border-l-2 border-gray-100 flex flex-col gap-1.5">
                      {catTasks.length === 0 ? (
                        <p className="text-xs text-gray-400 italic py-1">No tasks yet</p>
                      ) : (
                        catTasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-2 group py-0.5">
                            <button
                              onClick={() => handleToggle(task.id)}
                              className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 transition ${task.done ? `${c.dot} border-transparent` : 'border-gray-300 hover:border-gray-400'}`}
                            />
                            <span className={`text-xs flex-1 leading-snug ${task.done ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                              {task.text}
                            </span>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 text-xs transition shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                      {total > 0 && (
                        <p className="text-xs text-gray-400 pt-1">{done}/{total} done</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER — category cards */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {expanded ?? 'All Categories'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {tasks.filter(t => t.done).length} of {tasks.length} tasks completed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => {
              if (expanded && expanded !== cat) return null;

              const c = getCategoryColors(cat);
              const catTasks = tasks.filter((t) => t.category === cat);
              const done = doneFor(cat);
              const total = countFor(cat);
              const progress = total > 0 ? Math.round((done / total) * 100) : 0;

              return (
                <div
                  key={cat}
                  className={`rounded-2xl border p-5 flex flex-col gap-4 ${c.bg} ${c.border} shadow-sm hover:shadow-md transition`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <span className={`font-semibold text-base ${c.text}`}>{cat}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-white/60 ${c.text}`}>
                      {done}/{total}
                    </span>
                  </div>

                  {total > 0 && (
                    <div className="w-full bg-white/50 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${c.dot}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 min-h-[60px]">
                    {catTasks.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No tasks yet</p>
                    ) : (
                      catTasks.slice(0, 5).map((task) => (
                        <div key={task.id} className="flex items-start gap-2 group">
                          <button
                            onClick={() => handleToggle(task.id)}
                            className={`mt-0.5 w-3.5 h-3.5 rounded-full border-2 shrink-0 transition ${task.done ? `${c.dot} border-transparent` : 'border-gray-300 hover:border-gray-400'}`}
                          />
                          <span className={`text-sm flex-1 leading-snug ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {task.text}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            {editingId === task.id ? (
                              <select
                                autoFocus
                                className="text-xs border rounded px-1 py-0.5 bg-white"
                                defaultValue={task.category}
                                onChange={(e) => handleCategoryChange(task.id, e.target.value as Category)}
                                onBlur={() => setEditingId(null)}
                              >
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                              </select>
                            ) : (
                              <button
                                onClick={() => setEditingId(task.id)}
                                className="text-gray-300 hover:text-blue-400 text-xs"
                                title="Reassign category"
                              >
                                ↕
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="text-gray-300 hover:text-red-400 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    {catTasks.length > 5 && (
                      <p className="text-xs text-gray-400">+{catTasks.length - 5} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <div className="text-6xl">✨</div>
              <h3 className="text-xl font-semibold text-gray-500">Nothing here yet</h3>
              <p className="text-sm text-gray-400">Add your first task and watch it get sorted automatically.</p>
              <Link
                href="/projects/todo"
                className="mt-2 px-6 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-800 transition text-sm"
              >
                + Add your first task
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
