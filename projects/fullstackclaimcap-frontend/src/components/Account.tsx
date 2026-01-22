import { useWallet } from "@txnlab/use-wallet-react";
import { useMemo } from "react";
import { ellipseAddress } from "../utils/ellipseAddress";
import { getAlgodConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";

const Account = () => {
  const { activeAddress } = useWallet();
  const algoConfig = getAlgodConfigFromViteEnvironment();

  const networkName = useMemo(() => {
    return algoConfig.network === "" ? "localnet" : algoConfig.network.toLocaleLowerCase();
  }, [algoConfig.network]);

  const networkColor = useMemo(() => {
    switch (networkName) {
      case "mainnet":
        return "from-green-500 to-emerald-600";
      case "testnet":
        return "from-blue-500 to-cyan-600";
      case "localnet":
        return "from-purple-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  }, [networkName]);

  return (
    <div className="space-y-4">
      {/* Account Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Connected Account</h3>
          <p className="text-xs text-gray-400">Your Algorand wallet</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Wallet Address</label>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://lora.algokit.io/${networkName}/account/${activeAddress}/`}
          className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-linear-to-r from-gray-800 to-gray-700 border border-gray-600/50 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
        >
          <span className="text-white font-mono text-xs break-all">{activeAddress}</span>
          <div className="flex items-center gap-2 shrink-0">
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </a>
      </div>

      {/* Network Badge */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Network</label>
        <div className="flex items-center justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r ${networkColor} shadow-lg`}>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-white font-semibold text-sm capitalize">{networkName}</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xs text-blue-300">Click the address to view your account details on the explorer</p>
      </div>
    </div>
  );
};

export default Account;
