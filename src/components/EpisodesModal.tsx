import React from 'react';
import { TitleItem, Episode } from '../types';

interface EpisodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleItem: TitleItem;
  currentEpisodeId: string;
  onSelectEpisode: (episode: Episode) => void;
}

export const EpisodesModal: React.FC<EpisodesModalProps> = ({
  isOpen,
  onClose,
  titleItem,
  currentEpisodeId,
  onSelectEpisode,
}) => {
  if (!isOpen || !titleItem.episodes) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-[#1c1b1e] border border-white/10 shadow-2xl p-5 flex flex-col gap-4 text-[#e5e1e4] max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h3 className="font-semibold text-lg tracking-tight">{titleItem.title}</h3>
            <span className="text-xs text-[#af8782]">Season 1 (5 Episodes)</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#af8782] hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {titleItem.episodes.map((ep) => {
            const isCurrent = ep.id === currentEpisodeId;

            return (
              <div
                key={ep.id}
                onClick={() => {
                  onSelectEpisode(ep);
                  onClose();
                }}
                className={`p-2.5 rounded-xl border flex flex-col gap-2 cursor-pointer transition-all ${
                  isCurrent 
                    ? 'bg-[#e50914]/15 border-[#e50914]/60' 
                    : 'bg-[#201f22] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img 
                      src={ep.thumbnail} 
                      alt={ep.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span 
                        className={`material-symbols-outlined text-[24px] ${isCurrent ? 'text-[#ffb4aa]' : 'text-white'}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                    {ep.progressPercentage && ep.progressPercentage > 0 && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
                        <div 
                          className="h-full bg-[#e50914]" 
                          style={{ width: `${ep.progressPercentage}%` }} 
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 justify-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#ffb4aa]">
                        EPISODE {ep.episodeNumber}
                      </span>
                      <span className="text-xs text-[#af8782]">• {ep.duration}</span>
                    </div>
                    <h4 className="font-semibold text-sm truncate text-white">
                      {ep.title}
                    </h4>
                    <p className="text-xs text-[#af8782] line-clamp-1 mt-0.5">
                      {ep.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
