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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 ">
        {activeAddress ? (
          <div className="mb-4">
            <Account />
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">Connect Your Wallet</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Choose a provider to connect your Algorand wallet.</p>
          </div>
        )}

        {!activeAddress && (
          <div className="grid gap-3">
            {wallets?.map((wallet) => (
              <button
                key={wallet.id}
                data-test-id={`${wallet.id}-connect`}
                onClick={() => wallet.connect()}
                className="flex items-center justify-center gap-1 py-3 rounded-xl border border-teal-700 hover:bg-teal-800/40  transition-all duration-200"
              >
                {!isKmd(wallet) && <img alt={`${wallet.id} icon`} src={wallet.metadata.icon} className="w-7 h-7 object-contain mr-1" />}
                <span className="text-teal-800 dark:text-teal-300 font-semibold">
                  {isKmd(wallet) ? "LocalNet Wallet" : wallet.metadata.name}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {activeAddress && (
            <button
              className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200"
              data-test-id="logout"
              onClick={async () => {
                if (wallets) {
                  const activeWallet = wallets.find((w) => w.isActive);
                  if (activeWallet) {
                    await activeWallet.disconnect();
                  } else {
                    localStorage.removeItem("@txnlab/use-wallet:v3");
                    window.location.reload();
                  }
                }
              }}
            >
              Logout
            </button>
          )}

          <button
            data-test-id="close-wallet-modal"
            onClick={closeModal}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300
             bg-white text-gray-700 font-semibold
             hover:bg-gray-100 hover:border-gray-400
             dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700
             dark:hover:bg-gray-800 dark:hover:border-gray-600
             transition-all duration-200 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
