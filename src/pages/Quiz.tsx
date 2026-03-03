import { useState } from 'react';
import type { Word, QuizQuestion } from '../types';
import { PronunciationButton } from '../components/PronunciationButton';
import { AnimationFeedback } from '../components/AnimationFeedback';
import { shuffleArray } from '../utils/spacedRepetition';
import { categoryLabels } from '../data/words';

interface QuizProps {
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

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15.19a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.138-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
    </svg>
  );
}

export function Quiz({ words, onUpdateWords }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [animationType, setAnimationType] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestions = (): QuizQuestion[] => {
    const shuffled = shuffleArray(words).slice(0, 10);
    return shuffled.map(word => {
      const wrongOptions = shuffleArray(words)
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.chinese);
      
      return {
        word,
        options: shuffleArray([word.chinese, ...wrongOptions]),
        type: 'multiple-choice' as const,
      };
    });
  };

  const startQuiz = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, wrong: 0 });
  };

  const handleExitQuizSession = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentIndex].word.chinese;
    setAnimationType(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(s => ({ ...s, correct: s.correct + 1 }));
    } else {
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
    }
    
    setTimeout(() => {
      setAnimationType(null);
    }, 400);
  };

  const handleNext = () => {
    const word = questions[currentIndex].word;
    const isCorrect = selectedAnswer === word.chinese;
    
    const updatedWords = words.map(w => {
      if (w.id === word.id) {
        const newTimesReviewed = w.timesReviewed + 1;
        return {
          ...w,
          timesReviewed: newTimesReviewed,
          lastReviewed: new Date().toISOString(),
          mastered: isCorrect || newTimesReviewed >= 5,
        };
      }
      return w;
    });
    onUpdateWords(updatedWords);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuestions([]);
    }
  };

  if (questions.length === 0 && score.correct === 0 && score.wrong === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-display font-bold text-primary-900 mb-6">測驗模式</h1>
        <p className="text-slate-600 mb-6 font-medium">選擇正確的中文翻譯</p>

        <button
          onClick={startQuiz}
          className="w-full min-h-[48px] py-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-clay font-display font-bold text-lg shadow-clay-lg border-3 border-primary-300 transition-all duration-200 cursor-pointer hover:shadow-clay hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          開始測驗 (10題)
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    const percentage = Math.round((score.correct / (score.correct + score.wrong)) * 100);
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="clay-card p-8 text-center">
          <TrophyIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">測驗完成！</h2>
          <p className="text-5xl font-display font-bold text-success-600 mb-2">{score.correct}</p>
          <p className="text-slate-500 mb-4 font-medium">/ {score.correct + score.wrong} 正確</p>
          <p className="text-lg text-primary-600 mb-6 font-display">
            正確率: {percentage}%
          </p>
          <button
            onClick={startQuiz}
            className="min-h-[48px] px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-clay font-display font-bold shadow-clay border-2 border-primary-300 transition-all duration-200 cursor-pointer hover:shadow-clay-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            再測驗一次
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleExitQuizSession}
          className="flex items-center gap-2 min-h-[48px] px-3 text-slate-600 hover:text-primary-600 transition-colors cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">退出</span>
        </button>
        <p className="text-primary-600 font-display font-medium">
          {currentIndex + 1} / {questions.length}
        </p>
      </div>

      <div className="clay-card p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 text-sm font-display font-medium bg-primary-100 text-primary-700 rounded-full border-2 border-primary-200">
            {categoryLabels[question.word.category] || question.word.category}
          </span>
          <PronunciationButton text={question.word.spanish} />
        </div>

        <h2 className="text-3xl font-display font-bold text-center text-primary-900 mb-8">
          {question.word.spanish}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.word.chinese;
            let bgClass = 'bg-white hover:bg-primary-50 border-primary-100';
            let textClass = 'text-slate-700';
            
            if (showResult) {
              if (isCorrect) {
                bgClass = 'bg-success-50 border-success-400';
                textClass = 'text-success-700';
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-error-50 border-error-400';
                textClass = 'text-error-700';
              }
            } else if (isSelected) {
              bgClass = 'bg-primary-50 border-primary-400';
              textClass = 'text-primary-700';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`
                  w-full min-h-[56px] p-4 rounded-clay border-3 text-left font-display font-medium 
                  transition-all duration-200 cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  disabled:cursor-default
                  ${bgClass} ${textClass}
                  ${!showResult ? 'hover:shadow-clay-sm' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-sm">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircleIcon className="w-6 h-6 text-success-500 ml-auto" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircleIcon className="w-6 h-6 text-error-500 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full mt-6 min-h-[48px] py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-clay font-display font-bold shadow-clay border-2 border-primary-300 transition-all duration-200 cursor-pointer hover:shadow-clay-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {currentIndex < questions.length - 1 ? '下一題' : '查看結果'}
          </button>
        )}
      </div>

      {animationType && (
        <AnimationFeedback 
          type={animationType}
          message={animationType === 'correct' ? '正確!' : '錯了!'}
        />
      )}
    </div>
  );
}