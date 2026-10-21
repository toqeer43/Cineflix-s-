import React, { useState } from 'react';

interface AudioSubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAudio: string;
  currentSub: string;
  onSave: (audio: string, sub: string) => void;
}

const audioOptions = [
  { id: 'en-orig', label: 'English [Original] • Dolby Atmos 5.1' },
  { id: 'en-desc', label: 'English • Audio Description' },
  { id: 'es-51', label: 'Spanish (Latin America) • Dolby Digital 5.1' },
  { id: 'fr-51', label: 'French (European) • 5.1' },
  { id: 'de-51', label: 'German • 5.1' },
  { id: 'ja-orig', label: 'Japanese [Original]' },
];

const subOptions = [
  { id: 'off', label: 'Off' },
  { id: 'en-cc', label: 'English [CC]' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
  { id: 'de', label: 'German' },
  { id: 'ja', label: 'Japanese' },
];

export const AudioSubModal: React.FC<AudioSubModalProps> = ({
  isOpen,
  onClose,
  currentAudio,
  currentSub,
  onSave,
}) => {
  const [selectedAudio, setSelectedAudio] = useState(currentAudio);
  const [selectedSub, setSelectedSub] = useState(currentSub);

  if (!isOpen) return null;

  const handleApply = () => {
    onSave(selectedAudio, selectedSub);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-[#1c1b1e] border border-white/10 shadow-2xl p-5 flex flex-col gap-4 text-[#e5e1e4] max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#ffb4aa]">subtitles</span>
            <h3 className="font-semibold text-lg tracking-tight">Audio &amp; Subtitles</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#af8782] hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Audio section */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#af8782]">Audio</h4>
            <div className="flex flex-col gap-1.5">
              {audioOptions.map((opt) => {
                const isSelected = selectedAudio === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedAudio(opt.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-all ${
                      isSelected 
                        ? 'bg-[#e50914]/20 border border-[#e50914]/60 text-white font-medium' 
                        : 'bg-[#201f22] border border-white/5 text-[#e5e1e4] hover:bg-[#2a2a2c]'
                    }`}
                  >
                    <span className="truncate pr-1">{opt.label}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-[#ffb4aa]">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtitles section */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#af8782]">Subtitles</h4>
            <div className="flex flex-col gap-1.5">
              {subOptions.map((opt) => {
                const isSelected = selectedSub === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedSub(opt.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-all ${
                      isSelected 
                        ? 'bg-[#e50914]/20 border border-[#e50914]/60 text-white font-medium' 
                        : 'bg-[#201f22] border border-white/5 text-[#e5e1e4] hover:bg-[#2a2a2c]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-[#ffb4aa]">
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#af8782] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-[#e50914] text-white shadow-lg active:scale-95 transition-all"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
