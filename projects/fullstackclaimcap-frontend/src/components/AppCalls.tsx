import { useWallet } from "@txnlab/use-wallet-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ClaimCapFactory } from "../contracts/ClaimCap";
import { OnSchemaBreak, OnUpdate } from "@algorandfoundation/algokit-utils/types/app";
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from "../utils/network/getAlgoClientConfigs";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";

interface AppCallsInterface {
  openModal: boolean;
  setModalState: (value: boolean) => void;
}

const AppCalls = ({ openModal, setModalState }: AppCallsInterface) => {
  const [loading, setLoading] = useState(false);
  const [contractInput, setContractInput] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { transactionSigner, activeAddress } = useWallet();

  const algodConfig = getAlgodConfigFromViteEnvironment();
  const indexerConfig = getIndexerConfigFromViteEnvironment();
  const algorand = AlgorandClient.fromConfig({
    algodConfig,
    indexerConfig,
  });
  algorand.setDefaultSigner(transactionSigner);

  const sendAppCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAddress) {
      enqueueSnackbar("Please connect wallet first", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      const factory = new ClaimCapFactory({
        defaultSender: activeAddress ?? undefined,
        algorand,
      });

      const deployResult = await factory.deploy({
        onSchemaBreak: OnSchemaBreak.AppendApp,
        onUpdate: OnUpdate.AppendApp,
      });

      const response = await deployResult.appClient.send.hello({
        args: { name: contractInput },
      });

      enqueueSnackbar(`Response: ${response.return}`, { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(`Error: ${e.message}`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <h3 className="text-xl font-semibold mb-4 text-center">Say Hello to Your Smart Contract 👋</h3>

        <form onSubmit={sendAppCall} className="space-y-4">
          <input
            type="text"
            placeholder="Type your name here..."
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            value={contractInput}
            onChange={(e) => setContractInput(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalState(false)}
              className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
              disabled={loading}
            >
              Close
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg transition text-white font-medium ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/30"
              }`}
            >
              {loading ? "Sending..." : "Send Call"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppCalls;
