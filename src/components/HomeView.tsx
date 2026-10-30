import React from 'react';
import { Section, Prayer } from '../types/prayer';
import { BookOpen, Sparkles, Clock, Shield, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  sections: Section[];
  onSelectSection: (section: Section) => void;
  onSelectSubSection: (section: Section, subSectionId: string) => void;
  onSelectPrayer: (prayer: Prayer) => void;
  onStartRosary: () => void;
  allPrayers: Prayer[];
  language?: 'en' | 'ml';
}

export const HomeView: React.FC<HomeViewProps> = ({
  sections,
  onSelectSection,
  onSelectSubSection,
  onSelectPrayer,
  onStartRosary,
  allPrayers,
  language = 'en',
}) => {
  const isMl = language === 'ml';

  // Quick lookup for daily highlight prayers
  const angelusPrayer = allPrayers.find(p => 
    p.title.toLowerCase().includes('angelus') || 
    p.title.includes('ത്രികാല') || 
    p.fileName.toLowerCase().includes('angelus')
  );
  const morningPrayer = allPrayers.find(p => 
    p.title.toLowerCase().includes('morning') || 
    p.title.includes('പ്രഭാത') || 
    p.title.includes('ഉണരുമ്പോൾ') ||
    p.fileName.toLowerCase().includes('morning')
  );
  const nightPrayer = allPrayers.find(p => 
    p.title.toLowerCase().includes('night') || 
    p.title.includes('രാത്രി') || 
    p.title.includes('സന്ധ്യാ') ||
    p.fileName.toLowerCase().includes('night')
  );
  const creedPrayer = allPrayers.find(p => 
    p.title.toLowerCase().includes('creed') || 
    p.title.includes('വിശ്വാസപ്രമാണം') ||
    p.fileName.toLowerCase().includes('creed') ||
    p.fileName.includes('VishvasaPramanam')
  );

  // Filter out any non-prayer or empty sections (such as Settings or Preference)
  const displaySections = sections.filter((section) => {
    const isExcluded =
      section.name.toLowerCase() === 'settings' ||
      section.name.toLowerCase() === 'preference' ||
      section.name.toLowerCase() === 'other apps';
    const totalSectionPrayers = section.subsections.reduce((acc, sub) => acc + sub.prayerCount, 0);
    return !isExcluded && totalSectionPrayers > 0;
  });

  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 transition-page pb-20 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Liturgical Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 p-6 sm:p-8 shadow-2xl border border-amber-800/40 mb-8">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/70 text-amber-300 text-xs font-semibold mb-3 border border-amber-700/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isMl ? 'കത്തോലിക്കാ പ്രാർത്ഥനാ സഹകാരി' : 'Catholic Devotional Companion'}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-wide text-amber-100 mb-2">
            {isMl ? '"ഇടവിടാതെ പ്രാർത്ഥിക്കുവിൻ."' : '"Pray without ceasing."'}
          </h1>
          <p className="text-amber-200/80 text-xs sm:text-sm max-w-lg mb-6 font-prayer italic">
            {isMl 
              ? '1 തെസലോനിക്ക 5:17 • തിരുസഭയുടെ പ്രാർത്ഥനകളും നൊവേനകളും ഭക്തിമാർഗ്ഗങ്ങളും' 
              : '1 Thessalonians 5:17 • Complete collection of Church prayers, novenas, and devotions.'}
          </p>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={onStartRosary}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>{isMl ? 'വിശുദ്ധ ജപമാല' : 'Holy Rosary'}</span>
            </button>

            {angelusPrayer && (
              <button
                onClick={() => onSelectPrayer(angelusPrayer)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-amber-100 font-semibold text-xs border border-amber-800/40 shadow-sm transition-all active:scale-95"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{isMl ? 'ത്രികാല പ്രാർത്ഥന' : 'The Angelus'}</span>
              </button>
            )}

            {morningPrayer && (
              <button
                onClick={() => onSelectPrayer(morningPrayer)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-amber-100 font-semibold text-xs border border-amber-800/40 shadow-sm transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{isMl ? 'പ്രഭാത പ്രാർത്ഥന' : 'Morning Prayer'}</span>
              </button>
            )}

            {creedPrayer && (
              <button
                onClick={() => onSelectPrayer(creedPrayer)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-stone-800/80 hover:bg-stone-700 text-amber-100 font-semibold text-xs border border-amber-800/40 shadow-sm transition-all active:scale-95"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>{isMl ? 'വിശ്വാസപ്രമാണം' : 'The Creed'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-900">
            {isMl ? 'പ്രാർത്ഥനാ വിഭാഗങ്ങൾ' : 'Prayer Collections'}
          </h2>
          <p className="text-xs text-stone-500">
            {isMl 
              ? `${displaySections.length} വിഭാഗങ്ങൾ • ${allPrayers.length} വിശുദ്ധ പ്രാർത്ഥനകൾ` 
              : `${displaySections.length} Categories • ${allPrayers.length} Sacred Prayers`}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displaySections.map((section) => {
          const firstSub = section.subsections[0];
          const imageSrc = firstSub?.image ? `/images/categories/${firstSub.image}` : null;
          const totalSectionPrayers = section.subsections.reduce((acc, sub) => acc + sub.prayerCount, 0);

          return (
            <div
              key={section.id}
              onClick={() => {
                if (section.id === 'SEC01' || section.name.toLowerCase() === 'rosary' || section.name.includes('ജപമാല')) {
                  onStartRosary();
                } else {
                  onSelectSection(section);
                }
              }}
              className="group cursor-pointer bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-amber-700/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200/60 flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={section.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-amber-800 text-xl font-serif">✞</span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                    {totalSectionPrayers} {isMl ? 'പ്രാർത്ഥനകൾ' : 'Prayers'}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors mb-1">
                  {section.name}
                </h3>

                <p className="text-xs text-stone-500 mb-4 line-clamp-1">
                  {section.subsections.map(s => s.title).join(' • ')}
                </p>
              </div>

              {/* Subsections Quick Pills */}
              <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-900/80 group-hover:text-amber-800 flex items-center gap-1">
                  {isMl ? 'വിഷയങ്ങൾ കാണുക' : 'Explore Topics'}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-[10px] text-stone-400">
                  {section.subsections.length} {isMl ? 'വിഷയങ്ങൾ' : 'topics'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
