import { getSupabase } from '@/lib/supabase';
import { Category } from './categorize';

export type Task = {
  id: string;
  ticketId: string;
  text: string;
  category: Category;
  done: boolean;
  createdAt: string;
};

type DbRow = {
  id: string;
  ticket_id: string;
  text: string;
  category: string;
  done: boolean;
  created_at: string;
};

function toTask(row: DbRow): Task {
  return {
    id: row.id,
    ticketId: row.ticket_id,
    text: row.text,
    category: row.category as Category,
    done: row.done,
    createdAt: row.created_at,
  };
}

export async function loadTasks(): Promise<Task[]> {
  const { data, error } = await getSupabase()
    .from('todo')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as DbRow[]).map(toTask);
}

async function nextTicketId(): Promise<string> {
  const { data } = await getSupabase()
    .from('todo')
    .select('ticket_id')
    .order('created_at', { ascending: false });

  const max = (data ?? []).reduce((acc: number, row: { ticket_id: string }) => {
    const n = parseInt(row.ticket_id?.replace('T-', '') ?? '0', 10);
    return n > acc ? n : acc;
  }, 0);

  return `T-${String(max + 1).padStart(2, '0')}`;
}

export async function addTask(task: Omit<Task, 'id' | 'ticketId' | 'createdAt'>): Promise<Task> {
  const ticketId = await nextTicketId();

  const { data, error } = await getSupabase()
    .from('todo')
    .insert({ ticket_id: ticketId, text: task.text, category: task.category, done: task.done })
    .select()
    .single();

  if (error) throw error;
  return toTask(data as DbRow);
}

export async function toggleTask(id: string, currentDone: boolean): Promise<void> {
  const { error } = await getSupabase()
    .from('todo')
    .update({ done: !currentDone })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await getSupabase().from('todo').delete().eq('id', id);
  if (error) throw error;
}

export async function updateTaskCategory(id: string, category: Category): Promise<void> {
  const { error } = await getSupabase().from('todo').update({ category }).eq('id', id);
  if (error) throw error;
}
