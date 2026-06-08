import Link from 'next/link';
import TodoAppShell from '@/components/todo/TodoAppShell';

export const metadata = {
  title: 'Todo App — Tappydo',
  description: 'A simple productivity app to organize tasks. Full features coming soon.',
};

export default function TodoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Back link — sits above the app shell */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center gap-2">
        <Link
          href="/projects"
          className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 transition"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Full-screen app shell */}
      <div className="flex-1 flex flex-col">
        <TodoAppShell />
      </div>
    </div>
  );
}
