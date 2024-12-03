"use client"

interface ViewToggleProps {
  view: 'artists' | 'genres';
  onViewChange: (view: 'artists' | 'genres') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-black/40 rounded-lg p-1 flex gap-1">
        <button
          onClick={() => onViewChange('artists')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            view === 'artists'
              ? 'bg-green-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top Artists
        </button>
        <button
          onClick={() => onViewChange('genres')}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            view === 'genres'
              ? 'bg-green-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Top Genres
        </button>
      </div>
    </div>
  )
} 