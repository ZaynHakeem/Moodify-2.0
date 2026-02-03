
import { MoodAnalysis, Track, Playlist } from "../types";

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Keyword-based theme mapping for UI visual flair
const MOOD_MAP: Record<string, { color: string; emoji: string; category: string }> = {
  happy: { color: '#fbbf24', emoji: '☀️', category: 'Joyful' },
  joy: { color: '#fbbf24', emoji: '☀️', category: 'Joyful' },
  sad: { color: '#60a5fa', emoji: '🌧️', category: 'Melancholic' },
  blue: { color: '#60a5fa', emoji: '🌧️', category: 'Melancholic' },
  energy: { color: '#f87171', emoji: '🔥', category: 'Energetic' },
  workout: { color: '#f87171', emoji: '🔥', category: 'Energetic' },
  calm: { color: '#34d399', emoji: '🍃', category: 'Calm' },
  chill: { color: '#34d399', emoji: '🍃', category: 'Calm' },
  focus: { color: '#818cf8', emoji: '💻', category: 'Focused' },
  study: { color: '#818cf8', emoji: '💻', category: 'Focused' },
  romantic: { color: '#f472b6', emoji: '💖', category: 'Romantic' },
  love: { color: '#f472b6', emoji: '💖', category: 'Romantic' },
};

export const discoverMusicByMood = async (query: string): Promise<MoodAnalysis> => {
  const token = import.meta.env.VITE_SPOTIFY_API_KEY;
  
  if (!token) {
    throw new Error("Spotify Access Token is missing. Please ensure your API_KEY environment variable is a valid Spotify Token.");
  }

  // Use Spotify's Search API to find tracks matching the mood description
  const response = await fetch(`${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=15`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Spotify token expired or invalid. (Unauthorized)");
    }
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.tracks || data.tracks.items.length === 0) {
    throw new Error("No tracks found for that vibe. Try different keywords!");
  }

  // Determine Vibe theme from query text
  const lowercaseQuery = query.toLowerCase();
  let matchedMood = { color: '#1DB954', emoji: '🎵', category: 'Found' };
  
  for (const [key, value] of Object.entries(MOOD_MAP)) {
    if (lowercaseQuery.includes(key)) {
      matchedMood = value;
      break;
    }
  }

  // Map Spotify tracks to our internal type
  const tracks: Track[] = data.tracks.items.map((item: any) => ({
    id: item.id,
    title: item.name,
    artist: item.artists.map((a: any) => a.name).join(', '),
    album: item.album.name,
    duration: formatDuration(item.duration_ms),
    coverUrl: item.album.images[0]?.url || 'https://via.placeholder.com/200'
  }));

  return {
    mood: matchedMood.category,
    emoji: matchedMood.emoji,
    description: `We've synced with Spotify to find the perfect tracks for: "${query}". Discover your mood's real-world soundtrack.`,
    color: matchedMood.color,
    playlists: [{
      id: 'spotify-discovery',
      name: `${matchedMood.category} Vibe`,
      description: `Search results for ${query}`,
      tracks
    }]
  };
};

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000);
  const sec = ((ms % 60000) / 1000).toFixed(0);
  return `${min}:${Number(sec) < 10 ? '0' : ''}${sec}`;
}
