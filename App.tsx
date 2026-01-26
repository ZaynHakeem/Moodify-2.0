
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MoodInput from './components/MoodInput';
import PlaylistDashboard from './components/PlaylistDashboard';
import { analyzeMood } from './services/geminiService';
import { MoodAnalysis, AppStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const result = await analyzeMood(text);
      setAnalysis(result);
      setStatus(AppStatus.READY);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError("Something went wrong while analyzing your mood. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1DB954] blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full opacity-30 animate-pulse delay-1000"></div>
        </div>

        {status === AppStatus.IDLE && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MoodInput onAnalyze={handleAnalyze} isLoading={false} />
            <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-24">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Mood Analysis</h3>
                <p className="text-zinc-500 text-sm">Advanced NLP classifies your emotions from free-text descriptions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Curation</h3>
                <p className="text-zinc-500 text-sm">Our AI scans millions of tracks to find the perfect sonic signature for you.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 glass hover:bg-zinc-800/60 transition-all">
                <div className="w-10 h-10 bg-yellow-500/20 text-yellow-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Playlists</h3>
                <p className="text-zinc-500 text-sm">Sync directly to your music streaming platform in one click.</p>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-pulse">
            <div className="w-20 h-20 mb-8 border-4 border-[#1DB954]/20 border-t-[#1DB954] rounded-full animate-spin"></div>
            <h2 className="text-3xl font-bold mb-4">Reading your vibes...</h2>
            <p className="text-zinc-500 max-w-md">Our AI is diving deep into your description to find the perfect harmony for your soul.</p>
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
            <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
            <p className="text-zinc-500 mb-8">{error}</p>
            <button 
              onClick={() => setStatus(AppStatus.IDLE)}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="py-12 px-6 border-t border-zinc-900 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="w-6 h-6 bg-zinc-500 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <span className="font-bold text-zinc-500">Moodify AI</span>
          </div>
          <p className="text-zinc-600 text-sm">Powered by Gemini Pro Vision • Spotify Web API</p>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
