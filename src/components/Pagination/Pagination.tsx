import React from "react";
import "./Pagination.scss";

interface IProps {
  coinsPerPage: number;
  totalCoins: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  coinsPerPage,
  paginate,
  totalCoins,
  currentPage,
}: IProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevBtn = () => {
    if (currentPage === 1) {
      return;
    }
    paginate(currentPage - 1);
  };

  const nextBtn = () => {
    if (currentPage === 10) {
      return;
    }
    paginate(currentPage + 1);
  };
  return (
    <ul className="pagination">
      <li className="page-item" onClick={prevBtn}>
        {"<"}
      </li>
      {pageNumbers.map((number, index) => (
        <li
          key={number}
          className={
            index + 1 === currentPage ? "current page-item" : "page-item"
          }
          onClick={() => paginate(number)}
        >
          <span className="page-link">{number}</span>
        </li>
      ))}
      <li className="page-item" onClick={nextBtn}>
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
