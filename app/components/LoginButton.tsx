'use client'

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || 'https://another-receiptify-mzf9-andybeecompsci-projects.vercel.app/callback'
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played'
]

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`

export function LoginButton() {
  return (
    <a 
      href={AUTH_URL}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Login with Spotify
    </a>
  )
} 