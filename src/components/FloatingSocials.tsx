'use client';

import { useState } from 'react';

const socials = [
  {
    label: 'Email',
    href: 'mailto:karangupta.k9@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
    bg: 'bg-red-500 hover:bg-red-400',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/karanguptak9',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bg: 'bg-blue-600 hover:bg-blue-500',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/karanguptak9',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-400 hover:via-pink-400 hover:to-orange-300',
  },
];

export default function FloatingSocials() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-6 z-50 flex flex-col items-center gap-3">
      {/* Social icons — visible when open */}
      <div
        className={`flex flex-col items-center gap-3 bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-4 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-60 opacity-100 mb-2' : 'max-h-0 opacity-0 py-0 mb-0'
        }`}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shrink-0 ${s.bg}`}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close social links' : 'Open social links'}
        className="w-11 h-11 rounded-full bg-gray-700/90 backdrop-blur-sm shadow-2xl flex items-center justify-center text-white hover:bg-gray-600 transition-all duration-200"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-sm font-bold tracking-tight">KG</span>
        )}
      </button>
    </div>
  );
}
