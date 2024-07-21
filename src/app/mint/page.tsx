'use client';

import React, { useState } from 'react';
import Image from "next/image";
import MintCountdown from './MintCountdown';
import './mintPage.css';


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

  // Function to handle change in mint amount
  const handleMintAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.min(Math.max(parseInt(event.target.value) || 1, 1), 10);
    setMintQuantity(quantity);
  };

  // Calculate mint cost dynamically
  const mintCost = mintQuantity * 100; // Assuming 100 Quil per NFT

  return (
    <>
      <main className="main-flex">
        <div className="header-container">
          <div className="header-logo text-sm">
            <div className="fixed-head lg:size-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://app.quilrocks.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/logo2.png"
                  alt="QuilRocks Logo"
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
          <div className='container1-mint'>
            
            <div className='mint-left1'>
              
              </div>

              <div className="mint-right1">
              
              <h2 className='public-mint'>Public Mint is <span className='success'>Live</span></h2>


              <MintCountdown />

              <div className='max-wallet'>10 Max Per Wallet</div>
            
              <div className="price-container">
              <div className="price-column">
                <p className="price-text">Price:</p>
                <div className="price-text2">{mintQuantity * 100} QUIL</div>
              </div>

              <div className="remaining-column">
                <p className="Remaining">Remaining:</p>
                <div className="Remaining-no">634/2024</div>
              </div>
              </div>

              <div className="col-12 col-sm-auto text-light"> Quantity: </div>

              <div className="col-auto col-sm-4">
              <div className="input-group form-dark">
                <button type="button" className="input-group-text bg-transparent border-0 text-light text-5" onClick={() => setMintQuantity(Math.max(1, mintQuantity - 1))}>-</button>
                <input 
                  type="number" 
                  id="nft-amount" 
                  className="form-control text-center bg-transparent rounded-4" 
                  value={mintQuantity} 
                  onChange={handleMintAmountChange}
                  min="1"
                  max="10"
                />
                <button type="button" className="input-group-text bg-transparent border-0 text-light text-5" onClick={() => setMintQuantity(Math.min(10, mintQuantity + 1))}>+</button>
              </div>
            </div>

<div className="d-grid">
  <button className="mint-button" onClick={mintNFT} disabled={!isWalletConnected}>
    {isWalletConnected ? 'Mint Now' : 'Connect Wallet to Mint'}
  </button>
</div>

            </div>
            
          </div>
          <div className="footer">Made with ❤️ by <b><a href="https://www.quilibrium.com" className="group">Quilibrium</a></b> Lovers</div>
        </div>
      </main>
    </>
  );
}