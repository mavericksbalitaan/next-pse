"use client";

import { StockType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { nanoid } from "nanoid";

export default function StocksTable() {
  const { stocks } = useSelector((state: RootState) => state.stocks);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PSE Stocks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Symbol</th>
              <th className="py-2 px-4 border">Company</th>
              <th className="py-2 px-4 border">Sector</th>
              <th className="py-2 px-4 border">Listed</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock: StockType) => (
              <tr key={nanoid()} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{stock.stockSymbol}</td>
                <td className="py-2 px-4 border">{stock.companyName}</td>
                <td className="py-2 px-4 border">{stock.sector}</td>
                <td className="py-2 px-4 border">{stock.listingDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
