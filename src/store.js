import { configureStore } from '@reduxjs/toolkit';
import {tempTypeReducer} from './reducers';

export const store = configureStore({
  reducer: {
    tempType: tempTypeReducer,
  },
});
