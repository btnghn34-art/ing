import { Category, Question, WordItem } from './types';

// Fischer-Yates Shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateQuiz(category: Category): Question[] {
  const allItems = category.items;
  const questions: Question[] = [];

  // Shuffle items to determine order of questions
  const shuffledItems = shuffleArray(allItems);

  shuffledItems.forEach((targetItem) => {
    // Select distractors (wrong answers)
    const otherItems = allItems.filter((item) => item.id !== targetItem.id);
    const shuffledDistractors = shuffleArray(otherItems);
    const selectedDistractors = shuffledDistractors.slice(0, 2);

    // Combine and shuffle options
    const options = shuffleArray([targetItem, ...selectedDistractors]);

    questions.push({
      target: targetItem,
      options: options,
    });
  });

  return questions;
}