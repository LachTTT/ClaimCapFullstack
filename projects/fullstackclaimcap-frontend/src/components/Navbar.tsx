interface NavbarProps {
  onConnectWallet: () => void;
  activeAddress?: string | null;
}

export default function Navbar({ onConnectWallet, activeAddress }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">ClaimCap</div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        <li>
          {activeAddress ? (
            <button onClick={onConnectWallet} className="bg-green-600 text-white px-3 py-1 rounded-md">
              {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
            </button>
          ) : (
            <button onClick={onConnectWallet} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
              Connect Wallet
            </button>
          )}
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
