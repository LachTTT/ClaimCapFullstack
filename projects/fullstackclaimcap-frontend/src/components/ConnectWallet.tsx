import { useWallet, Wallet, WalletId } from "@txnlab/use-wallet-react";
import Account from "./Account";

interface ConnectWalletInterface {
  openModal: boolean;
  closeModal: () => void;
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { wallets, activeAddress } = useWallet();

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300 ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeModal}
    >
      <div
        className={`bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-700/50 transform transition-all duration-300 ${
          openModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">{activeAddress ? "Your Wallet" : "Connect Wallet"}</h3>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-gray-700/50 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {activeAddress ? (
          <div className="mb-6">
            <Account />
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-sm text-gray-400 text-center">Choose a provider to connect your Algorand wallet securely.</p>
          </div>
        )}

        {/* Wallet Options */}
        {!activeAddress && (
          <div className="grid gap-3 mb-6">
            {wallets?.map((wallet) => (
              <button
                key={wallet.id}
                data-test-id={`${wallet.id}-connect`}
                onClick={() => wallet.connect()}
                className="group relative flex items-center justify-center gap-3 py-4 px-4 rounded-xl bg-linear-to-r from-gray-800 to-gray-700 border border-gray-600/50 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                {!isKmd(wallet) && (
                  <img alt={`${wallet.id} icon`} src={wallet.metadata.icon} className="w-8 h-8 object-contain relative z-10" />
                )}
                <span className="text-white font-semibold relative z-10">{isKmd(wallet) ? "LocalNet Wallet" : wallet.metadata.name}</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {activeAddress && (
            <button
              className="w-full py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-[1.02]"
              data-test-id="logout"
              onClick={async () => {
                if (wallets) {
                  const activeWallet = wallets.find((w) => w.isActive);
                  if (activeWallet) {
                    await activeWallet.disconnect();
                  } else {
                    window.location.reload();
                  }
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Disconnect
              </span>
            </button>
          )}

          {!activeAddress && (
            <button
              data-test-id="close-wallet-modal"
              onClick={closeModal}
              className="w-full py-3 px-4 rounded-xl border border-gray-600 bg-gray-800/50 text-gray-300 font-semibold hover:bg-gray-700/50 hover:border-gray-500 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
