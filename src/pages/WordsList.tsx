import { useState } from 'react';
import type { Word } from '../types';
import { categories, categoryLabels } from '../data/words';
import { PronunciationButton } from '../components/PronunciationButton';

interface WordsListProps {
  words: Word[];
}

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

export function WordsList({ words }: WordsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = words.filter(w => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch = w.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.chinese.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24">
      <h1 className="text-2xl font-display font-bold text-primary-900 mb-6">全部單字</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋單字..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-h-[48px] pl-12 pr-4 py-3 bg-white border-3 border-primary-100 rounded-clay text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="min-h-[48px] px-4 py-3 bg-white border-3 border-primary-100 rounded-clay text-slate-700 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 transition-all duration-200 cursor-pointer"
        >
          <option value="all">全部分類</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{categoryLabels[cat]}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-500 mb-4 font-medium">
        共 {filteredWords.length} 個單字
      </p>

      <div className="grid gap-3">
        {filteredWords.map(word => (
          <div
            key={word.id}
            className="clay-card p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-lg font-display font-bold text-primary-900">{word.spanish}</span>
                <span className="text-lg text-success-600 font-medium">{word.chinese}</span>
                {word.mastered && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-display font-bold bg-success-100 text-success-700 rounded-full border-2 border-success-200">
                    <CheckBadgeIcon className="w-3.5 h-3.5" />
                    已掌握
                  </span>
                )}
              </div>
              <span className="text-sm text-slate-400 font-medium">{categoryLabels[word.category]}</span>
            </div>
            <PronunciationButton text={word.spanish} className="min-h-[40px] px-3 py-1.5 text-sm flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}