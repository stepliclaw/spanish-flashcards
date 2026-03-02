import { useState } from 'react';
import type { Word } from '../types';
import { categories, categoryLabels } from '../data/words';
import { PronunciationButton } from '../components/PronunciationButton';

interface WordsListProps {
  words: Word[];
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
      <h1 className="text-2xl font-bold text-slate-800 mb-6">全部單字</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="搜尋單字..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-h-[48px] px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="min-h-[48px] px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <PronunciationButton text={word.spanish} className="min-h-[48px] px-3 py-1.5 text-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}