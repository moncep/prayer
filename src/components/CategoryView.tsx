import React, { useState } from 'react';
import { Section, Prayer } from '../types/prayer';
import { ArrowLeft, Sparkles, Calendar, BookOpen, Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';

interface CategoryViewProps {
  section: Section;
  onBack: () => void;
  onSelectPrayer: (prayer: Prayer) => void;
  onStartRosary: () => void;
  allPrayers: Prayer[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  language?: 'en' | 'ml';
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  section,
  onBack,
  onSelectPrayer,
  onStartRosary,
  allPrayers,
  bookmarkedIds,
  onToggleBookmark,
  language = 'en',
}) => {
  const isMl = language === 'ml';
  const [selectedSubId, setSelectedSubId] = useState<string>('all');

  const prayersForSection = allPrayers.filter(p => p.sectionId === section.id);
  const displayedPrayers = selectedSubId === 'all'
    ? prayersForSection
    : prayersForSection.filter(p => p.subSectionId === selectedSubId);

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 transition-page pb-20 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isMl ? 'എല്ലാ വിഭാഗങ്ങളും' : 'All Categories'}
        </button>
      </div>

      {/* Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-800 mb-1">
          <span>{isMl ? 'വിഭാഗം' : 'Category'}</span>
          <span>•</span>
          <span>{prayersForSection.length} {isMl ? 'പ്രാർത്ഥനകൾ' : 'Prayers'}</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          {section.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          {isMl ? 'വായിക്കുവാനും പ്രാർത്ഥിക്കുവാനും താഴെയുള്ള പ്രാർത്ഥനകൾ തിരഞ്ഞെടുക്കുക.' : 'Select any prayer below to begin reading or meditating.'}
        </p>

        {/* Subsections Filter Pills */}
        {section.subsections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pt-4 mt-2 border-t border-stone-100 scrollbar-thin">
            <button
              onClick={() => setSelectedSubId('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubId === 'all'
                  ? 'bg-amber-900 text-white shadow'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMl ? 'എല്ലാം' : 'All Topics'} ({prayersForSection.length})
            </button>
            {section.subsections.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubId(sub.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubId === sub.id
                    ? 'bg-amber-900 text-white shadow'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sub.title} ({sub.prayerCount})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prayers List */}
      <div className="space-y-2.5">
        {displayedPrayers.map((prayer) => {
          const isFav = bookmarkedIds.has(prayer.id);
          const isRosary = prayer.type === 'FIFTYTHREE';
          const isNovena = prayer.type === 'SERIES';

          return (
            <div
              key={prayer.id}
              onClick={() => {
                if (isRosary) {
                  onStartRosary();
                } else {
                  onSelectPrayer(prayer);
                }
              }}
              className="group cursor-pointer bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-amber-700/40 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isRosary 
                    ? 'bg-amber-100 text-amber-800' 
                    : isNovena 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-stone-100 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-800'
                }`}>
                  {isRosary ? (
                    <Sparkles className="w-5 h-5 text-amber-700" />
                  ) : isNovena ? (
                    <Calendar className="w-5 h-5 text-purple-700" />
                  ) : (
                    <BookOpen className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                      {prayer.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span>{prayer.subSectionTitle}</span>
                    {isNovena && prayer.seriesDays && (
                      <>
                        <span>•</span>
                        <span className="text-purple-700 font-semibold">
                          {prayer.seriesDays.length} {isMl ? 'ദിവസത്തെ നൊവേന' : '-Day Novena'}
                        </span>
                      </>
                    )}
                    {isRosary && (
                      <>
                        <span>•</span>
                        <span className="text-amber-700 font-semibold">
                          {isMl ? '53 മണി ജപം' : 'Interactive 53 Beads'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(prayer.id);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    isFav
                      ? 'text-amber-600 hover:text-amber-700 bg-amber-50'
                      : 'text-stone-300 hover:text-stone-600 hover:bg-stone-100'
                  }`}
                  title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
                >
                  {isFav ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
