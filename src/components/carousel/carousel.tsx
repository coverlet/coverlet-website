import React, { PureComponent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNetworkData, selectSlide, setSlide } from '../../redux/app';
import { PieTimer } from '../pie-timer/pie-timer';
import { Slide } from '../slides/slide';
import { SlideLaunch } from '../slides/slide-launch/slide-launch';
import { SlideNetwork } from '../slides/slide-network/slide-network';

import './carousel.scss';

const slides = [
  {
    type: 'launch',
    img: 'content/osmosis.svg',
    title: ['Automated Market Maker', 'for Cosmos Ecosystem'],
    subtitle: '<a href="https://app.osmosis.zone/">more info</a>',
    cta: 'STAKE OSMO',
    network: 'Osmosis',
  },
  {
    type: 'launch',
    img: 'content/regen.svg',
    title: ['Mainnet Launch', 'April 15, 2021'],
    subtitle:
      'Blockchain for regenerative agriculture, <a href="https://regen.network">more info</a>.',
    cta: 'STAKE REGEN',
    network: 'Regen',
  },
  {
    type: 'network',
    bigTitle: 'Fetch AI',
    title: ['2% comission fee', 'until July 22, 2021'],
    subtitle: 'Artificial Intelligence for Blockchains, <a href="https://fetch.ai/">more info</a>.',
    cta: 'STAKE FETCHAI',
    network: 'Terra',
  },
  {
    type: 'network',
    img: 'content/polkaswap.svg',
    bigTitle: 'Sora',
    title: ['on SORA network'],
    subtitle:
      'Polkadot DEX with 2-way bridge to Ethereum, <a href="https://polkaswap.io/">check it out</a>',
    cta: 'STAKE SORA',
    network: 'Sora',
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
