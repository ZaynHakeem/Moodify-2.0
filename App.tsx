
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MoodInput from './components/MoodInput';
import PlaylistDashboard from './components/PlaylistDashboard';
import { discoverMusicByMood } from './services/spotifyService';
import { MoodAnalysis, AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      // Switched from Gemini analysis to Spotify discovery
      const result = await discoverMusicByMood(text);
      setAnalysis(result);
      setStatus(AppStatus.READY);
    } catch (err: any) {
      console.error("Spotify Search failed:", err);
      setError(err.message || "Failed to connect to Spotify. Please verify your Access Token.");
      setStatus(AppStatus.ERROR);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Visual atmospheric effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1DB954] blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full opacity-30 animate-pulse delay-1000"></div>
        </div>

        {status === AppStatus.IDLE && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MoodInput onAnalyze={handleAnalyze} isLoading={false} />
            <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-24">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Spotify Powered</h3>
                <p className="text-zinc-500 text-sm">Direct integration with Spotify's global search engine for real tracks.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Natural Language</h3>
                <p className="text-zinc-500 text-sm">Type how you feel, and we'll translate it into a curated music selection.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Vibe Visualization</h3>
                <p className="text-zinc-500 text-sm">Dynamic UI adjustments that respond to the emotional tone of your request.</p>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-pulse">
            <div className="w-20 h-20 mb-8 border-4 border-[#1DB954]/20 border-t-[#1DB954] rounded-full animate-spin"></div>
            <h2 className="text-3xl font-bold mb-4">Consulting Spotify...</h2>
            <p className="text-zinc-500 max-w-md">Scanning millions of tracks to find those that resonate with your current mood.</p>
          </div>
        )}

        {status === AppStatus.READY && analysis && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <PlaylistDashboard analysis={analysis} />
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Spotify Authorization Needed</h2>
            <p className="text-zinc-500 mb-8">{error}</p>
            <button 
              onClick={() => setStatus(AppStatus.IDLE)}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Update Credentials
            </button>
          </div>
        )}
      </main>

      <footer className="py-12 px-6 border-t border-zinc-900 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="w-6 h-6 bg-[#1DB954] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <span className="font-bold text-zinc-500">Moodify x Spotify</span>
          </div>
          <p className="text-zinc-600 text-sm">Real-time Spotify metadata integration.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
