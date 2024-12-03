"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { TrackList } from '@/components/track-list'
import { ViewToggle } from '@/components/view-toggle'

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface Track {
  artist: string;
  popularity: number;
  genres: string;
  image?: string;
  topTrack?: string;
}

interface TopTrack {
  name: string;
  artists: { id: string; name: string }[];
}

interface SpotifyArtist {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  images: { url: string }[];
}

interface SpotifyResponse {
  items: SpotifyArtist[];
}

export function ClientDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [timeRange, setTimeRange] = useState<string>('medium_term')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [view, setView] = useState<'artists' | 'genres'>('artists')

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      setAuthCode(code)
    }
  }, [searchParams])

  useEffect(() => {
    async function getAccessToken() {
      if (!authCode) return

      try {
        const tokenResponse = await fetch('/api/spotify/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: authCode }),
        })

        const data = await tokenResponse.json()
        if (data.error) {
          throw new Error(data.error_description || 'Failed to get access token')
        }

        setSpotifyToken(data.access_token)
      } catch (error) {
        console.error('Token exchange error:', error)
        setError('Failed to authenticate with Spotify')
        setIsLoading(false)
      }
    }

    getAccessToken()
  }, [authCode])

  useEffect(() => {
    async function fetchTracksAndTopSongs() {
      if (!spotifyToken) return

      try {
        setIsLoading(true)
        
        // First fetch all top tracks to have the complete listening history
        const allTopTracks: TopTrack[] = []
        let hasMore = true
        let offset = 0
        
        while (hasMore) {
          const tracksResponse = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=${offset}&time_range=${timeRange}`,
            {
              headers: {
                'Authorization': `Bearer ${spotifyToken}`,
              },
            }
          )
          const tracksData = await tracksResponse.json()
          
          allTopTracks.push(...tracksData.items)
          
          if (tracksData.items.length < 50) {
            hasMore = false
          } else {
            offset += 50
          }
          
          if (offset >= 300) {
            hasMore = false
          }
        }

        // Fetch top artists
        const artistsResponse = await fetch(
          `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`,
          {
            headers: {
              'Authorization': `Bearer ${spotifyToken}`,
            },
          }
        )
        const artistsData = await artistsResponse.json()

        // For each artist, find their most played song from the user's top tracks
        const artistsWithTopTracks = artistsData.items.map((artist: SpotifyArtist) => {
          // Find all tracks by this artist
          const artistTracks = allTopTracks.filter(track => 
            track.artists.some(a => a.id === artist.id)
          )
          
          return {
            artist: artist.name,
            popularity: artist.popularity,
            genres: artist.genres.join(', '),
            image: artist.images[0]?.url,
            topTrack: artistTracks.length > 0 ? artistTracks[0].name : undefined
          }
        })

        setTracks(artistsWithTopTracks)
      } catch (error) {
        console.error('Error fetching artists and tracks:', error)
        setError('Failed to load artists and their top tracks')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTracksAndTopSongs()
  }, [spotifyToken, timeRange])

  useEffect(() => {
    async function fetchUserProfile() {
      if (!spotifyToken) return

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${spotifyToken}`,
          },
        })

        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchUserProfile()
  }, [spotifyToken])

  const handleLogout = () => {
    setSpotifyToken(null)
    setAuthCode(null)
    
    router.push('/')
  }

  const processGenres = (tracks: Track[]) => {
    // Create a map to count genre occurrences
    const genreCount = new Map<string, number>()
    
    tracks.forEach(track => {
      const genres = track.genres.split(', ')
      genres.forEach(genre => {
        genreCount.set(genre, (genreCount.get(genre) || 0) + 1)
      })
    })

    // Convert to array and sort by count
    return Array.from(genreCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([genre, count]) => ({
        artist: genre,
        popularity: Math.round((count / tracks.length) * 100),
        genres: '',
        topTrack: undefined
      }))
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1b1e] text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1b1e] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          {/* User Profile Section */}
          {userProfile && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500 mb-4">
                  <Image 
                    src={userProfile.images[0]?.url || '/default-avatar.png'} 
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-white">{userProfile.display_name}</h2>
                <p className="text-gray-400">Spotify Listener</p>
                <div className="mt-2 text-sm text-gray-400">
                  <p>{userProfile.followers.total} followers</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="mt-6 px-6 py-2 bg-black/40 hover:bg-black/60 text-gray-300 rounded-full text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div>
            <ViewToggle view={view} onViewChange={setView} />
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setTimeRange('short_term')}
                className={`px-4 py-2 rounded-full transition-all ${
                  timeRange === 'short_term' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                disabled={isLoading}
              >
                Last 4 Weeks
              </button>
              <button
                onClick={() => setTimeRange('medium_term')}
                className={`px-4 py-2 rounded-full transition-all ${
                  timeRange === 'medium_term' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                disabled={isLoading}
              >
                Last 6 Months
              </button>
              <button
                onClick={() => setTimeRange('long_term')}
                className={`px-4 py-2 rounded-full transition-all ${
                  timeRange === 'long_term' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                disabled={isLoading}
              >
                All Time
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500" />
              </div>
            ) : (
              <TrackList 
                timeRange={timeRange} 
                tracks={view === 'artists' ? tracks : processGenres(tracks)}
                view={view}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 