import React, { useState, useEffect, useRef } from 'react';
import { TitleItem, Episode } from '../types';
import { chronoZero } from '../data/mockData';

interface PlayerScreenProps {
  titleItem?: TitleItem;
  onBack: () => void;
  onOpenEpisodes: () => void;
  onOpenAudioSub: () => void;
  onOpenCast: () => void;
  onPlayNextEpisode?: (ep: Episode) => void;
  currentAudioLabel?: string;
  hasSubtitles?: boolean;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  titleItem = chronoZero,
  onBack,
  onOpenEpisodes,
  onOpenAudioSub,
  onOpenCast,
  onPlayNextEpisode,
  currentAudioLabel = 'English [Original] • Dolby Atmos 5.1',
  hasSubtitles = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const speeds = ['1.0x', '1.25x', '1.5x', '0.75x'];

  // Total duration: 2 hours 18 minutes (8280 seconds)
  // Initial elapsed: 42 minutes 15 seconds (2535 seconds)
  const totalSeconds = 8280;
  const [currentSeconds, setCurrentSeconds] = useState(2535);

  const [toast, setToast] = useState<{ icon: string; text: string } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrubberRailRef = useRef<HTMLDivElement>(null);

  const showToast = (icon: string, text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ icon, text });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 1200);
  };

  // Playback timer
  useEffect(() => {
    if (!isPlaying || isLocked) return;

    const interval = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev >= totalSeconds) {
          setIsPlaying(false);
          return totalSeconds;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isLocked, totalSeconds]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const elapsedPercent = Math.min(100, Math.max(0, (currentSeconds / totalSeconds) * 100));
  const remainingSeconds = totalSeconds - currentSeconds;

  const handlePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    showToast(nextState ? 'play_arrow' : 'pause', nextState ? 'Resumed' : 'Paused');
  };

  const handleRewind = () => {
    setCurrentSeconds((prev) => Math.max(0, prev - 10));
    showToast('replay_10', '-10s Rewind');
  };

  const handleForward = () => {
    setCurrentSeconds((prev) => Math.min(totalSeconds, prev + 10));
    showToast('forward_10', '+10s Forward');
  };

  const handleCycleSpeed = () => {
    const nextIndex = (speedIndex + 1) % speeds.length;
    setSpeedIndex(nextIndex);
    showToast('speed', `Playback: ${speeds[nextIndex]}`);
  };

  const handleToggleLock = () => {
    const nextLock = !isLocked;
    setIsLocked(nextLock);
    showToast(nextLock ? 'lock' : 'lock_open', nextLock ? 'Screen Locked' : 'Screen Unlocked');
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked || !scrubberRailRef.current) return;
    const rect = scrubberRailRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newSeconds = Math.round(ratio * totalSeconds);
    setCurrentSeconds(newSeconds);
  };

  const episode5 = titleItem.episodes?.[4] || {
    id: 'ep-5',
    episodeNumber: 5,
    seasonNumber: 1,
    title: 'The Entropy Threshold',
    duration: '54m',
    synopsis: 'With life support collapsing, Vance initiates a reverse particle purge.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdV82etG1-VT8Y6LjShHC4Rl7BF-_P4WSqQYGsd7OvMGAwdRRrFSGETEW2OrTp0JXqB3uU_bCyM5SUL_pYvW0eXSmHe4YfTnPkaB7XSrBRV6ZfO2o4k21g-ZUf-A9avoyRwMgtKGerSkGeIzMk23qyykKI_EinbA-5hP4S4htLhWIWfDWVBnEc38r5WQKnVdbeYga2xWtf5_H_cCZCd6Ia5e9bSYFQ2EkJdPE5oYGaLqPKh2iWt7S6',
  };

  return (
    <div className="flex flex-col relative w-full bg-[#08080a] min-h-screen select-none overflow-x-hidden">
      {/* Toast Overlay */}
      {toast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-[#353437]/95 text-white font-label-md text-label-md flex items-center gap-2 pointer-events-none z-50 shadow-2xl backdrop-blur-xl border border-white/10 animate-in fade-in zoom-in duration-150">
          <span className="material-symbols-outlined text-[20px] text-[#ffb4aa]">
            {toast.icon}
          </span>
          <span className="font-semibold">{toast.text}</span>
        </div>
      )}

      {/* When Locked: Minimal Overlay with Unlock Button */}
      {isLocked && (
        <div 
          onClick={handleToggleLock}
          className="fixed inset-0 z-40 bg-black/40 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="px-5 py-3 rounded-2xl bg-[#1c1b1e]/90 backdrop-blur-xl border border-white/20 flex items-center gap-3 text-white shadow-2xl">
            <span className="material-symbols-outlined text-[24px] text-[#ffb4aa]">lock</span>
            <span className="text-sm font-semibold">Screen Locked • Tap to unlock</span>
          </div>
        </div>
      )}

      {/* Main Viewport Stage */}
      <div className="relative w-full aspect-[9/16] sm:aspect-[16/9] max-h-[820px] overflow-hidden bg-[#08080a] flex flex-col justify-between">
        {/* Background Visual Frame Layer */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-100"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6RxcVcEyu9UkCwbhzG9TxSDkfGsW_lNGFPjzMLRAT8HahmYkWOKyw5zg1k1r6eBzNilO9u_zgZoqmKwhDbBPv1pgF7OcfOnWqjNKgmkKUG0bAXhmja1QfYisOsdPfT93FB_VzkOCD3B11g0iU2m_edb96yrIOxkF7qRXD8RGpekVTPXACOd5uBAsXZ3r2FKPUyjxJWE_5yFOV9_EIPyZkLe6jGu4m86FDiRmjCUpCLoaCD-UfhXeg')",
          }}
        />

        {/* Multi-stage Theater Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-[#08080A]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08080A]/30 to-[#08080A]/90 pointer-events-none" />

        {/* TOP BAR: Navigation, Metadata, Audio Routing */}
        <header className="relative z-20 flex flex-col pt-4 px-4 gap-2">
          <div className="flex items-center justify-between">
            {/* Back Navigation & Title Group */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                aria-label="Exit Player"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center text-white active:scale-90 active:bg-[#353437] transition-all hover:bg-white/10"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-white font-bold tracking-tight truncate">
                    {titleItem.title}
                  </span>
                  <span className="bg-[#e50914] text-white font-label-caps text-label-caps px-1.5 py-0.5 rounded tracking-wider uppercase font-bold">
                    4K HDR
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-[#e9bcb6] truncate">
                  S1 : E4 • Paradox Horizon
                </span>
              </div>
            </div>

            {/* Audio Spec & Cast Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                aria-label="Subtitles CC"
                onClick={onOpenAudioSub}
                className={`h-9 px-2.5 rounded-full backdrop-blur-md flex items-center gap-1 active:scale-95 transition-all ${
                  hasSubtitles
                    ? 'bg-[#201f22]/80 text-white border border-[#ffba3e]/30'
                    : 'bg-[#201f22]/60 text-[#af8782]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffba3e]">
                  closed_caption
                </span>
                <span className="font-label-caps text-label-caps font-bold text-white">
                  CC
                </span>
              </button>

              <button
                aria-label="Cast to TV"
                onClick={onOpenCast}
                className="w-9 h-9 rounded-full bg-[#201f22]/70 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-all hover:bg-white/10"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">cast</span>
              </button>
            </div>
          </div>

          {/* Quick Audio Status Banner Pill */}
          <div className="self-start mt-1">
            <button
              onClick={onOpenAudioSub}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c1b1e]/80 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px] text-[#ffb4aa]">
                surround_sound
              </span>
              <span className="font-label-md text-label-md text-[#e9bcb6] truncate max-w-[260px] text-left">
                {currentAudioLabel}
              </span>
            </button>
          </div>
        </header>

        {/* CENTER CONTROLS: Scrub Skip & Play/Pause Pulse Button */}
        <div className="relative z-20 flex items-center justify-center gap-8 my-auto px-4">
          {/* Skip Backward 10s */}
          <div className="flex flex-col items-center gap-1">
            <button
              aria-label="Rewind 10 seconds"
              onClick={handleRewind}
              className="w-14 h-14 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center text-white active:scale-85 active:bg-[#2a2a2c] transition-transform duration-150 border border-white/10 hover:bg-[#2a2a2c]"
              type="button"
            >
              <span className="material-symbols-outlined text-[32px]">replay_10</span>
            </button>
            <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">-10s</span>
          </div>

          {/* Hero Play / Pause Floating Crystal Button */}
          <div className="relative flex items-center justify-center">
            {/* Crimson Ambient Aura Pulse */}
            <div className="absolute inset-0 rounded-full bg-[#e50914]/30 blur-2xl animate-pulse" />
            <button
              aria-label="Play or Pause"
              onClick={handlePlayPause}
              className="relative w-20 h-20 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform duration-200 hover:scale-105"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[42px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Skip Forward 10s */}
          <div className="flex flex-col items-center gap-1">
            <button
              aria-label="Forward 10 seconds"
              onClick={handleForward}
              className="w-14 h-14 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center text-white active:scale-85 active:bg-[#2a2a2c] transition-transform duration-150 border border-white/10 hover:bg-[#2a2a2c]"
              type="button"
            >
              <span className="material-symbols-outlined text-[32px]">forward_10</span>
            </button>
            <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">+10s</span>
          </div>
        </div>

        {/* BOTTOM DECK: Scrubber, Timestamps & Utility Controls */}
        <footer className="relative z-20 flex flex-col px-4 pb-5 gap-3 bg-gradient-to-t from-[#08080A] via-[#08080A]/90 to-transparent pt-6">
          {/* Timeline Scrubber Container */}
          <div className="flex flex-col gap-1.5 w-full">
            {/* Interactive Scrubbing Bar */}
            <div
              ref={scrubberRailRef}
              onClick={handleScrubberClick}
              className="relative w-full h-7 flex items-center cursor-pointer group"
            >
              {/* Total Track Background */}
              <div className="w-full h-1.5 rounded-full bg-[#353437] relative overflow-hidden">
                {/* Buffered Track (Simulated 68%) */}
                <div className="absolute left-0 top-0 bottom-0 w-[68%] bg-[#39393b] rounded-full" />
                {/* Played Elapsed Track (Crimson) */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#e50914] rounded-full transition-all"
                  style={{ width: `${elapsedPercent}%` }}
                />
              </div>

              {/* Tactile Glowing Scrub Head Pointer */}
              <div
                className="absolute -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center transition-transform group-active:scale-125"
                style={{ left: `${elapsedPercent}%` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
              </div>
            </div>

            {/* Timestamps Row */}
            <div className="flex items-center justify-between w-full">
              <span className="font-label-md text-label-md text-white tracking-wider font-semibold">
                {formatTime(currentSeconds)}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
                <span className="font-label-md text-label-md text-[#e9bcb6] tracking-wider font-semibold">
                  -{formatTime(remainingSeconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Horizontal Utility Controls Row */}
          <div className="flex items-center justify-between pt-1 max-w-md mx-auto w-full">
            {/* Episodes Drawer Trigger */}
            <button
              onClick={onOpenEpisodes}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform text-white group"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2a2a2c]">
                <span className="material-symbols-outlined text-[20px]">video_library</span>
              </div>
              <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">
                Episodes
              </span>
            </button>

            {/* Audio & Subtitles Panel Trigger */}
            <button
              onClick={onOpenAudioSub}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform text-white group"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2a2a2c]">
                <span className="material-symbols-outlined text-[20px]">subtitles</span>
              </div>
              <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">
                Audio &amp; Sub
              </span>
            </button>

            {/* Playback Rate Pill Selector */}
            <button
              onClick={handleCycleSpeed}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform text-white group"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2a2a2c]">
                <span className="font-headline-sm text-[13px] font-bold text-[#ffb4aa]">
                  {speeds[speedIndex]}
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">
                Speed
              </span>
            </button>

            {/* Screen Lock Feature */}
            <button
              onClick={handleToggleLock}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform text-white group"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2a2a2c]">
                <span className="material-symbols-outlined text-[20px]">
                  {isLocked ? 'lock' : 'lock_open'}
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">
                Lock
              </span>
            </button>

            {/* Instant Skip to Next Episode */}
            <button
              onClick={() => {
                if (onPlayNextEpisode) {
                  onPlayNextEpisode(episode5);
                } else {
                  showToast('skip_next', 'Playing Episode 5');
                }
              }}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform text-white group"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-[#201f22]/60 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2a2a2c]">
                <span className="material-symbols-outlined text-[20px]">skip_next</span>
              </div>
              <span className="font-label-caps text-label-caps text-[#e9bcb6] font-semibold">
                Next Ep
              </span>
            </button>
          </div>
        </footer>
      </div>

      {/* Up Next in Series Preview Card */}
      <section className="flex flex-col px-4 py-5 gap-3 bg-[#08080a] border-t border-white/5 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-white font-bold tracking-tight">
            Up Next
          </span>
          <span className="font-label-caps text-label-caps text-[#ffb4aa] tracking-wider uppercase font-bold">
            Auto-play ON
          </span>
        </div>

        {/* Next Episode Card */}
        <div
          onClick={() => {
            if (onPlayNextEpisode) {
              onPlayNextEpisode(episode5);
            } else {
              showToast('play_arrow', 'Playing Episode 5: The Entropy Threshold');
            }
          }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1c1b1e] hover:bg-[#201f22] active:bg-[#2a2a2c] transition-all cursor-pointer border border-white/5 group"
        >
          <div className="relative w-28 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#2a2a2c]">
            <img
              src={episode5.thumbnail}
              alt={episode5.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#08080A]/40 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-w-0 justify-center">
            <span className="font-label-caps text-label-caps text-[#ffba3e] font-bold">
              EPISODE {episode5.episodeNumber}
            </span>
            <span className="font-headline-sm text-body-md font-semibold text-white truncate">
              {episode5.title}
            </span>
            <span className="font-body-sm text-body-sm text-[#e9bcb6] truncate">
              {episode5.duration} • Audio Description Available
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
