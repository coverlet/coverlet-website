import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, setCount } from '../redux/app';
import { Button } from 'rsuite';
import { Carousel } from 'react-responsive-carousel';
// import { LocomotiveScrollOptions, Scroll } from 'locomotive-scroll';

// import LocomotiveScroll from 'locomotive-scroll';

// const scroll = new LocomotiveScroll();

import './index.module.scss';
import { Slide } from '../components/slide/slide';

const HomePage = () => {
  const scrollRef = useRef(null);

  return (
    <div>
      <section className="container" data-textcolor="#bcb8ad" data-bgcolor="#032f35">
        <div className="scroll scrollc" ref={scrollRef}>
          <h1 data-scroll data-scroll-speed="-3" data-scroll-position="top">
            Coverlet
          </h1>
          <h2
            data-scroll
            data-scroll-speed="-2"
            data-scroll-position="top"
            // data-scroll-direction="horizontal"
          >
            <br />
            Scroloooo
          </h2>
        </div>
      </section>
      <section className="container s2">
        <div className="o-container" id="scroll-direction">
          <div
            className="c-section_infos -padding"
            data-scroll
            data-scroll-sticky
            data-scroll-target="#scroll-direction"
          >
            <div className="c-section_infos_inner" data-scroll>
              <h3>
                02. <br />
                Scroll direction
              </h3>
              <div className="c-sections_infos_text u-text">
                <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
              </div>
            </div>
          </div>

          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
          <p>And if that wasnt enough, make em go backwards. Or upwards. Or downwards!</p>
        </div>
      </section>
      <section className="container s3">aaaaaaaaaaaa</section>
    </div>
  );
};

export default HomePage;
