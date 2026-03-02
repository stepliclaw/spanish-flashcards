export interface Word {
  id: string;
  spanish: string;
  chinese: string;
  category: string;
  timesReviewed: number;
  lastReviewed: string | null;
  mastered: boolean;
}

export interface QuizQuestion {
  word: Word;
  options: string[];
  type: 'multiple-choice' | 'spelling';
}

export interface LearningProgress {
  totalWords: number;
  masteredWords: number;
  reviewedToday: number;
  streak: number;
}

export type Page = 'dashboard' | 'learn' | 'quiz' | 'words';