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
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">ClaimCap NFT Market</h2>
      <p className="mb-2">
        Connected wallet: <span className="font-mono">{activeAddress || "Not connected"}</span>
      </p>
      <p className="mb-4">Total NFTs claimed: {claimCount}</p>

      <div className="flex flex-col gap-2">
        <button className="btn btn-primary" onClick={callHello}>
          Say Hello
        </button>
        <button className="btn btn-secondary" onClick={getClaimCount}>
          Refresh Claim Count
        </button>
      </div>

      <p className="mt-4 text-green-600">{message}</p>
    </div>
  );
};

export default ClaimCapApp;
