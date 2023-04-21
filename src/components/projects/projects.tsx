/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useCallback, useContext, useEffect, useRef, useState } from 'react';

import './projects.scss';
import { subscribeEmail } from '../../client/fb';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z\d][-a-zA-Z\d]*(\.[a-zA-Z\d][-a-zA-Z\d]*)+)$/;
  return emailRegex.test(email);
};

export const Projects = (): ReactElement => {
  const videoElement = useRef(null);
  const videoContainer = useRef(null);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [shouldValidate, setShouldValidate] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (isValidEmail(email) || !shouldValidate) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email, shouldValidate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.current.play();
          } else {
            videoElement.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // Adjust the threshold value (0 to 1) to control when the video should start playing
      }
    );

    observer.observe(videoContainer.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // const handleMetadata = useCallback(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   console.log('xxxxxx');
  //   const video = document.querySelector('.video-background');

  //   const tl = gsap.timeline({
  //     defaults: { duration: 1 },
  //     scrollTrigger: {
  //       trigger: '#videoForeground',
  //       start: 'top top',
  //       end: 'bottom bottom',
  //       scrub: true,
  //     },
  //   });

  //   console.log('loadmetadata');
  //   tl.fromTo(
  //     video,
  //     {
  //       currentTime: 0,
  //     },
  //     {
  //       //@ts-ignore
  //       currentTime: video.duration || 1,
  //     }
  //   );
  // }, []);

  return (
    <div className="projects container" id="projects">
      {/* <div className="video-track" id="projects">
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
      </div> */}
      <div className="project-list">
        {/* <div className="project-hero-track">
          <div className="project-hero-text">NFT trading card game</div>
        </div> */}
        <div className="project">
          Our team of skilled programmers has been involved in the development of diverse tools and
          applications for the blockchain ecosystem. Our portfolio includes dapps, monitoring tools
          and smart contract development.
        </div>
        <div className="project">
          <div className="description">
            <b style={{ fontWeight: 'bold' }}>NFT trading card game</b>
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
            <div className="subscribe-container">
              <input
                type="text"
                value={email}
                placeholder="email"
                className={`${!emailValid && 'invalid'}`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
              />
              <button
                onClick={() => {
                  if (isValidEmail(email)) {
                    subscribeEmail(email);
                    setSubscribed(true);
                    setEmail('');
                  } else {
                    setShouldValidate(true);
                  }
                }}
              >
                {subscribed && <>Subscribed &#10003;</>}
                {!subscribed && <>Subscribe</>}
              </button>
            </div>
          </div>
          <div className="photo" ref={videoContainer}>
            {/* <img src="img/tcg.png" alt="Trading Card Game" /> */}
            <video
              ref={videoElement}
              src="tcg.mp4"
              playsInline={true}
              preload="auto"
              muted={true}
              autoPlay={true}
              className="video-background"
              loop={true}
            ></video>
          </div>
        </div>
        <div className="project">
          <div className="description">
            <b style={{ fontWeight: 'bold' }}>Solslot</b>
            <p>
              A simple slot game built on Solana blockchain using Anchor framework and React. See it
              in action at <a href="https://solslot.coverlet.io/">solslot.coverlet.io</a>.
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
