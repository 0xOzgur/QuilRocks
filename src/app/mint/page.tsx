'use client';

import React, { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [mintNumber, setMintNumber] = useState(1); // Starting mint number
  const [mintQuantity, setMintQuantity] = useState(1); // State to track mint quantity
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = () => {
    // Logic to connect wallet
    setIsWalletConnected(true);
  };

  const mintNFT = () => {
    // Logic to mint NFT based on mintQuantity
    console.log(`Minting ${mintQuantity} NFT(s) starting from #${mintNumber}`);
    // Increment mint number after minting by mintQuantity
    setMintNumber(mintNumber + mintQuantity);
  };

  return (
    <>
      <main className="main-flex">
        <div className="header-container">
          <div className="header-logo text-sm">
            <div className="fixed-head lg:size-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://quilrocks.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logo2.png"
                  alt="QuilRocks Logo"
                  className="dark:invert"
                  width={200}
                  height={24}
                  priority
                />
              </a>
            </div>
            <div className="header">
              <nav className="container mx-auto flex justify-between">
                <ul className="header-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/mint">Mint</a></li>
                <li><a href="/collection">Collection</a></li>
                <li><a href="/my-rocks">My Rocks</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="main-container">
          <div className='container1'>
            
            <div className='mint-left1'>
              <h2>Rock Container Sample</h2>
            </div>

            <div className="mint-right1"></div>
          </div>
          <div className="footer">Made with ❤️ by <b><a href="https://www.xxxx.com" className="group">XXXXX</a></b> Lovers</div>
        </div>
      </main>
    </>
  );
}