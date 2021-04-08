import { ReactElement, useEffect } from 'react';
import { gsap } from 'gsap';
import { ServicesSvg } from '../services-svg/services-svg';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

import './services-hero.scss';

export const ServicesHero = (): ReactElement => {
  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin);
  });

  return (
    <div className="services-hero" style={{ position: 'relative' }}>
      <img
        id="img_availability"
        style={{ position: 'absolute' }}
        src={'availability.svg'}
        alt="Availabilty"
        className="visible"
      />
      <img id="img_security" style={{ position: 'absolute' }} src={'security.svg'} alt="Security" />
      <img
        id="img_reliability"
        style={{ position: 'absolute' }}
        src={'reliability.svg'}
        alt="Reliability"
      />
      <ServicesSvg />
    </div>
  );
};
