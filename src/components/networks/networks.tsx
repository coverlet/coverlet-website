import { ReactElement } from 'react';
import { Network } from '../network/network';
import { INetwork } from '../../redux/types';

import './networks.scss';

const networks: INetwork[] = [
  {
    name: 'Solana',
    icon: 'solana-logo.svg',
    mainnet: true,
    live: true,
  },
  {
    name: 'Polkadot',
    icon: 'polkadot-logo.svg',
    mainnet: true,
    live: true,
  },
  {
    name: 'Kusama',
    icon: 'kusama-logo.svg',
    mainnet: true,
    live: true,
  },
  {
    name: 'Mina',
    icon: 'mina-logo.png',
    mainnet: true,
    live: true,
  },
  {
    name: 'Regen',
    icon: 'regen-logo.png',
    mainnet: true,
    live: false,
  },
  {
    name: 'Centrifuge',
    icon: 'centrifuge-logo.svg',
    mainnet: true,
    live: true,
  },
  {
    name: 'Matic',
    icon: 'matic-logo.svg',
    mainnet: false,
    live: true,
  },
];

const getClasses = (i: number) => {
  let classes = '';
  if (Math.floor(i / 2) % 2 === 1) {
    classes += ' odd2';
  }
  if (Math.floor(i / 4) % 2 === 1) {
    classes += ' odd4';
  }

  return classes;
};

export const Networks = (): ReactElement => {
  return (
    <div className="networks container ">
      <h1>Blockchains</h1>
      <div className="networks-list">
        {networks.map((network, i) => {
          return <Network key={i} classes={getClasses(i)} network={network} />;
        })}
      </div>
    </div>
  );
};
