import React, { PureComponent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNetworkData, selectSlide, setSlide } from '../../redux/app';
import { PieTimer } from '../pie-timer/pie-timer';
import { Slide } from '../slides/slide';
import { SlideCustom } from '../slides/slide-custom/slide-custom';
import { SlideNetwork } from '../slides/slide-network/slide-network';

import './carousel.scss';

const slides = [
  {
    type: 'custom',
    // top: {

    // },
    content: [
      {
        type: 'img',
        src: 'content/evmos.svg',
        alt: 'Evmos',
        wrapperClass: 'enter-from-right',
        class: 'large',
      },
      {
        type: 'text',
        textType: 'subtitle',
        html: true,
        wrapperClass: 'slide-down anim-wait-200',
        data: 'Evmos is bringing the world of Ethereum-based applications and assets to the interoperable networks of the Cosmos ecosystem<br/><a href="https://docs.evmos.org/about/intro/overview.html">more info</a>',
      },
      {
        type: 'button',
        position: 'bottom',
        text: 'STAKE',
        wrapperClass: 'slide-down anim-wait-400',
      },
    ],
    // bottom: {
    //   cta: 'STAKE REGEN',
    //   network: 'Regen',
    // },
  },
  {
    type: 'custom',
    // top: {

    // },
    content: [
      {
        type: 'img',
        src: 'content/osmosis.svg',
        alt: 'Osmosis',
        wrapperClass: 'enter-from-right',
        class: 'large',
      },
      {
        type: 'text',
        textType: 'title',
        wrapperClass: 'enter-from-right anim-wait-200',
        data: 'Automated Market Maker',
      },
      {
        type: 'text',
        textType: 'title',
        wrapperClass: 'enter-from-right anim-wait-200',
        data: 'for Cosmos Ecosystem',
      },
      {
        type: 'text',
        textType: 'subtitle',
        html: true,
        wrapperClass: 'slide-down anim-wait-400',
        data: '<a href="https://app.osmosis.zone/">more info</a>',
      },
      {
        type: 'button',
        position: 'bottom',
        text: 'STAKE',
        wrapperClass: 'slide-down anim-wait-400',
      },
    ],
    // bottom: {
    //   cta: 'STAKE REGEN',
    //   network: 'Regen',
    // },
  },
];

const nextSlide = (current) => {
  return current + 1 < slides.length ? current + 1 : 0;
};

const prevSlide = (current) => {
  return current - 1 < 0 ? slides.length - 1 : current - 1;
};

export const Carousel = (): ReactElement => {
  const activeSlide: number = useSelector(selectSlide);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => dispatch(setSlide(nextSlide(activeSlide))), 5000);
    return () => clearTimeout(id);
  }, [activeSlide]);

  return (
    <div className="carousel-fix full-container">
      <div className="carousel full-container">
        {slides.map((slide, i) => (
          <Slide key={i} data={slide} active={activeSlide === i} />
        ))}
        <div className="go-left">
          <span
            onClick={() => {
              dispatch(setSlide(prevSlide(activeSlide)));
            }}
            role="button"
          >
            <img src="cal.svg" alt="Left" />
          </span>
        </div>
        <div className="go-right">
          <span
            onClick={() => {
              dispatch(setSlide(nextSlide(activeSlide)));
            }}
            role="button"
          >
            <img src="car.svg" alt="Right" />
          </span>
        </div>
        <div className="indicators">
          {slides.map((slide, i) => (
            <PieTimer
              key={i}
              active={activeSlide === i}
              onClick={() => {
                dispatch(setSlide(i));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
