interface Track {
  artist: string;
  song: string;
  listens: number;
}

interface TrackListProps {
  date: string;
  tracks: Track[];
}

export function TrackList({ date, tracks }: TrackListProps) {
  if (!tracks?.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Chosen day activity</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="px-6 py-3">ARTIST</th>
              <th className="px-6 py-3">SONG</th>
              <th className="px-6 py-3 text-right">LISTENS</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr 
                key={`${track.artist}-${track.song}`}
                className="border-t border-gray-700"
              >
                <td className="px-6 py-4">{track.artist}</td>
                <td className="px-6 py-4">{track.song}</td>
                <td className="px-6 py-4 text-right">{track.listens}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 