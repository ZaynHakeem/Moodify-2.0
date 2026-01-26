
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
}

export interface MoodAnalysis {
  mood: string;
  emoji: string;
  description: string;
  color: string;
  playlists: Playlist[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  ERROR = 'ERROR'
}
