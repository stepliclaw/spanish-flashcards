import { useMemo } from 'react';
import type { Word } from '../types';
import { categories, categoryLabels } from '../data/words';

interface DashboardProps {
  words: Word[];
  onNavigate: (page: 'learn' | 'quiz' | 'words') => void;
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">西班牙文學習</h1>
        <p className="text-slate-500">Spanish Vocabulary Learning</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <p className="text-sm text-slate-500 mb-1">總單字數</p>
          <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <p className="text-sm text-slate-500 mb-1">已掌握</p>
          <p className="text-3xl font-bold text-emerald-600">{stats.mastered}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
          <p className="text-sm text-slate-500 mb-1">今日複習</p>
          <p className="text-3xl font-bold text-blue-600">{stats.reviewedToday}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onNavigate('learn')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-8 shadow-lg transition-all hover:scale-[1.02]"
        >
          <div className="text-4xl mb-2">📚</div>
          <p className="text-xl font-bold">開始學習</p>
          <p className="text-emerald-100 text-sm">單字卡模式</p>
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-8 shadow-lg transition-all hover:scale-[1.02]"
        >
          <div className="text-4xl mb-2">✏️</div>
          <p className="text-xl font-bold">開始測驗</p>
          <p className="text-blue-100 text-sm">選擇題模式</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">分類進度</h2>
        <div className="space-y-3">
          {stats.categoryStats.map(cat => (
            <div key={cat.category} className="flex items-center gap-4">
              <p className="w-20 text-sm text-slate-600">{cat.label}</p>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${cat.total > 0 ? (cat.mastered / cat.total) * 100 : 0}%` }}
                />
              </div>
              <p className="w-16 text-sm text-slate-500 text-right">
                {cat.mastered}/{cat.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate('words')}
        className="w-full mt-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
      >
        瀏覽全部單字
      </button>
    </div>
  );
}