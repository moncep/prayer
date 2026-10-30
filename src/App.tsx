import React, { useState, useEffect } from 'react';
import englishDataRaw from './data/english_prayers.json';
import malayalamDataRaw from './data/malayalam_prayers.json';
import { PrayerDataset, Section, Prayer } from './types/prayer';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { PrayerReader } from './components/PrayerReader';
import { RosaryView } from './components/RosaryView';
import { FavoritesView } from './components/FavoritesView';
import { SearchView } from './components/SearchView';
import { Home, Sparkles, Bookmark, Search } from 'lucide-react';

const englishData = englishDataRaw as unknown as PrayerDataset;
const malayalamData = malayalamDataRaw as unknown as PrayerDataset;

type ViewType = 'home' | 'category' | 'reader' | 'rosary' | 'favorites';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ml'>(() => {
    try {
      const saved = localStorage.getItem('pm_language');
      if (saved === 'en' || saved === 'ml') {
        return saved;
      }
    } catch (e) {
      // fallback
    }
    return 'en';
  });

  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);

  // Active dataset based on language
  const activeDataset = currentLanguage === 'ml' ? malayalamData : englishData;
  const isMl = currentLanguage === 'ml';

  useEffect(() => {
    localStorage.setItem('pm_language', currentLanguage);
  }, [currentLanguage]);

  // Bookmarks stored in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pm_bookmarks');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      // fallback
    }
    return new Set<string>();
  });

  useEffect(() => {
    localStorage.setItem('pm_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLanguageToggle = () => {
    const nextLang = currentLanguage === 'en' ? 'ml' : 'en';
    setCurrentLanguage(nextLang);
    setActiveView('home');
    setSelectedSection(null);
    setSelectedPrayer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (section: Section) => {
    setSelectedSection(section);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubSection = (section: Section, subSectionId: string) => {
    setSelectedSection(section);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPrayer = (prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRosary = () => {
    setActiveView('rosary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRosaryFullText = () => {
    const rosaryPrayer = activeDataset.prayers.find(p => p.type === 'FIFTYTHREE') || activeDataset.prayers[0];
    setSelectedPrayer(rosaryPrayer);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveView('home');
    setSelectedSection(null);
    setSelectedPrayer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-amber-50/20 text-stone-900 ${isMl ? 'font-malayalam' : ''}`}>
      {/* Top Header with Live Bilingual Switcher */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageToggle={handleLanguageToggle}
        onSearchClick={() => setSearchOpen(true)}
        onFavoritesClick={() => setActiveView('favorites')}
        onHomeClick={handleGoHome}
        favoritesCount={bookmarkedIds.size}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        {activeView === 'home' && (
          <HomeView
            sections={activeDataset.sections}
            onSelectSection={handleSelectSection}
            onSelectSubSection={handleSelectSubSection}
            onSelectPrayer={handleSelectPrayer}
            onStartRosary={handleStartRosary}
            allPrayers={activeDataset.prayers}
            language={currentLanguage}
          />
        )}

        {activeView === 'category' && selectedSection && (
          <CategoryView
            section={selectedSection}
            onBack={handleGoHome}
            onSelectPrayer={handleSelectPrayer}
            onStartRosary={handleStartRosary}
            allPrayers={activeDataset.prayers}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            language={currentLanguage}
          />
        )}

        {activeView === 'reader' && selectedPrayer && (
          <PrayerReader
            prayer={selectedPrayer}
            onBack={() => {
              if (selectedSection) {
                setActiveView('category');
              } else {
                setActiveView('home');
              }
            }}
            isBookmarked={bookmarkedIds.has(selectedPrayer.id)}
            onToggleBookmark={() => toggleBookmark(selectedPrayer.id)}
            onOpenRosaryInteractive={handleStartRosary}
            language={currentLanguage}
          />
        )}

        {activeView === 'rosary' && (
          <RosaryView
            onBack={handleGoHome}
            onReadFullText={handleRosaryFullText}
            language={currentLanguage}
          />
        )}

        {activeView === 'favorites' && (
          <FavoritesView
            onBack={handleGoHome}
            onSelectPrayer={handleSelectPrayer}
            onStartRosary={handleStartRosary}
            allPrayers={activeDataset.prayers}
            bookmarkedIds={bookmarkedIds}
            onRemoveBookmark={toggleBookmark}
            language={currentLanguage}
          />
        )}
      </div>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-3 inset-x-0 z-30 max-w-sm mx-auto px-3">
        <div className="bg-stone-900/90 backdrop-blur-md text-stone-300 rounded-full px-4 py-2 border border-stone-700/60 shadow-2xl flex items-center justify-around">
          <button
            onClick={handleGoHome}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              activeView === 'home' || activeView === 'category' ? 'text-amber-400' : 'hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{isMl ? 'പ്രാർത്ഥനകൾ' : 'Prayers'}</span>
          </button>

          <button
            onClick={handleStartRosary}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              activeView === 'rosary' ? 'text-amber-400' : 'hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isMl ? 'ജപമാല' : 'Rosary'}</span>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[10px] font-semibold hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{isMl ? 'തിരയുക' : 'Search'}</span>
          </button>

          <button
            onClick={() => setActiveView('favorites')}
            className={`relative flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
              activeView === 'favorites' ? 'text-amber-400' : 'hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isMl ? 'പ്രിയപ്പെട്ടവ' : 'Favorites'}</span>
            {bookmarkedIds.size > 0 && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-400"></span>
            )}
          </button>
        </div>
      </nav>

      {/* Global Search Modal */}
      {searchOpen && (
        <SearchView
          onClose={() => setSearchOpen(false)}
          onSelectPrayer={handleSelectPrayer}
          onStartRosary={handleStartRosary}
          allPrayers={activeDataset.prayers}
          language={currentLanguage}
        />
      )}
    </div>
  );
}
