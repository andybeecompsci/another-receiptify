"use client"

import { useState } from 'react'
import html2canvas from 'html2canvas'

export function ShareButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleShare = async () => {
    try {
      setIsGenerating(true)
      
      // Find the receipt element with proper type assertion
      const receiptElement = document.querySelector('#receipt') as HTMLDivElement
      if (!receiptElement) return

      // Generate image
      const canvas = await html2canvas(receiptElement, {
        backgroundColor: '#1a1b1e',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      })

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!)
        }, 'image/png', 1.0)
      })

      // Create file
      const file = new File([blob], 'receiptify.png', { type: 'image/png' })

      // Check if Web Share API is available and properly type the navigator.share check
      if (navigator.share && typeof navigator.share === 'function') {
        await navigator.share({
          files: [file],
          title: 'My Spotify Receiptify',
          text: 'Check out my top artists on Spotify!'
        })
      } else {
        // Fallback for desktop or unsupported browsers
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'receiptify.png'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
    >
      {isGenerating ? 'Generating...' : 'Share Receipt'}
    </button>
  )
} 