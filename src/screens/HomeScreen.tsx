import React from 'react';
import { TitleItem } from '../types';
import {
  chronoZero,
  top10Trending,
  continueWatchingList,
  cineFlixOriginals,
  sciFiList,
} from '../data/mockData';

interface HomeScreenProps {
  onSelectTitle: (title: TitleItem) => void;
  onPlayTitle: (title: TitleItem) => void;
  myList: string[];
  onToggleMyList: (titleId: string) => void;
  onSelectMoodFilter: (mood: string) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTitle,
  onPlayTitle,
  myList,
  onToggleMyList,
  onSelectMoodFilter,
  onShowToast,
}) => {
  const isChronoInList = myList.includes(chronoZero.id);

  return (
    <div className="flex flex-col w-full text-on-surface select-none pb-24 overflow-hidden pt-28 max-w-7xl mx-auto">
      {/* Immersive Hero Showcase */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[16/9] max-h-[580px] overflow-hidden">
        {/* Cinematic Poster Media with Dark Gradient Scrims */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${chronoZero.heroImage}')` }}
        />
        {/* Vignette scrims for fluid immersion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131315]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#0e0e10]/60 pointer-events-none" />

        {/* Top floating micro-pill for Ranking */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e50914] text-white shadow-lg shadow-[#e50914]/30 z-10">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_fire_department
          </span>
          <span className="font-label-caps text-[11px] tracking-wider uppercase font-bold">
            #1 in Movies Today
          </span>
        </div>

        {/* Hero Content & Metadata */}
        <div className="absolute bottom-4 inset-x-0 px-4 flex flex-col items-center text-center z-10 max-w-xl mx-auto">
          {/* Title Graphic Identity */}
          <h1 className="font-headline-hero-mobile text-headline-hero-mobile tracking-tight uppercase text-white drop-shadow-md">
            Chrono<span className="text-[#e50914]">:</span>Zero
          </h1>

          {/* Genre & Tags */}
          <p className="mt-1 font-body-sm text-body-sm text-[#e9bcb6] flex items-center justify-center gap-2">
            <span>Sci-Fi</span>
            <span className="w-1 h-1 rounded-full bg-[#af8782]" />
            <span>Psychological Thriller</span>
            <span className="w-1 h-1 rounded-full bg-[#af8782]" />
            <span>Mind-Bending</span>
          </p>

          {/* Spec Badges */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-[#353437]/80 text-[#e5e1e4] font-label-caps text-label-caps tracking-wider backdrop-blur-md">
              4K ULTRA HD
            </span>
            <span className="px-2 py-0.5 rounded bg-[#353437]/80 text-[#e5e1e4] font-label-caps text-label-caps tracking-wider backdrop-blur-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">spatial_audio</span>
              <span>SPATIAL AUDIO</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#353437]/80 text-[#e5e1e4] font-label-caps text-label-caps backdrop-blur-md">
              16+
            </span>
            <span className="px-2 py-0.5 rounded bg-[#996900]/40 text-[#ffba3e] font-label-caps text-label-caps backdrop-blur-md">
              99% MATCH
            </span>
          </div>

          {/* Action Button Group */}
          <div className="mt-4 w-full flex items-center justify-center gap-3">
            {/* Add to List */}
            <button
              aria-label="Add to My List"
              onClick={() => {
                onToggleMyList(chronoZero.id);
                onShowToast(
                  isChronoInList ? 'Removed from My List' : 'Added to My List',
                  isChronoInList ? 'bookmark_remove' : 'bookmark_added'
                );
              }}
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#2a2a2c]/70 backdrop-blur-xl text-white active:scale-95 transition-all hover:bg-[#353437]"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isChronoInList ? 'check' : 'add'}
              </span>
              <span className="font-label-caps text-[11px] tracking-wider uppercase mt-0.5 font-bold">
                {isChronoInList ? 'Added' : 'My List'}
              </span>
            </button>

            {/* Primary Play Button */}
            <button
              aria-label="Play Chrono Zero"
              onClick={() => onPlayTitle(chronoZero)}
              className="flex-[2] flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white text-black active:scale-95 transition-all shadow-xl hover:bg-[#e50914] hover:text-white group"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[26px] text-[#e50914] group-hover:text-white transition-colors"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span className="font-title-md text-title-md tracking-wide text-inherit font-bold">
                Play
              </span>
            </button>

            {/* Details Info */}
            <button
              aria-label="More Info"
              onClick={() => onSelectTitle(chronoZero)}
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#2a2a2c]/70 backdrop-blur-xl text-white active:scale-95 transition-all hover:bg-[#353437]"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">info</span>
              <span className="font-label-caps text-[11px] tracking-wider uppercase mt-0.5 font-bold">
                Info
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Carousel 1: Trending Now with Bold Giant Numbers */}
      <section className="mt-8 flex flex-col w-full">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#e50914] rounded-full" />
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              Top 10 Trending
            </h2>
          </div>
          <button
            onClick={() => onSelectMoodFilter('trending')}
            className="font-label-md text-label-md text-[#ffb3ad] hover:text-white flex items-center gap-0.5"
          >
            <span>See All</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scroller */}
        <div className="mt-3.5 flex gap-5 overflow-x-auto no-scrollbar pl-4 pr-6 pb-2">
          {top10Trending.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectTitle(item)}
              className="relative flex-shrink-0 flex items-end w-44 h-60 cursor-pointer group"
            >
              {/* Massive Numeric Typography */}
              <span className="absolute -left-2 -bottom-3 text-[108px] font-headline-hero leading-none select-none text-[#353437] tracking-tighter z-0 drop-shadow-md group-hover:text-[#454448] transition-colors">
                {index + 1}
              </span>
              {/* Poster Thumbnail */}
              <div className="relative ml-10 w-32 h-48 rounded-lg overflow-hidden bg-[#201f22] shadow-lg z-10 transition-transform duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#e50914]">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.posterImage}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-transparent to-transparent" />
                <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#e50914] text-white font-label-caps text-[10px] font-bold">
                  TOP {index + 1}
                </div>
                <p className="absolute bottom-2 inset-x-2 font-label-md text-label-md text-white line-clamp-1 font-medium">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel 2: Continue Watching for Alex with Scrubber */}
      <section className="mt-8 flex flex-col w-full">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#a00216] text-[#ffa9a2] flex items-center justify-center font-label-caps text-label-caps font-bold">
              A
            </div>
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              Continue Watching
            </h2>
          </div>
          <span className="font-body-sm text-body-sm text-[#af8782]">3 in progress</span>
        </div>

        {/* Scroller */}
        <div className="mt-3.5 flex gap-3.5 overflow-x-auto no-scrollbar pl-4 pr-6 pb-2">
          {continueWatchingList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 rounded-xl overflow-hidden bg-[#1c1b1e] shadow-md border border-white/5"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video overflow-hidden group">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.backdropImage}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent" />
                {/* Central Quick Play Trigger */}
                <button
                  aria-label={`Resume ${item.title}`}
                  onClick={() => onPlayTitle(item)}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[24px] text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
                {/* Scrubber Progress Bar at bottom of thumbnail */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#353437]">
                  <div
                    className="h-full bg-[#e50914]"
                    style={{ width: `${item.continueWatching?.progressPercentage || 50}%` }}
                  />
                </div>
              </div>

              {/* Meta & Contextual Controls */}
              <div className="p-3 flex items-center justify-between">
                <div
                  className="min-w-0 pr-2 cursor-pointer"
                  onClick={() => onSelectTitle(item)}
                >
                  <h3 className="font-title-md text-title-md text-[#e5e1e4] truncate hover:text-white">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#e9bcb6] flex items-center gap-1.5 mt-0.5">
                    <span>{item.continueWatching?.episodeNumber || 'Episode'}</span>
                    <span className="w-1 h-1 rounded-full bg-[#af8782]" />
                    <span>{item.continueWatching?.remainingTime || '20m left'}</span>
                  </p>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Download status"
                    onClick={() => {
                      onShowToast(
                        item.continueWatching?.isDownloaded
                          ? 'Available for offline play'
                          : 'Downloading episode...',
                        'download'
                      );
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#e9bcb6] hover:text-white active:bg-[#201f22] transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {item.continueWatching?.isDownloaded ? 'check_circle' : 'download'}
                    </span>
                  </button>
                  <button
                    aria-label="Episode info"
                    onClick={() => onSelectTitle(item)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#e9bcb6] hover:text-white active:bg-[#201f22] transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel 3: CineFlix Originals with Tall Cards & Award Laurels */}
      <section className="mt-8 flex flex-col w-full">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-pulse" />
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              CineFlix Originals
            </h2>
          </div>
          <span className="font-label-caps text-label-caps text-[#ffb4aa] tracking-widest uppercase font-bold">
            Exclusive
          </span>
        </div>

        {/* Scroller */}
        <div className="mt-3.5 flex gap-3.5 overflow-x-auto no-scrollbar pl-4 pr-6 pb-2">
          {cineFlixOriginals.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTitle(item)}
              className="relative flex-shrink-0 w-36 h-56 rounded-xl overflow-hidden bg-[#201f22] shadow-xl cursor-pointer group transition-transform duration-300 hover:scale-105"
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover"
                src={item.posterImage}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent" />
              {/* CineFlix C badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <div className="w-5 h-5 rounded bg-[#e50914] text-white flex items-center justify-center font-headline-sm text-[12px] font-bold shadow-md">
                  C
                </div>
              </div>
              {/* Laurel / Award Micro Badge */}
              {item.originalBadge && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-[#353437]/80 backdrop-blur-md flex items-center gap-0.5 text-[#ffba3e]">
                  <span className="material-symbols-outlined text-[12px]">
                    {item.originalBadge === 'EMMY' ? 'military_tech' : 'award_star'}
                  </span>
                  <span className="font-label-caps text-[9px] font-bold">
                    {item.originalBadge}
                  </span>
                </div>
              )}
              <div className="absolute bottom-2.5 inset-x-2.5">
                <p className="font-label-caps text-[10px] text-[#ffb4aa] tracking-wider uppercase font-semibold">
                  {item.originalTag || 'Original'}
                </p>
                <h4 className="font-title-md text-label-lg text-white line-clamp-1 leading-snug font-semibold">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel 4: Top Picks in Sci-Fi & Cyberpunk with Match Scores */}
      <section className="mt-8 flex flex-col w-full">
        <div className="px-4 flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              Sci-Fi &amp; Cyberpunk
            </h2>
            <p className="font-body-sm text-body-sm text-[#e9bcb6]">
              Curated for your late-night thrills
            </p>
          </div>
          <button
            onClick={() => onSelectMoodFilter('sci-fi')}
            className="font-label-md text-label-md text-[#ffb3ad] hover:text-white flex items-center gap-0.5"
          >
            <span>Explore</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Scroller */}
        <div className="mt-3.5 flex gap-3 overflow-x-auto no-scrollbar pl-4 pr-6 pb-2">
          {sciFiList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTitle(item)}
              className="flex-shrink-0 w-40 flex flex-col cursor-pointer group"
            >
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#201f22] shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.posterImage}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 via-transparent to-transparent" />
                {/* Match Pill */}
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#996900]/90 text-[#fff7f2] font-label-caps text-[10px] font-bold backdrop-blur-md">
                  {item.matchScore}% Match
                </div>
                {item.specs[0] && (
                  <div className="absolute top-2 right-2 px-1 py-0.5 rounded bg-[#0e0e10]/80 text-white font-label-caps text-[9px] backdrop-blur-md font-semibold">
                    {item.specs[0]}
                  </div>
                )}
              </div>
              <div className="mt-2">
                <h4 className="font-title-md text-body-md text-white truncate font-semibold group-hover:text-[#ffb4aa] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-body-sm text-[11px] text-[#af8782]">{item.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-[#af8782]" />
                  <span className="font-body-sm text-[11px] text-[#e9bcb6] truncate">
                    {item.genres[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quick Category Selector: Browse by Mood */}
      <section className="mt-8 px-4 flex flex-col w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
            Browse by Mood
          </h2>
          <span className="material-symbols-outlined text-[#af8782] text-[20px]">tune</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => onSelectMoodFilter('action')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#2a2a2c]/60 backdrop-blur-md text-left active:scale-[0.98] transition-all hover:bg-[#353437] border border-white/5"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#e50914] text-[22px]">
                rocket_launch
              </span>
              <span className="font-label-lg text-label-lg text-[#e5e1e4] font-semibold">
                Adrenaline &amp; Action
              </span>
            </div>
            <span className="material-symbols-outlined text-[#af8782] text-[18px]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => onSelectMoodFilter('psychological')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#2a2a2c]/60 backdrop-blur-md text-left active:scale-[0.98] transition-all hover:bg-[#353437] border border-white/5"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffba3e] text-[22px]">
                psychology
              </span>
              <span className="font-label-lg text-label-lg text-[#e5e1e4] font-semibold">
                Mind Twisters
              </span>
            </div>
            <span className="material-symbols-outlined text-[#af8782] text-[18px]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => onSelectMoodFilter('horror')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#2a2a2c]/60 backdrop-blur-md text-left active:scale-[0.98] transition-all hover:bg-[#353437] border border-white/5"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffb3ad] text-[22px]">
                nightlight
              </span>
              <span className="font-label-lg text-label-lg text-[#e5e1e4] font-semibold">
                Midnight Horrors
              </span>
            </div>
            <span className="material-symbols-outlined text-[#af8782] text-[18px]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => onSelectMoodFilter('award-winning')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#2a2a2c]/60 backdrop-blur-md text-left active:scale-[0.98] transition-all hover:bg-[#353437] border border-white/5"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#af8782] text-[22px]">
                theater_comedy
              </span>
              <span className="font-label-lg text-label-lg text-[#e5e1e4] font-semibold">
                Award Winners
              </span>
            </div>
            <span className="material-symbols-outlined text-[#af8782] text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
