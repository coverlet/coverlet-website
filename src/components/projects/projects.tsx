/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useCallback, useContext } from 'react';
import { gsap, Bounce, Expo } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './projects.scss';

export const Projects = (): ReactElement => {
  const handleMetadata = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);
    console.log('xxxxxx');
    const video = document.querySelector('.video-background');

    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: '#videoForeground',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    console.log('loadmetadata');
    tl.fromTo(
      video,
      {
        currentTime: 0,
      },
      {
        //@ts-ignore
        currentTime: video.duration || 1,
      }
    );
  }, []);

  return (
    <div className="projects container">
      <div className="video-track" id="projects">
        <div className="video-container">
          <video
            src="tcg.mp4"
            playsInline={true}
            preload="auto"
            muted={true}
            className="video-background"
            onLoadedMetadata={handleMetadata}
          ></video>
        </div>
        <div id="videoForeground"></div>
      </div>
      <div className="project-list">
        <div className="project-hero-track">
          <div className="project-hero-text">NFT trading card game</div>
        </div>
        <div className="project">
          <div className="description">
            <p>
              We are currently developing an immersive NFT trading card game that combines
              captivating artwork with strategic gameplay. Our game offers a unique, digital
              collectible experience, allowing players to acquire, trade, and battle with their NFT
              cards. Dive into our engaging universe and join the thrilling adventure of collecting,
              trading, and mastering your exclusive NFT trading card collection.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Don&apos;t miss out on the latest updates, early access, and exclusive NFT drops from
              our exciting trading card game!{' '}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.4rem' }}>
              <input type="text" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="photo">
            <img src="img/tcg.png" alt="Trading Card Game" />
          </div>
        </div>
        <div className="project" style={{ marginBottom: '-3rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Other projects</div>
        </div>
        <div className="project">
          <div className="description">
            <p>
              Our team of skilled programmers has been involved in the development of diverse tools
              and applications for the blockchain ecosystem. Our portfolio includes dapps,
              monitoring tools and smart contract development.
            </p>
            <br />
            <p>
              <b style={{ fontWeight: 'bold' }}>Solslot</b> - a simple slot game built on Solana
              blockchain using Anchor framework and React. See it in action at{' '}
              <a href="https://solslot.coverlet.io/">solslot.coverlet.io</a>.
            </p>
          </div>
          <div className="photo">
            <img src="img/solslot.png" alt="Solana Slot" />
          </div>
        </div>
      </div>
    </div>
  );
};
