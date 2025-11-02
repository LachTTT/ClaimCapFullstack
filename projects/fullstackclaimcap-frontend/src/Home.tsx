import { useWallet } from "@txnlab/use-wallet-react";
import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import Transact from "./components/Transact";
import AppCalls from "./components/AppCalls";
import ClaimCapApp from "./components/ClaimCapApp";

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
    <div className="min-vh-100 d-flex align-items-center bg-teal-400 bg-gradient" style={{ backgroundColor: "#20c997" }}>
      <div className="container text-center">
        <div className="mx-auto bg-white shadow-lg rounded-4 p-5" style={{ maxWidth: "480px" }}>
          <h1 className="display-5 fw-bold mb-3">
            Welcome to <span className="text-primary">AlgoKit 🙂</span>
          </h1>
          <p className="text-muted mb-4">
            This starter has been generated using the official AlgoKit React template. Refer to the resource below for next steps.
          </p>

          <div className="d-grid gap-3">
            <a
              data-test-id="getting-started"
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/algorandfoundation/algokit-cli"
            >
              Getting Started
            </a>

            <hr className="my-2" />

            <button data-test-id="connect-wallet" className="btn btn-outline-primary" onClick={toggleWalletModal}>
              Connect Wallet
            </button>

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
          </div>

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
        </div>
      </div>
    </div>
  );
};

export default Home;
