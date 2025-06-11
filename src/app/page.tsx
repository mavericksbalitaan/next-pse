import Logo from "./components/Logo";
import Stocks from "./components/Stocks";
import { fetchAllStocks } from "./utils";

async function Home() {
  try {
    const stocks = await fetchAllStocks();
    if (stocks.length > 0) {
      return (
        <>
          <Logo />
          <Stocks stocks={stocks} />
        </>
      );
    }
  } catch (error) {
    console.log(error);
    return <p>No stock data available</p>;
  }
}

export default Home;
