
import React, { useState } from 'react';

interface MoodInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const MoodInput: React.FC<MoodInputProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onAnalyze(input);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
        How are you feeling right now?
      </h2>
      <p className="text-zinc-400 text-lg mb-8">
        Describe your mood, and let our AI curate the perfect soundtrack for your moment.
      </p>
      
      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. I'm feeling super energetic and ready to conquer the world, maybe a bit of 80s synth vibes..."
          className="w-full h-40 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#1DB954]/50 focus:border-[#1DB954] transition-all resize-none shadow-2xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`absolute bottom-6 right-6 px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2
            ${isLoading 
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' 
              : 'bg-[#1DB954] text-black hover:scale-105 active:scale-95'}`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              Generate Vibes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['Focusing at work', 'Midnight driving', 'Heartbroken', 'Morning Coffee', 'Gym session'].map((tag) => (
          <button
            key={tag}
            onClick={() => setInput(tag)}
            className="px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodInput;
