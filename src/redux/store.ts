import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';

// TODO MAYBE REMOVE SS Redux
// wtf was that??

export default configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
