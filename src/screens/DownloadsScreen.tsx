import React, { useState } from 'react';
import { TitleItem } from '../types';
import { continueWatchingList, chronoZero } from '../data/mockData';

interface DownloadsScreenProps {
  onPlayTitle: (title: TitleItem) => void;
  onSelectTitle: (title: TitleItem) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const DownloadsScreen: React.FC<DownloadsScreenProps> = ({
  onPlayTitle,
  onSelectTitle,
  onShowToast,
}) => {
  const [downloads, setDownloads] = useState<TitleItem[]>([
    continueWatchingList[0], // Cold Cipher
    continueWatchingList[1], // Echoes of Titan
    chronoZero,
  ]);
  const [smartDownloads, setSmartDownloads] = useState(true);

  const handleDelete = (id: string, title: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
    onShowToast(`Deleted download for ${title}`, 'delete');
  };

  return (
    <div className="flex flex-col w-full text-on-surface pt-16 pb-24 max-w-4xl mx-auto px-4">
      {/* Storage Header */}
      <div className="p-4 rounded-2xl bg-[#1c1b1e] border border-white/5 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4aa] text-[22px]">
              download_for_offline
            </span>
            <h2 className="font-headline-sm text-lg font-bold text-white">Downloads for Alex</h2>
          </div>
          <span className="text-xs font-semibold text-[#af8782]">
            {downloads.length} Items
          </span>
        </div>

        {/* Storage Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-[#af8782]">
            <span>14.2 GB used of 256 GB</span>
            <span className="text-[#ffb4aa] font-medium">Internal Storage</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#353437] overflow-hidden flex">
            <div className="h-full bg-[#e50914] w-[18%]" title="CineFlix Downloads" />
            <div className="h-full bg-[#af8782] w-[32%]" title="Other Apps" />
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#af8782] pt-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e50914]" /> CineFlix (14.2 GB)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#af8782]" /> System &amp; Apps (64 GB)
            </span>
          </div>
        </div>

        {/* Smart Downloads Toggle */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Smart Downloads</span>
            <span className="text-[11px] text-[#af8782]">
              Automatically downloads the next episode and deletes watched ones
            </span>
          </div>
          <button
            onClick={() => {
              const next = !smartDownloads;
              setSmartDownloads(next);
              onShowToast(
                next ? 'Smart Downloads enabled' : 'Smart Downloads disabled',
                'tune'
              );
            }}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              smartDownloads ? 'bg-[#e50914]' : 'bg-[#353437]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                smartDownloads ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Downloads List */}
      <section className="mt-6 flex flex-col gap-3">
        <h3 className="font-headline-sm text-base font-bold text-white">Downloaded Ready to Watch</h3>

        {downloads.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-[48px] text-[#af8782] mb-2">
              download_done
            </span>
            <p className="text-white font-semibold">No downloaded titles</p>
            <p className="text-xs text-[#af8782] mt-1 max-w-xs">
              Download movies and episodes to watch offline anywhere, even in airplane mode.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1c1b1e] border border-white/5 hover:bg-[#201f22] transition-all group"
              >
                <div
                  className="flex items-center gap-3.5 min-w-0 cursor-pointer"
                  onClick={() => onPlayTitle(item)}
                >
                  <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img
                      src={item.backdropImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#0e0e10]/80 backdrop-blur-md flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h4 className="font-semibold text-sm text-white truncate group-hover:text-[#ffb4aa] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-[#af8782] mt-0.5">
                      {item.continueWatching?.episodeNumber || 'Feature Film'} • {item.continueWatching?.downloadSize || '1.8 GB'}
                    </span>
                    <span className="text-[11px] text-[#ffba3e] font-medium mt-0.5">
                      4K Ultra HD • Offline
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSelectTitle(item)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#af8782] hover:text-white active:bg-white/5"
                    title="View details"
                  >
                    <span className="material-symbols-outlined text-[20px]">info</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#af8782] hover:text-[#e50914] active:bg-white/5"
                    title="Delete download"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
