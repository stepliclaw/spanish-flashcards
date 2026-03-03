import { useState } from 'react';
import type { Word } from '../types';
import { PronunciationButton } from './PronunciationButton';
import { categoryLabels, categoryColors } from '../data/words';

interface FlashCardProps {
  word: Word;
  showAnswer?: boolean;
  onFlip?: () => void;
  onMarkKnown?: (known: boolean) => void;
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
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

export function FlashCard({ word, showAnswer = true, onFlip, onMarkKnown }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(!showAnswer);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const categoryColor = categoryColors[word.category] || '#6366F1';

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        aria-label={isFlipped ? 'Click to hide answer' : 'Click to show answer'}
        className="
          relative min-h-[320px] cursor-pointer
          bg-white rounded-clay-lg
          transition-all duration-300
          shadow-clay-lg border-3 border-primary-100
          hover:shadow-clay hover:border-primary-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          overflow-hidden
        "
      >
        <div className="absolute top-4 right-4">
          <span 
            className="px-3 py-1 text-xs font-display font-medium rounded-full border-2"
            style={{ 
              backgroundColor: `${categoryColor}20`, 
              color: categoryColor,
              borderColor: `${categoryColor}40`
            }}
          >
            {categoryLabels[word.category] || word.category}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[320px] p-8">
          {isFlipped ? (
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary-900 mb-4">{word.spanish}</p>
              <p className="text-xl text-success-600 font-medium">{word.chinese}</p>
              <div className="mt-6">
                <PronunciationButton text={word.spanish} />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-display font-semibold text-primary-400">點擊顯示答案</p>
              <p className="text-sm text-primary-300 mt-2">Click to reveal</p>
            </div>
          )}
        </div>
      </div>

      {onMarkKnown && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => onMarkKnown(false)}
            className="flex items-center gap-2 px-6 py-3 bg-error-50 hover:bg-error-100 text-error-600 rounded-clay font-display font-bold border-3 border-error-200 transition-all duration-200 cursor-pointer shadow-clay-sm hover:shadow-clay focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2"
          >
            <XCircleIcon className="w-5 h-5" />
            還沒記住
          </button>
          <button
            onClick={() => onMarkKnown(true)}
            className="flex items-center gap-2 px-6 py-3 bg-success-50 hover:bg-success-100 text-success-600 rounded-clay font-display font-bold border-3 border-success-200 transition-all duration-200 cursor-pointer shadow-clay-sm hover:shadow-clay focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            已經記住
          </button>
        </div>
      )}
    </div>
  );
}