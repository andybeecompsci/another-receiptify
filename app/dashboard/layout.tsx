import { Music } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1a1b1e] text-white flex flex-col">
      <header className="border-b border-gray-800 sticky top-0 bg-[#1a1b1e]/95 backdrop-blur-sm">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">another receiptify</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full px-4 py-8 flex flex-col items-center">
        {children}
      </main>
    </div>
  )
}

