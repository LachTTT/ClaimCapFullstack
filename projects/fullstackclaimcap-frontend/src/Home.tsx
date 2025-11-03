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
    <div className="min-vh-100 d-flex align-items-center bg-teal-400 bg-gradient">
      <Navbar onConnectWallet={toggleWalletModal} activeAddress={activeAddress} />

      <div className="container text-center mt-5">
        <div className="mx-auto bg-white shadow-lg rounded-4 p-5">
          <h1 className="display-5 fw-bold mb-3">
            Welcome to <span className="text-primary">Claim Cap</span>
          </h1>

          {/* (You can now remove the old Connect Wallet button here if you want) */}

          {activeAddress && (
            <>
              <button data-test-id="transactions-demo" className="btn btn-outline-success" onClick={toggleDemoModal}>
                Transactions Demo
              </button>

              <button data-test-id="appcalls-demo" className="btn btn-outline-info" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
              </button>

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
