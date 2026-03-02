import { useState } from 'react';
import type { Word } from '../types';
import { PronunciationButton } from './PronunciationButton';

interface FlashCardProps {
  word: Word;
  showAnswer?: boolean;
  onFlip?: () => void;
  onMarkKnown?: (known: boolean) => void;
}

export function FlashCard({ word, showAnswer = true, onFlip, onMarkKnown }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(!showAnswer);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        onClick={handleFlip}
        className={`
          relative min-h-[280px] cursor-pointer
          bg-white rounded-2xl shadow-lg
          transition-all duration-300 transform
          hover:shadow-xl
          border border-slate-200
          overflow-hidden
        `}
      >
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
            {word.category}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[280px] p-8">
          {isFlipped ? (
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-800 mb-4">{word.spanish}</p>
              <p className="text-xl text-emerald-600">{word.chinese}</p>
              <div className="mt-6">
                <PronunciationButton text={word.spanish} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-semibold text-slate-400">點擊顯示答案</p>
              <p className="text-sm text-slate-400 mt-2">Click to reveal</p>
            </div>
          )}
        </div>
      </div>

      {onMarkKnown && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => onMarkKnown(false)}
            className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-colors"
          >
            還沒記住
          </button>
          <button
            onClick={() => onMarkKnown(true)}
            className="px-6 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-colors"
          >
            已經記住
          </button>
        </div>
      )}
    </div>
  );
}