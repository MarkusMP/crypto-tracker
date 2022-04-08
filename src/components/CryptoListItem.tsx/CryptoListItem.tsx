import { useEffect } from "react";
import "./CryptoListItem.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCoinList } from "../../features/crypto/cryptoSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  list: ICoins[];
}

interface ICoins {
  name: string;
  symbol: string;
  image: string;
  id: string;
  price_change_24h: number;
  market_cap: number;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  current_price: number;
}

const CryptoListItem = ({ list }: IProps) => {
  const dispatch = useAppDispatch();
  const { symbol, currency } = useAppSelector((state) => state.currency);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCoinList({}));
  }, [dispatch, currency]);

  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <tbody>
      {list.map((coin) => (
        <tr key={coin.id} onClick={() => navigate(`/coins/${coin.id}`)}>
          <th>
            <img src={coin.image} alt={coin.name} />
            <div>
              {coin.symbol} <br />
              <span>{coin.name}</span>
            </div>
          </th>
          <th>
            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
          </th>
          <th
            className={
              coin.price_change_percentage_24h > 0 ? "success" : "danger"
            }
          >
            {coin.price_change_percentage_24h >= 0 && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </th>
          <th>
            {symbol} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}
            M
          </th>
        </tr>
      ))}
    </tbody>
  );
};

export default CryptoListItem;
