import { StockType } from "@/types";
import { parse } from "node-html-parser";

export const fetchStocks = async (pageNo: number) => {
  try {
    const endpoint = `https://edge.pse.com.ph/companyDirectory/search.ax?pageNo=${pageNo}&companyId=&keyword=&sector=ALL&subsector=ALL`;
    const API_OPTIONS = {
      method: "GET",
    };

    const response = await fetch(endpoint, API_OPTIONS);
    const data = await response.text();
    const parsedhtml = parse(data);
    const list = parsedhtml.querySelector(".list tbody");
    const nodes = list?.querySelectorAll("tr");

    if (nodes) {
      const stocks = nodes.map((node) => {
        const a = node.querySelector("a");
        if (a) {
          const attrib = a.rawAttributes.onclick.split("'");
          const [companyId, securityId] = [attrib[1], attrib[3]];

          const tdElements = node.querySelectorAll("td");
          const [companyName, stockSymbol, sector, subsector, listingDate] =
            tdElements.map((el) => el.innerText);

          return {
            companyId: companyId,
            securityId: securityId,
            companyName: companyName,
            stockSymbol: stockSymbol,
            sector: sector,
            subsector: subsector,
            listingDate: listingDate,
          };
        }
      });

      return [...stocks];
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchAllStocks = async (): Promise<StockType[]> => {
  const stocks: StockType[] = [];
  let pageNo: number = 1;

  while (true) {
    const newStocks = await fetchStocks(pageNo);
    if (!newStocks || newStocks.length <= 1) {
      break;
    }

    newStocks.forEach((stock) => stocks.push(stock as StockType));
    console.log(newStocks);
    pageNo += 1;
  }
  return stocks;
};
