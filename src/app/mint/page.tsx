'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Layout from '../../components/layout/Layout';
import MintCountdown from './MintCountdown';
import './mintPage.css';
import { useAuth } from '../../context/AuthContext';

export default function MintPage() {
  const [mintNumber, setMintNumber] = useState(1);
  const [mintQuantity, setMintQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  const { isAuthenticated, balance, login } = useAuth();

  const handlePasskeyAuth = async () => {
    await login();
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

  const handleQuantityChange = (change: number | string) => {
    setMintQuantity((prevQuantity) => {
      let newQuantity: number;
      if (typeof change === 'number') {
        // Buton tıklamaları için
        newQuantity = prevQuantity + change;
      } else {
        // Input değişiklikleri için
        newQuantity = parseInt(change, 10);
      }
      // Geçerli bir sayı değilse, mevcut değeri koru
      if (isNaN(newQuantity)) {
        return prevQuantity;
      }
      // 1 ile 10 arasında sınırla
      return Math.max(1, Math.min(newQuantity, 10));
    });
  };

  const getButtonText = () => {
    if (isMinting) return 'Minting...';
    if (isAuthenticated) return 'Mint Now';
    return 'Create Account / Sign In';
  };

  return (
    <Layout>
      <div className='container1-mint'>
        <div className='mint-left1'>
          İmage Rotator
        </div>

        <div className="mint-right1">
          <h2 className='public-mint'>Public Mint is <span className='success'>Live</span></h2>

          <MintCountdown />

          <div className="max-wallet">10 Max Per Account</div>
        
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
              className={`mint-button ${isMinting ? 'loading' : ''}`}
              onClick={isAuthenticated ? mintNFT : handlePasskeyAuth}
              disabled={isMinting}
            >
              {getButtonText()}
            </button>
          </div>

          {isAuthenticated && (
            <div className="account-balance">
              Account Balance: {balance} Q
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}