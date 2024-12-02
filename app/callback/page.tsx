"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const code = searchParams.get("code")
    
    if (code) {
      // Store the code temporarily
      sessionStorage.setItem("spotify_auth_code", code)
      // Redirect to the main app
      router.push("/dashboard")
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-lg">
        Authenticating...
      </div>
    </div>
  )
}

