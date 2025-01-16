interface Track {
  artist: string;
  artistId?: string;
  popularity: number;
  genres: string;
  image?: string;
  topTrack?: string;
  topTrackId?: string;
}

import { ShareButton } from './share-button'
import { Github } from 'lucide-react'

export function TrackList({ 
  timeRange, 
  tracks, 
  view = 'artists',
  userProfile 
}: { 
  timeRange: string, 
  tracks: Track[],
  view?: 'artists' | 'genres',
  userProfile?: { display_name: string }
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <img 
                src="/spotify-logo.png" 
                alt="Spotify" 
                className="h-6 w-6"
              />
              <span className="text-sm">Powered by Spotify</span>
            </div>
            <p className="text-base">Order #{userProfile?.display_name
              ?.toLowerCase()
              .replace(/ee/g, 'e3')
              .replace(/e3e/g, '3e')
              .replace(/e/g, '3')
              .replace(/a/g, '4')
              .replace(/o/g, '0')
              .replace(/b/g, '8')
              .toUpperCase()}</p>
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
              <span>PRICE</span>
            </div>
            
            {tracks.map((track) => (
              <div key={track.artist} className="grid grid-cols-[auto,1fr,auto] gap-4 items-start text-sm">
                <span className="w-8">1x</span>
                <div className="break-words">
                  <a 
                    href={track.artistId ? `https://open.spotify.com/artist/${track.artistId}` : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block font-bold hover:text-green-500 transition-colors"
                  >
                    {track.artist}
                  </a>
                  {track.topTrack && track.topTrackId && (
                    <a 
                      href={`https://open.spotify.com/track/${track.topTrackId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-500 mt-0.5 break-words hover:text-green-500 transition-colors"
                    >
                      {track.topTrack}
                    </a>
                  )}
                </div>
                <span className="whitespace-nowrap">${(track.popularity / 10).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-3 border-t border-dashed space-y-3">
            <div className="text-base space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${tracks.reduce((sum, track) => sum + track.popularity/10, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold mt-1.5 pt-1.5 border-t">
                <span>TOTAL:</span>
                <span>${tracks.reduce((sum, track) => sum + track.popularity/10, 0).toFixed(2)}</span>
              </div>
            </div>

            <div className="text-center space-y-1.5">
              <img 
                src="/barcode.png" 
                alt="Barcode" 
                className="h-12 w-full object-contain my-2"
              />
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