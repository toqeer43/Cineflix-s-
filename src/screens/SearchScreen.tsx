import React, { useState, useMemo } from 'react';
import { TitleItem } from '../types';
import { topSearchesToday, popularGenres, allTitles } from '../data/mockData';

interface SearchScreenProps {
  onSelectTitle: (title: TitleItem) => void;
  onPlayTitle: (title: TitleItem) => void;
  onShowToast: (message: string, icon?: string) => void;
  initialQuery?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onSelectTitle,
  onPlayTitle,
  onShowToast,
  initialQuery = 'Cyberpunk Noir',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [isListening, setIsListening] = useState(false);

  const genres = [
    'All',
    'Action',
    'Psychological Thrillers',
    'Sci-Fi',
    'Award-Winning',
    'Anime',
    'Documentaries',
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    onShowToast('Listening for voice search...', 'mic');

    // Simulate speech-to-text recognition
    const speechQueries = [
      'Denis Villeneuve sci-fi',
      'Cyberpunk Noir',
      'Chrono Zero trailer',
      'Mind bending thrillers',
    ];
    setTimeout(() => {
      const randomQuery = speechQueries[Math.floor(Math.random() * speechQueries.length)];
      setSearchQuery(randomQuery);
      setIsListening(false);
      onShowToast(`Search: "${randomQuery}"`, 'search');
    }, 1200);
  };

  const filteredTitles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allTitles.filter((item) => {
      // Check genre filter
      if (selectedGenre !== 'All') {
        const matchesGenre =
          item.genres.some((g) => g.toLowerCase().includes(selectedGenre.toLowerCase())) ||
          item.tags.some((t) => t.toLowerCase().includes(selectedGenre.toLowerCase()));
        if (!matchesGenre) return false;
      }

      // Check text search query
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const genreMatch = item.genres.some((g) => g.toLowerCase().includes(q));
      const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q));
      const directorMatch = item.director.toLowerCase().includes(q);
      const starMatch = item.starring.some((s) => s.toLowerCase().includes(q));
      const synopsisMatch = item.synopsis.toLowerCase().includes(q);

