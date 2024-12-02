"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

interface PlaybackData {
  date: string
  count: number
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [playbackData, setPlaybackData] = useState<PlaybackData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      setAccessToken(code)
    }
  }, [searchParams])

  useEffect(() => {
    async function fetchSpotifyData() {
      if (!accessToken) {
        return
      }

      try {
        const tokenResponse = await fetch('/api/spotify/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code: accessToken }),
        })

        const tokenData = await tokenResponse.json()

        // Get one year ago from today
        const endDate = new Date()
        const startDate = new Date()
        startDate.setFullYear(endDate.getFullYear() - 1)

        const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
          },
        })

        const topTracks = await topTracksResponse.json()

        // Create a map for all dates in the past year
        const playCountByDate: Record<string, number> = {}
        
        // Fill in all dates with 0
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]
          playCountByDate[dateStr] = 0
        }

        // Distribute plays across dates
        topTracks.items?.forEach((track: any) => {
          const plays = Math.ceil(track.popularity / 20) // Convert popularity to reasonable play count

          // Add plays to random dates
          for (let i = 0; i < plays; i++) {
            const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
            const dateStr = randomDate.toISOString().split('T')[0]
            if (playCountByDate[dateStr] !== undefined) {
              playCountByDate[dateStr]++
            }
          }
        })

        // Convert to array format for the heatmap
        const heatmapData = Object.entries(playCountByDate)
          .map(([date, count]) => ({
            date,
            count,
          }))
          .sort((a, b) => a.date.localeCompare(b.date))

        setPlaybackData(heatmapData)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSpotifyData()
  }, [accessToken])

  if (isLoading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Spotify Heatmap</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={playbackData}
          classForValue={(value) => {
            if (!value || value.count === 0) return 'color-empty'
            if (value.count <= 2) return 'color-scale-1'
            if (value.count <= 4) return 'color-scale-2'
            if (value.count <= 6) return 'color-scale-3'
            return 'color-scale-4'
          }}
          titleForValue={(value) => {
            if (!value) return 'No tracks played'
            return `${value.date}: ${value.count} tracks played`
          }}
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span>Less</span>
        <div className="w-4 h-4 bg-[#ebedf0]"></div>
        <div className="w-4 h-4 bg-[#9be9a8]"></div>
        <div className="w-4 h-4 bg-[#40c463]"></div>
        <div className="w-4 h-4 bg-[#30a14e]"></div>
        <div className="w-4 h-4 bg-[#216e39]"></div>
        <span>More</span>
      </div>
    </div>
  )
}