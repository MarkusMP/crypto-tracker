import { createSlice } from "@reduxjs/toolkit";

interface IState {
  currency: string;
  symbol: string;
}

const initialState: IState = {
  currency: "EUR",
  symbol: "€",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state: IState, action) => {
      state.currency = action.payload;
    },
    setSymbol: (state: IState, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { setCurrency, setSymbol } = currencySlice.actions;

export default currencySlice.reducer;
