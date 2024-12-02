"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TrackList } from '@/components/track-list'

interface Track {
  artist: string;
  popularity: number;
  genres: string;
  image?: string;
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [timeRange, setTimeRange] = useState<string>('medium_term')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    async function fetchTracks() {
      if (!spotifyToken) return

      try {
        setIsLoading(true)
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`,
          {
            headers: {
              'Authorization': `Bearer ${spotifyToken}`,
            },
          }
        )

        const data = await response.json()
        
        console.log('Raw API response:', data.items[0])

        const formattedTracks = data.items.map((artist: any) => ({
          artist: artist.name,
          popularity: artist.popularity,
          genres: artist.genres.join(', '),
          image: artist.images[0]?.url
        }))

        console.log('Formatted track:', formattedTracks[0])

        setTracks(formattedTracks)
      } catch (error) {
        console.error('Error fetching artists:', error)
        setError('Failed to load artists')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTracks()
  }, [spotifyToken, timeRange])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            tracks={tracks}
            userProfile={null}
          />
        )}
      </div>
    </div>
  )
}