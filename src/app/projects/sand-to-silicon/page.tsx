import type { Metadata } from 'next';
import Link from 'next/link';
import SimulatorFrame from './SimulatorFrame';

export const metadata: Metadata = {
  title: 'Sand to Silicon - Chip-Making Simulator | Karan Gupta',
  description:
    'An interactive simulator that teaches how computer chips are made in 18 steps, from sand to a working device.',
};

const tags = ['JavaScript', 'Canvas', 'Simulation', 'Semiconductors'];

export default function SandToSiliconPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sand to Silicon</h1>
        <p className="text-lg text-gray-600 mb-6">
          I wanted to understand how computer chips are made, so I built a simulator. Make a chip
          yourself in 18 steps, from melting sand to powering on a device. Move each slider until
          the picture turns green.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Simulator */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 pb-16">
        <SimulatorFrame />
      </div>
    </div>
  );
}
