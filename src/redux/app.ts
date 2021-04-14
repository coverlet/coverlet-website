import { createSlice } from '@reduxjs/toolkit';
import { IRedux, INetwork, IApp } from './types';

const initialState: IApp = {
  network: null,
  networks: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNetwork: (state, action) => ({
      ...state,
      network: action.payload,
    }),
    setNetworks: (state, action) => ({
      ...state,
      networks: action.payload,
    }),
  },
});

export const { setNetwork, setNetworks } = appSlice.actions;

export const selectNetwork = (state: IRedux): INetwork => state.app.network;
export const selectNetworks = (state: IRedux): INetwork[] => state.app.networks;
export const getNetworkData = (networkName: string) => (state: IRedux): INetwork =>
  state.app.networks.find((n) => n.name == networkName);

export default appSlice.reducer;
