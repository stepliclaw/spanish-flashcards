import { useState, useMemo } from 'react';
import type { Word } from '../types';
import { FlashCard } from '../components/FlashCard';
import { AnimationFeedback } from '../components/AnimationFeedback';
import { categories, categoryLabels } from '../data/words';
import { getWordsDueForReview, shuffleArray } from '../utils/spacedRepetition';

interface LearnProps {
  words: Word[];
  onUpdateWords: (words: Word[]) => void;
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

export function Learn({ words, onUpdateWords }: LearnProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyWords, setStudyWords] = useState<Word[]>([]);
  const [animationType, setAnimationType] = useState<'correct' | 'wrong' | null>(null);

  const filteredWords = useMemo(() => {
    if (selectedCategory === 'all') {
      return getWordsDueForReview(words);
    }
    return getWordsDueForReview(words).filter(w => w.category === selectedCategory);
  }, [words, selectedCategory]);

  const startStudy = () => {
    setStudyWords(shuffleArray(filteredWords).slice(0, 20));
    setCurrentIndex(0);
  };

  const handleExitStudy = () => {
    setStudyWords([]);
    setCurrentIndex(0);
  };

  const handleMarkKnown = (known: boolean) => {
    setAnimationType(known ? 'correct' : 'wrong');
    
    const word = studyWords[currentIndex];
    const updatedWords = words.map(w => {
      if (w.id === word.id) {
        const newTimesReviewed = w.timesReviewed + 1;
        return {
          ...w,
          timesReviewed: newTimesReviewed,
          lastReviewed: new Date().toISOString(),
          mastered: known || newTimesReviewed >= 3,
        };
      }
      return w;
    });
    onUpdateWords(updatedWords);

    setTimeout(() => {
      if (currentIndex < studyWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        setStudyWords([]);
        alert('學習完成！ Good job!');
      }
      setAnimationType(null);
    }, 500);
  };

  if (studyWords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-display font-bold text-primary-900 mb-6">開始學習</h1>

        <div className="clay-card p-6 mb-6">
          <p className="text-slate-600 mb-4 font-medium">選擇分類</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`
                min-h-[48px] px-4 py-2 rounded-xl font-display font-medium transition-all duration-200 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${selectedCategory === 'all' 
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-clay-sm border-2 border-primary-400' 
                  : 'bg-white text-slate-600 border-2 border-primary-100 hover:border-primary-200 hover:bg-primary-50'
                }
              `}
            >
              全部 ({getWordsDueForReview(words).length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  min-h-[48px] px-4 py-2 rounded-xl font-display font-medium transition-all duration-200 cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${selectedCategory === cat 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-clay-sm border-2 border-primary-400' 
                    : 'bg-white text-slate-600 border-2 border-primary-100 hover:border-primary-200 hover:bg-primary-50'
                  }
                `}
              >
                {categoryLabels[cat]} ({getWordsDueForReview(words).filter(w => w.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {filteredWords.length > 0 ? (
          <button
            onClick={startStudy}
            className="w-full min-h-[48px] py-4 bg-gradient-to-br from-success-500 to-success-600 text-white rounded-clay font-display font-bold text-lg shadow-clay-lg border-3 border-success-300 transition-all duration-200 cursor-pointer hover:shadow-clay hover:from-success-600 hover:to-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
          >
            開始學習 {Math.min(filteredWords.length, 20)} 個單字
          </button>
        ) : (
          <div className="text-center py-8 bg-success-50 rounded-clay border-3 border-success-200">
            <CheckCircleIcon className="w-12 h-12 text-success-500 mx-auto mb-3" />
            <p className="text-success-700 font-display font-bold">所有單字都已複習完成！</p>
            <p className="text-success-600 text-sm mt-2">明天再來複習吧</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleExitStudy}
          className="flex items-center gap-2 min-h-[48px] px-3 text-slate-600 hover:text-primary-600 transition-colors cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">退出</span>
        </button>
        <p className="text-primary-600 font-display font-medium">
          {currentIndex + 1} / {studyWords.length}
        </p>
      </div>

      <FlashCard 
        word={studyWords[currentIndex]} 
        showAnswer={false}
        onMarkKnown={handleMarkKnown}
      />
      
      {animationType && (
        <AnimationFeedback 
          type={animationType}
          message={animationType === 'correct' ? '太棒了!' : '再加油!'}
        />
      )}
    </div>
  );
}