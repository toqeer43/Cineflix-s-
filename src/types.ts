export interface TitleItem {
  id: string;
  title: string;
  category: 'series' | 'film';
  heroImage: string;
  backdropImage: string;
  posterImage: string;
  year: number;
  rating: string; // e.g. "TV-MA", "16+", "PG-13"
  duration: string; // e.g. "2h 18m" or "2 Seasons"
  matchScore: number; // e.g. 98
  genres: string[];
  tags: string[];
  specs: string[]; // e.g. ["DOLBY VISION", "ATMOS", "4K UHD", "IMAX ENHANCED"]
  synopsis: string;
  director: string;
  starring: string[];
  rankToday?: number;
  rankingBadge?: string;
  isOriginal?: boolean;
  originalBadge?: string; // e.g. "EMMY", "TOP 10", "BAFTA"
  originalTag?: string; // e.g. "New Season", "Limited Series", "Docuseries"
  continueWatching?: {
    episodeTitle?: string;
    episodeNumber?: string;
    progressPercentage: number;
    remainingTime: string;
    isDownloaded?: boolean;
    downloadSize?: string;
  };
  episodes?: Episode[];
  trailers?: TrailerItem[];
  bts?: BtsItem[];
}

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  duration: string;
  synopsis: string;
  thumbnail: string;
  progressPercentage?: number;
}

export interface TrailerItem {
  id: string;
  title: string;
  duration: string;
  quality: string;
  thumbnail: string;
}

export interface BtsItem {
  id: string;
  type: string; // e.g. "FEATURETTE", "ORIGINAL SCORE"
  title: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

export type ScreenType = 
  | 'home' 
  | 'details' 
  | 'player' 
  | 'search' 
  | 'new_hot' 
  | 'downloads' 
  | 'profile';
