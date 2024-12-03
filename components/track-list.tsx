interface Track {
  artist: string;
  popularity: number;
  genres: string;
  image?: string;
  topTrack?: string;
}

import { ShareButton } from './share-button'
import { Github } from 'lucide-react'

export function TrackList({ timeRange, tracks, view = 'artists' }: { 
  timeRange: string, 
  tracks: Track[],
  view?: 'artists' | 'genres' 
}) {
  if (!tracks?.length) return null;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  // Get period text based on timeRange
  const getPeriodText = (range: string) => {
    switch (range) {
      case 'short_term':
        return 'Period: Last 4 Weeks';
      case 'medium_term':
        return 'Period: Last 6 Months';
      case 'long_term':
        return 'Period: All Time';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        id="receipt"
        className="w-full max-w-[400px] text-black font-mono transform transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
        style={{
          backgroundImage: 'url("/paper-texture.jpg.jpg")',
          backgroundSize: '130%',
          backgroundPosition: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="absolute inset-0 bg-white/75" />
        
        <div className="relative p-3 md:p-5">
          {/* Header */}
          <div className="text-center border-b border-dashed pb-3">
            <h1 className="text-2xl font-bold mb-1">ANOTHER RECEIPTIFY</h1>
            <p className="text-base">Order #{orderNumber}</p>
            <p className="text-sm mt-1.5">{today}</p>
            <p className="text-sm">{time}</p>
            <p className="text-sm mt-1.5 font-bold">{getPeriodText(timeRange)}</p>
          </div>

          {/* Items */}
          <div className="mt-3 space-y-2.5">
            <div className="grid grid-cols-[auto,1fr,auto] gap-4 text-sm">
              <span>QTY</span>
              <span className="text-center">
                {view === 'artists' ? 'ARTIST - TOP TRACK' : 'GENRE'}
              </span>
              <span>POP</span>
            </div>
            
            {tracks.map((track) => (
              <div key={track.artist} className="grid grid-cols-[auto,1fr,auto] gap-4 items-start text-sm">
                <span className="w-8">1x</span>
                <div className="break-words">
                  <span className="block font-bold">{track.artist}</span>
                  {track.topTrack && (
                    <span className="block text-gray-500 mt-0.5 break-words">
                      {track.topTrack}
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap">{track.popularity}%</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-3 border-t border-dashed space-y-3">
            <div className="text-base space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between font-bold mt-1.5 pt-1.5 border-t">
                <span>TOTAL:</span>
                <span>100%</span>
              </div>
            </div>

            <div className="text-center space-y-1.5">
              <p className="text-sm">Thank you for listening!</p>
              <p className="text-sm">================================</p>
              <p className="text-xs">receiptify-two.vercel.app</p>
              <div className="flex items-center justify-center gap-2 pb-1">
                <p className="text-xs text-gray-500">made by anderson bee</p>
                <a 
                  href="https://github.com/andybeecompsci" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Github size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareButton />
    </div>
  );
}