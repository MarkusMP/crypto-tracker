import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { TrendingCoins } from "../../config/api";

interface IState {
  trendingCoins: ITrendingCoins[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface ITrendingCoins {
  name: string;
  symbol: string;
  image: string;
  id: string;
  price_change_percentage_24h: number;
  current_price: number;
}

const initialState: IState = {
  trendingCoins: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const getTrendingCoins = createAsyncThunk<{}, {}, { state: RootState }>(
  "crypto/getTrendingCoins",
  async (_, thunkAPI) => {
    console.log("hello");
    const currency = thunkAPI.getState().currency.currency;
    const coins = await axios.get(TrendingCoins(currency));

    if (coins.data) {
      return coins.data;
    } else {
      throw new Error("Error fetching data");
    }
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    reset: (state: IState) => {
      state.error = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingCoins.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(getTrendingCoins.fulfilled, (state: IState, action: any) => {
        state.trendingCoins = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getTrendingCoins.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { reset } = cryptoSlice.actions;

export default cryptoSlice.reducer;
