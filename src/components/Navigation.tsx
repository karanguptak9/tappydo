import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-amber-800 hover:text-amber-700">
          KG
        </Link>
        <div className="flex gap-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-amber-800 transition">
            About
          </Link>
          <Link href="/resume" className="text-sm text-gray-600 hover:text-amber-800 transition">
            Resume
          </Link>
          <Link href="/projects" className="text-sm text-gray-600 hover:text-amber-800 transition">
            Projects
          </Link>
          <Link href="/research" className="text-sm text-gray-600 hover:text-amber-800 transition">
            Research
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-amber-800 transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
