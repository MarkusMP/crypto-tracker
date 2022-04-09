import React from "react";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrency, setSymbol } from "../../features/currency/currencySlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.currency.currency);

  const changeCurrency = (currency: string) => {
    if (currency === "USD") {
      dispatch(setCurrency("USD"));
      dispatch(setSymbol("$"));
    } else if (currency === "EUR") {
      dispatch(setSymbol("€"));
      dispatch(setCurrency("EUR"));
    } else if (currency === "SEK") {
      dispatch(setCurrency("SEK"));
      dispatch(setSymbol("kr"));
    }
  };

  return (
    <header>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <h1>Crypto Tracker</h1>
          </Link>
        </div>

        <ul className="links">
          <li className="select">
            <select
              value={currency}
              onChange={(e) => changeCurrency(e.target.value)}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="SEK">SEK</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
