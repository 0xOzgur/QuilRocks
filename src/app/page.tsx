'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
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
                  <li><a href="/build">My Rocks</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="main-container">


          <div className='container1'>
            <div className='left1'>
            <h2>First NFT Collection of Quilibrium</h2>
            </div>
            <div className='right1'>
              <div className='slogan-container'>
                <div className='slogan1'>LET’S<span className='rock1'> ROCK</span></div>
                <div className='slogan2'><span className='rock2'>QUILIBRIUM</span></div>
              </div>
            </div>
          </div>

          <div className='container2'>

            <div className='c2-left'>
              <div><span className="l-m-text1">2024</span></div>
              <div><span className="l-m-text1">Unique Items</span></div>
            </div>

            <div className='c2-middle'>
              <div><span className="l-m-text2">Upcoming</span></div>
              <div><span className="l-m-text2">Partnerships</span></div>
            </div>

            <div className='c2-right'>
              <div><span className="l-m-text3">Many</span></div>
              <div><span className="l-m-text3">Suprises</span></div>
            </div>

          </div>

          <div className="footer">Made with ❤️ by <b><a href="https://www.xxxx.com" className="group">XXXXX</a> </b>Lovers</div>
        </div>
      </main>
    </>
  );
}