import { GoogleGenAI, Type } from "@google/genai";
import { MoodAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY || '' });

export const analyzeMood = async (text: string): Promise<MoodAnalysis> => {
  const model = 'gemini-2.0-flash-exp';
  
  const response = await ai.models.generateContent({
    model: model,
    contents: `Analyze the following emotional input: "${text}". 
    
    Categorize the mood into one of these types: Joyful, Melancholic, Energetic, Calm, Focused, Anxious, Romantic, or Aggressive.
    
    Then, create a curated "Moodify" playlist with 10 actual, real-world songs (Title and Artist) that perfectly match this mood. 
    Provide a hex color code that represents this mood (e.g., #1DB954 for Joyful, #4A90E2 for Calm).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          mood: { type: Type.STRING },
          emoji: { type: Type.STRING },
          description: { type: Type.STRING },
          color: { type: Type.STRING },
          playlists: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                tracks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      artist: { type: Type.STRING },
                      album: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      coverUrl: { type: Type.STRING }
                    },
                    required: ["id", "title", "artist"]
                  }
                }
              }
            }
          }
        },
        required: ["mood", "emoji", "description", "color", "playlists"]
      }
    }
  });

  const result = JSON.parse(response.text);
  
  const enrichedPlaylists = result.playlists.map((p: any) => ({
    ...p,
    tracks: p.tracks.map((t: any, idx: number) => ({
      ...t,
      id: t.id || `track-${idx}`,
      album: t.album || "Featured Album",
      duration: t.duration || "3:45",
      coverUrl: `https://picsum.photos/seed/${encodeURIComponent(t.title + t.artist)}/200/200`
    }))
  }));

  return { ...result, playlists: enrichedPlaylists };
};
