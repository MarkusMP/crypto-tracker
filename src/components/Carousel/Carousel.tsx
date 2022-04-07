import React from "react";
import "./Carousel.scss";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CarouselComp = () => {
  const { trendingCoins } = useAppSelector((state) => state.crypto);
  const { symbol } = useAppSelector((state) => state.currency);

  const items = trendingCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className="carouselItem" to={`/coins/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color:
                coin.price_change_percentage_24h > 0
                  ? "rgb(14, 203, 129)"
                  : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carousel">
      <AliceCarousel
        infinite
        autoPlayInterval={1500}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default CarouselComp;
