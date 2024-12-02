import { LoginButton } from "@/components/login-button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="text-center space-y-8 p-8 rounded-lg bg-black/10 backdrop-blur-sm">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">another receiptify</h1>
          <p className="text-lg text-white/80">
            Visualize your Spotify listening habits
          </p>
        </div>
        <LoginButton />
      </div>
    </div>
  )
}

