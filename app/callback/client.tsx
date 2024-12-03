"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function CallbackClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const code = searchParams.get("code")
    
    if (code) {
      // Redirect to dashboard with the code
      router.push(`/dashboard?code=${code}`)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
} 