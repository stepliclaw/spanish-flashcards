import type { Page } from '../types';

interface BottomNavProps {
  currentPage: Page;
  isLearning: boolean;
  isQuizzing: boolean;
  onNavigate: (page: Page) => void;
}

const tabs = [
  { id: 'dashboard' as Page, label: '首頁', icon: '🏠' },
  { id: 'learn' as Page, label: '學習', icon: '📚' },
  { id: 'quiz' as Page, label: '測驗', icon: '✏️' },
  { id: 'words' as Page, label: '單字', icon: '📋' },
];

export function BottomNav({ currentPage, isLearning, isQuizzing, onNavigate }: BottomNavProps) {
  const getActivePage = (): Page => {
    if (isLearning && currentPage === 'learn') return 'learn';
    if (isQuizzing && currentPage === 'quiz') return 'quiz';
    if (currentPage === 'words') return 'words';
    if (currentPage === 'learn' || currentPage === 'quiz') return currentPage;
    return currentPage;
  };

  const activePage = getActivePage();

  const handleClick = (page: Page) => {
    onNavigate(page);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                transition-all duration-200 min-w-[48px] min-h-[48px]
                ${isActive 
                  ? 'text-emerald-500' 
                  : 'text-slate-400 hover:text-slate-600'
                }
              `}
            >
              <span className="text-xl mb-0.5">{tab.icon}</span>
              <span className={`text-xs font-medium ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}