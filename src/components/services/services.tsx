import { ReactElement, useContext, useEffect, useState } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import { gsap, Bounce } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

import './services.scss';

const cardData = [
  {
    background: 'linear-gradient(110deg, #f269f6, #af7dfb)',
    text: 'Coverlet',
    svg: '#p1',
    svgBg: '#ce4fdc',
  },
  {
    background: 'linear-gradient(110deg, #f76bb0, #fbdf6a)',
    text: 'is',
    svg: '#p2',
    svgBg: '#fc584d',
  },
  {
    background: 'linear-gradient(110deg, #61c8f6, #6cf6b3)',
    text: 'the best',
    svg: '#p3',
    svgBg: '#108ac4',
  },
];

export const Services = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext);

  useEffect(() => {
    if (!scrollElem.scroll) {
      return;
    }
    const scroller = scrollElem.scroll;
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(MorphSVGPlugin);

    scroller.on('scroll', ScrollTrigger.update);

    const pageContainer = document.querySelector('[data-scroll-container]');

    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      //pinType: pageContainer.style.transform ? 'transform' : 'fixed',
    });

    const cards = document.querySelectorAll('.card');
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
          gsap.to('#p1', {
            morphSVG: cardData[i].svg,
            duration: 0.5,
            ease: Bounce.easeOut,
            fill: cardData[i].svgBg,
          });
        },
        onLeaveBack: () => {
          gsap.to('.bg-overlay', {
            backgroundImage: i > 0 ? cardData[i - 1].background : cardData[0].background,
            overwrite: 'auto',
          });

          gsap.to('#p1', {
            morphSVG: i > 0 ? cardData[i - 1].svg : cardData[0].svg,
            duration: 0.5,
            ease: Bounce.easeOut,
            fill: i > 0 ? cardData[i - 1].svgBg : cardData[0].svgBg,
          });
        },
      });
    });

    ScrollTrigger.create({
      trigger: '.services-parent',
      scroller: '[data-scroll-container]',
      start: 'top 100%',
      end: 'bottom 100%',
      scrub: true,
      onEnter: () => {
        const e = document.getElementsByClassName('xxx') as any;
        for (const i of e) {
          i.setAttribute('data-scroll', 'true');
          i.setAttribute('data-scroll-sticky', 'true');
          i.setAttribute('data-scroll-target', '.main-container');
          i.classList.add('fixed');
        }
        scroller.update();
      },
      onEnterBack: () => {
        const e = document.getElementsByClassName('xxx') as any;
        for (const i of e) {
          i.setAttribute('data-scroll', 'true');
          i.setAttribute('data-scroll-sticky', 'true');
          i.setAttribute('data-scroll-target', '.main-container');
          i.classList.add('fixed');
        }
        scroller.update();
      },
      onLeaveBack: () => {
        const e = document.getElementsByClassName('xxx') as any;
        for (const i of e) {
          i.removeAttribute('data-scroll');
          i.removeAttribute('data-scroll-sticky');
          i.removeAttribute('data-scroll-target');
          // i.classList.remove('fixed');
          // i.style.transform = 'none';
        }
        scroller.update();
      },
      onLeave: () => {
        const e = document.getElementsByClassName('xxx') as any;
        for (const i of e) {
          i.removeAttribute('data-scroll');
          i.removeAttribute('data-scroll-sticky');
          i.removeAttribute('data-scroll-target');
          // i.classList.remove('fixed');
          // i.style.transform = 'none';
        }
        scroller.update();
      },
    });

    return () => {
      //ScrollTrigger.getById("trigger1").kill(true);
    };
  }, [scrollElem]);

  return (
    <>
      <div className="egde-card first full-container" id="scroll-offer">
        <div className="xxx bg-contrast is-inview"></div>
        <div className="xxx bg-overlay is-inview"></div>
        <div className="wwo">
          <div className="title" data-scroll data-scroll-sticky data-scroll-target="#scroll-offer">
            <div className="text">What we offer</div>
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
              <svg height="600" width="400" viewBox="0 0 14 11">
                <path id="p1" className="c1" d="M 5 1 L 12 2 L 11 9 L 5 9 L 5 1 Z" />
                <path id="p2" className="c2" d="M 4 2 L 10 1 L 12 10 L 3 11 L 4 2 Z" />
                <path id="p3" className="c3" d="M 5 0 L 11 1 L 10 10 L 3 9 L 5 0 Z" />
                Sorry, your browser does not support inline SVG.
              </svg>
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
        <div style={{ height: '100vh' }}>aaaaa sssss wwwwwww</div>
      </div>
      <div className="egde-card last full-container" id="scroll-offer-end">
        <div className="wwo">
          <div
            className="title"
            data-scroll
            data-scroll-sticky
            data-scroll-target="#scroll-offer-end"
          >
            What we offer
          </div>
        </div>
      </div>
    </>
  );
};
