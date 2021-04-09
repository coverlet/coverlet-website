export interface IRedux {
  app: IApp;
}

export interface IApp {
  network?: INetwork;
}

export interface INetwork {
  name: string;
  icon: string;
  mainnet: boolean;
  live: boolean;
  id: string;
}
