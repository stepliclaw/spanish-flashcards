import { useEffect, useState } from 'react';

interface AnimationFeedbackProps {
  type: 'correct' | 'wrong';
  message?: string;
  onComplete?: () => void;
}

function CheckIcon({ className }: { className?: string }) {
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

export function AnimationFeedback({ type, message, onComplete }: AnimationFeedbackProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = type === 'correct' ? 800 : 600;
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  if (!visible) return null;

  const isCorrect = type === 'correct';
  const bgColor = isCorrect ? '#22C55E' : '#EF4444';
  const Icon = isCorrect ? CheckIcon : XCircleIcon;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`
          ${isCorrect ? 'animate-bounce-soft' : 'animate-shake'}
          bg-white rounded-clay-lg p-8 shadow-clay-lg
          flex flex-col items-center
          min-w-[200px] border-4
        `}
        style={{ borderColor: bgColor }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>
        <p 
          className="text-2xl font-display font-bold"
          style={{ color: bgColor }}
        >
          {message || (isCorrect ? '正確!' : '錯誤!')}
        </p>
      </div>
    </div>
  );
}