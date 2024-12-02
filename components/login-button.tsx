"use client"

import { Button } from "@/components/ui/button"
import { Music } from 'lucide-react'

export function LoginButton() {
  const handleLogin = () => {
    const clientId = "2324440c113644eaa54ecd7a52a30d7e"
    const redirectUri = "http://localhost:3000/api/auth/callback"
    const scope = "user-read-recently-played user-top-read"
    
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scope,
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  return (
    <Button 
      onClick={handleLogin}
      size="lg" 
      className="bg-green-500 hover:bg-green-600 text-white"
    >
      <Music className="mr-2 h-5 w-5" />
      Login with Spotify
    </Button>
  )
}

