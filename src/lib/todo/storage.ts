import { Category } from './categorize';

export type Task = {
  id: string;
  text: string;
  category: Category;
  done: boolean;
  createdAt: string;
};

const STORAGE_KEY = 'tappydo_tasks';

export function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
  const tasks = loadTasks();
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  saveTasks([newTask, ...tasks]);
  return newTask;
}

export function toggleTask(id: string): void {
  const tasks = loadTasks();
  saveTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
}

export function deleteTask(id: string): void {
  saveTasks(loadTasks().filter((t) => t.id !== id));
}

export function updateTaskCategory(id: string, category: Category): void {
  const tasks = loadTasks();
  saveTasks(tasks.map((t) => (t.id === id ? { ...t, category } : t)));
}
