'use client'

import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Parallax from 'parallax-js';
import Link from 'next/link';
import '@/styles/responsive.css';

export default function Home() {
  const sceneEl = useRef(null);

  useEffect(() => {
    if (sceneEl.current) {
      const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        clipRelativeInput: false
      });
      return () => parallaxInstance.disable();
    }
  }, []);

  return (
    <Layout>
      <div className="main-container">
        <div className='container1-home'>
          <div className='left1'>
            <div className="parallax-container"> 
              <div ref={sceneEl} className="scene">
                <div data-depth="0.2" className="parallax-layer">
                  <div className="parallax-item item1">
                    <Image src="/item-3.png" alt="" width={200} height={150} layout="responsive" className="parallax-image" />
                  </div>
                </div>
                <div data-depth="0.5" className="parallax-layer">
                  <div className="parallax-item item2">
                    <Image src="/item-1.png" alt="" width={200} height={150} layout="responsive" className="parallax-image" />
                  </div>
                </div>
                <div data-depth="0.8" className="parallax-layer">
                  <div className="parallax-item item3">
                    <Image src="/item-2.png" alt="" width={200} height={150} layout="responsive" className="parallax-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='right1'>
            <div className='slogan-container'>
              <div className='slogan1'><span className='rock1'>LET&apos;S ROCK</span></div>
              <div className='slogan2'><span className='rock2'>QUILIBRIUM</span></div>
              <div className='slogan3'><span className='rock3'>The very first NFT Collection on Quilibrium</span></div>
            </div>
          </div>
        </div>

        <div className="container2">
          <div className="c2-content">
            <h2 className="section-title">Quilibrium Rocks: The Pioneering NFT Collection</h2>
            
            <div className="content-columns">
              <div className="column">
              <p className="paragraph">
  Introducing the <span className="highlight">Quilibrium Rocks project</span>, the groundbreaking and exclusive NFT collection that pioneers the support of the Quilibrium ecosystem! This one-of-a-kind collection is meticulously curated by <span className="highlight"><a href="https://quilibrium.space" className="quilibrium-space">Quilibrium Space</a></span> and expertly crafted by dedicated Quilibrium volunteers, setting a new standard for future projects.
</p>
              </div>
              
              <div className="column">
                <p className="paragraph">
                  By investing in this NFT project, you're not just owning a digital asset; <span className="highlight">you're fueling the future of Quilibrium Ecosystem!</span> The revenue generated will empower our pioneering developers to bring their visionary projects to life.
                </p>

                <div className="benefits-section">
                  <h3 className="sub-title">Exclusive Benefits for Quil Rocks Owners:</h3>
                  <ul className="benefits-list">
                    <li>VIP access to pre-sale whitelists</li>
                    <li>Coveted airdrops</li>
                    <li>Powerful multipliers in cutting-edge De-Fi programs</li>
                  </ul>
                </div>
              </div>
              
              <div className="column">
                <p className="call-to-action">
                  Don't miss out on this extraordinary adventure. Make history, claim your spot in the Quilibrium legacy, and <a href="/mint" className="quilibrium-space"><span className="highlight">mint your very own Quil Rocks today.</span></a> The future awaits – and it's brighter than ever!
                </p>
                <div className='mint-call-to-action'>
                <Link href="/mint" className="home-mint-button">MINT NOW</Link></div>
              </div>
            </div>
          </div>
        </div>

        <div className='container3'>
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
            <div><span className="l-m-text3">Surprises</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
