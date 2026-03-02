import { useEffect, useState } from 'react';

interface AnimationFeedbackProps {
  type: 'correct' | 'wrong';
  message?: string;
  onComplete?: () => void;
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
  const bgColor = isCorrect ? '#58CC02' : '#FF4B4B';
  const icon = isCorrect ? '✓' : '✗';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`
          ${isCorrect ? 'animate-bounce' : 'animate-shake'}
          bg-white rounded-3xl p-8 shadow-2xl
          flex flex-col items-center
          min-w-[200px]
        `}
        style={{ border: `4px solid ${bgColor}` }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: bgColor }}
        >
          <span className="text-5xl text-white font-bold">{icon}</span>
        </div>
        <p 
          className="text-2xl font-bold"
          style={{ color: bgColor }}
        >
          {message || (isCorrect ? '正確!' : '錯誤!')}
        </p>
      </div>
    </div>
  );
}