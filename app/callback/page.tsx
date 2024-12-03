'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    // Get the authorization code from URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      // Store the code in localStorage or state management
      localStorage.setItem('spotify_auth_code', code)
      
      // Redirect to main page or wherever you handle the token exchange
      router.push('/')
    } else {
      // Handle error case
      console.error('No authorization code received')
      router.push('/error')
    }
  }, [router])

  return <div>Loading...</div>
}

