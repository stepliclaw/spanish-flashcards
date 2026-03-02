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
        <h1 className="text-3xl font-bold text-slate-800 mb-6">開始學習</h1>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 mb-6">
          <p className="text-slate-600 mb-4">選擇分類</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`min-h-[48px] px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              全部 ({getWordsDueForReview(words).length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[48px] px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {categoryLabels[cat]} ({getWordsDueForReview(words).filter(w => w.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {filteredWords.length > 0 ? (
          <button
            onClick={startStudy}
            className="w-full min-h-[48px] py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            開始學習 {Math.min(filteredWords.length, 20)} 個單字
          </button>
        ) : (
          <div className="text-center py-8 bg-emerald-50 rounded-xl">
            <p className="text-emerald-700 font-medium">所有單字都已複習完成！🎉</p>
            <p className="text-emerald-600 text-sm mt-2">明天再來複習吧</p>
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
          className="flex items-center gap-2 min-h-[48px] px-3 text-slate-600 hover:text-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          退出
        </button>
        <p className="text-slate-500">
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