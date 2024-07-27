'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import React, { ChangeEvent } from 'react';
import Image from "next/image";
import './collection.css';
import Layout from '@/components/layout/Layout';
import nfts from './nftss.json';

export default function CollectionsPage() {
  const uniqueRarities = new Set(nfts.map(nft => nft.rarity));
  const [selectedRarity, setSelectedRarity] = useState('');
  const [displayedNfts, setDisplayedNfts] = useState<{ image: string; imageAlt: string; rockNo: string; rarity: string; }[]>([]);

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

  return (
    <Layout>
      <div className="main-container">
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
                <button className="buy-btn">Buy</button>
              </div>
            ))}
            {hasMore && <div ref={loader}>Loading more...</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
}