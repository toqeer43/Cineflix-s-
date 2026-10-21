import React from 'react';
import { ScreenType } from '../types';

interface NavigationProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  downloadCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeScreen,
  onNavigate,
  downloadCount = 2,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenType,
      label: 'Home',
      icon: 'home',
    },
    {
      id: 'new_hot' as ScreenType,
      label: 'New & Hot',
      icon: 'local_fire_department',
    },
    {
      id: 'downloads' as ScreenType,
      label: 'Downloads',
      icon: 'download_for_offline',
      badge: downloadCount > 0 ? downloadCount : undefined,
    },
    {
      id: 'profile' as ScreenType,
      label: 'Profile',
      icon: 'manage_accounts',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0e0e10]/90 backdrop-blur-xl border-t border-white/5 shadow-2xl">
      <div className="h-16 max-w-lg mx-auto flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-1 transition-colors ${
                isActive
                  ? 'text-[#e50914]'
                  : 'text-[#af8782] hover:text-[#e5e1e4]'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[16px] h-4 rounded-full bg-[#e50914] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-label-caps text-[10px] tracking-wider uppercase font-semibold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
