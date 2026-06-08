'use client';

// TODO: Replace this entire placeholder with real task state, input handling,
// task list rendering, filtering logic, and sidebar navigation.

export default function TodoPlaceholder() {
  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Sidebar — filter / categories */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-50 border-r border-gray-200 p-4 gap-2 shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Lists</p>
        {/* TODO: Render dynamic list categories here */}
        {['All Tasks', 'Today', 'Upcoming', 'Completed'].map((label) => (
          <div
            key={label}
            className="px-3 py-2 rounded-lg text-sm text-gray-400 bg-gray-100 cursor-not-allowed select-none"
          >
            {label}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col p-6 gap-6 overflow-y-auto">

        {/* Task input — disabled placeholder */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm opacity-60">
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
          <span className="text-gray-400 text-sm select-none">
            Add a new task… (coming soon)
          </span>
          {/* TODO: Wire up input, submit handler, and task creation here */}
        </div>

        {/* Empty task list placeholder */}
        <div className="flex flex-col items-center justify-center flex-1 py-20 gap-4 text-center">
          <div className="text-6xl">📋</div>
          <h3 className="text-lg font-semibold text-gray-500">No tasks yet</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Task management features are on the way. Check back soon!
          </p>
          {/* TODO: Replace with real empty state once tasks can be created */}
        </div>

      </main>
    </div>
  );
}
