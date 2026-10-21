import React, { useState } from 'react';
import { allProfiles } from '../data/mockData';
import { TitleItem } from '../types';

interface ProfileScreenProps {
  myList: string[];
  allTitles: TitleItem[];
  onSelectTitle: (title: TitleItem) => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  myList,
  allTitles,
  onSelectTitle,
  onShowToast,
}) => {
  const [activeProfileId, setActiveProfileId] = useState(allProfiles[0].id);
  const [videoQuality, setVideoQuality] = useState('4K Ultra HD & HDR');
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [cellularData, setCellularData] = useState(false);

  const myListTitles = allTitles.filter((item) => myList.includes(item.id));

  return (
    <div className="flex flex-col w-full text-on-surface pt-16 pb-24 max-w-4xl mx-auto px-4">
      {/* Profiles Switcher */}
      <div className="flex flex-col items-center py-4">
        <h2 className="font-headline-md text-xl font-bold text-white mb-4">Who&apos;s Watching?</h2>
        <div className="flex items-center gap-4 sm:gap-6">
          {allProfiles.map((p) => {
            const isSelected = activeProfileId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProfileId(p.id);
                  onShowToast(`Switched profile to ${p.name}`, 'account_circle');
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-300 relative ${
                    isSelected
                      ? 'ring-4 ring-[#e50914] scale-105 shadow-xl shadow-[#e50914]/20'
                      : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {p.isKids && (
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#996900] text-white text-[9px] font-bold">
                      KIDS
                    </span>
                  )}
                </div>
                <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#af8782]'}`}>
                  {p.name}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => onShowToast('Add profile dialog', 'person_add')}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center text-[#af8782] group-hover:text-white group-hover:border-white/50 transition-all">
              <span className="material-symbols-outlined text-[32px]">add</span>
            </div>
            <span className="text-xs font-semibold text-[#af8782]">Add Profile</span>
          </button>
        </div>
      </div>

      {/* Subscription Plan Card */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#1c1b1e] to-[#2a2a2c] border border-white/10 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#e50914] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            C
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">CineFlix Premium 4K</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#ffba3e]/20 text-[#ffba3e] text-[10px] font-bold">
                ACTIVE
              </span>
            </div>
            <span className="text-xs text-[#af8782]">
              4 Streams simultaneously • Dolby Atmos &amp; Vision • Next billing Nov 14, 2026
            </span>
          </div>
        </div>
        <button
          onClick={() => onShowToast('Membership management', 'manage_accounts')}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all shrink-0"
        >
          Manage
        </button>
      </div>

      {/* My List Section */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#e50914] rounded-full" />
            <h3 className="font-headline-sm text-base font-bold text-white">
              My Watchlist ({myListTitles.length})
            </h3>
          </div>
          <span className="text-xs text-[#af8782]">Saved titles</span>
        </div>

        {myListTitles.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#1c1b1e] border border-white/5 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[36px] text-[#af8782] mb-1">
              bookmark_border
            </span>
            <p className="text-sm text-white font-medium">Your watchlist is currently empty</p>
            <p className="text-xs text-[#af8782] mt-0.5">
              Add movies and series from the home or search screen using the &apos;My List&apos; button.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {myListTitles.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectTitle(item)}
                className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-[#201f22] cursor-pointer shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={item.posterImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1 inset-x-1 text-[11px] font-semibold text-white truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* App Playback Settings */}
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-headline-sm text-base font-bold text-white">Playback &amp; Quality</h3>
        <div className="flex flex-col rounded-2xl bg-[#1c1b1e] border border-white/5 divide-y divide-white/5">
          {/* Video Stream Quality */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Streaming Video Quality</span>
              <span className="text-xs text-[#af8782]">{videoQuality}</span>
            </div>
            <select
              value={videoQuality}
              onChange={(e) => {
                setVideoQuality(e.target.value);
                onShowToast(`Quality set to ${e.target.value}`, 'hd');
              }}
              className="bg-[#2a2a2c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 outline-none cursor-pointer"
            >
              <option value="4K Ultra HD & HDR">4K Ultra HD &amp; HDR</option>
              <option value="1080p Full HD">1080p Full HD</option>
              <option value="Data Saver (720p)">Data Saver (720p)</option>
              <option value="Auto (Bandwidth Adapt)">Auto</option>
            </select>
          </div>

          {/* Spatial Audio Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Dolby Atmos Spatial Audio</span>
              <span className="text-xs text-[#af8782]">Immersive cinema surround sound output</span>
            </div>
            <button
              onClick={() => {
                const next = !spatialAudio;
                setSpatialAudio(next);
                onShowToast(next ? 'Spatial Audio enabled' : 'Spatial Audio disabled', 'spatial_audio');
              }}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                spatialAudio ? 'bg-[#e50914]' : 'bg-[#353437]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  spatialAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Wi-Fi Only Downloads */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Stream on Wi-Fi Only</span>
              <span className="text-xs text-[#af8782]">Prevent cellular data consumption</span>
            </div>
            <button
              onClick={() => {
                const next = !cellularData;
                setCellularData(next);
                onShowToast(next ? 'Wi-Fi only enabled' : 'Cellular streaming permitted', 'wifi');
              }}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                cellularData ? 'bg-[#e50914]' : 'bg-[#353437]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  cellularData ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
