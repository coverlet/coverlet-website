import { ReactElement, useContext, useEffect, useState } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, Bounce, Expo } from 'gsap';
import { ServicesHero } from './components/services-hero/services-hero';

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

const setBgFixed = (divs, fixed) => {
  for (const e of divs) {
    if (fixed) {
      e.setAttribute('data-scroll', 'true');
      e.setAttribute('data-scroll-sticky', 'true');
      e.setAttribute('data-scroll-target', '.main-container');
      e.classList.add('fixed');
    } else {
      e.removeAttribute('data-scroll');
      e.removeAttribute('data-scroll-sticky');
      e.removeAttribute('data-scroll-target');
    }
  }
};

const setPassingText = () => {
  const elem = document.getElementById('passing-text');
  elem.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 44.9706, 0, 1)';
};

export const Services = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext);

  useEffect(() => {
    if (!scrollElem.scroll) {
      return;
    }
    const scroller = scrollElem.scroll;

    // fetch all required html elements
    const cards = document.querySelectorAll('.card');
    const images = [];
    cardData.forEach((card, i) => {
      images[i] = document.getElementById(card.img);
    });

    const extraAnimations = [];

    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        scroller: '[data-scroll-container]',
        start: 'top 50%',
        scrub: true,
        onEnter: () => {
          gsap.to('.bg-overlay', {
            backgroundImage: cardData[i].background,
            overwrite: 'auto',
          });
          gsap.to('#bgpath1', {
            morphSVG: cardData[i].svgBgSelector,
            duration: 0.5,
            ease: Expo.easeOut,
            fill: cardData[i].svgBgColor,
          });
          gsap.to('#shape1', {
            morphSVG: cardData[i].svgShapeSelector,
            duration: 0.5,
            ease: Expo.easeOut,
            fill: cardData[i].svgShapeColor,
            delay: 0.3,
          });

          if (extraAnimations[i]) {
            extraAnimations[i].kill();
          }
          extraAnimations[i] = gsap.to(cardData[i].svgExtraSelector, {
            duration: 0.5,
            ease: Expo.easeOut,
            opacity: 1,
            delay: 0.5,
          });
          if (cardData[i - 1]) {
            if (extraAnimations[i - 1]) {
              extraAnimations[i - 1].kill();
            }
            extraAnimations[i - 1] = gsap.to(cardData[i - 1].svgExtraSelector, {
              duration: 0.5,
              ease: Expo.easeOut,
              opacity: 0,
              delay: 0.2,
            });
          }

          if (images[i - 1]) {
            images[i - 1].style.transitionDelay = '0s';
            images[i - 1].style.transitionDuration = '0.1s';
            images[i - 1].classList.remove('visible');
          }

          if (images[i]) {
            images[i].style.transitionDelay = '0.6s';
            images[i].style.transitionDuration = '0.4s';
            images[i].classList.add('visible');
          }
        },

        onLeaveBack: () => {
          gsap.to('.bg-overlay', {
            backgroundImage: i > 0 ? cardData[i - 1].background : cardData[0].background,
            overwrite: 'auto',
          });

          gsap.to('#bgpath1', {
            morphSVG: i > 0 ? cardData[i - 1].svgBgSelector : cardData[0].svgBgSelector,
            duration: 0.5,
            ease: Expo.easeOut,
            fill: i > 0 ? cardData[i - 1].svgBgColor : cardData[0].svgBgColor,
          });
          gsap.to('#shape1', {
            morphSVG: i > 0 ? cardData[i - 1].svgShapeSelector : cardData[0].svgShapeSelector,
            duration: 0.5,
            ease: Expo.easeOut,
            fill: i > 0 ? cardData[i - 1].svgShapeColor : cardData[0].svgShapeColor,
            delay: 0.3,
          });

          if (extraAnimations[i]) {
            extraAnimations[i].kill();
          }
          if (i > 0) {
            extraAnimations[i] = gsap.to(cardData[i].svgExtraSelector, {
              duration: 0.5,
              ease: Expo.easeOut,
              opacity: 0,
              delay: 0.2,
            });
          }
          if (cardData[i - 1]) {
            if (extraAnimations[i - 1]) {
              extraAnimations[i - 1].kill();
            }
            extraAnimations[i - 1] = gsap.to(cardData[i - 1].svgExtraSelector, {
              duration: 0.5,
              ease: Expo.easeOut,
              opacity: 1,
              delay: 0.5,
            });
          }

          if (images[i]) {
            images[i].style.transitionDelay = '0s';
            images[i].style.transitionDuration = '0.1s';
            images[i].classList.remove('visible');
          }

          if (images[i - 1]) {
            images[i - 1].style.transitionDelay = '0.6s';
            images[i - 1].style.transitionDuration = '0.4s';
            images[i - 1].classList.add('visible');
          }
        },
      });
    });

    const bgDivs = document.getElementsByClassName('services-bg') as any;

    ScrollTrigger.create({
      trigger: '.services-parent',
      scroller: '[data-scroll-container]',
      start: 'top 100%',
      end: 'bottom 100%',
      scrub: true,
      onEnter: () => {
        setBgFixed(bgDivs, true);
        scroller.update();
        setPassingText();
      },
      onEnterBack: () => {
        setBgFixed(bgDivs, true);
        scroller.update();
        setPassingText();
      },
      onLeaveBack: () => {
        setBgFixed(bgDivs, false);
        scroller.update();
        setPassingText();
      },
      onLeave: () => {
        setBgFixed(bgDivs, false);
        scroller.update();
        setPassingText();
      },
    });

    return () => {
      //ScrollTrigger.getById("trigger1").kill(true);
    };
  }, [scrollElem]);

  return (
    <>
      <div className="egde-card first full-container" id="scroll-offer">
        <div className="services-bg bg-contrast "></div>
        <div className="services-bg bg-overlay "></div>
        <div className="edge-text">
          <div className="title" data-scroll data-scroll-sticky data-scroll-target="#scroll-offer">
            What we offer
          </div>
        </div>
      </div>
      <div className="services-parent">
        <div className="services" id="scroll-services">
          <div className="card full container">
            <div
              data-scroll
              data-scroll-sticky
              data-scroll-target="#scroll-services"
              className="serv-hero"
            >
              <ServicesHero />
            </div>
            <div className="content">
              <div className="title">Availability</div>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s,
              </div>
            </div>
          </div>
          <div className="card full container">
            <div className="content">
              <div className="title">Realibility</div>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s,
              </div>
            </div>
          </div>

          <div className="card full container">
            <div className="content">
              <div className="title">Security</div>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s,
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '100vh' }}></div>
      </div>
      <div className="egde-card last full-container" id="scroll-offer-end">
        <div className="edge-text">
          <div
            className="title"
            data-scroll
            data-scroll-sticky
            data-scroll-target="#scroll-offer-end"
          >
            Thats all floks!
          </div>
        </div>
      </div>
    </>
  );
};
