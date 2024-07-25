'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import Layout from '@/components/layout/Layout';
import typedNfts from './myrocks.json';
import './myrocks.css';

interface NFT {
  image: string;
  imageAlt: string;
  rockNo: string;
  rarity: string;
}

const nfts: NFT[] = typedNfts as NFT[];

export default function MyRocksPage() {
  // Geçici authentication durumu
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const uniqueRarities = new Set(nfts.map(nft => nft.rarity));
  const [selectedRarity, setSelectedRarity] = useState<string>('');
  const [displayedNfts, setDisplayedNfts] = useState<NFT[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement>(null);
  const nftsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);
  const [listingPrice, setListingPrice] = useState('');

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
    window.scrollTo(0, 0);
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

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMore]);

  const handleRarityClick = (rarity: string) => {
    setSelectedRarity(rarity);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (nft: NFT) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
    setListingPrice('');
  };

  const handleListingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListingPrice(e.target.value);
  };

  const handleListForSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedNft) {
      console.log(`Listing ${selectedNft.rockNo} for sale at ${listingPrice} Quil`);
    }
    closeModal();
  };

  // Geçici login fonksiyonu
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Layout>
      <div className="main-container">
        {isAuthenticated ? (
          <div className="content-container">
            <div className="filters-container">
              <div className="filter">
                Rarity: 
                <span className="filter-rarity" onClick={() => setSelectedRarity('')} style={{cursor: 'pointer', textDecoration: 'underline'}}>All</span>
                {Array.from(uniqueRarities).map((rarity, index) => (
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
                  <button className="buy-btn" onClick={() => openModal(nft)}>List for Sale</button>
                </div>
              ))}
              {hasMore && <div ref={loader}>Loading more...</div>}
            </div>
          </div>
        ) : (
          <div className="login-message">
            <p>Please login to see your Rocks</p>
            <button onClick={handleLogin} className="login-button">Login</button>
          </div>
        )}
      </div>

      {isModalOpen && selectedNft && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>List {selectedNft.rockNo} for Sale</h2>
            <form onSubmit={handleListForSale}>
              <div className="price-input-container">
                <label htmlFor="price">Price (Quil):</label>
                <input
                  type="number"
                  id="price"
                  value={listingPrice}
                  onChange={handleListingPriceChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">List for Sale</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}