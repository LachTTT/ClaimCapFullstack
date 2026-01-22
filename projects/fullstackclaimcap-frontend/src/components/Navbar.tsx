interface NavbarProps {
  onConnectWallet: () => void;
  activeAddress?: string | null;
}

export default function Navbar({ onConnectWallet, activeAddress }: NavbarProps) {
  return (
    <nav className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between border-b border-gray-700/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ClaimCap
        </span>
      </div>

      {/* Connect Button */}
      <div>
        {activeAddress ? (
          <button
            onClick={onConnectWallet}
            className="relative group bg-linear-to-r from-green-600 to-emerald-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300 hover:from-green-500 hover:to-emerald-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">
                {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
              </span>
              <span className="sm:hidden">
                {activeAddress.slice(0, 4)}...{activeAddress.slice(-3)}
              </span>
            </span>
          </button>
        ) : (
          <button
            onClick={onConnectWallet}
            className="relative group bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        )}
      </div>
    </nav>
  );
}
