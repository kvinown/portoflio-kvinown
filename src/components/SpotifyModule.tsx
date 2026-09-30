import React, { useEffect, useState } from 'react';
import { Music, PlayCircle } from 'lucide-react';

interface SpotifyData {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  genre: string;
}

export const SpotifyModule = ({ c }: { c: (l: string, d: string) => string }) => {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/.netlify/functions/spotify');
        if (!res.ok) return;
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gagal mengambil data Spotify:", err);
      }
    };

    // Ambil data pertama kali
    fetchSpotify();
    
    // Polling setiap 10 detik agar tetap up to date secara realtime
    const interval = setInterval(fetchSpotify, 10000); 
    return () => clearInterval(interval);
  }, []);

  // Logika pemetaan Genre ke Warna Animasi Border
  const getGlowColor = (genre: string) => {
    if (!genre) return 'rgba(0,0,0,0)';
    const g = genre.toLowerCase();
    
    // Genre Mapping (Warna RGB)
    if (g.includes('edm') || g.includes('electronic') || g.includes('house') || g.includes('techno')) return 'rgba(6, 182, 212, 0.4)'; // Cyan / Neon
    if (g.includes('rock') || g.includes('metal') || g.includes('punk')) return 'rgba(239, 68, 68, 0.4)'; // Red / Merah Api
    if (g.includes('pop') || g.includes('acoustic') || g.includes('indie')) return 'rgba(234, 179, 8, 0.4)'; // Yellow / Warm Glow
    if (g.includes('lo-fi') || g.includes('chill') || g.includes('jazz') || g.includes('r&b')) return 'rgba(168, 85, 247, 0.4)'; // Purple / Pastel
    if (g.includes('hip hop') || g.includes('rap')) return 'rgba(249, 115, 22, 0.4)'; // Orange
    
    // Warna default jika genre tidak masuk kategori
    return 'rgba(59, 130, 246, 0.3)'; // Blue
  };

  const isPlaying = data?.isPlaying;
  const glowColor = isPlaying ? getGlowColor(data?.genre || '') : 'rgba(0,0,0,0)';

  return (
    <>
      {/* ==================================================== */}
      {/* 1. AMBIENT EDGE GLOW (Animasi Cahaya Pinggir Layar)  */}
      {/* ==================================================== */}
      <div 
        className="pointer-events-none fixed inset-0 z-[9999] transition-all duration-[2000ms] ease-in-out"
        style={{
          boxShadow: isPlaying ? `inset 0 0 100px ${glowColor}, inset 0 0 30px ${glowColor}` : 'none',
          animation: isPlaying ? 'pulseGlow 4s infinite alternate ease-in-out' : 'none',
        }}
      />
      
      {/* Injeksi CSS Khusus untuk animasi */}
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .soundwave-bar {
            width: 3px;
            background-color: #1DB954; /* Spotify Green */
            border-radius: 2px;
            animation: bounce 1.2s ease-in-out infinite alternate;
          }
          
          @keyframes bounce {
            10% { transform: scaleY(0.3); }
            30% { transform: scaleY(1); }
            60% { transform: scaleY(0.5); }
            80% { transform: scaleY(0.8); }
            100% { transform: scaleY(0.6); }
          }
        `}
      </style>

      {/* ==================================================== */}
      {/* 2. SPOTIFY WIDGET (Di pojok kiri bawah)              */}
      {/* ==================================================== */}
      <div className={`fixed bottom-6 left-6 z-[9998] p-3 rounded-2xl flex items-center gap-3 backdrop-blur-xl border shadow-2xl transition-all duration-500 hover:scale-105 group cursor-default
        ${c('bg-white/80 border-slate-200/50 text-slate-800', 'bg-slate-900/80 border-slate-700/50 text-slate-200')}`}
      >
        {isPlaying && data ? (
          <>
            {/* Album Cover */}
            <a href={data.songUrl} target="_blank" rel="noreferrer" className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-slate-200/20 shadow-inner">
              <img src={data.albumImageUrl} alt={data.album} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="text-white w-7 h-7" />
              </div>
            </a>
            
            {/* Song Info */}
            <div className="flex flex-col max-w-[150px] sm:max-w-[200px] justify-center">
              <div className="flex items-center gap-2">
                <a href={data.songUrl} target="_blank" rel="noreferrer" className="font-bold text-sm truncate hover:text-[#1DB954] transition-colors leading-tight">
                  {data.title}
                </a>
              </div>
              <span className="text-xs truncate opacity-70 mt-1 font-medium">
                {data.artist}
              </span>
            </div>

            {/* Equalizer / Soundwave */}
            <div className="flex items-end h-5 gap-[3px] ml-2 pb-1">
              <div className="soundwave-bar h-full" style={{ animationDelay: '0.0s' }} />
              <div className="soundwave-bar h-full" style={{ animationDelay: '0.2s' }} />
              <div className="soundwave-bar h-full" style={{ animationDelay: '0.4s' }} />
              <div className="soundwave-bar h-full" style={{ animationDelay: '0.6s' }} />
            </div>
          </>
        ) : (
          /* State saat musik sedang tidak menyala */
          <div className="flex items-center gap-2 px-3 py-1 opacity-60">
            <Music className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-medium tracking-wide">Spotify Offline</span>
          </div>
        )}
      </div>
    </>
  );
};
