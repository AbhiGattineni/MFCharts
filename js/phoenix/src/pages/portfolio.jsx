import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { auth } from "../config/firebase";
import Data from "../mockData/data.json";
import PortfolioDropdown from "../containers/PortfolioDropdown/PortfolioDropdown";
import { Button, ModalAddFund } from "../components";

const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropValue, setDropValue] = useState("All")
  const [expandedRow, setExpandedRow] = useState(null);
  const [portfolioData, setPortfolioData] = useState({});
  const [filterData, setFilterData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        let pages = Object.keys(data).length;
        setTotalPages(Math.ceil(pages / pageSize));
        setPortfolioData(data);
        setFilterData(data);
      });
  }, []);
  useEffect(() => {
    let filter = {};
    if (dropValue === "All") {
      filter=portfolioData;
    }
    else if (dropValue === "Mutual") {
      Object.keys(portfolioData).map((data) => {
        if (portfolioData[data].category == "mutual fund") {
          filter[data] = portfolioData[data];
        }
      })
    }
    else{
      Object.keys(portfolioData).map((data) => {
        if (portfolioData[data].category == "equity fund") {
          filter[data] = portfolioData[data];
        }
      })
    }
    setFilterData(filter);
  }, [dropValue])

  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleData = Data.slice(startIndex, endIndex);

  const totalFunds = Data.length;
  const totalAmount = Data.reduce(
    (acc, curr) => acc + parseFloat(curr.price.slice(1)),
    0
  );

  return (
    <div className="container mx-auto p-3 md:mt-3">
      <div className="border-gray-600 border-2 rounded-xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-3 p-4 border-b-2 place-items-center justify-items-end">
          <div className="w-full flex justify-center">
            <span className="font-semibold">All Funds:</span>
            <span>{totalFunds}</span>
          </div>
          <div className="w-full flex justify-center">
            <span className="font-semibold">Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="w-full flex justify-center">
            <ModalAddFund />
          </div>
          <div className="w-full relative inline-block">
            <div>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                {dropValue}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm0 14a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 14.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-12 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a
                    onClick={() => { setDropValue("All"); setIsOpen(!isOpen) }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </a>
                  <a
                    onClick={() => { setDropValue("Mutual"); setIsOpen(!isOpen) }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Mutual
                  </a>
                  <a
                    onClick={() => { setDropValue("Equity"); setIsOpen(!isOpen) }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Equity
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="min-w-full table-auto">
            <thead className="justify-between">
              <tr className="bg-bgColor">
                <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">
                  Funds
                </th>
                <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">
                  Shares
                </th>
                <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">
                  Category
                </th>
                <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">
                  Profit/Loss
                </th>
                <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">
                  Price
                </th>
                <th></th> {/* For the dropdown icon */}
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {Object.keys(filterData).map((key, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border-4 border-gray-200 text-xs sm:text-sm md:text-base">
                    <td className="px-2 py-2">
                      {filterData[key].schemeName}
                    </td>
                    <td className="px-2 py-2">{portfolioData[key].quantity}</td>
                    <td className="px-2 py-2">{portfolioData[key].category}</td>
                    <td className="px-2 py-2">
                      {portfolioData[key].tProfitLoss}
                    </td>
                    <td className="px-2 py-2">
                      {portfolioData[key].holdingValue}
                    </td>
                    <td className="px-2 py-2">
                      <button onClick={() => toggleRow(index)}>
                        {expandedRow === index ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="6">
                        <PortfolioDropdown data={portfolioData[key]} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center p-3 mt-3">
          <button
            className="px-3 py-1 bg-bgColor text-white rounded-md mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`px-3 py-1 rounded-md mr-2 ${currentPage === index + 1
                ? "bg-bgColor text-white"
                : "bg-gray-200 text-black"
                }`}
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-bgColor text-white rounded-md"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
