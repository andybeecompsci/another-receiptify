import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/auth/callback'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    
    console.log('Attempting token exchange with code:', code)

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!
    })

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    })

    const data = await response.json()
    console.log('Spotify token response:', data)

    if (data.error) {
      console.error('Spotify API error:', data)
      return NextResponse.json(data, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Token exchange error:', error)
    return NextResponse.json(
      { error: 'Failed to exchange token' }, 
      { status: 500 }
    )
  }
} 