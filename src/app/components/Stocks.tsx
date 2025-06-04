"use client";

import { useDispatch, useSelector } from "react-redux";
import { addStocks, setLoading, setError } from "../redux/stockSlice";
import { useEffect } from "react";
import { fetchAllStocks } from "../utils";
import { RootState, AppDispatch } from "@/app/redux/store";
import { ClipLoader } from "react-spinners";
import Menu from "./Menu";

function Stocks() {
  const { stocks, loading, error } = useSelector(
    (state: RootState) => state.stocks,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchAllStocks();
        dispatch(addStocks(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        } else {
          dispatch(setError("Unknown error occurred."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (stocks.length === 0) {
      loadData();
    }
  }, [dispatch, stocks]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <ClipLoader />
        Loading stocks data...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
    <Menu />
    </>
  );
}

export default Stocks;
