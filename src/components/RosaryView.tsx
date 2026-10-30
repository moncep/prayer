import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, ChevronDown, ChevronUp, BookOpen, 
  ChevronRight
} from 'lucide-react';
import { ROSARY_MYSTERIES, COMMON_PRAYERS } from '../data/rosaryData';
import { ROSARY_MYSTERIES_ML, COMMON_PRAYERS_ML } from '../data/rosaryDataMalayalam';
import { RosaryMystery } from '../types/prayer';
import { RosaryCounter } from './RosaryCounter';

interface RosaryViewProps {
  onBack: () => void;
  onReadFullText: () => void;
  language?: 'en' | 'ml';
}

export const RosaryView: React.FC<RosaryViewProps> = ({ onBack, onReadFullText, language = 'en' }) => {
  const isMl = language === 'ml';
  const mysteriesList = isMl ? ROSARY_MYSTERIES_ML : ROSARY_MYSTERIES;
  const prayersObj = isMl ? COMMON_PRAYERS_ML : COMMON_PRAYERS;

  // Today's mystery
  const todayDay = new Date().getDay();
  const defaultMystery = mysteriesList.find(m => m.dayIndices.includes(todayDay)) || mysteriesList[0];

  const [selectedMystery, setSelectedMystery] = useState<RosaryMystery>(defaultMystery);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(1);

  if (isInteractiveMode) {
    return (
      <div className={`transition-page ${isMl ? 'font-malayalam' : ''}`}>
        <div className="bg-amber-950 text-amber-100 px-4 py-2 text-center text-xs border-b border-amber-900/60 flex items-center justify-between max-w-2xl mx-auto">
          <span>{isMl ? 'ഇന്ററാക്ടീവ് 53 മണി ജപം' : 'Interactive 53-Bead Counter Mode'}</span>
          <button
            onClick={() => setIsInteractiveMode(false)}
            className="text-amber-300 hover:text-white font-semibold underline text-xs"
          >
            {isMl ? '← വിഷയങ്ങളിലേക്കും പ്രാർത്ഥനകളിലേക്കും' : '← Back to Topics & Prayers'}
          </button>
        </div>
        <RosaryCounter
          onBack={() => setIsInteractiveMode(false)}
          onReadText={onReadFullText}
          language={language}
        />
      </div>
    );
  }

  const mainPrayersList = isMl
    ? [
        {
          id: 'sign',
          name: 'കുരിശടയാളം',
          latin: 'Signum Crucis',
          text: COMMON_PRAYERS_ML.signOfCross,
          timing: 'ആരംഭത്തിലും സമാപനത്തിലും',
        },
        {
          id: 'opening',
          name: 'ആരംഭ പ്രാർത്ഥന',
          latin: 'Opening Offering',
          text: COMMON_PRAYERS_ML.openingOffering,
          timing: 'ജപമാലയുടെ ആരംഭത്തിൽ',
        },
        {
          id: 'creed',
          name: 'വിശ്വാസപ്രമാണം',
          latin: 'Credo',
          text: COMMON_PRAYERS_ML.creed,
          timing: 'കുരിശിൽ തൊട്ട്',
        },
        {
          id: 'ourFather',
          name: 'സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ',
          latin: 'Pater Noster',
          text: COMMON_PRAYERS_ML.ourFather,
          timing: 'വലിയ മണികളിൽ',
        },
        {
          id: 'initialVirtues',
          name: 'ആരംഭ നന്മനിറഞ്ഞ മറിയമേ (3 പുണ്യങ്ങൾക്കായി)',
          latin: 'Preparatory Petitions',
          text: `1. ദൈവവിശ്വാസം: ${COMMON_PRAYERS_ML.initialHailMary1}\n\n2. ദൈവശരണം: ${COMMON_PRAYERS_ML.initialHailMary2}\n\n3. ദൈവസ്നേഹം: ${COMMON_PRAYERS_ML.initialHailMary3}`,
          timing: 'ആദ്യത്തെ 3 ചെറിയ മണികളിൽ',
        },
        {
          id: 'hailMary',
          name: 'നന്മനിറഞ്ഞ മറിയമേ',
          latin: 'Ave Maria',
          text: COMMON_PRAYERS_ML.hailMary,
          timing: '10 ചെറിയ മണികളിൽ',
        },
        {
          id: 'gloryBe',
          name: 'ത്രീത്വസ്തുതി',
          latin: 'Gloria Patri',
          text: COMMON_PRAYERS_ML.gloryBe,
          timing: 'ഓരോ രഹസ്യത്തിന്റെയും അവസാനം',
        },
        {
          id: 'fatima',
          name: 'ഫാത്തിമാ പ്രാർത്ഥന',
          latin: 'O My Jesus',
          text: COMMON_PRAYERS_ML.fatimaPrayer,
          timing: 'ത്രീത്വസ്തുതിക്ക് ശേഷം',
        },
        {
          id: 'litany',
          name: 'മാതാവിന്റെ ലുത്തിനിയ',
          latin: 'Litany of Loreto',
          text: COMMON_PRAYERS_ML.litany,
          timing: 'സമാപന ലുത്തിനിയ',
        },
        {
          id: 'salveRegina',
          name: 'പരിശുദ്ധ രാജ്ഞീ (Salve Regina)',
          latin: 'Hail Holy Queen',
          text: COMMON_PRAYERS_ML.hailHolyQueen,
          timing: 'ജപമാലയുടെ സമാപനത്തിൽ',
        },
        {
          id: 'memorare',
          name: 'എത്രയും ദയയുള്ള മാതാവേ',
          latin: 'Memorare',
          text: COMMON_PRAYERS_ML.memorare,
          timing: 'സമാപന മദ്ധ്യസ്ഥ പ്രാർത്ഥന',
        },
      ]
    : [
        {
          id: 'sign',
          name: 'Sign of the Cross',
          latin: 'Signum Crucis',
          text: prayersObj.signOfCross,
          timing: 'Opening & Closing',
        },
        {
          id: 'creed',
          name: "The Apostles' Creed",
          latin: 'Credo',
          text: prayersObj.creed,
          timing: 'At the Crucifix',
        },
        {
          id: 'ourFather',
          name: 'Our Father',
          latin: 'Pater Noster',
          text: prayersObj.ourFather,
          timing: 'On the Large Beads',
        },
        {
          id: 'hailMary',
          name: 'Hail Mary',
          latin: 'Ave Maria',
          text: prayersObj.hailMary,
          timing: 'On the 10 Decade Beads',
        },
        {
          id: 'gloryBe',
          name: 'Glory Be to the Father',
          latin: 'Gloria Patri',
          text: prayersObj.gloryBe,
          timing: 'After each Decade',
        },
        {
          id: 'fatima',
          name: 'The Fatima Prayer',
          latin: 'O My Jesus',
          text: prayersObj.fatimaPrayer,
          timing: 'After the Glory Be',
        },
        {
          id: 'salveRegina',
          name: 'Hail Holy Queen',
          latin: 'Salve Regina',
          text: prayersObj.hailHolyQueen,
          timing: 'At the Conclusion of the Rosary',
        },
      ];

  return (
    <div className={`max-w-3xl mx-auto px-4 py-6 transition-page pb-32 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isMl ? 'ഹോം' : 'Back to Home'}
        </button>

        <button
          onClick={onReadFullText}
          className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          {isMl ? 'ജപമാല പൂർണ്ണ രൂപം' : 'Full Rosary Guide Text'}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 rounded-3xl p-6 sm:p-7 shadow-xl border border-amber-800/40 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isMl ? 'വിശുദ്ധ ജപമാല • അൻപത്തിമൂന്നുമണി ജപം' : 'The Holy Rosary • Most Holy Devotion'}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-amber-100 mb-1">
            {selectedMystery.name}
          </h1>
          <p className="text-xs text-amber-200/80 font-prayer italic">
            {isMl 
              ? `${selectedMystery.days} ദിവസങ്ങളിൽ ചൊല്ലേണ്ടത് • 5 രഹസ്യ ധ്യാനങ്ങൾ` 
              : `Recited on ${selectedMystery.days} • 5 Decades of Meditation & Prayer`}
          </p>
        </div>
      </div>

      {/* Mystery Topics Selector (4 Mysteries) */}
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          {isMl ? 'രഹസ്യങ്ങൾ തിരഞ്ഞെടുക്കുക' : 'Select Mystery Topics'}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {mysteriesList.map((m) => {
            const isSelected = selectedMystery.id === m.id;
            const isToday = m.dayIndices.includes(todayDay);
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMystery(m);
                  setExpandedTopic(1);
                }}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-700 shadow-md font-semibold ring-2 ring-amber-500/30'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {isToday ? (isMl ? '★ ഇന്ന്' : '★ TODAY') : m.days.split('&')[0].trim()}
                  </span>
                </div>
                <div className="font-heading text-xs sm:text-sm font-bold truncate">
                  {isMl ? m.name.replace(' രഹസ്യങ്ങൾ', '') : m.name.replace('The ', '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: The 5 Rosary Topics (Decades) */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-stone-900">
              {selectedMystery.name}
            </h2>
            <p className="text-xs text-stone-500">
              {isMl ? 'ഈ രഹസ്യത്തിലെ 5 ധ്യാന വിഷയങ്ങളും ആത്മീയ ഫലങ്ങളും' : 'The 5 sacred meditations and fruits for this mystery'}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {isMl ? '5 രഹസ്യങ്ങൾ' : '5 Decades'}
          </span>
        </div>

        <div className="space-y-3">
          {selectedMystery.mysteries.map((meditation) => {
            const isExpanded = expandedTopic === meditation.number;
            return (
              <div
                key={meditation.number}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden transition-all hover:border-amber-300"
              >
                <div
                  onClick={() => setExpandedTopic(isExpanded ? null : meditation.number)}
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 group-hover:scale-105 transition-transform">
                      <img
                        src={meditation.image}
                        alt={meditation.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                          {isMl ? `രഹസ്യം ${meditation.number}` : `Decade ${meditation.number}`}
                        </span>
                        <span className="text-[11px] text-stone-500 hidden sm:inline">
                          {isMl ? 'ഫലം: ' : 'Fruit: '}<strong className="text-stone-700">{meditation.fruit}</strong>
                        </span>
                      </div>
                      <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {meditation.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-stone-400 font-medium hidden sm:inline">
                      {isExpanded ? (isMl ? 'മറയ്ക്കുക' : 'Hide') : (isMl ? 'കൂടുതൽ' : 'Details')}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-stone-100 bg-amber-50/20 text-xs sm:text-sm">
                    <div className="mb-2.5">
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                        {isMl ? 'തിരുവചന ധ്യാനം' : 'Scripture Meditation'}
                      </div>
                      <blockquote className="font-prayer italic text-stone-700 bg-white p-3 rounded-xl border border-stone-200/70 leading-relaxed">
                        "{meditation.scripture}"
                      </blockquote>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-stone-600">{isMl ? 'ആത്മീയ ഫലം:' : 'Spiritual Fruit:'}</span>
                      <span className="inline-block bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                        {meditation.fruit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Main Prayers on the Page */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-heading text-lg sm:text-xl font-bold text-stone-900">
              {isMl ? 'ജപമാലയിലെ പ്രധാന പ്രാർത്ഥനകൾ' : 'Main Prayers of the Rosary'}
            </h2>
            <p className="text-xs text-stone-500">
              {isMl ? 'ജപമാല ചൊല്ലുമ്പോൾ അനുക്രമമായി ചൊല്ലേണ്ട പ്രാർത്ഥനകൾ' : 'The essential prayers recited throughout the Holy Rosary'}
            </p>
          </div>
          <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
            {mainPrayersList.length} {isMl ? 'പ്രാർത്ഥനകൾ' : 'Prayers'}
          </span>
        </div>

        <div className="space-y-3">
          {mainPrayersList.map((prayer, index) => (
            <div
              key={prayer.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-heading text-base font-bold text-stone-900">
                    {prayer.name}
                  </h3>
                  <span className="text-[11px] italic text-stone-400 hidden sm:inline">
                    ({prayer.latin})
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  {prayer.timing}
                </span>
              </div>

              <p className="font-prayer text-stone-800 text-sm sm:text-base leading-relaxed pl-7 whitespace-pre-line">
                {prayer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prominent Interactive Rosary Button at Bottom */}
      <div className="mt-8 pt-4 border-t border-stone-200">
        <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-amber-50 rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-800/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/80 text-amber-300 text-xs font-bold mb-3 border border-amber-600/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMl ? '53 മണി ജപം • ഇന്ററാക്ടീവ് ബീഡ് കൗണ്ടർ' : 'Step-by-Step Bead Companion'}</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-white">
              {isMl ? 'ജപമാല ചൊല്ലുവാൻ തയ്യാറാണോ?' : 'Ready to Recite the Rosary?'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mb-5 font-prayer">
              {isMl 
                ? 'ഓരോ മണിയും സ്പർശിച്ച് പ്രാർത്ഥനകൾ അനുസ്മരിക്കാം, വിറയ്ക്കൽ/ഓഡിയോ സഹായത്തോടെ 5 രഹസ്യങ്ങളും പൂർത്തിയാക്കാം.' 
                : 'Follow along bead-by-bead with audio/vibration feedback, 5 decades counter, and today\'s mystery reflections.'}
            </p>
            
            <button
              onClick={() => setIsInteractiveMode(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-heading font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2.5 mx-auto"
            >
              <Sparkles className="w-5 h-5 text-stone-900" />
              <span>{isMl ? 'വിശുദ്ധ ജപമാല ആരംഭിക്കുക (53 മണി ജപം)' : 'Start Interactive Rosary (53 Beads)'}</span>
              <ChevronRight className="w-5 h-5 text-stone-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
