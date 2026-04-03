import Logo from "./components/Logo";
import Stocks from "./components/Stocks";
import allStocks from "./lib/allStocks.tsx";

async function Home() {
  try {
    const stocks = allStocks() || [];
		console.log(stocks);
      return (
        <>
          <Logo />
          <Stocks stocks={stocks} />
        </>
      )
  } catch (error) {
    console.log(error);
    return (
	<>
	<Logo />
		<p>No stock data available</p>;
		</>)
  }
}

export default Home;
