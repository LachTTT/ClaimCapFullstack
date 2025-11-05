import { useWallet } from "@txnlab/use-wallet-react";
import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Transact from "./components/Transact";
import AppCalls from "./components/AppCalls";
import ClaimCapApp from "./components/ClaimCapApp";
import Navbar from "./components/Navbar";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false);
  const { activeAddress } = useWallet();

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal);
  };

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal);
  };

  return (
    <div className="">
      <Navbar onConnectWallet={toggleWalletModal} activeAddress={activeAddress} />

      <div className="container text-center p-2 ">
        <div>
          <h1 className="text-6xl p-2 font-bold">Welcome to Claim Cap</h1>

          {/* (You can now remove the old Connect Wallet button here if you want) */}

          {activeAddress && (
            <>
              <div className="flex justify-center gap-3 p-2">
                <button
                  onClick={toggleDemoModal}
                  className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition"
                >
                  Transactions Demo
                </button>

                <button
                  onClick={toggleAppCallsModal}
                  className="border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-md transition"
                >
                  Contract Interactions Demo
                </button>
              </div>

              <div className="mt-4">
                <ClaimCapApp appId={748997121} />
              </div>
            </>
          )}

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
