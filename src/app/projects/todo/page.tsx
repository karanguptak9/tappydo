import Link from 'next/link';

export const metadata = {
  title: 'Todo App — Tappydo',
  description: 'A simple productivity app to organize tasks automatically.',
};

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center px-6 py-20 text-center gap-6">
      <div className="text-6xl">✅</div>
      <h1 className="text-4xl font-bold text-gray-900">Tappydo Todo App</h1>
      <p className="text-gray-500 max-w-md text-lg">
        A smart task manager that automatically categorizes your tasks. Launching soon as a standalone app.
      </p>
      <Link
        href="/projects"
        className="text-sm text-amber-700 hover:text-amber-900 underline underline-offset-4 transition"
      >
        ← Back to Projects
      </Link>
    </div>
  );
}
