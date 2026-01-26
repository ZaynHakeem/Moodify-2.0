
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-6 flex items-center justify-between border-b border-zinc-800/50 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center animate-pulse">
           <svg viewBox="0 0 24 24" className="w-5 h-5 text-black fill-current" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
           </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Moodify</h1>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Home</a>
        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Library</a>
        <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">About AI</a>
      </nav>
      <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform">
        Connect Spotify
      </button>
    </header>
  );
};

export default Header;
