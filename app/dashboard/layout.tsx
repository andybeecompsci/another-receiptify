import { Music } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 sticky top-0 bg-gray-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Music className="h-7 w-7 text-emerald-500" />
            <h1 className="text-2xl font-bold tracking-tight">another receiptify</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}