      return titleMatch || genreMatch || tagMatch || directorMatch || starMatch || synopsisMatch;
    });
  }, [searchQuery, selectedGenre]);

  return (
    <div className="flex flex-col w-full text-on-surface pt-16 pb-24 max-w-4xl mx-auto">
      {/* Search Input Container */}
      <div className="px-4 pt-3 flex flex-col gap-3">
        <div className="relative flex items-center w-full h-12 rounded-full bg-[#2a2a2c]/80 backdrop-blur-md shadow-inner transition-all duration-300 focus-within:shadow-[0_0_16px_rgba(229,9,20,0.35)] border border-white/5">
          <span className="material-symbols-outlined ml-4 text-[#af8782] text-[22px] select-none pointer-events-none">
            search
          </span>
          <input
            id="search-input"
            type="text"
            className="w-full h-full bg-transparent px-3 text-white font-body-md text-body-md placeholder:text-[#af8782] focus:outline-none"
            placeholder="Search movies, directors, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              aria-label="Clear search input"
              onClick={() => setSearchQuery('')}
              className="p-2 mr-1 rounded-full text-[#af8782] hover:text-white active:bg-white/10 transition-colors flex items-center justify-center"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            aria-label="Voice search"
            onClick={handleVoiceSearch}
            className={`w-8 h-8 mr-2 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isListening
                ? 'bg-[#e50914] text-white animate-pulse'
                : 'bg-[#353437] text-[#ffb4aa] hover:bg-[#e50914] hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>

        {/* Horizontal Genre Pill Scroller */}
        <div className="-mx-4 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-2 px-4 w-max py-1">
            {genres.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.35)] font-semibold'
                      : 'bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#353437]'
                  }`}
                  type="button"
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* When search or filter is active and has results */}
      {searchQuery.trim().length > 0 ? (
        <section className="mt-6 px-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-white">
              Search Results ({filteredTitles.length})
            </h2>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
              }}
              className="text-xs text-[#ffb4aa] hover:underline"
            >
              Reset Search
            </button>
          </div>

          {filteredTitles.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[48px] text-[#af8782] mb-2">
                movie
              </span>
              <p className="text-white font-medium text-base">No titles found for &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-[#af8782] mt-1 max-w-xs">
                Try searching for sci-fi, Denis Villeneuve, cyberpunk, or browse popular genres below.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredTitles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTitle(item)}
                  className="flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-[#201f22] shadow-md group-hover:scale-[1.03] transition-transform">
                    <img
                      src={item.posterImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#e50914]/90 text-white font-label-caps text-[10px] font-bold">
                      {item.matchScore}%
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayTitle(item);
                      }}
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg hover:bg-[#e50914] hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-white truncate font-semibold group-hover:text-[#ffb4aa] transition-colors">
                      {item.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-[#af8782] truncate">
                      {item.genres[0]} • {item.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {/* Top Searches Today */}
      <section className="mt-6 px-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#e50914] rounded-full" />
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              Top Searches Today
            </h2>
          </div>
          <span className="font-label-caps text-label-caps text-[#ffba3e] flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            LIVE
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {topSearchesToday.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectTitle(item)}
              className="group relative flex items-center justify-between p-2 rounded-xl bg-[#201f22] transition-all duration-300 hover:bg-[#2a2a2c] active:scale-[0.99] cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`font-headline-md text-headline-md font-bold w-6 text-center select-none ${
                    index === 0 ? 'text-[#e50914]' : 'text-[#af8782]/60'
                  }`}
                >
                  {index + 1}
                </span>

                <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 shadow-md">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={item.posterImage}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-white truncate group-hover:text-[#ffb4aa] transition-colors font-semibold">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#af8782] truncate">
                    {item.tags.join(' • ')}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-label-caps text-label-caps px-1.5 py-0.5 rounded bg-[#39393b] text-[#e5e1e4] font-semibold">
                      {item.specs[0] || '4K HDR'}
                    </span>
                    <span className="font-label-caps text-label-caps text-[#ffba3e] font-bold">
                      {item.matchScore}% Match
                    </span>
                  </div>
                </div>
              </div>

              <button
                aria-label={`Quick play preview of ${item.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTitle(item);
                }}
                className="w-10 h-10 rounded-full bg-[#353437] flex items-center justify-center text-white hover:bg-[#e50914] hover:text-white transition-all active:scale-90 shadow-md mr-1 shrink-0"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Popular Genres */}
      <section className="mt-8 px-4 pb-6 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#ffba3e] rounded-full" />
            <h2 className="font-headline-sm text-headline-sm tracking-tight text-[#e5e1e4]">
              Explore Popular Genres
            </h2>
          </div>
          <button
            onClick={() => {
              setSearchQuery('Action');
              onShowToast('Showing all Action titles', 'movie');
            }}
            className="font-label-caps text-label-caps text-[#af8782] hover:text-white transition-colors flex items-center gap-0.5 font-bold"
            type="button"
          >
            SEE ALL{' '}
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularGenres.map((gen) => (
            <div
              key={gen.id}
              onClick={() => {
                setSearchQuery(gen.name.split(' ')[0]);
                onShowToast(`Filter: ${gen.name}`, 'tune');
              }}
              className="group relative h-36 rounded-xl overflow-hidden cursor-pointer shadow-lg active:scale-[0.98] transition-transform border border-white/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${gen.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/60 to-[#e50914]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent" />

              <div className="relative h-full flex flex-col justify-end p-3.5 z-10">
                <span className={`material-symbols-outlined mb-1 text-[24px] ${gen.color}`}>
                  {gen.icon}
                </span>
                <h3 className="font-title-md text-title-md text-white leading-tight font-bold group-hover:text-[#ffb4aa] transition-colors">
                  {gen.name}
                </h3>
                <p className="font-label-caps text-label-caps text-[#af8782] mt-0.5 font-semibold">
                  {gen.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
