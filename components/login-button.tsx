"use client"

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI
const SCOPES = [
  'user-top-read',
  'user-read-recently-played',
  'user-read-private',
  'user-read-email'
].join(' ')

export function LoginButton() {
  const handleLogin = () => {
    if (!SPOTIFY_CLIENT_ID || !REDIRECT_URI) {
      console.error('Missing required environment variables')
      return
    }

    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      show_dialog: 'true'
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
    >
      Login with Spotify
    </button>
  )
}

