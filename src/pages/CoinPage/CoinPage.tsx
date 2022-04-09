import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSingleCoinInfo } from "../../features/crypto/cryptoSlice";
import { useParams } from "react-router-dom";
import "./CoinPage.scss";
import CoinInfo from "../../components/CoinInfo/CoinInfo";

const CoinPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  const { singleCoin } = useAppSelector((state) => state.crypto);
  const { currency, symbol } = useAppSelector((state) => state.currency);

  useEffect(() => {
    dispatch(getSingleCoinInfo({ id }));
  }, [dispatch, id]);

  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const price =
    singleCoin &&
    numberWithCommas(
      // @ts-ignore
      singleCoin?.market_data.current_price[currency.toLowerCase()]
    );

  const marketCap =
    singleCoin &&
    numberWithCommas(
      // @ts-ignore
      singleCoin?.market_data.market_cap[currency.toLowerCase()]
        .toString()
        .slice(0, -6)
    );

  const description = singleCoin?.description.en.split(". ")[0] as string;
  return (
    <section className="coin-section">
      <div className="info">
        <div className="top">
          <img
            src={singleCoin?.image.large}
            alt={singleCoin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <h3>{singleCoin?.name}</h3>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <h5>
          Rank: <span>{singleCoin?.market_cap_rank}</span>
        </h5>

        <h5>
          Current Price:{" "}
          <span>
            {symbol}
            {price}
          </span>
        </h5>
        <h5>
          Market Cap:{" "}
          <span>
            {symbol}
            {marketCap}M
          </span>
        </h5>
      </div>
      {singleCoin && <CoinInfo id={singleCoin.name} />}
    </section>
  );
};

export default CoinPage;
