import React, { useState } from 'react';
import { TitleItem } from '../types';
import { chronoZero, similarTitles } from '../data/mockData';

interface TitleDetailsScreenProps {
  titleItem?: TitleItem;
  onBack: () => void;
  onPlayMovie: (title: TitleItem) => void;
  onPlayTrailer: (titleName: string, videoUrl?: string) => void;
  myList: string[];
  onToggleMyList: (titleId: string) => void;
  onSelectSimilarTitle: (title: TitleItem) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const TitleDetailsScreen: React.FC<TitleDetailsScreenProps> = ({
  titleItem = chronoZero,
  onBack,
  onPlayMovie,
  onPlayTrailer,
  myList,
  onToggleMyList,
  onSelectSimilarTitle,
  onShowToast,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'similar' | 'trailers' | 'bts'>('similar');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const isInList = myList.includes(titleItem.id);

  const handleDownload = () => {
    if (isDownloaded) {
      setIsDownloaded(false);
      onShowToast('Download removed', 'delete');
      return;
    }
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(20);
    onShowToast('Starting download (1.8 GB)...', 'download');

    const timer1 = setTimeout(() => setDownloadProgress(65), 600);
    const timer2 = setTimeout(() => {
      setDownloadProgress(100);
      setIsDownloading(false);
      setIsDownloaded(true);
      onShowToast('Download complete (1.8 GB)', 'check_circle');
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${titleItem.title} on CineFlix`,
          text: `You have to watch ${titleItem.title}. Mind-bending cinematic masterpiece!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Link copied to clipboard!', 'share');
  };

  const handleRate = () => {
    const nextState = !isRated;
    setIsRated(nextState);
    onShowToast(nextState ? 'Marked as Liked' : 'Rating removed', 'thumb_up');
  };

  return (
    <div className="flex flex-col w-full pb-20 pt-14 max-w-4xl mx-auto">
      {/* Hero Backdrop Preview Media */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0e0e10]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${titleItem.backdropImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131315]/80 via-transparent to-transparent" />

        {/* Play Trailer Trigger Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            aria-label="Play Trailer"
            onClick={() => onPlayTrailer(titleItem.title)}
            className="group w-14 h-14 rounded-full bg-[#0e0e10]/70 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-xl border border-white/10"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[32px] text-[#ffb4aa] ml-1 group-hover:text-white transition-colors"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </button>
        </div>

        {/* Sound Toggle */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            aria-label="Toggle Sound"
            onClick={() => {
              setIsMuted(!isMuted);
              onShowToast(isMuted ? 'Audio unmuted' : 'Audio muted', isMuted ? 'volume_up' : 'volume_off');
            }}
            className="w-9 h-9 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center text-white active:bg-[#2a2a2c] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
        </div>

        {/* Top Floating Badge */}
        <div className="absolute top-3 left-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e50914]/90 backdrop-blur-md text-white font-label-caps text-label-caps uppercase tracking-wider shadow-md font-bold">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            #1 in Sci-Fi Today
          </span>
        </div>
      </div>

      {/* Main Metadata Section */}
      <div className="px-4 flex flex-col gap-4 -mt-2 relative z-10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-[#ffb4aa] font-bold">
              {titleItem.matchScore}% Match
            </span>
            <span className="w-1 h-1 rounded-full bg-[#af8782]" />
            <span className="font-label-md text-label-md text-[#e9bcb6]">{titleItem.year}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#353437] text-white font-label-caps text-label-caps font-semibold">
              {titleItem.rating}
            </span>
            <span className="font-label-md text-label-md text-[#e9bcb6]">{titleItem.duration}</span>
          </div>

          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white tracking-tight uppercase font-bold">
            {titleItem.title}
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            {titleItem.specs.map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded bg-[#2a2a2c] text-[#e9bcb6] font-label-caps text-label-caps font-semibold"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Primary CTAs: Watch & Download */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            onClick={() => onPlayMovie(titleItem)}
            className="w-full h-12 rounded-lg bg-[#e50914] text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform hover:bg-[#ff0a16]"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            Watch Movie
          </button>

          <button
            onClick={handleDownload}
            className={`w-full h-11 rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
              isDownloaded
                ? 'bg-[#2a2a2c] text-[#ffb4aa] border border-[#ffb4aa]/30'
                : 'bg-[#2a2a2c] text-white hover:bg-[#353437]'
            }`}
            type="button"
          >
            {isDownloading && (
              <div
                className="absolute left-0 top-0 bottom-0 bg-[#e50914]/20 transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            )}
            <span className="material-symbols-outlined text-[20px] relative z-10">
              {isDownloading ? 'sync' : isDownloaded ? 'check_circle' : 'download'}
            </span>
            <span className="relative z-10">
              {isDownloading
                ? `Downloading... ${downloadProgress}%`
                : isDownloaded
                ? 'Downloaded (1.8 GB)'
                : 'Download Movie (1.8 GB)'}
            </span>
          </button>
        </div>

        {/* Synopsis with Read more toggle */}
        <div className="relative">
          <p
            className={`font-body-md text-body-md text-[#e9bcb6] transition-all leading-relaxed ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {titleItem.synopsis}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#ffb4aa] font-label-md text-label-md mt-1 hover:underline font-semibold"
            type="button"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* Cast & Crew Details */}
        <div className="flex flex-col gap-2 pt-1 border-t border-white/5 mt-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-label-md text-label-md text-[#af8782] shrink-0 font-medium">
              Director:
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#1c1b1e] text-white font-body-sm text-body-sm shrink-0 border border-white/5">
              {titleItem.director}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-label-md text-label-md text-[#af8782] shrink-0 font-medium">
              Starring:
            </span>
            {titleItem.starring.map((actor) => (
              <span
                key={actor}
                className="px-2.5 py-1 rounded-full bg-[#1c1b1e] text-white font-body-sm text-body-sm shrink-0 border border-white/5"
              >
                {actor}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-label-md text-label-md text-[#af8782] shrink-0 font-medium">
              Genres:
            </span>
            {titleItem.genres.map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded bg-[#201f22] text-[#e9bcb6] font-label-caps text-label-caps shrink-0 border border-white/5"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-around py-3 rounded-xl bg-[#0e0e10] border border-white/5">
          <button
            onClick={() => {
              onToggleMyList(titleItem.id);
              onShowToast(
                isInList ? 'Removed from My List' : 'Added to My List',
                isInList ? 'bookmark_remove' : 'bookmark_added'
              );
            }}
            className={`group flex flex-col items-center gap-1.5 transition-colors ${
              isInList ? 'text-[#ffb4aa]' : 'text-[#e9bcb6] hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
              {isInList ? 'check' : 'add'}
            </span>
            <span className="font-label-md text-label-md">
              {isInList ? 'In List' : 'My List'}
            </span>
          </button>

          <button
            onClick={handleRate}
            className={`group flex flex-col items-center gap-1.5 transition-colors ${
              isRated ? 'text-[#ffb4aa]' : 'text-[#e9bcb6] hover:text-white'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: isRated ? "'FILL' 1" : "'FILL' 0" }}
            >
              thumb_up
            </span>
            <span className="font-label-md text-label-md">
              {isRated ? 'Rated' : 'Rate'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="group flex flex-col items-center gap-1.5 text-[#e9bcb6] hover:text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
              share
            </span>
            <span className="font-label-md text-label-md">Share</span>
          </button>

          <button
            onClick={() => onPlayTrailer(titleItem.title)}
            className="group flex flex-col items-center gap-1.5 text-[#e9bcb6] hover:text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
              video_library
            </span>
            <span className="font-label-md text-label-md">Teasers</span>
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 flex flex-col w-full border-t border-white/5 pt-4">
        {/* Tab Headers */}
        <div className="flex items-center px-4 gap-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('similar')}
            className={`relative pb-3 font-title-md text-title-md font-semibold transition-colors ${
              activeTab === 'similar' ? 'text-[#ffb4aa]' : 'text-[#e9bcb6]'
            }`}
            type="button"
          >
            More Like This
            {activeTab === 'similar' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#e50914]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('trailers')}
            className={`relative pb-3 font-title-md text-title-md font-semibold transition-colors ${
              activeTab === 'trailers' ? 'text-[#ffb4aa]' : 'text-[#e9bcb6]'
            }`}
            type="button"
          >
            Trailers &amp; More
            {activeTab === 'trailers' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#e50914]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('bts')}
            className={`relative pb-3 font-title-md text-title-md font-semibold transition-colors ${
              activeTab === 'bts' ? 'text-[#ffb4aa]' : 'text-[#e9bcb6]'
            }`}
            type="button"
          >
            Behind The Scenes
            {activeTab === 'bts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#e50914]" />
            )}
          </button>
        </div>

        {/* Tab 1: More Like This */}
        {activeTab === 'similar' && (
          <div className="px-4 pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {similarTitles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectSimilarTitle(item)}
                  className="flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#1c1b1e] shadow-md group-hover:scale-[1.02] transition-transform">
                    <img
                      src={item.posterImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/90 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#e50914]/90 text-white font-label-caps text-label-caps font-bold">
                      {item.matchScore}%
                    </span>
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="font-label-caps text-label-caps text-[#ffb4aa] uppercase font-bold">
                        {item.tags[0] || 'Sci-Fi'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-white truncate font-semibold group-hover:text-[#ffb4aa] transition-colors">
                      {item.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-[#e9bcb6]">
                      {item.year} • {item.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Trailers & More */}
        {activeTab === 'trailers' && (
          <div className="px-4 pt-4 flex flex-col gap-3">
            {(titleItem.trailers || chronoZero.trailers || []).map((trailer) => (
              <div
                key={trailer.id}
                onClick={() => onPlayTrailer(trailer.title)}
                className="flex gap-3 items-center p-2.5 rounded-xl bg-[#1c1b1e] hover:bg-[#201f22] active:bg-[#2a2a2c] transition-all cursor-pointer border border-white/5 group"
              >
                <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                  <img
                    src={trailer.thumbnail}
                    alt={trailer.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="material-symbols-outlined text-white text-[24px]">
                      play_circle
                    </span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-white truncate font-semibold group-hover:text-[#ffb4aa] transition-colors">
                    {trailer.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-[#e9bcb6] mt-0.5">
                    {trailer.duration} • {trailer.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Behind The Scenes */}
        {activeTab === 'bts' && (
          <div className="px-4 pt-4 flex flex-col gap-3">
            {(titleItem.bts || chronoZero.bts || []).map((btsItem) => (
              <div
                key={btsItem.id}
                className="p-3.5 rounded-xl bg-[#1c1b1e] border border-white/5 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-[#ffb4aa] font-label-caps text-label-caps font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    {btsItem.type === 'FEATURETTE' ? 'movie_edit' : 'music_note'}
                  </span>
                  {btsItem.type}
                </div>
                <h4 className="font-title-md text-title-md text-white font-semibold">
                  {btsItem.title}
                </h4>
                <p className="font-body-sm text-body-sm text-[#e9bcb6] leading-relaxed">
                  {btsItem.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
