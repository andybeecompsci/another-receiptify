'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Callback() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const error = urlParams.get('error')

    if (error) {
      console.error('Authentication error:', error)
      setError(error)
      return
    }

    if (code) {
      try {
        localStorage.setItem('spotify_auth_code', code)
        router.push('/')
      } catch (err) {
        console.error('Error storing auth code:', err)
        setError('Failed to store authentication code')
      }
    } else {
      console.error('No authorization code received')
      setError('No authorization code received')
    }
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Error: {error}. Please try logging in again.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
}

