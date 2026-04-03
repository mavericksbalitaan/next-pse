"use client";

import { StockType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { nanoid } from "nanoid";


export default function StocksTable() {
  const { stocks } = useSelector((state: RootState) => state.stocks);
	if(stocks.length > 0) {
		console.log(stocks);
	}

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PSE Stocks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Company Name</th>
              <th className="py-2 px-4 border">Stock Symbol</th>
              <th className="py-2 px-4 border">Sector</th>
              <th className="py-2 px-4 border">Subsector</th>
              <th className="py-2 px-4 border">Listing Date</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock: StockType) => (
              <tr key={stock.stock_symbol} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{stock.company_name}</td>
                <td className="py-2 px-4 border">{stock.stock_symbol}</td>
                <td className="py-2 px-4 border">{stock.sector}</td>
                <td className="py-2 px-4 border">{stock.subsector}</td>
                <td className="py-2 px-4 border">{stock.listing_date.toLocaleString('en-US', {dateStyle: 'long'})}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
