interface Track {
  artist: string;
  popularity: number;
  genres: string;
  image?: string;
}

export function TrackList({ timeRange, tracks }: { timeRange: string, tracks: Track[] }) {
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

  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="max-w-[380px] mx-auto bg-white text-black font-mono transform transition-all duration-200 hover:scale-[1.02] shadow-xl">
      <div className="relative overflow-hidden p-6 font-[var(--font-space-mono)]">
        {/* Header */}
        <div className="text-center border-b border-dashed pb-4">
          <h1 className="text-xl font-bold mb-1">ANOTHER RECEIPTIFY</h1>
          <p className="text-sm">Order #{orderNumber}</p>
          <p className="text-xs mt-2">{today}</p>
          <p className="text-xs">{time}</p>
        </div>

        {/* Items */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span>QTY</span>
            <span>ITEM</span>
            <span>POPULARITY</span>
          </div>
          
          {tracks.map((track, index) => (
            <div key={track.artist} className="flex justify-between text-sm">
              <span className="w-8">1x</span>
              <span className="flex-1 px-2 truncate">{track.artist}</span>
              <span>{track.popularity}%</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-dashed">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <span>TOTAL:</span>
              <span>100%</span>
            </div>
          </div>

          <div className="text-center mt-6 space-y-2">
            <p className="text-xs">Thank you for listening!</p>
            <p className="text-xs">================================</p>
            <p className="text-[10px]">spotify.com</p>
          </div>
        </div>

        {/* Receipt edges */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:10px_10px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:10px_10px]"></div>
      </div>
    </div>
  );
}