import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio object on client side
    audioRef.current = new Audio('/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Adjust volume as needed

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleAudio}
      className="fixed top-32 right-8 md:right-16 z-50 flex items-center gap-2 px-4 py-2 bg-brand-bg/80 border border-brand-border/50 backdrop-blur-md rounded-full hover:border-brand-accent transition-all duration-300 group"
    >
      {isPlaying ? (
        <>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-xs font-mono font-bold text-emerald-500 tracking-wider">AUDIO_SYSTEM [ON]</span>
          <Volume2 className="w-4 h-4 text-emerald-500 ml-2" />
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          <span className="text-xs font-mono font-bold text-rose-500 tracking-wider">AUDIO_SYSTEM [OFF]</span>
          <VolumeX className="w-4 h-4 text-rose-500 ml-2 group-hover:opacity-100 opacity-70" />
        </>
      )}
    </button>
  );
}