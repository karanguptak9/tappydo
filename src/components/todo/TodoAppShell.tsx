'use client';

import TodoHeader from './TodoHeader';
import TodoPlaceholder from './TodoPlaceholder';

// TODO: Wrap with auth provider and global task state (Context / Zustand / DB) here

export default function TodoAppShell() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <TodoHeader />
      <TodoPlaceholder />
    </div>
  );
}
