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

      // Create a temporary container
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.width = '400px' // Match the original width
      tempContainer.style.backgroundColor = '#ffffff'
      document.body.appendChild(tempContainer)
      
      // Clone the receipt content
      const receiptClone = receiptElement.cloneNode(true) as HTMLDivElement
      
      // Reset any transforms and preserve styling
      receiptClone.style.transform = 'none'
      receiptClone.style.width = '100%'
      receiptClone.style.maxWidth = '400px'
      receiptClone.style.margin = '0'
      receiptClone.style.backgroundColor = '#ffffff'
      
      // Ensure text styles are preserved
      const allElements = receiptClone.getElementsByTagName('*')
      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i] as HTMLElement
        el.style.color = '#000000'
        el.style.fontFamily = 'monospace'
        
        // Preserve line breaks and whitespace
        el.style.whiteSpace = 'pre-wrap'
        el.style.wordBreak = 'break-word'
      }
      
      tempContainer.appendChild(receiptClone)

      // Generate image
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedReceipt = clonedDoc.querySelector('#receipt')
          if (clonedReceipt) {
            Array.from(clonedReceipt.getElementsByTagName('*')).forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.color = '#000000'
                el.style.fontFamily = 'monospace'
                el.style.whiteSpace = 'pre-wrap'
                el.style.wordBreak = 'break-word'
              }
            })
          }
        }
      })

      // Clean up
      document.body.removeChild(tempContainer)

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
          text: 'Check out my Spotify listening history!\n\nAdd the Link sticker in Instagram: https://spotify-heatmap.vercel.app'
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
      className="mt-4 w-full max-w-[400px] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
    >
      {isGenerating ? 'Generating...' : 'Share Receipt'}
    </button>
  )
} 