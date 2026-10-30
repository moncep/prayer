import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import { ROSARY_MYSTERIES, COMMON_PRAYERS } from '../data/rosaryData';
import { ROSARY_MYSTERIES_ML, COMMON_PRAYERS_ML } from '../data/rosaryDataMalayalam';
import { RosaryMystery } from '../types/prayer';

interface RosaryCounterProps {
  onBack: () => void;
  onReadText: () => void;
  language?: 'en' | 'ml';
}

export const RosaryCounter: React.FC<RosaryCounterProps> = ({ onBack, onReadText, language = 'en' }) => {
  const isMl = language === 'ml';
  const mysteriesList = isMl ? ROSARY_MYSTERIES_ML : ROSARY_MYSTERIES;
  const prayersObj = isMl ? COMMON_PRAYERS_ML : COMMON_PRAYERS;

  // Determine today's default mystery
  const todayDay = new Date().getDay(); // 0 = Sun, 1 = Mon ...
  const defaultMystery = mysteriesList.find(m => m.dayIndices.includes(todayDay)) || mysteriesList[0];

  const [selectedMystery, setSelectedMystery] = useState<RosaryMystery>(defaultMystery);
  const [currentDecadeIndex, setCurrentDecadeIndex] = useState<number>(0); // 0 to 4 (5 decades)
  const [decadeStep, setDecadeStep] = useState<number>(0); 
  const [stage, setStage] = useState<'intro' | 'decades' | 'conclusion'>('intro');
  const [introStep, setIntroStep] = useState<number>(0);
  const [conclusionStep, setConclusionStep] = useState<number>(0);

  // Gentle haptic feedback
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch (e) {
        // ignore
      }
    }
  };

  const handleNext = () => {
    triggerHaptic();
    if (stage === 'intro') {
      if (introStep < 6) {
        setIntroStep(introStep + 1);
      } else {
        setStage('decades');
        setCurrentDecadeIndex(0);
        setDecadeStep(0);
      }
    } else if (stage === 'decades') {
      if (decadeStep < 11) {
        setDecadeStep(decadeStep + 1);
      } else {
        if (currentDecadeIndex < 4) {
          setCurrentDecadeIndex(currentDecadeIndex + 1);
          setDecadeStep(0);
        } else {
          setStage('conclusion');
          setConclusionStep(0);
        }
      }
    } else if (stage === 'conclusion') {
      if (isMl && conclusionStep < 2) {
        setConclusionStep(conclusionStep + 1);
      } else {
        handleReset();
      }
    }
  };

  const handlePrev = () => {
    triggerHaptic();
    if (stage === 'conclusion') {
      if (isMl && conclusionStep > 0) {
        setConclusionStep(conclusionStep - 1);
      } else {
        setStage('decades');
        setCurrentDecadeIndex(4);
        setDecadeStep(11);
      }
    } else if (stage === 'decades') {
      if (decadeStep > 0) {
        setDecadeStep(decadeStep - 1);
      } else if (currentDecadeIndex > 0) {
        setCurrentDecadeIndex(currentDecadeIndex - 1);
        setDecadeStep(11);
      } else {
        setStage('intro');
        setIntroStep(6);
      }
    } else if (stage === 'intro') {
      if (introStep > 0) {
        setIntroStep(introStep - 1);
      }
    }
  };

  const handleReset = () => {
    triggerHaptic();
    setStage('intro');
    setIntroStep(0);
    setCurrentDecadeIndex(0);
    setDecadeStep(0);
    setConclusionStep(0);
  };

  const currentMeditation = selectedMystery.mysteries[currentDecadeIndex];

  const getCurrentPrayer = () => {
    if (stage === 'intro') {
      if (isMl) {
        switch (introStep) {
          case 0:
            return {
              title: 'കുരിശടയാളം & ആരംഭ സമർപ്പണം',
              text: `${COMMON_PRAYERS_ML.signOfCross}\n\n${COMMON_PRAYERS_ML.openingOffering}`,
              type: 'ആരംഭ പ്രാർത്ഥന'
            };
          case 1:
            return {
              title: 'വിശ്വാസപ്രമാണം',
              text: COMMON_PRAYERS_ML.creed,
              type: 'വിശ്വാസ പ്രഖ്യാപനം'
            };
          case 2:
            return {
              title: 'സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ',
              text: COMMON_PRAYERS_ML.ourFather,
              type: '1 സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ'
            };
          case 3:
            return {
              title: 'നന്മനിറഞ്ഞ മറിയമേ (1/3) - ദൈവവിശ്വാസം',
              text: `${COMMON_PRAYERS_ML.initialHailMary1}\n\n${COMMON_PRAYERS_ML.hailMary}`,
              type: 'ദൈവവിശ്വാസം ഫലവത്താകുവാൻ'
            };
          case 4:
            return {
              title: 'നന്മനിറഞ്ഞ മറിയമേ (2/3) - ദൈവശരണം',
              text: `${COMMON_PRAYERS_ML.initialHailMary2}\n\n${COMMON_PRAYERS_ML.hailMary}`,
              type: 'ദൈവശരണത്തിൽ വളരുവാൻ'
            };
          case 5:
            return {
              title: 'നന്മനിറഞ്ഞ മറിയമേ (3/3) - ദൈവസ്നേഹം',
              text: `${COMMON_PRAYERS_ML.initialHailMary3}\n\n${COMMON_PRAYERS_ML.hailMary}`,
              type: 'ദൈവസ്നേഹം വർദ്ധിക്കുവാൻ'
            };
          case 6:
            return {
              title: 'ത്രീത്വസ്തുതി',
              text: COMMON_PRAYERS_ML.gloryBe,
              type: 'സ്തോത്രഗീതം (1 ത്രീത്വസ്തുതി)'
            };
          default:
            return { title: 'ആരംഭം', text: '', type: '' };
        }
      } else {
        switch (introStep) {
          case 0:
            return {
              title: 'Sign of the Cross',
              text: prayersObj.signOfCross,
              type: 'Opening Prayer'
            };
          case 1:
            return {
              title: "Apostles' Creed",
              text: prayersObj.creed,
              type: 'Profession of Faith'
            };
          case 2:
            return {
              title: 'Our Father',
              text: prayersObj.ourFather,
              type: "For the Pope's Intentions"
            };
          case 3:
            return {
              title: 'Hail Mary (1 of 3)',
              text: prayersObj.hailMary,
              type: 'For the Increase of Faith'
            };
          case 4:
            return {
              title: 'Hail Mary (2 of 3)',
              text: prayersObj.hailMary,
              type: 'For the Increase of Hope'
            };
          case 5:
            return {
              title: 'Hail Mary (3 of 3)',
              text: prayersObj.hailMary,
              type: 'For the Increase of Charity'
            };
          case 6:
            return {
              title: 'Glory Be',
              text: prayersObj.gloryBe,
              type: 'Doxology'
            };
          default:
            return { title: 'Opening', text: '', type: '' };
        }
      }
    }

    if (stage === 'conclusion') {
      if (isMl) {
        if (conclusionStep === 0) {
          return {
            title: 'മാതാവിന്റെ ലുത്തിനിയ (Litany of Loreto)',
            text: COMMON_PRAYERS_ML.litany,
            type: 'സമാപന ലുത്തിനിയ (1/3)'
          };
        } else if (conclusionStep === 1) {
          return {
            title: 'പരിശുദ്ധ രാജ്ഞീ (Salve Regina)',
            text: COMMON_PRAYERS_ML.hailHolyQueen,
            type: 'സമാപന പ്രാർത്ഥന (2/3)'
          };
        } else {
          return {
            title: 'എത്രയും ദയയുള്ള മാതാവേ (Memorare)',
            text: COMMON_PRAYERS_ML.memorare,
            type: 'സമാപന മദ്ധ്യസ്ഥ പ്രാർത്ഥന (3/3)'
          };
        }
      } else {
        return {
          title: 'Hail Holy Queen (Salve Regina)',
          text: prayersObj.hailHolyQueen,
          type: 'Closing Consecration'
        };
      }
    }

    // Decades stage
    if (decadeStep === 0) {
      return {
        title: isMl
          ? `രഹസ്യം ${currentDecadeIndex + 1}: സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ`
          : `Decade ${currentDecadeIndex + 1}: Our Father`,
        text: prayersObj.ourFather,
        type: isMl ? 'കർത്തൃപ്രാർത്ഥന' : "Lord's Prayer"
      };
    } else if (decadeStep >= 1 && decadeStep <= 10) {
      return {
        title: isMl
          ? `നന്മനിറഞ്ഞ മറിയമേ (മണി ${decadeStep}/10)`
          : `Hail Mary (Bead ${decadeStep} of 10)`,
        text: prayersObj.hailMary,
        type: isMl ? `രഹസ്യം ${currentDecadeIndex + 1}` : `Decade ${currentDecadeIndex + 1}`
      };
    } else {
      return {
        title: isMl ? 'ത്രീത്വസ്തുതി & ഫാത്തിമാ പ്രാർത്ഥന' : 'Glory Be & Fatima Prayer',
        text: `${prayersObj.gloryBe}\n\n${prayersObj.fatimaPrayer}`,
        type: isMl ? `രഹസ്യം ${currentDecadeIndex + 1} സമാപനം` : `Decade ${currentDecadeIndex + 1} Conclusion`
      };
    }
  };

  const currentPrayerInfo = getCurrentPrayer();

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 transition-page pb-24 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {isMl ? 'പിന്നോട്ട്' : 'Back'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onReadText}
            className="flex items-center gap-1 text-xs font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200 px-2.5 py-1.5 rounded-full transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {isMl ? 'പൂർണ്ണ രൂപം' : 'Full Text'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-full transition-colors"
            title="Reset Rosary"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isMl ? 'ആദ്യം മുതൽ' : 'Reset'}
          </button>
        </div>
      </div>

      {/* Mystery Selector Tabs */}
      <div className="bg-stone-100 p-1.5 rounded-2xl flex gap-1 mb-5 overflow-x-auto shadow-inner">
        {mysteriesList.map((m) => {
          const isSelected = selectedMystery.id === m.id;
          const isToday = m.dayIndices.includes(todayDay);
          return (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMystery(m);
                handleReset();
              }}
              className={`flex-1 min-w-[100px] py-2 px-2.5 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-amber-900 text-amber-50 shadow-md font-semibold'
                  : 'text-stone-600 hover:bg-stone-200/70 text-xs'
              }`}
            >
              <div className="text-[11px] font-heading truncate">
                {isMl ? m.name.replace(' രഹസ്യങ്ങൾ', '') : m.name.replace('The ', '').replace(' Mysteries', '')}
              </div>
              <div className="text-[9px] opacity-75 truncate">
                {isToday ? (isMl ? '★ ഇന്ന്' : '★ Today') : m.days.split('&')[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mystery Banner & Artwork */}
      {stage === 'decades' && currentMeditation && (
        <div className="bg-gradient-to-br from-amber-900 to-stone-900 text-amber-50 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl border border-amber-800/40 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border-2 border-amber-400/40 shadow-inner bg-stone-800">
            <img
              src={currentMeditation.image}
              alt={currentMeditation.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-[11px] uppercase tracking-wider text-amber-300 font-bold mb-1">
              {isMl ? `രഹസ്യം ${currentDecadeIndex + 1} / 5 • ${selectedMystery.name}` : `Decade ${currentDecadeIndex + 1} of 5 • ${selectedMystery.name}`}
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold leading-snug mb-1.5 text-amber-100">
              {currentMeditation.title}
            </h3>
            <p className="text-xs text-amber-200/90 italic font-prayer mb-2 leading-relaxed">
              "{currentMeditation.scripture}"
            </p>
            <div className="inline-block text-[11px] bg-amber-800/60 text-amber-300 font-medium px-2.5 py-0.5 rounded-full border border-amber-600/30">
              {isMl ? 'ആത്മീയ ഫലം: ' : 'Spiritual Fruit: '}<span className="text-white font-semibold">{currentMeditation.fruit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Visual Bead Progress Tracker */}
      {stage === 'decades' && (
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 mb-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2.5">
            <span className="font-semibold text-stone-700">
              {isMl ? `രഹസ്യം ${currentDecadeIndex + 1} പുരോഗതി` : `Decade ${currentDecadeIndex + 1} Progression`}
            </span>
            <span>
              {decadeStep === 0 
                ? (isMl ? 'സ്വർഗ്ഗസ്ഥനായ' : 'Our Father') 
                : decadeStep <= 10 
                ? (isMl ? `നന്മനിറഞ്ഞ മറിയമേ ${decadeStep}/10` : `Hail Mary ${decadeStep}/10`) 
                : (isMl ? 'ത്രീത്വസ്തുതി' : 'Glory Be')}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 sm:gap-1.5">
            {/* Our Father Bead */}
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all shadow-sm ${
                decadeStep === 0
                  ? 'bg-amber-600 text-white ring-4 ring-amber-300 scale-110'
                  : decadeStep > 0
                  ? 'bg-amber-800 text-amber-100'
                  : 'bg-stone-200 text-stone-500'
              }`}
              title="Our Father"
            >
              {isMl ? 'പി' : 'OF'}
            </div>

            {/* 10 Hail Mary Beads */}
            {Array.from({ length: 10 }).map((_, i) => {
              const beadNum = i + 1;
              const isCurrent = decadeStep === beadNum;
              const isDone = decadeStep > beadNum;
              return (
                <div
                  key={i}
                  className={`flex-1 h-5 sm:h-6 rounded-full flex items-center justify-center text-[9px] font-semibold transition-all ${
                    isCurrent
                      ? 'bg-sky-600 text-white ring-4 ring-sky-200 scale-110 shadow-md font-bold'
                      : isDone
                      ? 'bg-sky-800 text-sky-100'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                  title={`Hail Mary ${beadNum}`}
                >
                  {beadNum}
                </div>
              );
            })}

            {/* Glory Be Bead */}
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all shadow-sm ${
                decadeStep === 11
                  ? 'bg-amber-600 text-white ring-4 ring-amber-300 scale-110'
                  : 'bg-stone-200 text-stone-500'
              }`}
              title="Glory Be"
            >
              {isMl ? 'സ്തു' : 'GB'}
            </div>
          </div>
        </div>
      )}

      {/* Active Prayer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/90 text-center relative overflow-hidden mb-6">
        <div className="absolute top-2 right-4 text-stone-100 pointer-events-none select-none text-7xl font-serif">
          ✞
        </div>

        <span className="inline-block text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 mb-2">
          {currentPrayerInfo.type}
        </span>

        <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 mb-4">
          {currentPrayerInfo.title}
        </h2>

        <div className="font-prayer text-base sm:text-lg text-stone-800 leading-relaxed max-w-lg mx-auto whitespace-pre-line text-left bg-amber-50/30 p-4 sm:p-6 rounded-2xl border border-amber-100/70">
          {currentPrayerInfo.text}
        </div>
      </div>

      {/* Navigation Bead Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={stage === 'intro' && introStep === 0}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 font-semibold text-sm flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
          {isMl ? 'മുമ്പത്തെ മണി' : 'Previous Bead'}
        </button>

        <button
          onClick={handleNext}
          className="flex-[2] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 transition-all"
        >
          <span>
            {stage === 'conclusion' 
              ? (isMl 
                  ? (conclusionStep < 2 ? 'അടുത്ത സമാപന പ്രാർത്ഥന' : 'ജപമാല സമാപിക്കുക') 
                  : 'Finish Rosary') 
              : (isMl ? 'അടുത്ത മണി' : 'Next Bead')}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Decades Quick Selector */}
      {stage === 'decades' && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-xs text-stone-500 font-medium">{isMl ? 'രഹസ്യം:' : 'Go to Decade:'}</span>
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                triggerHaptic();
                setCurrentDecadeIndex(idx);
                setDecadeStep(0);
              }}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                currentDecadeIndex === idx
                  ? 'bg-amber-900 text-white scale-110 shadow'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
