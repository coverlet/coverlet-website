import { createSlice } from '@reduxjs/toolkit';
import { IRedux, INetwork, IApp } from './types';

const initialState: IApp = {
  network: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNetwork: (state, action) => ({
      ...state,
      network: action.payload,
    }),
  },
});

export const { setNetwork } = appSlice.actions;

export const selectNetwork = (state: IRedux): INetwork => state.app.network;

export default appSlice.reducer;
