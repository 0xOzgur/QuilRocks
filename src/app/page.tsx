'use client'

import React from 'react';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="main-container">
        <div className='container1-home'>
          <div className='left1'>
            <h2>First NFT Collection of Quilibrium</h2>
          </div>
          <div className='right1'>
            <div className='slogan-container'>
            <div className='slogan1'>LET&apos;S<span className='rock1'> ROCK</span></div>
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
      </div>
    </Layout>
  );
}