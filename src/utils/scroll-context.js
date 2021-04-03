import React, { createContext, useEffect, useState } from 'react';
import { gsap, Bounce } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (!scroll) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(MorphSVGPlugin);

      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default;
          const el = document.querySelector('[data-scroll-container]');
          const scroll = new LocomotiveScroll({
            el: el ?? undefined,
            ...options,
          });

          scroll.on('scroll', ScrollTrigger.update);
          const pageContainer = document.querySelector('[data-scroll-container]');
          ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
              return arguments.length
                ? scroll.scrollTo(value, 0, 0)
                : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
              return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
          });

          setScroll(scroll);
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      scroll && scroll.destroy();
    };
  }, [scroll]); // eslint-disable-line react-hooks/exhaustive-deps

  return <SmoothScrollContext.Provider value={{ scroll }}>{children}</SmoothScrollContext.Provider>;
};

SmoothScrollContext.displayName = 'SmoothScrollContext';
SmoothScrollProvider.displayName = 'SmoothScrollProvider';
