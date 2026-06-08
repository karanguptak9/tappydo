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
    'last minute', 'right away', 'cannot wait', 'time sensitive', 'expiring',
    'expires', 'final notice', 'late', 'past due', 'by tonight', 'by today',
    'before eod', 'need to', 'have to', 'got to', 'running out',
  ],
  Health: [
    // Exercise
    'workout', 'gym', 'exercise', 'run', 'jog', 'walk', 'yoga', 'stretch',
    'swim', 'cycling', 'bike', 'hike', 'hiking', 'cardio', 'lift', 'weights',
    'crossfit', 'pilates', 'zumba', 'dance', 'tennis', 'pickleball', 'sport',
    'sports', 'training', 'athletic', 'fitness', 'steps', 'calories',
    // Medical
    'doctor', 'dentist', 'therapist', 'psychologist', 'psychiatrist',
    'appointment', 'checkup', 'check up', 'physical', 'blood test', 'lab',
    'prescription', 'medicine', 'pill', 'medication', 'pharmacy', 'clinic',
    'hospital', 'surgery', 'vaccine', 'vaccination', 'flu shot', 'physio',
    'chiropractor', 'optometrist', 'glasses', 'contacts',
    // Wellness
    'diet', 'nutrition', 'meal prep', 'healthy', 'sleep', 'rest', 'nap',
    'therapy', 'mental health', 'meditation', 'mindfulness', 'detox',
    'weight', 'bmi', 'protein', 'vitamin', 'supplement', 'water', 'hydrate',
    'self care', 'wellness', 'skincare', 'spa', 'massage', 'health',
  ],
  Finance: [
    // Payments
    'pay', 'bill', 'payment', 'rent', 'mortgage', 'loan', 'emi', 'dues',
    'transfer', 'wire', 'send money', 'venmo', 'zelle', 'paypal', 'cashapp',
    'refund', 'reimburse', 'reimbursement', 'charge', 'fee',
    // Banking & accounts
    'bank', 'account', 'credit card', 'debit card', 'credit', 'debit',
    'checking', 'savings', 'direct deposit', 'overdraft', 'balance',
    // Investing
    'invest', 'investment', 'stock', 'stocks', 'etf', 'mutual fund',
    '401k', 'ira', 'roth', 'portfolio', 'dividend', 'crypto', 'bitcoin',
    'brokerage', 'trading', 'equity', 'bonds', 'retirement',
    // Budgeting & taxes
    'budget', 'budgeting', 'expense', 'spending', 'track expenses', 'tax',
    'taxes', 'tax return', 'filing', 'irs', 'w2', '1099', 'audit',
    'receipt', 'invoice', 'quote', 'estimate',
    // Insurance & misc
    'insurance', 'premium', 'deductible', 'claim', 'policy', 'salary',
    'paycheck', 'raise', 'bonus', 'commission', 'income', 'revenue',
    'profit', 'loss', 'money', 'cash', 'dollar', 'finance', 'financial',
    'cost', 'price', 'subscription', 'cancel subscription',
  ],
  Learning: [
    // Reading
    'read', 'book', 'ebook', 'audiobook', 'article', 'blog post', 'paper',
    'journal', 'newsletter', 'chapter', 'page',
    // Courses & education
    'course', 'class', 'lecture', 'lesson', 'module', 'curriculum',
    'degree', 'certificate', 'certification', 'diploma', 'exam', 'quiz',
    'test', 'assignment', 'homework', 'essay', 'thesis',
    // Skills
    'study', 'learn', 'practice', 'drill', 'memorize', 'skill', 'skills',
    'language', 'coding', 'programming', 'python', 'javascript', 'sql',
    'react', 'swift', 'java', 'data science', 'machine learning', 'ai',
    // Media & resources
    'tutorial', 'video', 'youtube', 'podcast', 'webinar', 'workshop',
    'conference', 'seminar', 'talk', 'notes', 'flashcard', 'anki',
    'documentation', 'docs', 'guide', 'manual',
    // Research
    'research', 'investigate', 'explore', 'look up', 'google', 'find out',
    'understand', 'training', 'upskill', 'improve', 'develop',
  ],
  Ideas: [
    // Ideation
    'idea', 'ideas', 'brainstorm', 'concept', 'concept', 'notion', 'thought',
    'imagine', 'envision', 'what if', 'how about', 'what about',
    // Planning
    'think', 'consider', 'explore', 'evaluate', 'assess', 'propose',
    'suggest', 'recommend', 'maybe', 'could', 'should we', 'might',
    // Creation
    'draft', 'sketch', 'mockup', 'wireframe', 'prototype', 'experiment',
    'test idea', 'try', 'attempt', 'create', 'build', 'design', 'make',
    // Projects
    'project', 'side project', 'startup', 'venture', 'initiative',
    'feature', 'product', 'mvp', 'launch', 'ship', 'release',
    // Content
    'write', 'blog', 'post', 'article', 'newsletter', 'content', 'script',
    'pitch', 'proposal', 'plan', 'strategy', 'roadmap', 'vision',
  ],
  Personal: [
    // People
    'family', 'mom', 'dad', 'mother', 'father', 'sister', 'brother',
    'wife', 'husband', 'partner', 'spouse', 'girlfriend', 'boyfriend',
    'kids', 'child', 'children', 'baby', 'son', 'daughter', 'toddler',
    'nephew', 'niece', 'cousin', 'grandma', 'grandpa', 'grandmother',
    'grandfather', 'aunt', 'uncle', 'in-laws', 'neighbor', 'relative',
    'friend', 'bestie', 'colleague', 'roommate',
    // Communication
    'call', 'phone call', 'text', 'message', 'chat', 'email', 'dm',
    'catch up', 'reach out', 'check in', 'follow up', 'reply', 'respond',
    'meet', 'visit', 'hang out', 'get together', 'date night',
    // Travel & events
    'trip', 'travel', 'flight', 'airport', 'hotel', 'airbnb', 'book flight',
    'vacation', 'holiday', 'staycation', 'road trip', 'weekend',
    'birthday', 'anniversary', 'wedding', 'engagement', 'baby shower',
    'graduation', 'party', 'event', 'gathering', 'reunion', 'celebration',
    'christmas', 'thanksgiving', 'new year', 'diwali', 'eid', 'hanukkah',
    // Food & home
    'dinner', 'lunch', 'breakfast', 'brunch', 'coffee', 'cook', 'meal',
    'recipe', 'restaurant', 'reservation', 'takeout', 'order food',
    'grocery', 'groceries', 'supermarket', 'shopping', 'buy', 'purchase',
    'errand', 'pick up', 'drop off', 'deliver', 'send',
    'clean', 'cleaning', 'laundry', 'dishes', 'vacuum', 'mop', 'declutter',
    'organize', 'tidy', 'chores', 'kitchen garden', 'garden', 'plant',
    'home', 'house', 'apartment', 'condo', 'move', 'moving', 'repair',
    'fix', 'maintenance', 'plumber', 'electrician', 'handyman',
    // Personal admin
    'haircut', 'salon', 'barber', 'manicure', 'pedicure',
    'car', 'oil change', 'dmv', 'registration', 'passport', 'visa',
    'license', 'id', 'social security', 'insurance', 'renew',
    'delivery', 'package', 'amazon', 'order', 'return', 'exchange',
    'clothes', 'outfit', 'shoes', 'wardrobe', 'donate', 'charity',
    // Leisure
    'movie', 'film', 'concert', 'show', 'theater', 'museum', 'gallery',
    'game', 'sports game', 'hobby', 'fun', 'relax', 'unwind', 'leisure',
    'pet', 'dog', 'cat', 'vet', 'grooming', 'walk the dog', 'personal',
  ],
};

function matchesKeyword(text: string, kw: string): boolean {
  // Multi-word phrases: exact substring match
  if (kw.includes(' ')) return text.includes(kw);
  // Single words: match on word boundary so "idea" doesn't match inside "ideal"
  return new RegExp(`\\b${kw}\\b`).test(text);
}

export function categorizeTask(text: string): Category {
  const lower = text.toLowerCase();

  // Check Urgent first — it overrides everything
  if (KEYWORDS.Urgent.some((kw) => matchesKeyword(lower, kw))) return 'Urgent';

  const scores: Partial<Record<Category, number>> = {};

  for (const [cat, keywords] of Object.entries(KEYWORDS) as [Exclude<Category, 'Assign me'>, string[]][]) {
    const matches = keywords.filter((kw) => matchesKeyword(lower, kw)).length;
    if (matches > 0) scores[cat] = matches;
  }

  if (Object.keys(scores).length === 0) return 'Assign me';

  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Category;
}
