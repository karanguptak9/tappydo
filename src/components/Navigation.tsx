import Link from 'next/link';

const links = [
  { href: '/', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <Link href="/" className="text-base sm:text-xl font-bold text-amber-800 hover:text-amber-700 shrink-0">
          KG
        </Link>
        <div className="flex flex-wrap justify-end gap-x-6 gap-y-1 sm:gap-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-xs sm:text-sm text-gray-600 hover:text-amber-800 transition">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
