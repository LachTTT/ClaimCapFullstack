import React, { useState } from "react";
import algosdk, {
  Algodv2,
  AtomicTransactionComposer,
  makeApplicationCallTxnFromObject,
  OnApplicationComplete,
  Transaction,
  TransactionSigner,
} from "algosdk";
import { useWallet } from "@txnlab/use-wallet-react";

interface ClaimCapAppProps {
  appId: number; // your deployed app ID
}

const ClaimCapApp: React.FC<ClaimCapAppProps> = ({ appId }) => {
  const { activeAddress, algodClient, transactionSigner } = useWallet();
  const [message, setMessage] = useState<string>("");
  const [claimCount, setClaimCount] = useState<number>(0);

  const algod = new Algodv2("", "https://testnet-api.algonode.cloud", "");

  // 🔹 Example: call "hello" method
  const callHello = async () => {
    if (!activeAddress) {
      setMessage("Please connect wallet first");
      return;
    }

    try {
      const sp = await algod.getTransactionParams().do();

      const method = new algosdk.ABIMethod({
        name: "hello",
        args: [{ type: "string" }],
        returns: { type: "string" },
      });

      const atc = new algosdk.AtomicTransactionComposer();

      const userName = "Michael"; // your name or dynamic input

      atc.addMethodCall({
        appID: appId,
        method,
        methodArgs: [userName],
        sender: activeAddress,
        suggestedParams: sp,
        signer: transactionSigner,
      });

      const result = await atc.execute(algod, 3);

      let returned = result.methodResults[0].returnValue as string;

      // 🔹 Replace placeholder {name} with actual userName
      returned = returned.replace("{name}", userName);

      setMessage("✅ " + returned);
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Error calling hello: " + err.message);
    }
  };

  // 🔹 Example: read claim count from global state
  const getClaimCount = async () => {
    try {
      const appInfo = await algod.getApplicationByID(appId).do();
      const globalState = appInfo.params.globalState || [];

      const claimCountKey = globalState.find((g: any) => Buffer.from(g.key, "base64").toString() === "claim_count");

      if (claimCountKey) {
        const count = claimCountKey.value.uint ?? 0;
        setClaimCount(Number(count));
      } else {
        setClaimCount(0);
      }
    } catch (err) {
      console.error(err);
      setClaimCount(0);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl p-2">ClaimCap NFT Market</h2>

      <p className="p-2">Total NFTs claimed: {claimCount}</p>

      <div className="flex gap-2 p-2 justify-center">
        <button
          className="border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-md transition"
          onClick={callHello}
        >
          Say Hello
        </button>
        <button
          className="border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-md transition"
          onClick={getClaimCount}
        >
          Refresh Claim Count
        </button>
      </div>

      <p className="text-green-600">{message}</p>
    </div>
  );
};

export default ClaimCapApp;
