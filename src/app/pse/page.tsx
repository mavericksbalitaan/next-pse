"use client";

import { StockType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addStocks } from '../../app/redux/stockSlice';
import allStocks from '../lib/allStocks';
import { useEffect } from 'react';


export default function StocksTable() {
	const dispatch = useDispatch();
  const { stocks } = useSelector((state: RootState) => state.stocks);

	useEffect(() => {
		if(stocks.length === 0) {
			dispatch(addStocks(allStocks()));
	}
	}, [dispatch, stocks.length])

  return (
    <div className="p-4 justify-self-start">
      <h1 className="text-2xl font-bold mb-4 text-center">Philippine Stock Exchange Stocks</h1>
      <div className="max-h-[80vh] overflow-y-auto">
        <table className="min-w-full bg-white border border-separate border-spacing-0">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Company Name</th>
              <th className="py-2 px-4 border">Stock Symbol</th>
              <th className="py-2 px-4 border">Sector</th>
              <th className="py-2 px-4 border">Subsector</th>
              <th className="py-2 px-4 border">Listing Date</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock: StockType) => (
              <tr key={stock.stockSymbol} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{stock.companyName}</td>
                <td className="py-2 px-4 border">{stock.stockSymbol}</td>
                <td className="py-2 px-4 border">{stock.sector}</td>
                <td className="py-2 px-4 border">{stock.subsector}</td>
                <td className="py-2 px-4 border">{stock.listingDate? new Date(stock.listingDate).toLocaleString('en-US', {dateStyle: 'long'}) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
