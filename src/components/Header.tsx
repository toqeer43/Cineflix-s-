import React from 'react';
import { currentUser } from '../data/mockData';

interface HeaderProps {
  variant?: 'home' | 'stack';
  title?: string;
  onBack?: () => void;
  onOpenSearch: () => void;
  onOpenCast: () => void;
  onOpenProfile: () => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  isCasting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'home',
  title = 'Title Details',
  onBack,
  onOpenSearch,
  onOpenCast,
  onOpenProfile,
  activeCategory = 'all',
  onSelectCategory,
  isCasting = false,
}) => {
  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1VjZtfP-HRnlgFzaQxHWmYQutfTivVI_GnhsO4Ma3z4Go_it6M82GR09jWx8SJ8686UvldIEftQTJ3N9RaRa5oSWpEgdDxH8Pdti9hz3TWGgBfkKpxcrxFCg1mrT-S4mPL8wJNDy96PTzn4iXnEpualoLzAMrhGxpFITDLQ6EKJJLqAxS9Q790Xnoau-7X-c1Xoaw10solkMKoDCc20AIDrNeG9uxse3OyYRNTzqdBHcfcZAYh-G4t7ig';

  if (variant === 'stack') {
    return (
      <header className="fixed top-0 inset-x-0 z-40 pt-safe bg-[#0e0e10]/85 backdrop-blur-xl border-b border-white/5">
        <div className="h-14 flex items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 min-w-0">
            {onBack && (
              <button
                aria-label="Go back"
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#e5e1e4] hover:bg-[#2a2a2c] active:scale-95 transition-all shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
              </button>
            )}
            <img
              alt="CineFlix Logo"
              className="h-7 w-auto object-contain cursor-pointer shrink-0"
              src={logoUrl}
              onClick={onBack}
            />
            <h1 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4] truncate max-w-[200px] sm:max-w-md">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              aria-label="Cast to Screen"
              onClick={onOpenCast}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isCasting ? 'text-[#ffb4aa] bg-[#e50914]/20' : 'text-[#e9bcb6] hover:text-[#e5e1e4] active:bg-[#2a2a2c]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">cast</span>
              {isCasting && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
              )}
            </button>
            <button
              aria-label="Search"
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#e9bcb6] hover:text-[#e5e1e4] active:bg-[#2a2a2c] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <button
              aria-label="Profile"
              onClick={onOpenProfile}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              type="button"
            >
              <img
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#e50914]/70"
                src={currentUser.avatar}
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Home Variant
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'series', label: 'Series' },
    { id: 'films', label: 'Films' },
    { id: 'categories', label: 'Categories' },
    { id: 'my-list', label: 'My List' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 pt-safe bg-[#0e0e10]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 pb-2">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 cursor-pointer">
            <img alt="CineFlix Logo" className="h-8 w-auto object-contain" src={logoUrl} />
            <span className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              CineFlix
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Cast to Screen"
              onClick={onOpenCast}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isCasting ? 'text-[#ffb4aa] bg-[#e50914]/20' : 'text-[#e9bcb6] hover:text-[#e5e1e4] active:bg-[#2a2a2c]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">cast</span>
              {isCasting && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
              )}
            </button>
            <button
              aria-label="Search"
              onClick={onOpenSearch}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#e9bcb6] hover:text-[#e5e1e4] active:bg-[#2a2a2c] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <button
              aria-label="Profile"
              onClick={onOpenProfile}
              className="w-10 h-10 flex items-center justify-center rounded-full"
              type="button"
            >
              <img
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#e50914]/70"
                src={currentUser.avatar}
                referrerPolicy="no-referrer"
              />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#e50914] text-white font-semibold shadow-lg shadow-[#e50914]/30'
                    : 'bg-[#2a2a2c]/80 backdrop-blur-md text-[#e5e1e4] hover:bg-[#353437]'
                }`}
                type="button"
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
