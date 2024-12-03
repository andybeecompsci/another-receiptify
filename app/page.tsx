import { LoginButton } from "@/components/login-button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      {/* EFTPOS Machine */}
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all">
        {/* Screen section */}
        <div className="bg-[#2d3436] p-8 border-b-4 border-gray-700">
          <div className="bg-[#86b049] p-6 rounded-lg space-y-4 font-mono">
            <h1 className="text-2xl font-bold text-center">PAYMENT TERMINAL</h1>
            <div className="text-center space-y-1">
              <p className="text-sm">AMOUNT DUE:</p>
              <p className="text-3xl font-bold">$0.00</p>
            </div>
            <p className="text-sm text-center mt-4">Please login with Spotify to proceed</p>
            <p className="text-[10px] text-center">(This isn't taking your money, it's a gimmick)</p>
          </div>
        </div>
        
        {/* Keypad section */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <LoginButton />
            <a 
              href="/lame"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-mono py-3 px-6 rounded-lg border-2 border-red-700 shadow-lg transform active:scale-95 transition-all text-lg text-center"
            >
              BE LAME
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Powered by another receiptify
          </p>
        </div>
      </div>
    </div>
  )
}

