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
        <h1 className="text-3xl font-bold text-slate-800 mb-6">測驗模式</h1>
        <p className="text-slate-600 mb-6">選擇正確的中文翻譯</p>

        <button
          onClick={startQuiz}
          className="w-full min-h-[48px] py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
        >
          開始測驗 (10題)
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">測驗完成！</h2>
          <p className="text-4xl font-bold text-emerald-600 mb-2">{score.correct}</p>
          <p className="text-slate-500 mb-4">/ {score.correct + score.wrong} 正確</p>
          <p className="text-slate-600 mb-6">
            正確率: {Math.round((score.correct / (score.correct + score.wrong)) * 100)}%
          </p>
          <button
            onClick={startQuiz}
            className="min-h-[48px] px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg"
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
          className="flex items-center gap-2 min-h-[48px] px-3 text-slate-600 hover:text-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          退出
        </button>
        <p className="text-slate-500">
          {currentIndex + 1} / {questions.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">
            {categoryLabels[question.word.category] || question.word.category}
          </span>
          <PronunciationButton text={question.word.spanish} />
        </div>

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          {question.word.spanish}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.word.chinese;
            let bgClass = 'bg-slate-50 hover:bg-slate-100';
            
            if (showResult) {
              if (isCorrect) {
                bgClass = 'bg-emerald-100 border-emerald-500';
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-red-100 border-red-500';
              }
            } else if (isSelected) {
              bgClass = 'bg-blue-100 border-blue-500';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`w-full min-h-[48px] p-4 rounded-xl border-2 text-left font-medium transition-all ${bgClass} ${
                  !showResult ? 'border-slate-200' : 'border-transparent'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full mt-6 min-h-[48px] py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg"
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