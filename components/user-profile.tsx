interface UserProfileProps {
  username: string;
  monthlyTracks: number;
  allTimeTracks: number;
}

export function UserProfile({ username, monthlyTracks, allTimeTracks }: UserProfileProps) {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 text-white w-[280px]">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full mb-4"></div>
        <h2 className="text-xl font-bold mb-1">{username}</h2>
        <p className="text-sm text-gray-400 mb-6">Spotify Listener</p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 bg-black/20 rounded-md p-3 text-center">
          <p className="text-sm text-purple-400">Monthly</p>
          <p className="text-sm">{monthlyTracks} tracks</p>
        </div>
        <div className="flex-1 bg-black/20 rounded-md p-3 text-center">
          <p className="text-sm text-purple-400">All Time</p>
          <p className="text-sm">{allTimeTracks} tracks</p>
        </div>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-black/20 hover:bg-black/30 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </div>
  );
} 