"use client";

import { StockType } from "@/types";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { addStocks } from "../redux/stockSlice";
import { useEffect } from "react";

function Stocks({ stocks }: { stocks: StockType[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const stocksData = useSelector((state: RootState) => state.stocks.stocks);

  useEffect(() => {
    if (stocksData.length === 0 && stocks.length > 0) {
      dispatch(addStocks(stocks));
    }
  }, [dispatch, stocks, stocksData.length]);

  return (
    <>
      <Menu />
    </>
  );
}

export default Stocks;
