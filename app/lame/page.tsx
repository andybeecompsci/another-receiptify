export default function LamePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-2xl w-full p-4 text-center">
        <img 
          src="/thumbs-down.jpg" 
          alt="Thumbs down" 
          className="w-96 h-96 mx-auto"
        />
        <a 
          href="/"
          className="mt-8 inline-block text-sm text-gray-500 hover:text-gray-400 underline"
        >
          go back
        </a>
      </div>
    </div>
  )
} 