import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Button from 'rsuite/lib/Button';
import Ripple from 'rsuite/lib/Ripple';
import { selectNetwork } from '../../redux/app';
import { INetwork } from '../../redux/types';

import './network.scss';

interface IProps {
  network: INetwork;
  classes: string;
  onClick: any;
}

export const Network = ({ network, classes, onClick }: IProps): ReactElement => {
  const selectedNetwork: INetwork = useSelector(selectNetwork);

  return (
    <div className="network">
      <div
        className={`inner rs-btn-subtle ${classes} ${selectedNetwork && 'network-selected'}`}
        onClick={onClick}
        role="button"
      >
        <span className="rs-ripple reveal-ripple"></span>
        <Ripple />
        <div className="top-part">
          <div className="logo">
            <img src={network.icon} alt={network.name} />
          </div>
          <div className="name">{network.name}</div>
          <div className="status">
            {network.mainnet &&
              (network.live ? <div className="led-green" /> : <div className="led-yellow" />)}
            {network.mainnet ? (
              network.live ? (
                <div className="status-text">Network is live</div>
              ) : (
                <div className="status-text">Coming soon</div>
              )
            ) : (
              <div className="status-text testnet">Testnet</div>
            )}
          </div>
        </div>

        <div className="bottom-part">Delegate</div>
      </div>
    </div>
  );
};
