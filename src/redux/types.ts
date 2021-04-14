export interface IRedux {
  app: IApp;
}

export interface IApp {
  network?: INetwork;
  networks?: INetwork[];
}

export interface INetwork {
  name: string;
  address?: string;
  icon: string;
  mainnet: boolean;
  live: boolean;
  id: string;
  hasPrice: boolean;
  symbol?: string;
  history?: any;
  delegators?: number;
  totalStake?: number;
  commission?: number;
  price?: number;
  stakeLink?: string;
}
