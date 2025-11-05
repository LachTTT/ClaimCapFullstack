interface NavbarProps {
  onConnectWallet: () => void;
  activeAddress?: string | null;
}

export default function Navbar({ onConnectWallet, activeAddress }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white px-8 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">ClaimCap</div>

      {/* Menu */}
      <div className="">
        {activeAddress ? (
          <button
            onClick={onConnectWallet}
            className="border text-white text-xs px-6 py-2 rounded-xl transition-transform hover:scale-105 hover:shadow-[0_4px_20px_0_rgba(251,191,36,0.6)]"
          >
            {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
          </button>
        ) : (
          <button
            onClick={onConnectWallet}
            className="border text-white text-xs px-6 py-2 rounded-xl transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.6)]"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
