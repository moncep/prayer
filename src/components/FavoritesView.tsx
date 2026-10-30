import React from 'react';
import { Prayer } from '../types/prayer';
import { ArrowLeft, Bookmark, Trash2, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

interface FavoritesViewProps {
  onBack: () => void;
  onSelectPrayer: (prayer: Prayer) => void;
  onStartRosary: () => void;
  allPrayers: Prayer[];
  bookmarkedIds: Set<string>;
  onRemoveBookmark: (id: string) => void;
  language?: 'en' | 'ml';
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onBack,
  onSelectPrayer,
  onStartRosary,
  allPrayers,
  bookmarkedIds,
  onRemoveBookmark,
  language = 'en',
}) => {
  const isMl = language === 'ml';
  const favoritePrayers = allPrayers.filter(p => bookmarkedIds.has(p.id));

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 transition-page pb-20 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isMl ? 'ഹോം' : 'Home'}
        </button>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-amber-800 mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isMl ? 'അനുദിന ജപങ്ങൾക്കായി സൂക്ഷിച്ചവ' : 'Saved for Daily Recitation'}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
            {isMl ? 'പ്രിയപ്പെട്ട പ്രാർത്ഥനകൾ' : 'Favorite Prayers'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {favoritePrayers.length} {isMl ? 'പ്രാർത്ഥനകൾ ലഭ്യമാണ്.' : (favoritePrayers.length === 1 ? 'prayer pinned for quick access.' : 'prayers pinned for quick access.')}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {favoritePrayers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-stone-700 mb-1">
            {isMl ? 'പ്രിയപ്പെട്ട പ്രാർത്ഥനകൾ ഒന്നും ചേർത്തിട്ടില്ല' : 'No favorite prayers yet'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
            {isMl 
              ? 'ഏതെങ്കിലും പ്രാർത്ഥന വായിക്കുമ്പോൾ മുകളിലുള്ള ബുക്ക്മാർക്ക് ഐക്കണിൽ സ്പർശിച്ചാൽ ഇവിടെ വേഗത്തിൽ ലഭ്യമാകും.' 
              : 'While reading any prayer, tap the bookmark icon in the top right corner to save it here for quick daily access.'}
          </p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-full bg-amber-900 text-amber-50 font-semibold text-xs hover:bg-amber-800 transition-colors"
          >
            {isMl ? 'പ്രാർത്ഥനകൾ കാണുക' : 'Browse Prayers'}
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {favoritePrayers.map((prayer) => {
            const isRosary = prayer.type === 'FIFTYTHREE';
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
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                    {isRosary ? <Sparkles className="w-5 h-5 text-amber-700" /> : <BookOpen className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                      {prayer.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 truncate">
                      {prayer.sectionName} • {prayer.subSectionTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBookmark(prayer.id);
                    }}
                    className="p-2 rounded-full text-stone-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title={isMl ? 'നീക്കം ചെയ്യുക' : 'Remove from favorites'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
