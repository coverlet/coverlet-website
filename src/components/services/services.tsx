import { ReactElement, useContext, useEffect, useState } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './services.scss';

const cardData = [
  {
    background: 'linear-gradient(110deg, #f269f6, #af7dfb)',
    text: 'Coverlet',
  },
  {
    background: 'linear-gradient(110deg, #f76bb0, #fbdf6a)',
    text: 'is',
  },
  {
    background: 'linear-gradient(110deg, #61c8f6, #6cf6b3)',
    text: 'the best',
  },
];

export const Services = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext);
  const [text, setText] = useState('Coverlet');

  useEffect(() => {
    console.log(scrollElem);
    if (!scrollElem.scroll) {
      return;
    }
    const scroller = scrollElem.scroll;
    gsap.registerPlugin(ScrollTrigger);

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
          setText(cardData[i].text);
          gsap.to('.services', {
            backgroundImage: cardData[i].background,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          setText(i > 0 ? cardData[i - 1].text : cardData[0].text);
          gsap.to('.services', {
            backgroundImage: i > 0 ? cardData[i - 1].background : cardData[0].background,
            overwrite: 'auto',
          });
        },
      });
    });

    return () => {
      //ScrollTrigger.getById("trigger1").kill(true);
    };
  }, [scrollElem]);

  return (
    <>
      <div className="first-card full-container" id="scroll-offer">
        <div className="fc1">sxxxxx</div>
        <div className="fc2">wwwwww</div>
        <div className="fc0">
          <div className="title" data-scroll data-scroll-sticky data-scroll-target="#scroll-offer">
            What we offer
          </div>
        </div>
      </div>
      <div className="services" id="scroll-services">
        <div className="card full container">
          <div
            data-scroll
            data-scroll-sticky
            data-scroll-target="#scroll-services"
            className="serv-hero"
          >
            {text}
          </div>
          <div className="content">
            <div className="title">Availability</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>
        <div className="card full container">
          <div className="content">
            <div className="title">Realibility</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>

        <div className="card full container">
          <div className="content">
            <div className="title">Security</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
