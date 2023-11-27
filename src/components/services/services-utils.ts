import { Expo } from 'gsap';

// keep an array of animations runnin for each card
// so we can killing on new animation and avoid bugs
const extraAnimations = [];

export const changeBgColorTo = (gsap: any, bgElement: string, bg: string): void => {
  gsap.to(bgElement, {
    backgroundImage: bg,
    overwrite: 'auto',
  });
};

export const morphSvgTo = (
  gsap: any,
  target: string,
  to: string,
  color: string,
  delay = 0
): void => {
  gsap.to(target, {
    morphSVG: to,
    duration: 0.5,
    ease: Expo.easeOut,
    fill: color,
    delay,
  });
};

export const fadeAnimationWithKill = (gsap: any, target: string, to: number, delay = 0): void => {
  if (extraAnimations[target]) {
    extraAnimations[target].kill();
  }

  extraAnimations[target] = gsap.to(target, {
    duration: 0.5,
    ease: Expo.easeOut,
    opacity: to,
    delay,
  });
};

export const setVisibleImage = (img: any, show: boolean): void => {
  if (show) {
    img.style.transitionDelay = '0.6s';
    img.style.transitionDuration = '0.4s';
    setTimeout(() => {
      img.classList.add('visible');
    }, 10);
  } else {
    img.style.transitionDelay = '0s';
    img.style.transitionDuration = '0.1s';
    img.classList.remove('visible');
  }
};
