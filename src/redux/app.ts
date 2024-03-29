import { createSlice } from '@reduxjs/toolkit';
import { IRedux, INetwork, IApp } from './types';

const initialState: IApp = {
  network: null,
  networks: [],
  menuOpen: false,
  slide: 0,
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
    setMenuOpen: (state, action) => ({
      ...state,
      menuOpen: action.payload,
    }),
    setSlide: (state, action) => ({
      ...state,
      slide: action.payload,
    }),
  },
});

export const { setNetwork, setNetworks, setMenuOpen, setSlide } = appSlice.actions;

export const selectNetwork = (state: IRedux): INetwork => state.app.network;
export const selectNetworks = (state: IRedux): INetwork[] => state.app.networks;
export const selectMenuOpen = (state: IRedux): boolean => state.app.menuOpen;
export const selectSlide = (state: IRedux): number => state.app.slide;
export const getNetworkData =
  (networkName: string) =>
  (state: IRedux): INetwork =>
    state.app.networks.find((n) => n.name == networkName);

export default appSlice.reducer;
