import { ReactElement, useContext, useEffect, useRef } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import './passing-text.scss';

const translateY = (scrollTop) => {
  if (!scrollTop) {
    scrollTop = 0;
  }
  let mt = scrollTop / 10;
  return mt > 42 ? 42 : mt;
};

export const PassingText = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext);

  const inputEl = useRef(null);
  // useEffect(() => {}, []);

  // console.log(inputEl?.current?.offsetTop);
  // console.log(scrollElem.scrollTop);

  return (
    <div className="passing-text container">
      <div
        className="text"
        id="passing-text"
        ref={inputEl}
        style={{ transform: `translateY(${translateY(scrollElem.scrollTop)}px)` }}
      >
        Stake with us
      </div>
    </div>
  );
};
