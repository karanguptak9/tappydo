import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tridosha - Ayurvedic Wellness Tracker | Karan Gupta',
  description:
    'A personalized Ayurvedic wellness tracker: baseline and current-state questionnaires, a sourced food and spice database, a recipe analyzer, meal ideas and a journal.',
};

const tags = ['JavaScript', 'Supabase', 'Ayurveda', 'Nutrition'];

export default function TridoshaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-white/70 backdrop-blur-sm">
        <Link
          href="/projects"
          className="text-sm text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 transition"
        >
          ← Projects
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-amber-700">T</span>
          <span className="font-semibold text-gray-800 text-sm">Tappydo</span>
        </div>
        <span className="w-20" aria-hidden="true" />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tridosha</h1>
        <p className="text-lg text-gray-600 mb-6">
          Ayurveda separates the constitution you were born with from how you are this week. I built
          a tracker that keeps the two apart, then uses both to suggest foods, spices and recipes
          that fit your diet and allergies. Create an account, add a profile for each person, and
          start with the questionnaire.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="/tridosha/index.html"
          className="inline-block px-5 py-2.5 bg-amber-700 text-white text-sm font-semibold rounded-lg hover:bg-amber-800 transition"
        >
          Open full screen →
        </a>
        <p className="text-sm text-gray-500 mt-4">
          An educational tool. It does not diagnose or treat anything, and its food classifications
          are provisional.
        </p>
      </div>

      {/* App */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 pb-16">
        <iframe
          src="/tridosha/index.html"
          title="Tridosha Ayurvedic wellness tracker"
          className="w-full block rounded-xl border border-amber-100 bg-white shadow-md"
          style={{ height: 'max(680px, 85vh)' }}
        />
      </div>
    </div>
  );
}
