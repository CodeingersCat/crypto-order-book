import { configureStore } from '@reduxjs/toolkit';
import orderbookReducer from './Components/Orderbook/orderbookSlice'

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;