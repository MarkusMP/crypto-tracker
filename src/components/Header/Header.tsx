import React from "react";
import "./Header.scss";

const Header = () => {
  const [currency, setCurrency] = React.useState("USD");
  return (
    <header>
      <nav className="container">
        <div className="logo">
          <h1>Crypto Tracker</h1>
        </div>

        <ul className="links">
          <li className="select">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
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
