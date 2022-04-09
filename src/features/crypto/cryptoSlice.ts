import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import {
  TrendingCoins,
  CoinList,
  SingleCoin,
  HistoricalChart,
} from "../../config/api";

interface IState {
  trendingCoins: ICoins[];
  singleCoin: ISingleCoin | null;
  coinList: ICoins[];
  historicalChart: IHistoricalChart | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
}

interface IHistoricalChart {
  prices: number[];
}

interface ICoins {
  name: string;
  symbol: string;
  image: string;
  id: string;
  price_change_24h: number;
  market_cap: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  current_price: number;
}

interface ISingleCoin {
  name: string;
  description: {
    en: string;
  };
  market_cap_rank: number;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      sek: number;
      eur: number;
    };
    market_cap: {
      usd: number;
      sek: number;
      eur: number;
    };
  };
}

const initialState: IState = {
  trendingCoins: [],
  historicalChart: null,
  coinList: [],
  singleCoin: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const getCoinList = createAsyncThunk<{}, {}, { state: RootState }>(
  "crypto/getCoinList",
  async (_, thunkAPI) => {
    const currency = thunkAPI.getState().currency.currency;
    const coins = await axios.get(CoinList(currency));

    if (coins.data) {
      return coins.data;
    } else {
      throw new Error("Error fetching coins list");
    }
  }
);

export const getTrendingCoins = createAsyncThunk<{}, {}, { state: RootState }>(
  "crypto/getTrendingCoins",
  async (_, thunkAPI) => {
    const currency = thunkAPI.getState().currency.currency;
    const coins = await axios.get(TrendingCoins(currency));

    if (coins.data) {
      return coins.data;
    } else {
      throw new Error("Error fetching trending coins");
    }
  }
);

export const getSingleCoinInfo = createAsyncThunk<
  {},
  { id: string },
  { state: RootState }
>("crypto/getSingleCoinInfo", async (data, thunkAPI) => {
  const coins = await axios.get(SingleCoin(data.id));

  if (coins.data) {
    return coins.data;
  } else {
    throw new Error("Error fetching trending coins");
  }
});

export const getHistoricData = createAsyncThunk<
  {},
  { id: string; days: number },
  { state: RootState }
>("crypto/getHistoricData", async (data, thunkAPI) => {
  const currency = thunkAPI.getState().currency.currency;

  console.log(currency);

  const coins = await axios.get(HistoricalChart(data.id, data.days, currency));

  console.log(coins.data);

  if (coins.data) {
    return coins.data;
  } else {
    throw new Error("Error fetching trending coins");
  }
});

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
      })
      .addCase(getCoinList.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(getCoinList.fulfilled, (state: IState, action: any) => {
        state.coinList = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getCoinList.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getSingleCoinInfo.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(getSingleCoinInfo.fulfilled, (state: IState, action: any) => {
        state.singleCoin = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getSingleCoinInfo.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(getHistoricData.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(getHistoricData.fulfilled, (state: IState, action: any) => {
        state.historicalChart = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getHistoricData.rejected, (state: IState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { reset } = cryptoSlice.actions;

export default cryptoSlice.reducer;
