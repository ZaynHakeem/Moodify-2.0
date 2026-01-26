
import React from 'react';
import { MoodAnalysis, Track } from '../types';

interface PlaylistDashboardProps {
  analysis: MoodAnalysis;
}

const PlaylistDashboard: React.FC<PlaylistDashboardProps> = ({ analysis }) => {
  const playlist = analysis.playlists[0];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8 items-end mb-12">
        <div 
          className="w-64 h-64 rounded-xl shadow-2xl flex items-center justify-center text-8xl shrink-0"
          style={{ background: `linear-gradient(135deg, ${analysis.color} 0%, #121212 100%)` }}
        >
          {analysis.emoji}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">AI Curated Playlist</p>
          <h1 className="text-5xl md:text-7xl font-black mb-4">{analysis.mood} Vibes</h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            {analysis.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button className="px-8 py-3 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play on Spotify
            </button>
            <button className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/30 rounded-2xl overflow-hidden border border-zinc-800/50 backdrop-blur-sm">
        <div className="grid grid-cols-[auto,1fr,1fr,100px] gap-4 px-6 py-4 border-b border-zinc-800 text-zinc-500 text-sm font-medium uppercase tracking-wider">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div className="hidden md:block">Album</div>
          <div className="text-right">Time</div>
        </div>
        
        {playlist.tracks.map((track, index) => (
          <div 
            key={track.id}
            className="grid grid-cols-[auto,1fr,1fr,100px] gap-4 px-6 py-3 hover:bg-zinc-800/50 transition-colors group cursor-pointer items-center"
          >
            <div className="w-8 text-center text-zinc-500 group-hover:text-white transition-colors">{index + 1}</div>
            <div className="flex items-center gap-4">
              <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded shadow-md object-cover" />
              <div>
                <div className="text-white font-medium line-clamp-1">{track.title}</div>
                <div className="text-sm text-zinc-400 line-clamp-1">{track.artist}</div>
              </div>
            </div>
            <div className="hidden md:block text-zinc-400 text-sm line-clamp-1">{track.album}</div>
            <div className="text-right text-zinc-500 text-sm">{track.duration}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => window.location.reload()}
          className="text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
        >
          Try a different mood?
        </button>
      </div>
    </div>
  );
};

export default PlaylistDashboard;
