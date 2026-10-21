import React, { useState } from 'react';
import { TitleItem, ScreenType, Episode } from './types';
import { chronoZero, allTitles } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CastModal } from './components/CastModal';
import { AudioSubModal } from './components/AudioSubModal';
import { EpisodesModal } from './components/EpisodesModal';
import { Toast } from './components/Toast';
import { HomeScreen } from './screens/HomeScreen';
import { TitleDetailsScreen } from './screens/TitleDetailsScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { SearchScreen } from './screens/SearchScreen';
import { NewAndHotScreen } from './screens/NewAndHotScreen';
import { DownloadsScreen } from './screens/DownloadsScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [selectedTitle, setSelectedTitle] = useState<TitleItem>(chronoZero);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('Cyberpunk Noir');

  // Watchlist state
  const [myList, setMyList] = useState<string[]>([
    'chrono-zero',
    'neon-syndicate',
    'kingdom-of-ash',
  ]);

  // Casting state
  const [isCastOpen, setIsCastOpen] = useState(false);
  const [activeCastDevice, setActiveCastDevice] = useState<string | null>(null);

  // Audio & Subtitles state
  const [isAudioSubOpen, setIsAudioSubOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState('en-orig');
  const [currentSub, setCurrentSub] = useState('en-cc');

  // Episodes modal state
  const [isEpisodesOpen, setIsEpisodesOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(
    chronoZero.episodes?.[3] || {
      id: 'ep-4',
      episodeNumber: 4,
      seasonNumber: 1,
      title: 'Paradox Horizon',
      duration: '1h 02m',
      synopsis: 'At the boundary of the accretion disk, causal reality begins to invert completely.',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6RxcVcEyu9UkCwbhzG9TxSDkfGsW_lNGFPjzMLRAT8HahmYkWOKyw5zg1k1r6eBzNilO9u_zgZoqmKwhDbBPv1pgF7OcfOnWqjNKgmkKUG0bAXhmja1QfYisOsdPfT93FB_VzkOCD3B11g0iU2m_edb96yrIOxkF7qRXD8RGpekVTPXACOd5uBAsXZ3r2FKPUyjxJWE_5yFOV9_EIPyZkLe6jGu4m86FDiRmjCUpCLoaCD-UfhXeg',
    }
  );

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    icon: undefined,
    visible: false,
  });

  const showToast = (message: string, icon?: string) => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 1800);
  };

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
      setScreenHistory(['home']);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTitle = (title: TitleItem) => {
    setSelectedTitle(title);
    navigateTo('details');
  };

  const handlePlayTitle = (title: TitleItem) => {
    setSelectedTitle(title);
    navigateTo('player');
  };

  const handleToggleMyList = (titleId: string) => {
    setMyList((prev) => {
      if (prev.includes(titleId)) {
        return prev.filter((id) => id !== titleId);
      }
      return [...prev, titleId];
    });
  };

  const handleSelectMoodFilter = (mood: string) => {
    setSearchInitialQuery(mood);
    navigateTo('search');
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (category === 'my-list') {
      navigateTo('profile');
      showToast('Showing your saved watchlist', 'bookmark');
    } else if (category === 'categories') {
      setSearchInitialQuery('');
      navigateTo('search');
    } else if (category === 'series') {
      showToast('Filtered by TV Series', 'tv');
    } else if (category === 'films') {
      showToast('Filtered by Feature Films', 'movie');
    }
  };

  const audioLabels: Record<string, string> = {
    'en-orig': 'English [Original] • Dolby Atmos 5.1',
    'en-desc': 'English • Audio Description',
    'es-51': 'Spanish (Latin America) • Dolby Digital 5.1',
    'fr-51': 'French (European) • 5.1',
    'de-51': 'German • 5.1',
    'ja-orig': 'Japanese [Original]',
  };

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#e50914] selection:text-[#fff7f6] relative">
      {/* Toast Notification */}
      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />

      {/* Screen Headers (Player screen has its own embedded player header) */}
      {currentScreen === 'home' && (
        <Header
          variant="home"
          onOpenSearch={() => {
            setSearchInitialQuery('Cyberpunk Noir');
            navigateTo('search');
          }}
          onOpenCast={() => setIsCastOpen(true)}
          onOpenProfile={() => navigateTo('profile')}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
          isCasting={!!activeCastDevice}
        />
      )}

      {currentScreen === 'details' && (
        <Header
          variant="stack"
          title="Title Details"
          onBack={goBack}
          onOpenSearch={() => {
            setSearchInitialQuery('');
            navigateTo('search');
          }}
          onOpenCast={() => setIsCastOpen(true)}
          onOpenProfile={() => navigateTo('profile')}
          isCasting={!!activeCastDevice}
        />
      )}

      {currentScreen === 'search' && (
        <Header
          variant="stack"
          title="Search &amp; Browse"
          onBack={goBack}
          onOpenSearch={() => {}}
          onOpenCast={() => setIsCastOpen(true)}
          onOpenProfile={() => navigateTo('profile')}
          isCasting={!!activeCastDevice}
        />
      )}

      {(currentScreen === 'new_hot' || currentScreen === 'downloads' || currentScreen === 'profile') && (
        <Header
          variant="stack"
          title={
            currentScreen === 'new_hot'
              ? 'New & Hot'
              : currentScreen === 'downloads'
              ? 'Downloads'
              : 'Profile & Settings'
          }
          onBack={goBack}
          onOpenSearch={() => {
            setSearchInitialQuery('');
            navigateTo('search');
          }}
          onOpenCast={() => setIsCastOpen(true)}
          onOpenProfile={() => navigateTo('profile')}
          isCasting={!!activeCastDevice}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col w-full relative">
        {currentScreen === 'home' && (
          <HomeScreen
            onSelectTitle={handleSelectTitle}
            onPlayTitle={handlePlayTitle}
            myList={myList}
            onToggleMyList={handleToggleMyList}
            onSelectMoodFilter={handleSelectMoodFilter}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'details' && (
          <TitleDetailsScreen
            titleItem={selectedTitle}
            onBack={goBack}
            onPlayMovie={handlePlayTitle}
            onPlayTrailer={(titleName) => {
              showToast(`Playing Trailer: ${titleName}`, 'play_circle');
              navigateTo('player');
            }}
            myList={myList}
            onToggleMyList={handleToggleMyList}
            onSelectSimilarTitle={handleSelectTitle}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'player' && (
          <PlayerScreen
            titleItem={selectedTitle}
            onBack={goBack}
            onOpenEpisodes={() => setIsEpisodesOpen(true)}
            onOpenAudioSub={() => setIsAudioSubOpen(true)}
            onOpenCast={() => setIsCastOpen(true)}
            onPlayNextEpisode={(ep) => {
              setCurrentEpisode(ep);
              showToast(`Playing Episode ${ep.episodeNumber}: ${ep.title}`, 'play_arrow');
            }}
            currentAudioLabel={audioLabels[currentAudio] || 'English [Original] • Dolby Atmos 5.1'}
            hasSubtitles={currentSub !== 'off'}
          />
        )}

        {currentScreen === 'search' && (
          <SearchScreen
            initialQuery={searchInitialQuery}
            onSelectTitle={handleSelectTitle}
            onPlayTitle={handlePlayTitle}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'new_hot' && (
          <NewAndHotScreen
            onSelectTitle={handleSelectTitle}
            onPlayTitle={handlePlayTitle}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'downloads' && (
          <DownloadsScreen
            onPlayTitle={handlePlayTitle}
            onSelectTitle={handleSelectTitle}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            myList={myList}
            allTitles={allTitles}
            onSelectTitle={handleSelectTitle}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation Bar (Hidden only in full-immersion PlayerScreen) */}
      {currentScreen !== 'player' && (
        <Navigation
          activeScreen={currentScreen}
          onNavigate={navigateTo}
          downloadCount={3}
        />
      )}

      {/* Global Modals */}
      <CastModal
        isOpen={isCastOpen}
        onClose={() => setIsCastOpen(false)}
        activeDevice={activeCastDevice}
        onSelectDevice={(devId) => {
          setActiveCastDevice(devId);
          showToast(devId ? 'Casting connected' : 'Casting stopped', 'cast');
        }}
      />

      <AudioSubModal
        isOpen={isAudioSubOpen}
        onClose={() => setIsAudioSubOpen(false)}
        currentAudio={currentAudio}
        currentSub={currentSub}
        onSave={(audio, sub) => {
          setCurrentAudio(audio);
          setCurrentSub(sub);
          showToast(
            `Audio: ${audioLabels[audio]?.split('•')[0] || audio} | Subtitles: ${sub}`,
            'subtitles'
          );
        }}
      />

      <EpisodesModal
        isOpen={isEpisodesOpen}
        onClose={() => setIsEpisodesOpen(false)}
        titleItem={selectedTitle}
        currentEpisodeId={currentEpisode.id}
        onSelectEpisode={(ep) => {
          setCurrentEpisode(ep);
          showToast(`Selected Episode ${ep.episodeNumber}: ${ep.title}`, 'play_arrow');
        }}
      />
    </div>
  );
}
