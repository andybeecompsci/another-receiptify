interface Track {
  artist: string;
  popularity: number;
  genres: string;
  image?: string;
}

export function TrackList({ timeRange, tracks }: { timeRange: string, tracks: Track[] }) {
  console.log('TrackList received:', tracks[0]);
  if (!tracks?.length) return null;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-md mx-auto bg-white font-mono text-sm transform transition-all hover:scale-102 shadow-xl">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:10px_10px]"></div>
        
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">HEATMAPIFY</h1>
            <p className="text-xs">Your Top Artists</p>
            <p className="text-xs text-gray-500">{today}</p>
            <div className="border-b-2 border-dashed my-4" />
          </div>

          <div className="space-y-4">
            {tracks.map((track, index) => (
              <div 
                key={track.artist} 
                className="flex justify-between hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {index + 1}. {track.genres}
                  </p>
                  <p className="text-xs text-gray-600">
                    {track.artist}
                  </p>
                </div>
                <p className="ml-4 whitespace-nowrap text-right">
                  {track.popularity}%
                </p>
              </div>
            ))}
          </div>

          <div className="border-b-2 border-dashed my-4" />
          
          <div className="text-center mt-8 text-xs">
            <p>Thank you for listening!</p>
            <p className="font-mono">********************************</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[linear-gradient(45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fff_33.333%,#fff_66.667%,transparent_66.667%)] bg-[length:10px_10px]"></div>
      </div>
    </div>
  )
} 