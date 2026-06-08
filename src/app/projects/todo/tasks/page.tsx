'use client';

export const dynamic = 'force-dynamic';

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

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);

  async function refresh() {
    const data = await loadTasks();
    setTasks(data);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  async function handleToggle(id: string, done: boolean) {
    await toggleTask(id, done);
    refresh();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);
    refresh();
  }

  async function handleCategoryChange(id: string, category: Category) {
    await updateTaskCategory(id, category);
    setEditingId(null);
    refresh();
  }

  const filtered = filter === 'All' ? tasks : tasks.filter((t) => t.category === filter);
  const done = filtered.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <Link href="/projects/todo/dashboard" className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 transition">
          ← Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-700">T</span>
          <span className="font-semibold text-gray-800">All Tasks</span>
        </div>
        <Link
          href="/projects/todo"
          className="text-sm bg-amber-700 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-amber-800 transition"
        >
          + Add Task
        </Link>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8 flex flex-col gap-6">

        {/* Stats + filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task List</h1>
            <p className="text-sm text-gray-500 mt-0.5">{done} of {filtered.length} completed</p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition ${filter === 'All' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const c = getCategoryColors(cat);
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${active ? `${c.bg} ${c.text} ${c.border}` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                >
                  {CATEGORY_ICONS[cat]} {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-sm text-gray-400 text-center py-20">Loading tasks...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-5xl">✨</div>
            <p className="text-gray-500 font-medium">No tasks here yet</p>
            <Link href="/projects/todo" className="text-sm text-amber-700 underline underline-offset-4">
              + Add your first task
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest w-20">Ticket</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Task</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest w-36">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest w-24 text-center">Status</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((task) => {
                  const c = getCategoryColors(task.category);
                  return (
                    <tr key={task.id} className={`group hover:bg-gray-50 transition ${task.done ? 'opacity-50' : ''}`}>

                      {/* Ticket ID */}
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-gray-400">{task.ticketId}</span>
                      </td>

                      {/* Task text */}
                      <td className="px-4 py-3">
                        <span className={`text-gray-800 ${task.done ? 'line-through text-gray-400' : ''}`}>
                          {task.text}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        {editingId === task.id ? (
                          <select
                            autoFocus
                            className="text-xs border rounded-lg px-2 py-1 bg-white focus:outline-none"
                            defaultValue={task.category}
                            onChange={(e) => handleCategoryChange(task.id, e.target.value as Category)}
                            onBlur={() => setEditingId(null)}
                          >
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        ) : (
                          <button
                            onClick={() => setEditingId(task.id)}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.text} ${c.border} hover:opacity-80 transition`}
                          >
                            {CATEGORY_ICONS[task.category]} {task.category}
                          </button>
                        )}
                      </td>

                      {/* Status toggle */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggle(task.id, task.done)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${task.done ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400'}`}
                        >
                          {task.done ? '✓ Done' : 'Open'}
                        </button>
                      </td>

                      {/* Delete */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition text-base"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
