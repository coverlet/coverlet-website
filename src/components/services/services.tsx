import { ReactElement, useContext, useEffect, useState } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, Bounce, Expo } from 'gsap';
import { ServicesHero } from './components/services-hero/services-hero';
import {
  changeBgColorTo,
  fadeAnimationWithKill,
  morphSvgTo,
  setVisibleImage,
} from './services-utils';

import './services.scss';

const cardData = [
  {
    background: 'linear-gradient(110deg, #f269f6, #af7dfb)',
    svgBgSelector: '#bgpath1',
    svgShapeSelector: '#shape1',
    svgExtraSelector: '#extra1',
    svgBgColor: '#ce4fdc',
    svgShapeColor: '#D96AE5',
    img: 'img_availability',
  },
  {
    background: 'linear-gradient(110deg, #f76bb0, #fbdf6a)',
    svgBgSelector: '#bgpath2',
    svgShapeSelector: '#shape2',
    svgExtraSelector: '#extra2',
    svgBgColor: '#fc584d',
    svgShapeColor: '#FBAC3B',
    img: 'img_security',
  },
  {
    background: 'linear-gradient(110deg, #61c8f6, #6cf6b3)',
    svgBgSelector: '#bgpath3',
    svgShapeSelector: '#shape3',
    svgExtraSelector: '#extra3',
    svgBgColor: '#108ac4',
    svgShapeColor: '#F4F4F4',
    img: 'img_reliability',
  },
];

export const Services = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext);

  useEffect(() => {
    if (!scrollElem.scroll) {
      return;
    }

    // fetch all required html elements
    const cards = document.querySelectorAll('.card');
    const services = document.getElementById('scroll-services');
    const images = [];
    cardData.forEach((card, i) => {
      images[i] = document.getElementById(card.img);
    });

    // silly safari fix :(
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 50%',
        scrub: true,
        onEnter: () => {
          services.style.display = 'none';
          services.offsetHeight;
          services.style.display = '';
        },
      });
    });

    // all the cars animations
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 50%',
        scrub: true,
        onEnter: () => {
          // change page bg color
          changeBgColorTo(gsap, '.bg-overlay', cardData[i].background);

          // morph and color bg shap
          morphSvgTo(gsap, '#bgpath1', cardData[i].svgBgSelector, cardData[i].svgBgColor);

          // morph and color main shape
          morphSvgTo(gsap, '#shape1', cardData[i].svgShapeSelector, cardData[i].svgShapeColor, 0.3);

          // show / hide extra svg elements
          fadeAnimationWithKill(gsap, cardData[i].svgExtraSelector, 1, 0.5);
          cardData[i - 1] && fadeAnimationWithKill(gsap, cardData[i - 1].svgExtraSelector, 0, 0.2);

          // show / hide svg images
          images[i - 1] && setVisibleImage(images[i - 1], false);
          images[i] && setVisibleImage(images[i], true);
        },

        onLeaveBack: () => {
          const card = i > 0 ? cardData[i - 1] : cardData[0];
          changeBgColorTo(gsap, '.bg-overlay', card.background);
          morphSvgTo(gsap, '#bgpath1', card.svgBgSelector, card.svgBgColor);
          morphSvgTo(gsap, '#shape1', card.svgShapeSelector, card.svgShapeColor, 0.3);
          i > 0 && fadeAnimationWithKill(gsap, cardData[i].svgExtraSelector, 0, 0.2);
          i > 0 && fadeAnimationWithKill(gsap, cardData[i - 1].svgExtraSelector, 1, 0.5);
          i > 0 && images[i] && setVisibleImage(images[i], false);
          images[i - 1] && setVisibleImage(images[i - 1], true);
        },
      });
    });

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [scrollElem.scroll]);

  return (
    <div className="services-container full-container">
      <div className="services-parent">
        {/* first text card */}
        <div className="egde-card first">
          <div className="edge-text">
            <div className="title">What we offer</div>
          </div>
        </div>
        {/* black contrast sticky div */}
        <div className="bg-contrast"></div>
        {/* background color div */}
        <div className="bg-overlay"></div>
        {/* cards main area */}
        <div className="services container" id="scroll-services">
          {/* sticky hero area */}
          <div className="serv-hero-track">
            <div className="serv-hero">
              <ServicesHero />
            </div>
          </div>
          {/* cards */}
          <div className="cards">
            <div className="card full">
              <div className="content">
                <div className="title-content">Availability</div>
                <div>High uptime</div>
              </div>
            </div>
            <div className="card full">
              <div className="content">
                <div className="title-content">High Security</div>
                <div>No compromises here</div>
              </div>
            </div>
            <div className="card full">
              <div className="content">
                <div className="title-content">Reliability</div>
                <div>Monitoring and redundancy</div>
              </div>
            </div>
          </div>
        </div>
        {/* best way to pus a placeholder here */}
        <div style={{ height: '100vh' }}></div>
      </div>
      <div className="egde-card last full-container">
        <div className="edge-text">
          <div id="about" className="title">
            Meet the team
          </div>
        </div>
      </div>
    </div>
  );
};
