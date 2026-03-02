import { useState, useEffect } from 'react';
import type { Word } from './types';
import { defaultWords } from './data/words';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Quiz } from './pages/Quiz';
import { WordsList } from './pages/WordsList';
import { loadVoices } from './utils/speech';

type Page = 'dashboard' | 'learn' | 'quiz' | 'words';

function App() {
  const [words, setWords] = useLocalStorage<Word[]>('spanish-words', defaultWords);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    loadVoices();
  }, []);

  const handleNavigate = (page: 'learn' | 'quiz' | 'words') => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return (
          <Learn
            words={words}
            onUpdateWords={setWords}
            onBack={() => setCurrentPage('dashboard')}
          />
        );
      case 'quiz':
        return (
          <Quiz
            words={words}
            onUpdateWords={setWords}
            onBack={() => setCurrentPage('dashboard')}
          />
        );
      case 'words':
        return (
          <WordsList
            words={words}
            onBack={() => setCurrentPage('dashboard')}
          />
        );
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
    <div className="min-h-screen bg-slate-50">
      {renderPage()}
    </div>
  );
}

export default App;