import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../redux/app';
import './network-info.scss';
import { INetwork } from '../../redux/types';
import Button from 'rsuite/lib/Button';

export const NetworkInfo = ({ onHide, networksRef }): ReactElement => {
  const [height, setHeight] = useState(10);
  const network: INetwork = useSelector(selectNetwork);

  useEffect(() => {
    const dim = networksRef?.current?.getBoundingClientRect();

    if (dim) {
      setHeight(dim.height);
    }
  }, [network, networksRef]);

  return (
    <div className="network-info" style={{ height: `${height + 48}px` }}>
      <div className={`info-content ${network && 'show'}`} style={{ height: `${height}px` }}>
        <div className="top-section">
          <div className="back" onClick={onHide} role="button">
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 477.175 477.175">
              <g>
                <path
                  d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
		c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
                />
              </g>
            </svg>
          </div>
          <div className="name">{network?.name}</div>
        </div>
        <div className="content">
          <div className="left">
            <div className="numbers">
              <div className="number">
                <div className="info">Commision rate</div>
                <div className="value">10%</div>
              </div>
              <div className="number">
                <div className="info">Total stake</div>
                <div className="value">273000SOL</div>
              </div>
              <div className="number">
                <div className="info">Delegators</div>
                <div className="value">29</div>
              </div>
            </div>
          </div>
          <div className="right">
            <Button appearance="primary" className="stake-with-us">
              STAKE HERE
            </Button>
          </div>
        </div>
        <div className="more-info">
          <div className="more-info-title">How to stake?</div>
          <div className="more-info-text">blabla</div>
        </div>
        <div className="more-info">
          <div className="more-info-title">About {network?.name}</div>
          <div className="more-info-text">blablablabl</div>
        </div>
      </div>
    </div>
  );
};
