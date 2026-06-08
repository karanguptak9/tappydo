export type Category =
  | 'Personal'
  | 'Finance'
  | 'Learning'
  | 'Ideas'
  | 'Health'
  | 'Urgent'
  | 'Assign me';

export const CATEGORIES: Category[] = [
  'Assign me',
  'Personal',
  'Finance',
  'Learning',
  'Ideas',
  'Health',
  'Urgent',
];

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; dot: string }> = {
  Personal:   { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200', dot: 'bg-purple-400' },
  Finance:    { bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200',  dot: 'bg-green-400' },
  Learning:   { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',   dot: 'bg-blue-400' },
  Ideas:      { bg: 'bg-yellow-50',  text: 'text-yellow-700',  border: 'border-yellow-200', dot: 'bg-yellow-400' },
  Health:     { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',    dot: 'bg-red-400' },
  Urgent:     { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200', dot: 'bg-orange-400' },
  'Assign me':{ bg: 'bg-gray-50',   text: 'text-gray-500',    border: 'border-gray-200',   dot: 'bg-gray-400' },
};

export function getCategoryColors(category: Category) {
  return CATEGORY_COLORS[category];
}

const KEYWORDS: Record<Exclude<Category, 'Assign me'>, string[]> = {
  Urgent: [
    'urgent', 'asap', 'now', 'today', 'tonight', 'immediately', 'deadline',
    'due', 'critical', 'emergency', 'rush', 'eod', 'end of day', 'overdue',
    'must', 'priority', 'important', 'this morning', 'this afternoon',
  ],
  Health: [
    'workout', 'gym', 'exercise', 'run', 'jog', 'walk', 'yoga', 'stretch',
    'doctor', 'dentist', 'appointment', 'medicine', 'pill', 'medication',
    'diet', 'eat', 'sleep', 'rest', 'therapy', 'mental health', 'weight',
    'steps', 'protein', 'vitamin', 'water', 'hydrate', 'physio', 'clinic',
    'hospital', 'health', 'pickleball', 'sport',
  ],
  Finance: [
    'pay', 'bill', 'payment', 'rent', 'mortgage', 'loan', 'bank', 'money',
    'invest', 'investment', 'budget', 'tax', 'insurance', 'credit', 'debit',
    'salary', 'expense', 'savings', 'transfer', 'wire', 'refund', 'receipt',
    'invoice', 'cost', 'price', 'fee', 'subscription', 'dollar', 'finance',
    'stock', '401k', 'ira', 'venmo', 'zelle', 'paypal',
  ],
  Learning: [
    'read', 'book', 'course', 'study', 'learn', 'research', 'tutorial',
    'article', 'class', 'lecture', 'skill', 'practice', 'watch', 'podcast',
    'video', 'chapter', 'notes', 'review', 'exam', 'quiz', 'certificate',
    'degree', 'training', 'workshop', 'webinar', 'documentation', 'docs',
    'language', 'coding', 'programming',
  ],
  Ideas: [
    'idea', 'think', 'consider', 'maybe', 'could', 'what if', 'brainstorm',
    'concept', 'explore', 'draft', 'sketch', 'plan', 'propose', 'imagine',
    'create', 'build', 'design', 'start', 'try', 'experiment', 'prototype',
    'new', 'feature', 'project', 'side project', 'startup', 'blog', 'write',
    'post', 'content',
  ],
  Personal: [
    'family', 'mom', 'dad', 'sister', 'brother', 'friend', 'call', 'text',
    'email', 'meet', 'visit', 'trip', 'travel', 'flight', 'hotel', 'vacation',
    'gift', 'birthday', 'anniversary', 'wedding', 'party', 'dinner', 'lunch',
    'grocery', 'groceries', 'shopping', 'buy', 'errand', 'pick up', 'drop off',
    'clean', 'laundry', 'dishes', 'kitchen garden', 'garden', 'plant',
    'haircut', 'chores', 'home', 'house', 'car', 'dmv', 'passport',
  ],
};

export function categorizeTask(text: string): Category {
  const lower = text.toLowerCase();

  // Check Urgent first — it overrides everything
  if (KEYWORDS.Urgent.some((kw) => lower.includes(kw))) return 'Urgent';

  const scores: Partial<Record<Category, number>> = {};

  for (const [cat, keywords] of Object.entries(KEYWORDS) as [Exclude<Category, 'Assign me'>, string[]][]) {
    const matches = keywords.filter((kw) => lower.includes(kw)).length;
    if (matches > 0) scores[cat] = matches;
  }

  if (Object.keys(scores).length === 0) return 'Assign me';

  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Category;
}
