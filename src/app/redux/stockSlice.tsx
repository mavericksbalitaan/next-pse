import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockType } from "@/types";

interface initialStateType {
  stocks: StockType[];
  loading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  stocks: [],
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: "stocks",
  initialState: initialState,
  reducers: {
    addStocks: (state, action: PayloadAction<StockType[]>) => {
      state.stocks.push(...action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addStocks, setLoading, setError } = stockSlice.actions;
export default stockSlice.reducer;
