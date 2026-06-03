export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Karan Gupta. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="https://twitter.com" className="text-gray-400 hover:text-amber-800 transition">
            Twitter
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-amber-800 transition">
            LinkedIn
          </a>
          <a href="https://github.com" className="text-gray-400 hover:text-amber-800 transition">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
