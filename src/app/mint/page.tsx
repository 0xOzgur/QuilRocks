'use client';

import React, { useState } from 'react';
import Image from "next/image";
import MintCountdown from './MintCountdown';
import './mintPage.css';

export default function Home() {
  const [mintNumber, setMintNumber] = useState(1);
  const [mintQuantity, setMintQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const handlePasskeyAuth = async () => {
    setIsLoading(true);
    // Simüle edilmiş passkey oluşturma süreci
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 2000); // 2 saniye sonra işlem tamamlanacak
  };

  const mintNFT = () => {
    if (!isAuthenticated) {
      console.error("User not authenticated");
      return;
    }
    setIsMinting(true);
    // Simüle edilmiş mint işlemi
    setTimeout(() => {
      console.log(`Minted ${mintQuantity} NFT(s) starting from #${mintNumber}`);
      setMintNumber(mintNumber + mintQuantity);
      setIsMinting(false);
    }, 3000); // 3 saniye sonra işlem tamamlanacak
  };

  const handleQuantityChange = (change) => {
    if (typeof change === 'number') {
      setMintQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + change;
        return Math.max(1, Math.min(newQuantity, 10));
      });
    } else {
      const value = parseInt(change, 10);
      if (!isNaN(value)) {
        setMintQuantity(Math.max(1, Math.min(value, 10)));
      }
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Creating Account...';
    if (isMinting) return 'Minting...';
    if (isAuthenticated) return 'Mint Now';
    return 'Create Account / Sign In';
  };

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

              <div className="max-wallet">10 Max Per Wallet</div>
            
              <div className="price-container">
              <div className="price-column">
                <div className="price-inner">
                  <p className="price-text">PRICE:</p>
                  <div className="price-text2">{mintQuantity * 100} QUIL</div>
                </div>
              </div>

              <div className="remaining-column">
                  <div className="remaining-inner">
                    <p className="Remaining">REMAINING:</p>
                    <div className="Remaining-no">634/2024</div>
                  </div>
                </div>
              </div>
              <div className="quantity-container">
                <span className="quantity-label">Quantity:</span>
                <div className="quantity-input-container">
                  <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
                  <input
                    type="number"
                    value={mintQuantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    max="10"
                  />
                  <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              <div className="d-grid">
              <button 
                  className={`mint-button ${isLoading || isMinting ? 'loading' : ''}`}
                  onClick={isAuthenticated ? mintNFT : handlePasskeyAuth}
                  disabled={isLoading || isMinting}
                >
                  {getButtonText()}
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