import { ReactElement, useState } from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import { Slide } from '../slide/slide';

import './carousel.scss';

const slides = [
  {
    antext: '230k million usd staked',
    title: 'Trusted and secure validator',
    background: 'linear-gradient(60deg, #0467c4, #003885)',
  },
  {
    antext: '0% commision now',
    title: 'Solana',
    background: 'linear-gradient(60deg, #003885, rgb(86 34 82))',
  },
  {
    antext: 'Latest technology',
    title: 'AMD Epyc 7538',
    background: 'linear-gradient(60deg, rgb(86 34 82), #0467c4)',
  },
];

export const Carousel = (): ReactElement => {
  const [selected, setSelected] = useState(0);

  return (
    // <div className="carousel full-container">
    <div className="carousel full-container ">
      <ReactCarousel
        infiniteLoop={true}
        showThumbs={false}
        onChange={(item) => {
          setSelected(item);
        }}
      >
        {slides.map((slide, i) => (
          <Slide key={i} k={i} data={slide} selected={selected} />
        ))}
      </ReactCarousel>
    </div>
    // </div>
  );
};
