'use client';

// TODO: Add user auth state, notification bell, and settings menu here later

export default function TodoHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Tappydo</h1>
        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
          Coming Soon
        </span>
      </div>
      <div className="flex items-center gap-3">
        {/* TODO: Add user avatar / login button here */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium">
          KG
        </div>
      </div>
    </header>
  );
}
