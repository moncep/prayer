import React, { useState, useMemo } from 'react';
import { Prayer } from '../types/prayer';
import { Search, X, BookOpen, Sparkles, Calendar, ChevronRight } from 'lucide-react';

interface SearchViewProps {
  onClose: () => void;
  onSelectPrayer: (prayer: Prayer) => void;
  onStartRosary: () => void;
  allPrayers: Prayer[];
  language?: 'en' | 'ml';
}

export const SearchView: React.FC<SearchViewProps> = ({
  onClose,
  onSelectPrayer,
  onStartRosary,
  allPrayers,
  language = 'en',
}) => {
  const isMl = language === 'ml';
  const [query, setQuery] = useState('');

  const filteredPrayers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allPrayers.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSection = p.sectionName.toLowerCase().includes(q);
      const matchSub = p.subSectionTitle.toLowerCase().includes(q);
      const matchContent = p.content.toLowerCase().includes(q);
      return matchTitle || matchSection || matchSub || matchContent;
    }).slice(0, 50);
  }, [query, allPrayers]);

  return (
    <div className={`fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex flex-col justify-start items-center p-3 sm:p-6 transition-page ${isMl ? 'font-malayalam' : ''}`}>
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={isMl ? 'പ്രാർത്ഥനയുടെ പേര്, വാക്ക്, തിരുനാൾ എന്നിവ തിരയുക...' : 'Search by prayer name, keyword, or feast...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base text-stone-800 placeholder-stone-400 outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-600"
            >
              {isMl ? 'ക്ലോസ്' : 'Esc'}
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="px-5 py-2 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>
            {query.trim() 
              ? (isMl ? `${filteredPrayers.length} പ്രാർത്ഥനകൾ കണ്ടെത്തി` : `${filteredPrayers.length} results found`) 
              : (isMl ? `ആകെ ${allPrayers.length} പ്രാർത്ഥനകളിൽ തിരയുക` : `Search across all ${allPrayers.length} prayers`)}
          </span>
          <button onClick={onClose} className="font-semibold text-amber-900 hover:underline">
            {isMl ? 'പൂർത്തിയാക്കുക' : 'Close'}
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-stone-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">
                {isMl ? 'ഒരു വാക്ക് ടൈപ്പ് ചെയ്യുക (ഉദാ: "മറിയം", "കാരുണ്യം", "കുരിശ്", "നൊവേന")' : 'Type a word (e.g., "Mary", "Creed", "Healing", "Rosary")'}
              </p>
            </div>
          ) : filteredPrayers.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-base font-semibold mb-1">
                {isMl ? `"${query}" ന് അനുയോജ്യമായ പ്രാർത്ഥനകൾ കണ്ടെത്താനായില്ല` : `No prayers found for "${query}"`}
              </p>
              <p className="text-xs text-stone-400">
                {isMl ? 'മറ്റൊരു വാക്ക് നൽകി വീണ്ടും തിരയുക.' : 'Try searching with a different keyword.'}
              </p>
            </div>
          ) : (
            filteredPrayers.map((prayer) => {
              const isRosary = prayer.type === 'FIFTYTHREE';
              return (
                <div
                  key={prayer.id}
                  onClick={() => {
                    onClose();
                    if (isRosary) {
                      onStartRosary();
                    } else {
                      onSelectPrayer(prayer);
                    }
                  }}
                  className="cursor-pointer p-3.5 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 group-hover:bg-amber-200 group-hover:text-amber-900 transition-colors">
                      {isRosary ? (
                        <Sparkles className="w-4 h-4" />
                      ) : prayer.type === 'SERIES' ? (
                        <Calendar className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-sm text-stone-800 group-hover:text-amber-950 truncate">
                        {prayer.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate">
                        {prayer.sectionName} • {prayer.subSectionTitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-amber-800 shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
