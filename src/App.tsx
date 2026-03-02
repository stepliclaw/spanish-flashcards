import { useState, useEffect } from 'react';
import type { Word, Page } from './types';
import { defaultWords } from './data/words';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Quiz } from './pages/Quiz';
import { WordsList } from './pages/WordsList';
import { BottomNav } from './components/BottomNav';
import { loadVoices } from './utils/speech';

function App() {
  const [words, setWords] = useLocalStorage<Word[]>('spanish-words', defaultWords);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLearning, setIsLearning] = useState(false);
  const [isQuizzing, setIsQuizzing] = useState(false);

  useEffect(() => {
    loadVoices();
  }, []);

  const handleNavigate = (page: Page) => {
    if (page === 'dashboard') {
      setIsLearning(false);
      setIsQuizzing(false);
      setCurrentPage('dashboard');
    } else if (page === 'learn') {
      setIsQuizzing(false);
      setIsLearning(true);
      setCurrentPage('learn');
    } else if (page === 'quiz') {
      setIsLearning(false);
      setIsQuizzing(true);
      setCurrentPage('quiz');
    } else if (page === 'words') {
      setCurrentPage('words');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return (
          <Learn
            words={words}
            onUpdateWords={setWords}
          />
        );
      case 'quiz':
        return (
          <Quiz
            words={words}
            onUpdateWords={setWords}
          />
        );
      case 'words':
        return <WordsList words={words} />;
      default:
        return (
          <Dashboard
            words={words}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {renderPage()}
      <BottomNav
        currentPage={currentPage}
        isLearning={isLearning}
        isQuizzing={isQuizzing}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;