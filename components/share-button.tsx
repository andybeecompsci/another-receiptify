"use client"

import { useState } from 'react'
import html2canvas from 'html2canvas'

export function ShareButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleShare = async () => {
    try {
      setIsGenerating(true)
      
      // Find the receipt element
      const receiptElement = document.querySelector('#receipt') as HTMLDivElement
      if (!receiptElement) return

      // Create a temporary container for the story version
      const storyContainer = document.createElement('div')
      storyContainer.style.position = 'absolute'
      storyContainer.style.left = '-9999px'
      // Instagram Story dimensions (1080 x 1920)
      storyContainer.style.width = '1080px'
      storyContainer.style.height = '1920px'
      storyContainer.style.backgroundColor = '#ffffff'
      storyContainer.style.display = 'flex'
      storyContainer.style.alignItems = 'center'
      storyContainer.style.justifyContent = 'center'
      
      // Clone the receipt content
      const receiptClone = receiptElement.cloneNode(true) as HTMLDivElement
      // Calculate scale to fit receipt in Instagram story width with padding
      receiptClone.style.transform = 'scale(0.85)'
      receiptClone.style.transformOrigin = 'top center'
      receiptClone.style.backgroundColor = '#ffffff'
      receiptClone.style.width = '900px' // Slightly smaller than story width
      receiptClone.style.margin = '100px auto'
      receiptClone.style.padding = '20px'
      receiptClone.style.boxSizing = 'border-box'
      
      // Make all text black
      const allText = receiptClone.querySelectorAll('*')
      allText.forEach((element: Element) => {
        const el = element as HTMLElement
        el.style.color = '#000000'
        el.style.whiteSpace = 'pre'
      })
      
      // Add to temporary container
      storyContainer.appendChild(receiptClone)
      document.body.appendChild(storyContainer)

      // Generate image
      const canvas = await html2canvas(storyContainer, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        width: 1080,
        height: 1920,
        onclone: (doc) => {
          const clonedReceipt = doc.querySelector('#receipt')
          if (clonedReceipt) {
            Array.from(clonedReceipt.getElementsByTagName('*')).forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.color = '#000000'
                el.style.whiteSpace = 'pre'
              }
            })
          }
        }
      })

      // Clean up
      document.body.removeChild(storyContainer)

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!)
        }, 'image/png', 1.0)
      })

      // Create file
      const file = new File([blob], 'spotify-receipt.png', { type: 'image/png' })

      // Share or download
      if (navigator.share && typeof navigator.share === 'function') {
        await navigator.share({
          files: [file],
          title: 'My Spotify Receipt',
          text: 'Check out my Spotify listening history!'
        })
      } else {
        // Fallback for desktop
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'spotify-receipt.png'
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