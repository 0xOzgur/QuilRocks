'use client'

import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Parallax from 'parallax-js';
import styles from './page.module.css';

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
            <div className={styles.parallaxContainer}> 
              <div ref={sceneEl} className={styles.scene}>
                <div data-depth="0.2" className={styles.parallaxLayer}>
                  <div className={`${styles.parallaxItem} ${styles.item1}`}>
                    <Image src="/item-3.png" alt="" width={200} height={150} layout="responsive" className={styles.parallaxImage} />
                  </div>
                </div>
                <div data-depth="0.5" className={styles.parallaxLayer}>
                  <div className={`${styles.parallaxItem} ${styles.item2}`}>
                    <Image src="/item-1.png" alt="" width={200} height={150} layout="responsive" className={styles.parallaxImage} />
                  </div>
                </div>
                <div data-depth="0.8" className={styles.parallaxLayer}>
                  <div className={`${styles.parallaxItem} ${styles.item3}`}>
                    <Image src="/item-2.png" alt="" width={200} height={150} layout="responsive" className={styles.parallaxImage} />
                  </div>
              </div></div>
              {/* Parallax Mouse Move End */}
            </div>

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
            <div><span className="l-m-text3">Surprises</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
