import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cryptoSlice from "../features/crypto/cryptoSlice";
import currencySlice from "../features/currency/currencySlice";

export const store = configureStore({
  reducer: { currency: currencySlice, crypto: cryptoSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
