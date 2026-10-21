import React, { useState } from 'react';
import { availableDevices } from '../data/mockData';

interface CastModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDevice: string | null;
  onSelectDevice: (deviceId: string | null) => void;
}

export const CastModal: React.FC<CastModalProps> = ({
  isOpen,
  onClose,
  activeDevice,
  onSelectDevice,
}) => {
  const [connectingId, setConnectingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeviceClick = (deviceId: string) => {
    if (activeDevice === deviceId) {
      onSelectDevice(null);
      return;
    }
    setConnectingId(deviceId);
    setTimeout(() => {
      setConnectingId(null);
      onSelectDevice(deviceId);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-[#1c1b1e] border border-white/10 shadow-2xl p-5 flex flex-col gap-4 text-[#e5e1e4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#ffb4aa]">cast</span>
            <h3 className="font-semibold text-lg tracking-tight">Cast to Device</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#af8782] hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#af8782]">
          Select an AirPlay, Google Cast, or DLNA screen on your local Wi-Fi network:
        </p>

        <div className="flex flex-col gap-2">
          {availableDevices.map((dev) => {
            const isConnected = activeDevice === dev.id;
            const isConnecting = connectingId === dev.id;

            return (
              <button
                key={dev.id}
                onClick={() => handleDeviceClick(dev.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isConnected 
                    ? 'bg-[#e50914]/15 border-[#e50914]/50 text-white' 
                    : 'bg-[#201f22] border-white/5 hover:border-white/20 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[22px] ${isConnected ? 'text-[#ffb4aa]' : 'text-[#af8782]'}`}>
                    {dev.type === 'tv' ? 'tv' : dev.type === 'audio' ? 'speaker' : 'smart_display'}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">{dev.name}</h4>
                    <span className="text-xs text-[#af8782]">
                      {isConnecting ? 'Connecting...' : isConnected ? 'Connected (Playing in 4K HDR)' : 'Ready to cast'}
                    </span>
                  </div>
                </div>

                <div>
                  {isConnecting ? (
                    <span className="material-symbols-outlined text-[20px] text-[#ffb4aa] animate-spin">
                      progress_activity
                    </span>
                  ) : isConnected ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e50914] text-white">
                      DISCONNECT
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px] text-[#af8782]">
                      chevron_right
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {activeDevice && (
          <div className="mt-1 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#af8782]">
            <span>Volume & controls synchronized to TV</span>
            <button 
              onClick={() => onSelectDevice(null)}
              className="text-[#ffb4aa] hover:underline"
            >
              Stop Casting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
