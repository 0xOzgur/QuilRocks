'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from "next/image";
import nfts from './nfts.json';

export default function Home() {
  const uniqueRarities = new Set(nfts.map(nft => nft.rarity));
  const [selectedRarity, setSelectedRarity] = useState('');
  const [displayedNfts, setDisplayedNfts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const nftsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState('');

  const loadMoreNfts = useCallback(() => {
    const filteredNfts = nfts.filter(nft => 
      (selectedRarity === '' || nft.rarity === selectedRarity) &&
      (searchTerm === '' || nft.rockNo.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const startIndex = page * nftsPerPage;
    const endIndex = startIndex + nftsPerPage;
    const newNfts = filteredNfts.slice(startIndex, endIndex);

    if (page === 0) {
      setDisplayedNfts(newNfts);
    } else {
      setDisplayedNfts(prevNfts => [...prevNfts, ...newNfts]);
    }

    setHasMore(newNfts.length === nftsPerPage);
  }, [selectedRarity, searchTerm, page]);

  useEffect(() => {
    setDisplayedNfts([]);
    setPage(0);
    setHasMore(true);
    window.scrollTo(0, 0); // Sayfanın başına dön
  }, [selectedRarity, searchTerm]);

  useEffect(() => {
    loadMoreNfts();
  }, [page, loadMoreNfts]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <main className="main-flex">

      <div className="header-container">

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
            </a>
          </div>
          <div className="header">
            <nav className="container mx-auto flex justify-between">
              <ul className="header-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/learn">Mint</a></li>
                <li><a href="/build">Collection</a></li>
                <li><a href="/build">My Rocks</a></li>
              </ul>
            </nav>
         </div>
        </div>

        </div>
        
<div className="main-container">
  <div className="content-container">
  <div className="filters-container">
  <div className="filter">
    Rarity: 
    <span className="filter-rarity" onClick={() => setSelectedRarity('')} style={{cursor: 'pointer', textDecoration: 'underline'}}>All</span>
    {[...uniqueRarities].map((rarity, index) => (
      <span 
        key={index} 
        className="filter-rarity" 
        onClick={() => handleRarityClick(rarity)} 
        style={{cursor: 'pointer'}}>
        {rarity}
      </span>
    ))}
  </div>
  <div className='search-box'>
    <input 
      type="search" 
      placeholder="Search Rock No" 
      value={searchTerm}
      onChange={handleSearch} 
    />
  </div>
</div>
            

            <div className="cards-container">
              {displayedNfts.map((nft, index) => (
                <div key={index} className="card">
                  <div className="flex">
                    <img src={nft.image} className="nft-image" loading="lazy" alt={nft.rockNo} />
                  </div>
                  <h3 className="card-title">
                    <span>{nft.rockNo}</span>
                  </h3>
                  <p className="card-content">Owner</p>
                  <button className="buy-btn">Buy</button>
                </div>
              ))}
              {hasMore && <div ref={loader}>Loading more...</div>}
            </div>
          </div>
          <div className="footer">Made with ❤️ by <b><a href="https://www.xxxx.com" className="group">XXXXX</a> </b>Lovers</div>
        </div>
      </main>
    </>
  );
}
