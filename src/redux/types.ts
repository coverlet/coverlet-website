export interface IRedux {
  app: IApp;
}

export interface IApp {
  count: number;
}

export interface INetwork {
  name: string;
  icon: string;
  mainnet: boolean;
  live: boolean;
}
