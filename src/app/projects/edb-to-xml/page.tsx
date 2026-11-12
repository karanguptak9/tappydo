import type { Metadata } from 'next';
import Link from 'next/link';
import SimulatorFrame from '../sand-to-silicon/SimulatorFrame';

export const metadata: Metadata = {
  title: 'EDB & SDB to XML - Windows Database Converter | Karan Gupta',
  description:
    'Convert Windows .edb and .sdb database files to XML in your browser. The file is read on your device and is not uploaded.',
};

const tags = ['Python', 'WebAssembly', 'Windows', 'Forensics'];

export default function EdbToXmlPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">EDB &amp; SDB to XML</h1>
        <p className="text-lg text-gray-600 mb-6">
          Convert a Windows database file to XML: Windows Search, SRUM and other .edb files, the
          security database, and application compatibility .sdb files. The file is read on your
          device and is not uploaded anywhere.
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

      {/* Converter */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 pb-16">
        <SimulatorFrame src="/edb-to-xml.html" title="EDB and SDB to XML converter" />
      </div>
    </div>
  );
}
