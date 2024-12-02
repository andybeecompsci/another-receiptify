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
    <div className="w-[95%] max-w-[400px] bg-white text-black font-mono transform transition-all duration-200 hover:scale-[1.02] shadow-xl">
      <div className="relative overflow-hidden p-6 md:p-8 font-[var(--font-space-mono)]">
        {/* Header */}
        <div className="text-center border-b border-dashed pb-6">
          <h1 className="text-2xl font-bold mb-2">ANOTHER RECEIPTIFY</h1>
          <p className="text-base">Order #{orderNumber}</p>
          <p className="text-sm mt-3">{today}</p>
          <p className="text-sm">{time}</p>
          <p className="text-sm mt-3 font-bold">{getPeriodText(timeRange)}</p>
        </div>

        {/* Items */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span>QTY</span>
            <span>ITEM</span>
            <span>POPULARITY</span>
          </div>
          
          {tracks.map((track, index) => (
            <div key={track.artist} className="flex justify-between text-base">
              <span className="w-10">1x</span>
              <span className="flex-1 px-3 truncate">{track.artist}</span>
              <span>{track.popularity}%</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-dashed">
          <div className="text-base space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between font-bold mt-3 pt-3 border-t">
              <span>TOTAL:</span>
              <span>100%</span>
            </div>
          </div>

          <div className="text-center mt-8 space-y-3">
            <p className="text-sm">Thank you for listening!</p>
            <p className="text-sm">================================</p>
            <p className="text-xs">spotify.com</p>
            <p className="text-xs text-gray-500">made by anderson bee</p>
          </div>
        </div>

        {/* Receipt edges */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:12px_12px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:12px_12px]"></div>
      </div>
    </div>
  );
}