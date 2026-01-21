export interface WordItem {
  id: string;
  word: string; // The English word
  emoji: string; // The visual representation
}

export interface Category {
  id: string;
  title: string;
  color: string; // Tailwind color class base (e.g., 'purple')
  icon: string;
  items: WordItem[];
}

export type GameState = 'MENU' | 'PLAYING' | 'RESULT';

export interface Question {
  target: WordItem;
  options: WordItem[]; // 1 correct, 2 distractors
}