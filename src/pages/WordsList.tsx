import { useState } from 'react';
import type { Word } from '../types';
import { categories, categoryLabels } from '../data/words';
import { PronunciationButton } from '../components/PronunciationButton';

interface WordsListProps {
  words: Word[];
  onBack: () => void;
}

export function WordsList({ words, onBack }: WordsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = words.filter(w => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch = w.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.chinese.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          返回
        </button>
        <h1 className="text-2xl font-bold text-slate-800">全部單字</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="搜尋單字..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">全部分類</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{categoryLabels[cat]}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        共 {filteredWords.length} 個單字
      </p>

      <div className="grid gap-3">
        {filteredWords.map(word => (
          <div
            key={word.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-800">{word.spanish}</span>
                <span className="text-lg text-emerald-600">{word.chinese}</span>
                {word.mastered && (
                  <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full">
                    已掌握
                  </span>
                )}
              </div>
              <span className="text-sm text-slate-400">{categoryLabels[word.category]}</span>
            </div>
            <PronunciationButton text={word.spanish} className="px-3 py-1.5 text-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}