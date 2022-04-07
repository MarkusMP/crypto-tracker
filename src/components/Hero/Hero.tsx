import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTrendingCoins, reset } from "../../features/crypto/cryptoSlice";
import CarouselComp from "../Carousel/Carousel";
import "./Hero.scss";

const Hero = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);
  useEffect(() => {
    const dispatchCoins = async () => {
      await dispatch(getTrendingCoins({}));

      dispatch(reset());
    };

    dispatchCoins();
  }, [dispatch, currency]);
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Crypto Tracker</h1>
          <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
        </div>
      </div>
      <div className="carousel">
        <CarouselComp />
      </div>
    </section>
  );
};

export default Hero;
