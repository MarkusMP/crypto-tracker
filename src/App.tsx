import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CoinPage from "./pages/CoinPage/CoinPage";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
