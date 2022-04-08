import { useState } from "react";
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

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const prevBtn = () => {
    if (currentPage === 1) {
      return;
    }
    paginate(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const nextBtn = () => {
    if (currentPage === 10) {
      return;
    }

    paginate(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className={"page-item"} onClick={nextBtn}>
        <span className="page-link"> &hellip;</span>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className={"page-item"} onClick={prevBtn}>
        <span className="page-link"> &hellip;</span>
      </li>
    );
  }

  const renderPageNumbers = pageNumbers.map((number, index) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          className={
            index + 1 === currentPage ? "current page-item" : "page-item"
          }
          onClick={() => paginate(number)}
        >
          <span className="page-link">{number}</span>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item" onClick={prevBtn}>
          {"<"}
        </li>
      )}
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      {currentPage < 10 && (
        <li className="page-item" onClick={nextBtn}>
          {">"}
        </li>
      )}
    </ul>
  );
};

export default Pagination;
