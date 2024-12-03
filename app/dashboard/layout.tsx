import { Github } from 'lucide-react'

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
      <footer className="w-full border-t border-gray-800 py-4">
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-gray-500">anderson bee</p>
          <a 
            href="https://github.com/andybeecompsci" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-400 transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
      </footer>
    </div>
  )
}

