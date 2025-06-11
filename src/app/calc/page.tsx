"use client";

import { useState, useRef, useCallback, useMemo } from "react";

function Calc() {
  const buyForm = useRef<HTMLFormElement>(null);
  const sellForm = useRef<HTMLFormElement>(null);

  // Gross Trade Amount
  const [grossBuy, setGrossBuy] = useState<number>(0);
  const [grossSell, setGrossSell] = useState<number>(0);

  // Stockbroker's Fees
  const [buyVAT, setBuyVAT] = useState<number>(grossBuy * 0.12);
  const [sellVAT, setSellVAT] = useState<number>(grossSell * 0.12);

  const [buyCommission, setBuyCommission] = useState<number>(
    Math.max(0.0025 * grossBuy, 20),
  );
  const [sellCommission, setSellCommission] = useState<number>(
    Math.max(0.0025 * grossBuy, 20),
  );

  // Other Charges
  const [buyPSE, setBuyPSE] = useState<number>(grossBuy * 0.00005);
  const [sellPSE, setSellPSE] = useState<number>(grossSell * 0.00005);

  const [buySCCP, setBuySCCP] = useState<number>(grossBuy * 0.0001);
  const [sellSCCP, setSellSCCP] = useState<number>(grossSell * 0.0001);

  // Sales Tax
  const [salesTax, setSalesTax] = useState<number>(grossSell * 0.006);

  // Net Trade Amount
  const netBuy = useMemo(() => {
    return grossBuy + buyCommission + buyVAT + buyPSE + buySCCP;
  }, [grossBuy, buyCommission, buyVAT, buyPSE, buySCCP]);
  const netSell = useMemo(() => {
    return grossSell + sellCommission + sellVAT + sellPSE + sellSCCP + salesTax;
  }, [grossSell, sellCommission, sellVAT, sellPSE, sellSCCP, salesTax]);

  // Net Capital Gain/Loss
  const netCapital = useMemo(() => {
    return (
      grossSell -
      grossBuy -
      (buyCommission +
        buyVAT +
        buyPSE +
        buySCCP +
        sellCommission +
        sellVAT +
        sellPSE +
        sellSCCP +
        salesTax)
    );
  }, [
    grossSell,
    grossBuy,
    buyCommission,
    buyVAT,
    buyPSE,
    buySCCP,
    sellCommission,
    sellVAT,
    sellPSE,
    sellSCCP,
    salesTax,
  ]);

  // Memoized change handler using useCallback
  const handleChange = useCallback(() => {
    if (!buyForm.current) return;

    const formData = new FormData(buyForm.current);
    const numShares = Number(formData.get("numshares"));
    const price = Number(formData.get("price"));

    if (!isNaN(numShares) && !isNaN(price)) {
      const calculatedGross = numShares * price;
      setGrossBuy(calculatedGross);
      setBuyCommission(Math.max(calculatedGross * 0.0025, 20));
      setBuyVAT(Math.max(calculatedGross * 0.0025, 20) * 0.12);
      setBuyPSE(calculatedGross * 0.00005);
      setBuySCCP(calculatedGross * 0.0001);
    }
  }, []);

  const handleSellChange = useCallback(() => {
    if (!sellForm.current) return;

    const formData = new FormData(sellForm.current);
    const numShares = Number(formData.get("numshares"));
    const price = Number(formData.get("price"));

    if (!isNaN(numShares) && !isNaN(price)) {
      const calculatedGross = numShares * price;
      setGrossSell(calculatedGross);
      setSellCommission(Math.max(calculatedGross * 0.0025, 20));
      setSellVAT(Math.max(calculatedGross * 0.0025, 20) * 0.12);
      setSellPSE(calculatedGross * 0.00005);
      setSellSCCP(calculatedGross * 0.0001);
      setSalesTax(calculatedGross * 0.006);
    }
  }, []);

  return (
    <div className="flex flex-col md:justify-center items-center h-[100vh] w-full">
      <h1 className="text-4xl font-bold my-4 text-center">
        Trading Stocks Calculator
      </h1>
      <section className="flex flex-col justify-center gap-4 md:flex-row">
        <div className="w-[90vw] h-full md:w-[400px] border-red-950 border-2 p-4 rounded-2xl">
          <form ref={buyForm} onChange={handleChange}>
            <fieldset className="flex flex-col">
              <legend className="my-4 font-bold text-center text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#141c4e] to-[#efc24e]">
                BUY
              </legend>

              <div className="form-grp">
                <label htmlFor="numshares"># of Shares:</label>
                <input
                  type="number"
                  id="numshares"
                  name="numshares"
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-grp">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-grp">
                <label htmlFor="grossBuy">Buying Price:</label>
                <input
                  type="number"
                  id="grossBuy"
                  name="grossBuy"
                  value={grossBuy.toFixed(2)}
                  disabled
                />
              </div>

              <h1 className="underline font-bold">Fees:</h1>
              <div className="form-grp">
                <label htmlFor="buyCommission">Commission (0.25%):</label>
                <input
                  type="number"
                  id="buyCommission"
                  name="buyCommission"
                  value={buyCommission.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="buyVAT">VAT (12%):</label>
                <input
                  type="number"
                  id="buyVAT"
                  name="buyVAT"
                  value={buyVAT.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="buyPSE">PSE (0.005%):</label>
                <input
                  type="number"
                  id="buyPSE"
                  name="buyPSE"
                  value={buyPSE.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="SCCP">SCCP (0.01%):</label>
                <input
                  type="number"
                  id="buySCCP"
                  name="buySCCP"
                  value={buySCCP.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="netBuy" className="font-bold">
                  Buying Trading Cost: Php
                </label>
                <input
                  type="number"
                  id="netBuy"
                  name="netBuy"
                  value={netBuy.toFixed(2)}
                  disabled
                />
              </div>
            </fieldset>
          </form>
        </div>

        {/* Sell Part */}

        <div className="w-[90vw] h-full md:w-[400px] border-red-950 border-2 p-4 rounded-2xl">
          <form ref={sellForm} onChange={handleSellChange}>
            <fieldset className="flex flex-col">
              <legend className="my-4 font-bold text-center text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#141c4e] to-[#efc24e]">
                SELL
              </legend>

              <div className="form-grp">
                <label htmlFor="numshares"># of Shares:</label>
                <input
                  type="number"
                  id="numshares"
                  name="numshares"
                  min="0"
                  step="1"
                />
              </div>

              <div className="form-grp">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-grp">
                <label htmlFor="grossSell">Selling Price:</label>
                <input
                  type="number"
                  id="grossSell"
                  name="grossSell"
                  value={grossSell.toFixed(2)}
                  disabled
                />
              </div>

              <h1 className="underline font-bold">Fees:</h1>
              <div className="form-grp">
                <label htmlFor="sellCommission">Commission (0.25%):</label>
                <input
                  type="number"
                  id="sellCommission"
                  name="sellCommission"
                  value={sellCommission.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="sellVAT">VAT (12%):</label>
                <input
                  type="number"
                  id="sellVAT"
                  name="sellVAT"
                  value={sellVAT.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="sellPSE">PSE (0.005%):</label>
                <input
                  type="number"
                  id="sellPSE"
                  name="sellPSE"
                  value={sellPSE.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="sellSCCP">SCCP (0.01%):</label>
                <input
                  type="number"
                  id="sellSCCP"
                  name="sellSCCP"
                  value={sellSCCP.toFixed(2)}
                  disabled
                />
              </div>
              <div className="form-grp">
                <label htmlFor="salesTax">Sales Tax (0.6%):</label>
                <input
                  type="number"
                  id="salesTax"
                  name="salesTax"
                  value={salesTax.toFixed(2)}
                  disabled
                />
              </div>

              <div className="form-grp">
                <label htmlFor="netSell" className="font-bold">
                  Selling Trading Cost: Php
                </label>
                <input
                  type="number"
                  id="netSell"
                  name="netSell"
                  value={netSell.toFixed(2)}
                  disabled
                />
              </div>
            </fieldset>
          </form>
        </div>
      </section>
      <div className="my-4">
        <div className="form-grp">
          <label htmlFor="netCapital" className="font-bold">
            Net Capital Gain/Loss (+/-): Php
          </label>
          <input
            type="number"
            id="netCapital"
            name="netCapital"
            value={netCapital.toFixed(2)}
            disabled
            className={
              netCapital < 0
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Calc;
