import { Suspense } from 'react'
import { CallbackClient } from './client'

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <CallbackClient />
    </Suspense>
  )
}

