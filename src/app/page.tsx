'use client' // 👈 use it here

import { useState } from 'react';
import Image from "next/image";
import nfts from './nfts.json';


export default function Home() {
  const uniqueCategories = new Set(nfts.map(nft => nft.rarity));
  const [selectedRarity, setSelectedRarity] = useState('');

  // Function to handle category click
  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
  };

  // Filter projects based on selected category
  const filteredNfts = selectedRarity
    ? nfts.filter(nft => nft.rarity === selectedRarity)
    : nfts;

  return (
    <>
      <main className="main-flex">
        <div className="header-logo text-sm">
          <div className="fixed-head lg:size-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://quilibrium.space"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.png"
                alt="Quilibrium Logo"
                className="dark:invert"
                width={200}
                height={24}
                priority
              />
            </a><div className="header"><b>Rocks</b></div>
          </div>
          <header>
            <nav className="container mx-auto flex justify-between">
              <ul className="header-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/learn">Mint</a></li>
                <li><a href="/build">Collection</a></li>
                <li><a href="/build">Buy-Sell</a></li>
              </ul>
            </nav>
          </header>
        </div>

        <div class="main-container">

      <div className="content-container">
      
        <div className="filter">Rarity: 
  <span className="filter-rarity"  onClick={() => setSelectedRarity('')} style={{cursor: 'pointer', textDecoration: 'underline'}} >All</span>
  {[...uniqueCategories].map((rarity, index) => (
    <span 
      key={index} 
      className="filter-rarity" 
      onClick={() => handleRarityClick(rarity)} 
      style={{cursor: 'pointer'}}>
      {rarity}
    </span>
  ))}
</div>


<div className="cards-container">
  {filteredNfts.map((nft, index) => (
    <div key={index} className="card">
      <div className="flex">
        <img src={nft.image} className="nft-image" />
      </div>
      <h3 className="card-title">
          <span>{nft.title}</span>
        </h3>
        <p className="card-content">Owner</p>
        <button className="buy-btn">Buy</button>

    </div>
  ))}
</div>
        </div>
        <div className="footer">Made with ❤️ by <b><a href="https://www.quilibrium.com" className="group">Quilibrium</a> </b>Lovers</div></div>
      </main>
    </>
  );
}