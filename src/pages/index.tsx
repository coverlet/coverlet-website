import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, setCount } from '../redux/app';
import { Button } from 'rsuite';
import { Carousel } from 'react-responsive-carousel';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Slide } from '../components/slide/slide';
import { SmoothScrollContext } from '../utils/scroll-context';

import './index.module.scss';

const HomePage = () => {
  const scrollElem = useContext(SmoothScrollContext);
  const [text, setText] = useState('Coverlet');

  useEffect(() => {
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

    ScrollTrigger.create({
      trigger: '.sub2',
      scroller: '[data-scroll-container]',
      start: 'top 50%',
      scrub: true,
      onEnter: () => {
        setText('is');
        gsap.to('.s2', {
          backgroundImage: 'linear-gradient(90deg, #ff9999, #ff3333)',
          overwrite: 'auto',
        });
      },
      onLeaveBack: () => {
        setText('Coverlet');
        gsap.to('.s2', {
          backgroundImage: 'linear-gradient(90deg, #5b93c7, #497abe)',
          overwrite: 'auto',
        });
      },
    });

    ScrollTrigger.create({
      trigger: '.sub3',
      scroller: '[data-scroll-container]',
      start: 'top 50%',
      scrub: true,
      onEnter: () => {
        setText('the best');
        gsap.to('.s2', {
          backgroundImage: 'linear-gradient(90deg, #99ff99, #33ff33)',
          overwrite: 'auto',
        });
      },
      onLeaveBack: () => {
        setText('is');
        gsap.to('.s2', {
          backgroundImage: 'linear-gradient(90deg, #ff9999, #ff3333)',
          overwrite: 'auto',
        });
      },
    });
  }, [scrollElem]);

  return (
    <div>
      <section className="container s2">
        <div className="o-container" id="scroll-direction">
          <section className="sub1" data-textcolor="#bcb8ad" data-bgcolor="#032f35">
            <h1
              data-scroll
              data-scroll-sticky
              data-scroll-target="#scroll-direction"
              className="coverlet"
            >
              {text}
            </h1>
            <div className="content">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </div>
          </section>
          <section className="sub2" data-textcolor="#bcb8ad" data-bgcolor="#815946">
            <div className="content">22222222222222</div>
          </section>

          <section className="sub3" data-textcolor="#bcb8ad" data-bgcolor="#e3857a">
            <div className="content">3333333333333</div>
          </section>
        </div>
      </section>
      <section className="container s3">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default HomePage;
