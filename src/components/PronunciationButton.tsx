import { useState } from 'react';
import { speak } from '../utils/speech';

interface PronunciationButtonProps {
  text: string;
  className?: string;
}

function SpeakerWaveIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
      <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
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
      aria-label={isPlaying ? 'Playing pronunciation' : 'Play pronunciation'}
      className={`
        flex items-center gap-2 px-4 py-2 
        bg-gradient-to-br from-primary-400 to-primary-600 
        text-white rounded-xl font-display font-medium
        shadow-clay-sm border-2 border-primary-300
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        cursor-pointer hover:shadow-clay hover:from-primary-500 hover:to-primary-700
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
        ${isPlaying ? 'animate-pulse-soft' : ''}
        ${className}
      `}
    >
      <SpeakerWaveIcon className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
      {isPlaying ? '播放中...' : '發音'}
    </button>
  );
}