import React from 'react';
import { Search, Bookmark, Languages } from 'lucide-react';

interface HeaderProps {
  currentLanguage: 'en' | 'ml';
  onLanguageToggle: () => void;
  onSearchClick: () => void;
  onFavoritesClick: () => void;
  onHomeClick: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageToggle,
  onSearchClick,
  onFavoritesClick,
  onHomeClick,
  favoritesCount,
}) => {
  const isMalayalam = currentLanguage === 'ml';

  return (
    <header className="sticky top-0 z-30 bg-amber-950/95 backdrop-blur-md text-amber-50 border-b border-amber-800/40 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-2.5 text-left group transition-all hover:opacity-90"
        >
          <img src="/cross.svg" alt="Cross" className="w-8 h-8 drop-shadow-md group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading tracking-wide text-base sm:text-lg font-bold text-amber-100">
                {isMalayalam ? 'പ്രാർത്ഥനാ മഞ്ജരി' : 'Prarthana Manjari'}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-800/70 text-amber-200 border border-amber-600/30">
                {isMalayalam ? 'മലയാളം' : 'English'}
              </span>
            </div>
            <p className="text-[11px] text-amber-300/80 -mt-0.5 font-light">
              {isMalayalam ? 'കത്തോലിക്കാ പ്രാർത്ഥനകൾ' : 'Catholic Prayers & Devotions'}
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle Button */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600/50 transition-all shadow-sm active:scale-95"
            title={isMalayalam ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറ്റുക'}
          >
            <Languages className="w-3.5 h-3.5 text-amber-300" />
            <span className={isMalayalam ? 'font-bold text-white' : 'text-amber-300'}>
              {isMalayalam ? 'മലയാളം' : 'ENG'}
            </span>
            <span className="text-amber-500/80 text-[10px]">⇄</span>
            <span className="text-amber-300/70 text-[11px]">
              {isMalayalam ? 'ENG' : 'മലയാളം'}
            </span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-amber-900/70 text-amber-200 hover:text-white transition-colors"
            title={isMalayalam ? 'തിരയുക' : 'Search prayers'}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Trigger */}
          <button
            onClick={onFavoritesClick}
            className="relative p-2 rounded-full hover:bg-amber-900/70 text-amber-200 hover:text-white transition-colors"
            title={isMalayalam ? 'പ്രിയപ്പെട്ടവ' : 'Favorite prayers'}
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
