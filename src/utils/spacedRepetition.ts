import type { Word } from '../types';

export const calculateNextReview = (word: Word, correct: boolean): number => {
  const baseInterval = 1;
  
  if (!correct) {
    return baseInterval;
  }

  if (word.timesReviewed === 0) {
    return 1;
  } else if (word.timesReviewed === 1) {
    return 3;
  } else if (word.timesReviewed === 2) {
    return 7;
  } else {
    return Math.min(30, Math.pow(2, word.timesReviewed) * baseInterval);
  }
};

export const getWordsDueForReview = (words: Word[]): Word[] => {
  const now = new Date();
  
  return words.filter(word => {
    if (!word.lastReviewed) return true;
    
    const lastReviewed = new Date(word.lastReviewed);
    const daysSinceReview = Math.floor((now.getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24));
    
    const interval = word.mastered ? 7 : 1;
    return daysSinceReview >= interval;
  });
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};