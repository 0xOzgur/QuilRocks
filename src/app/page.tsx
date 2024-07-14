'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";

function ImageRotator() {
  const images = [
    '/collection/0001.PNG', // Updated paths to start with a leading slash
    '/collection/0002.PNG',
    '/collection/0003.PNG',
  ];
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      setIndex(nextIndex);
      setCurrentImage(images[nextIndex]);
    }, 3000); // Every 3 seconds

    return () => clearInterval(timer);
  }, [index, images]);

  return (
    <Image src={currentImage} alt="Rotating Image" width={500} height={300} />
  );
}

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
                  src="/logo.png"
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
                  <li><a href="/learn">Mint</a></li>
                  <li><a href="/collection">Collection</a></li>
                  <li><a href="/build">My Rocks</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="main-container">
          <div className="content-container">
            <div className='container1'>
              <div className='left1'>Quilibrium eko </div>
              <div className='right1'>
                {/* ImageRotator bileşenini buraya ekleyin */}
                <ImageRotator />
              </div>
            </div>
          </div>
          <div className="footer">Made with ❤️ by <b><a href="https://www.xxxx.com" className="group">XXXXX</a> </b>Lovers</div>
        </div>
      </main>
    </>
  );
}