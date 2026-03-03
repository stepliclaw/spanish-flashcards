import { useMemo } from 'react';
import type { Word } from '../types';
import { categories, categoryLabels } from '../data/words';

interface DashboardProps {
  words: Word[];
  onNavigate: (page: 'learn' | 'quiz' | 'words') => void;
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.343.169-.676.34-1.003.511a.75.75 0 0 1-.65 0 49.945 49.945 0 0 0-9.903-3.912.75.75 0 0 1-.231-1.337A60.654 60.654 0 0 1 11.7 2.805Z" />
      <path fillRule="evenodd" d="M4.71 11.871c.343-.17.677-.34 1-.511l.003-.002a49.944 49.944 0 0 1 9.903-3.912.75.75 0 0 1 .6.016 47.92 47.92 0 0 1 4.47 2.09.75.75 0 1 0 .653-1.34 49.42 49.42 0 0 0-4.482-2.092.75.75 0 0 0-.6-.016 51.44 51.44 0 0 0-10.127 4.04.75.75 0 1 0 .58 1.367Zm.872 3.566a.75.75 0 1 0-.58-1.367 51.44 51.44 0 0 0-10.127 4.04.75.75 0 1 0 .58 1.367 49.94 49.94 0 0 1 9.903-3.912.75.75 0 0 0 .6.016l.003-.002c.343-.169.676-.34 1-.511l.003-.002a49.94 49.94 0 0 1 9.903-3.912.75.75 0 0 1 .6.016l.002.001c.343.17.677.34 1.001.511l.003.002c.324.171.658.341 1.002.51a.75.75 0 0 0 .65 0 49.94 49.94 0 0 1 9.902-3.912.75.75 0 1 0-.6-1.34 51.44 51.44 0 0 0-10.127 4.04.75.75 0 0 0-.6.016l-.002.001c-.324.17-.658.34-.997.51l-.003.002c-.344.171-.678.342-1.004.513l-.003.002a49.94 49.94 0 0 1-9.902 3.912.75.75 0 0 1-.6-.016 51.44 51.44 0 0 0-10.128-4.04Z" clipRule="evenodd" />
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
    </svg>
  );
}

export function Dashboard({ words, onNavigate }: DashboardProps) {
  const stats = useMemo(() => {
    const mastered = words.filter(w => w.mastered).length;
    const reviewedToday = words.filter(w => {
      if (!w.lastReviewed) return false;
      const today = new Date().toDateString();
      return new Date(w.lastReviewed).toDateString() === today;
    }).length;
    
    const categoryStats = categories.map(cat => ({
      category: cat,
      label: categoryLabels[cat],
      total: words.filter(w => w.category === cat).length,
      mastered: words.filter(w => w.category === cat && w.mastered).length,
    }));

    return { mastered, reviewedToday, total: words.length, categoryStats };
  }, [words]);

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24">
      <div className="text-center mb-8 gradient-header rounded-clay-lg p-8 shadow-clay-lg border-3 border-primary-300">
        <h1 className="text-4xl font-display font-bold text-white mb-2">西班牙文學習</h1>
        <p className="text-white/90 font-medium">Spanish Vocabulary Learning</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="clay-card p-6 text-center cursor-default">
          <AcademicCapIcon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-1">總單字數</p>
          <p className="text-3xl font-display font-bold text-primary-900">{stats.total}</p>
        </div>
        <div className="clay-card p-6 text-center cursor-default">
          <CheckCircleIcon className="w-8 h-8 text-success-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-1">已掌握</p>
          <p className="text-3xl font-display font-bold text-success-600">{stats.mastered}</p>
        </div>
        <div className="clay-card p-6 text-center cursor-default">
          <ClockIcon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-1">今日複習</p>
          <p className="text-3xl font-display font-bold text-primary-600">{stats.reviewedToday}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onNavigate('learn')}
          className="group bg-gradient-to-br from-success-400 to-success-600 text-white rounded-clay p-6 shadow-clay-lg border-3 border-success-300 transition-all duration-200 cursor-pointer hover:shadow-clay-lg focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
        >
          <BookOpenIcon className="w-10 h-10 text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-200" />
          <p className="text-xl font-display font-bold">開始學習</p>
          <p className="text-success-100 text-sm mt-1">單字卡模式</p>
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className="group bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-clay p-6 shadow-clay-lg border-3 border-primary-300 transition-all duration-200 cursor-pointer hover:shadow-clay-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <PencilIcon className="w-10 h-10 text-white mb-3 mx-auto group-hover:scale-110 transition-transform duration-200" />
          <p className="text-xl font-display font-bold">開始測驗</p>
          <p className="text-primary-100 text-sm mt-1">選擇題模式</p>
        </button>
      </div>

      <div className="clay-card p-6">
        <h2 className="text-lg font-display font-bold text-primary-900 mb-4">分類進度</h2>
        <div className="space-y-3">
          {stats.categoryStats.map(cat => (
            <div key={cat.category} className="flex items-center gap-4">
              <p className="w-20 text-sm text-slate-600 font-medium">{cat.label}</p>
              <div className="flex-1 h-3 bg-primary-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full transition-all duration-500"
                  style={{ width: `${cat.total > 0 ? (cat.mastered / cat.total) * 100 : 0}%` }}
                />
              </div>
              <p className="w-16 text-sm text-slate-500 text-right font-medium">
                {cat.mastered}/{cat.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate('words')}
        className="w-full mt-6 py-4 bg-white text-primary-600 rounded-clay font-display font-bold border-3 border-primary-200 shadow-clay-sm transition-all duration-200 cursor-pointer hover:bg-primary-50 hover:shadow-clay focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        瀏覽全部單字
      </button>
    </div>
  );
}