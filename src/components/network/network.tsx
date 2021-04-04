import React, { ReactElement } from 'react';
import Button from 'rsuite/lib/Button';
import { INetwork } from '../../redux/types';

import './network.scss';

interface IProps {
  network: INetwork;
  classes: string;
}

export const Network = ({ network, classes }: IProps): ReactElement => {
  return (
    <div className="network">
      <div className={`inner ${classes}`}>
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

        <div className="bottom-part">
          <Button appearance="default">Delegate</Button>
        </div>
      </div>
    </div>
  );
};
