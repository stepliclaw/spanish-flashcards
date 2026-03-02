import { useState } from 'react';
import { speak } from '../utils/speech';

interface PronunciationButtonProps {
  text: string;
  className?: string;
}

export function PronunciationButton({ text, className = '' }: PronunciationButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      await speak(text);
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      className={`
        flex items-center gap-2 px-4 py-2 
        bg-emerald-500 hover:bg-emerald-600 
        text-white rounded-lg font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`}
      >
        <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-.879 2.122l-7.5 4.615a3 3 0 0 1-2.176 1.1A2.985 2.985 0 0 1 3 18.324V5.75a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
      </svg>
      {isPlaying ? '播放中...' : '發音'}
    </button>
  );
}