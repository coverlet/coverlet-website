import { createSlice } from '@reduxjs/toolkit';
import { IApp, IRedux } from './types';

const initialState: IApp = {
  count: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCount: (state, action) => ({
      ...state,
      count: action.payload,
    }),
  },
});

export const { setCount } = appSlice.actions;

export const selectCount = (state: IRedux): number => state.app.count;

export default appSlice.reducer;
