import { ReactElement, useContext, useEffect, useRef } from 'react';
import { SmoothScrollContext } from '../../utils/scroll-context';
import './passing-text.scss';

const translateY = (scrollTop) => {
  if (!scrollTop) {
    scrollTop = 0;
  }
  const mt = scrollTop / 240;
  return mt > 4.2 ? 4.2 : mt;
};

export const PassingText = (): ReactElement => {
  const scrollElem = useContext(SmoothScrollContext) as any;

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
        style={{ transform: `translateY(${translateY(scrollElem.scrollTop)}rem)` }}
      >
        <span style={{ display: 'block' }}>Stake with us</span>
        <span className="subtext">
          At Coverlet, we run validators for leading blockchain projects. By staking your tokens
          with us, you not only contribute to securing these networks but also earn staking rewards.
          Maximize your digital assets' potential with Coverlet!
        </span>
      </div>
    </div>
  );
};
