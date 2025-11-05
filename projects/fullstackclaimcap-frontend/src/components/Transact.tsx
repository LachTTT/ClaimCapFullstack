import { algo, AlgorandClient } from "@algorandfoundation/algokit-utils";
import { useWallet } from "@txnlab/use-wallet-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { getAlgodConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";

interface TransactInterface {
  openModal: boolean;
  setModalState: (value: boolean) => void;
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");

  const algodConfig = getAlgodConfigFromViteEnvironment();
  const algorand = AlgorandClient.fromConfig({ algodConfig });
  const { enqueueSnackbar } = useSnackbar();
  const { transactionSigner, activeAddress } = useWallet();

  const handleSubmitAlgo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionSigner || !activeAddress) {
      enqueueSnackbar("Please connect wallet first", { variant: "warning" });
      return;
    }
    if (receiverAddress.length !== 58) {
      enqueueSnackbar("Invalid receiver address", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      enqueueSnackbar("Sending transaction...", { variant: "info" });
      const result = await algorand.send.payment({
        signer: transactionSigner,
        sender: activeAddress,
        receiver: receiverAddress,
        amount: algo(1),
      });

      enqueueSnackbar(`✅ Transaction sent: ${result.txIds[0]}`, { variant: "success" });
      setReceiverAddress("");
      setModalState(false);
    } catch (e: any) {
      enqueueSnackbar(`❌ Failed to send transaction: ${e.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-2">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <h3 className="text-xl font-semibold mb-2 text-center">💸 Send Payment Transaction</h3>
        <p className="text-gray-400 text-sm mb-6 text-center">
          You’ll send <span className="text-amber-400 font-medium">1 ALGO</span> to the receiver address below.
        </p>

        <form onSubmit={handleSubmitAlgo} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Receiver Wallet Address</label>
            <input
              type="text"
              data-test-id="receiver-address"
              placeholder="Paste receiver wallet address here"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalState(false)}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              data-test-id="send-algo"
              disabled={loading || receiverAddress.length !== 58}
              className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                loading || receiverAddress.length !== 58
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/30"
              }`}
            >
              {loading ? "Sending..." : "Send 1 ALGO"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transact;
