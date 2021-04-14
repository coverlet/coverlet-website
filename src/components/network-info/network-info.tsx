import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../redux/app';
import './network-info.scss';
import { INetwork } from '../../redux/types';
import Button from 'rsuite/lib/Button';
import { formatNumber } from '../../utils/format-number';
import { HowToStake } from './how-to-stake/how-to-stake';

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
        <div className="back" onClick={onHide} role="button">
          <div className="back-inner">
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 477.175 477.175">
              <g>
                <path
                  d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
		L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
		c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="right-half-container">
          <div className="top-section">
            <div className="name">{network?.name}</div>
          </div>
          <div className="content">
            <div className="left">
              <div className="numbers">
                <div className="number">
                  <div className="info">Commision rate</div>
                  <div className="value">{network?.commission} %</div>
                </div>
                <div className="number">
                  <div className="info">Total stake</div>
                  <div className="value">
                    {formatNumber(network?.totalStake)} {network?.symbol}
                  </div>
                  {network?.price && (
                    <div className="info">
                      {formatNumber(network?.totalStake * network?.price, { currency: 'USD' })}
                    </div>
                  )}
                </div>
                <div className="number">
                  <div className="info">Delegators</div>
                  <div className="value">{network?.delegators}</div>
                </div>
              </div>
            </div>
            <div className="right">
              {network?.stakeLink && (
                <Button
                  appearance="primary"
                  color="blue"
                  className="stake-with-us"
                  onClick={() => {
                    window.location.href = network?.stakeLink;
                  }}
                >
                  STAKE {network?.name}
                </Button>
              )}
            </div>
          </div>
          <div className="delegation">
            <div className="delegation-top">Delegation address</div>
            <div className="delegation-bottom">
              <div className="address-box">{network?.address}</div>
              <div className="delegation-button">
                <Button
                  appearance="primary"
                  color="blue"
                  onClick={() => {
                    navigator.clipboard.writeText(network?.address);
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
          <div className="more-info">
            <div className="more-info-title">How to stake</div>
            <div className="more-info-text">
              <HowToStake networkName={network?.name} />
            </div>
          </div>
          {/* <div className="more-info">
          <div className="more-info-title">About {network?.name}</div>
          <div className="more-info-text">blablablabl</div>
        </div> */}
        </div>
      </div>
    </div>
  );
};
