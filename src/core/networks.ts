import { INetwork } from '../redux/types';

export const networks: INetwork[] = [
  {
    name: 'Solana',
    icon: 'solana-logo.svg',
    mainnet: true,
    live: true,
    id: 'solana',
  },
  {
    name: 'Polkadot',
    icon: 'polkadot-logo.svg',
    mainnet: true,
    live: true,
    id: 'polkadot',
  },
  {
    name: 'Kusama',
    icon: 'kusama-logo.svg',
    mainnet: true,
    live: true,
    id: 'kusama',
  },
  {
    name: 'Mina',
    icon: 'mina-logo.png',
    mainnet: true,
    live: true,
    id: 'mina',
  },
  {
    name: 'Regen',
    icon: 'regen-logo.png',
    mainnet: true,
    live: false,
    id: 'regen',
  },
  {
    name: 'Centrifuge',
    icon: 'centrifuge-logo.svg',
    mainnet: true,
    live: true,
    id: 'centrifuge',
  },
  {
    name: 'Matic',
    icon: 'matic-logo.svg',
    mainnet: false,
    live: true,
    id: 'matic',
  },
];
