import React, { useState } from 'react';
import { TitleItem } from '../types';
import { cineFlixOriginals, top10Trending } from '../data/mockData';

interface NewAndHotScreenProps {
  onSelectTitle: (title: TitleItem) => void;
  onPlayTitle: (title: TitleItem) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const NewAndHotScreen: React.FC<NewAndHotScreenProps> = ({
  onSelectTitle,
  onPlayTitle,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'coming_soon' | 'everyone_watching' | 'top_10'>('coming_soon');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string, title: string) => {
    setReminders((prev) => {
      const next = !prev[id];
      onShowToast(
        next ? `Reminder set for ${title}` : `Reminder removed for ${title}`,
        next ? 'notifications_active' : 'notifications_off'
      );
      return { ...prev, [id]: next };
    });
  };

  const upcomingList = [
    {
      id: 'up-1',
      date: 'Coming Friday',
      month: 'OCT',
      day: '24',
      item: cineFlixOriginals[0], // Kingdom of Ash
      tagline: 'The Throne Calls for Dragon Blood',
    },
    {
      id: 'up-2',
      date: 'Coming Next Week',
      month: 'OCT',
      day: '31',
      item: top10Trending[1], // Abyssal Ruin
      tagline: 'Some Ancients Should Stay Frozen',
    },
    {
      id: 'up-3',
      date: 'November 8',
      month: 'NOV',
      day: '08',
      item: cineFlixOriginals[1], // Sector 9
      tagline: 'When Memories Lie, The City Burns',
    },
  ];

  return (
    <div className="flex flex-col w-full text-on-surface pt-16 pb-24 max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('coming_soon')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'coming_soon'
              ? 'bg-[#e50914] text-white font-semibold'
              : 'bg-[#201f22] text-[#e5e1e4] hover:bg-[#2a2a2c]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          Worth the Wait
        </button>

        <button
          onClick={() => setActiveTab('everyone_watching')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'everyone_watching'
              ? 'bg-[#e50914] text-white font-semibold'
              : 'bg-[#201f22] text-[#e5e1e4] hover:bg-[#2a2a2c]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
          Everyone&apos;s Watching
        </button>

        <button
          onClick={() => setActiveTab('top_10')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'top_10'
              ? 'bg-[#e50914] text-white font-semibold'
              : 'bg-[#201f22] text-[#e5e1e4] hover:bg-[#2a2a2c]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">military_tech</span>
          Top 10 Series &amp; Films
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6 px-4 pt-4">
        {activeTab === 'coming_soon' && (
          <div className="flex flex-col gap-8">
            {upcomingList.map((entry) => {
              const isReminded = !!reminders[entry.id];
              return (
                <div key={entry.id} className="flex gap-4">
                  {/* Date Column */}
                  <div className="flex flex-col items-center shrink-0 w-12 pt-1">
                    <span className="font-label-caps text-xs text-[#ffb4aa] uppercase font-bold">
                      {entry.month}
                    </span>
                    <span className="font-headline-lg text-2xl font-bold text-white leading-tight">
                      {entry.day}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 rounded-2xl overflow-hidden bg-[#1c1b1e] border border-white/5 shadow-xl">
                    <div className="relative w-full aspect-video overflow-hidden group">
                      <img
                        src={entry.item.backdropImage}
                        alt={entry.item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#e50914] text-white font-label-caps text-[10px] font-bold">
                        {entry.date}
                      </div>
                      <button
                        onClick={() => onPlayTitle(entry.item)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[28px] text-[#ffb4aa]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </button>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-headline-md text-xl font-bold text-white">
                            {entry.item.title}
                          </h3>
                          <span className="text-xs text-[#ffba3e] font-semibold">{entry.tagline}</span>
                        </div>
                        <button
                          onClick={() => toggleReminder(entry.id, entry.item.title)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                            isReminded
                              ? 'bg-[#e50914] border-[#e50914] text-white'
                              : 'bg-[#2a2a2c] border-white/10 text-white hover:bg-[#353437]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isReminded ? 'notifications_active' : 'notifications'}
                          </span>
                          <span>{isReminded ? 'Reminded' : 'Remind Me'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-[#e9bcb6] line-clamp-2 leading-relaxed">
                        {entry.item.synopsis}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        {entry.item.genres.map((g) => (
                          <span
                            key={g}
                            className="px-2 py-0.5 rounded bg-[#201f22] text-[#af8782] text-[11px] font-medium"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(activeTab === 'everyone_watching' || activeTab === 'top_10') && (
          <div className="flex flex-col gap-6">
            {top10Trending.slice(0, 4).map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-[#1c1b1e] border border-white/5 shadow-xl"
              >
                <div className="relative w-full aspect-video overflow-hidden group">
                  <img
                    src={item.backdropImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#e50914] text-white font-label-caps text-[10px] font-bold">
                    TOP {idx + 1} TODAY
                  </div>
                  <button
                    onClick={() => onPlayTitle(item)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[28px] text-[#ffb4aa]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline-md text-xl font-bold text-white">{item.title}</h3>
                      <span className="text-xs text-[#ffba3e] font-semibold">{item.matchScore}% Match • {item.duration}</span>
                    </div>
                    <button
                      onClick={() => onSelectTitle(item)}
                      className="px-3 py-1.5 rounded-xl bg-[#2a2a2c] border border-white/10 text-white text-xs font-semibold hover:bg-[#353437]"
                    >
                      More Details
                    </button>
                  </div>
                  <p className="text-xs text-[#e9bcb6] line-clamp-2">{item.synopsis}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
