import { ReactElement } from 'react';
import './passing-text.scss';

export const PassingText = (): ReactElement => {
  return (
    <div className="passing-text container">
      <div
        className="text"
        data-scroll-speed="-3"
        data-scroll
        data-scroll-position="top"
        data-scroll-offset="0%,85%"
        id="passing-text"
      >
        Stake with us
      </div>
    </div>
  );
};
