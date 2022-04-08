import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CryptoListItem from "../CryptoListItem.tsx/CryptoListItem";
import Pagination from "../Pagination/Pagination";
import "./CryptoList.scss";

const CryptoList = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  const { coinList } = useAppSelector((state) => state.crypto);

  const list = coinList.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = list.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <section className="container">
      <div className="search">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Search for a cryptocurrency..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <CryptoListItem list={currentCoins} />
      </table>
      <Pagination
        coinsPerPage={coinsPerPage}
        totalCoins={list.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </section>
  );
};

export default CryptoList;
