import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Copy, Check, Type, Eye, Sparkles
} from 'lucide-react';
import { Prayer, ReaderSettings, ReaderTheme } from '../types/prayer';

interface PrayerReaderProps {
  prayer: Prayer;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenRosaryInteractive?: () => void;
  language?: 'en' | 'ml';
}

export const PrayerReader: React.FC<PrayerReaderProps> = ({
  prayer,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onOpenRosaryInteractive,
  language = 'en',
}) => {
  const isMl = language === 'ml' || prayer.language === 'ml';

  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const saved = localStorage.getItem('pm_reader_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      fontSize: 18,
      theme: 'sepia',
      keepAwake: false,
      fontFamily: 'serif',
    };
  });

  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('pm_reader_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let wakeLockSentinel: any = null;
    const requestWakeLock = async () => {
      if (settings.keepAwake && 'wakeLock' in navigator) {
        try {
          wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        } catch (err) {
          console.warn('WakeLock not acquired:', err);
          setWakeLockActive(false);
        }
      }
    };

    if (settings.keepAwake) {
      requestWakeLock();
    } else if (wakeLockSentinel) {
      wakeLockSentinel.release().then(() => setWakeLockActive(false));
    }

    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release().then(() => setWakeLockActive(false));
      }
    };
  }, [settings.keepAwake]);

  const handleCopy = () => {
    const textToCopy = `${prayer.title}\n\n${prayer.content.replace(/<[^>]*>/g, '')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSeries = prayer.type === 'SERIES' && prayer.seriesDays && prayer.seriesDays.length > 0;
  const currentContent = isSeries 
    ? (prayer.seriesDays?.find(d => d.day === selectedDay)?.content || prayer.content)
    : prayer.content;

  const themeClasses: Record<ReaderTheme, { bg: string; text: string; bar: string; card: string; border: string }> = {
    light: {
      bg: 'bg-[#fffbf5]',
      text: 'text-stone-900',
      bar: 'bg-white/95 border-amber-200/70',
      card: 'bg-white shadow-sm border-stone-200',
      border: 'border-stone-200',
    },
    sepia: {
      bg: 'bg-[#f4ecd8]',
      text: 'text-[#382b1c]',
      bar: 'bg-[#ebe1c8]/95 border-[#dbcbb2]',
      card: 'bg-[#ece3ce] shadow-sm border-[#ded2bd]',
      border: 'border-[#dfd3be]',
    },
    dark: {
      bg: 'bg-[#121214]',
      text: 'text-stone-100',
      bar: 'bg-[#1a1a1e]/95 border-stone-800',
      card: 'bg-[#1c1c20] shadow-md border-stone-800',
      border: 'border-stone-800',
    },
  };

  const currentThemeStyle = themeClasses[settings.theme];

  return (
    <div className={`min-h-screen ${currentThemeStyle.bg} ${currentThemeStyle.text} transition-colors duration-200 pb-20 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Sticky Reader Bar */}
      <div className={`sticky top-0 z-20 ${currentThemeStyle.bar} backdrop-blur-md border-b px-4 py-2.5 transition-colors`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isMl ? 'പിന്നോട്ട്' : 'Back'}</span>
          </button>

          <div className="text-center truncate px-2 max-w-[200px] sm:max-w-xs">
            <span className="font-heading font-bold text-sm truncate block">
              {prayer.title}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400' 
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-75 hover:opacity-100'
              }`}
              title={isBookmarked ? 'Remove Favorite' : 'Add to Favorites'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 opacity-75 hover:opacity-100 transition-colors"
              title="Copy Prayer Text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full transition-colors ${
                showSettings ? 'bg-amber-800 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-75 hover:opacity-100'
              }`}
              title="Reader Settings"
            >
              <Type className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reader Customization Drawer */}
        {showSettings && (
          <div className={`mt-3 pt-3 border-t ${currentThemeStyle.border} max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs`}>
            <div>
              <div className="font-semibold mb-1.5 flex items-center justify-between opacity-80">
                <span>{isMl ? 'അക്ഷര വലിപ്പം' : 'Text Size'}</span>
                <span>{settings.fontSize}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(14, s.fontSize - 2) }))}
                  className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 font-bold"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="14"
                  max="32"
                  step="2"
                  value={settings.fontSize}
                  onChange={(e) => setSettings(s => ({ ...s, fontSize: Number(e.target.value) }))}
                  className="flex-1 accent-amber-800"
                />
                <button
                  onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(36, s.fontSize + 2) }))}
                  className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 font-bold text-base"
                >
                  A+
                </button>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-1.5 opacity-80">{isMl ? 'വായനാ രീതി' : 'Reading Theme'}</div>
              <div className="flex gap-1.5">
                {(['light', 'sepia', 'dark'] as ReaderTheme[]).map((thm) => (
                  <button
                    key={thm}
                    onClick={() => setSettings(s => ({ ...s, theme: thm }))}
                    className={`flex-1 py-1 px-2 rounded capitalize border font-medium transition-all ${
                      settings.theme === thm
                        ? 'border-amber-700 bg-amber-800 text-white font-bold shadow-sm'
                        : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 opacity-80'
                    }`}
                  >
                    {thm === 'light' ? (isMl ? 'വെളിച്ചം' : 'Light') : thm === 'sepia' ? (isMl ? 'സെപിയ' : 'Sepia') : (isMl ? 'ഇരുണ്ടത്' : 'Dark')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold mb-1.5 opacity-80">{isMl ? 'സവിശേഷതകൾ' : 'Preferences'}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (!isMl) {
                      setSettings(s => ({ ...s, fontFamily: s.fontFamily === 'serif' ? 'sans' : 'serif' }));
                    }
                  }}
                  className={`flex-1 py-1 px-2 rounded bg-black/5 dark:bg-white/10 font-medium truncate ${isMl ? 'cursor-default' : ''}`}
                >
                  {isMl ? 'ലിപി: Noto Serif' : (settings.fontFamily === 'serif' ? 'Font: Serif' : 'Font: Sans')}
                </button>
                <button
                  onClick={() => setSettings(s => ({ ...s, keepAwake: !s.keepAwake }))}
                  className={`py-1 px-2 rounded font-medium flex items-center gap-1 shrink-0 ${
                    settings.keepAwake ? 'bg-amber-800 text-white' : 'bg-black/5 dark:bg-white/10 opacity-70'
                  }`}
                  title="Prevent screen from turning off while praying"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {settings.keepAwake ? (isMl ? 'ഓൺ' : 'Awake') : (isMl ? 'ഓഫ്' : 'Normal')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {prayer.type === 'FIFTYTHREE' && onOpenRosaryInteractive && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-950 text-amber-50 shadow-xl border border-amber-700/50 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                <Sparkles className="w-4 h-4" />
                {isMl ? 'ഇന്ററാക്ടീവ് ജപമാല' : 'Interactive Rosary Companion'}
              </div>
              <h4 className="font-heading text-lg font-bold">{isMl ? '53 മണി ജപം ചൊല്ലുക' : 'Recite with 53-Bead Counter'}</h4>
              <p className="text-xs text-amber-200/80">{isMl ? 'ഓരോ മണിയും തൊട്ട് രഹസ്യങ്ങൾ ധ്യാനിക്കാം.' : 'Track mysteries, decades, and scriptures bead by bead.'}</p>
            </div>
            <button
              onClick={onOpenRosaryInteractive}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs uppercase tracking-wider shadow transition-all shrink-0 active:scale-95"
            >
              {isMl ? 'ആരംഭിക്കുക' : 'Start Rosary'}
            </button>
          </div>
        )}

        {isSeries && prayer.seriesDays && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold mb-2 opacity-80">
              <span>{isMl ? `നൊവേന ദിവസങ്ങൾ (${prayer.seriesDays.length} ദിവസങ്ങൾ)` : `Novena Days (${prayer.seriesDays.length} Days)`}</span>
              <span>{isMl ? `തിരഞ്ഞെടുത്തത്: ദിവസം ${selectedDay}` : `Selected: Day ${selectedDay}`}</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {prayer.seriesDays.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`min-w-[44px] h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all ${
                    selectedDay === d.day
                      ? 'bg-amber-800 text-white shadow-md scale-105'
                      : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 opacity-70'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider opacity-75">{isMl ? 'ദി' : 'Day'}</span>
                  <span>{d.day}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="text-3xl font-serif text-amber-800/60 dark:text-amber-400/60 mb-2">
            ✞
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold opacity-60">
            {prayer.sectionName} • {prayer.subSectionTitle}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-1 mb-3">
            {isSeries ? `${prayer.title} - ${isMl ? 'ദിവസം' : 'Day'} ${selectedDay}` : prayer.title}
          </h1>
          <div className="w-16 h-0.5 bg-amber-700/40 mx-auto rounded-full"></div>
        </div>

        <article
          className={`prayer-content leading-relaxed transition-all ${
            isMl 
              ? 'font-malayalam'
              : (settings.fontFamily === 'serif' ? 'font-prayer' : 'font-sans')
          }`}
          style={{ fontSize: `${settings.fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: currentContent }}
        />

        <div className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 text-center text-xs opacity-60 font-serif italic">
          {isMl ? 'ദൈവിക സഹായം എപ്പോഴും നമ്മോടുകൂടെ ഉണ്ടായിരിക്കട്ടെ. ആമേൻ.' : 'May the divine assistance remain always with us. Amen.'}
        </div>
      </main>
    </div>
  );
};
