import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { auth } from "../config/firebase";
import Data from "./data.json";

const ExpandedRowDetail = ({ data }) => {
  return (
    <div className="p-4">
      <p>Some data: {data.fund}</p>
      <p>Shares: {data.shares}</p>
      <p>Category: {data.category}</p>
      <p>Profit/Loss: {data.profitLoss}</p>
      <p>Price: {data.price}</p>
    </div>
  );
};

const Portfolio = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(Data.length / pageSize);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        // setPortfolioData(data); (Removed for brevity)
      });
  }, []);

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
    <div className="container mx-auto md:mt-3">
      <div className="border-gray-600 border-2 rounded-md">
        <div className="flex flex-wrap items-center justify-between p-4 border-b-2">
          <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <span className="font-semibold">All Funds:</span>
            <span>{totalFunds}</span>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <span className="font-semibold">Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="w-full sm:w-auto">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
              Add Transaction
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  All
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
              {/* Dropdown menu */}
              {/* Add your dropdown menu content here */}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="min-w-full table-auto">
            <thead className="justify-between">
              <tr className="bg-customBlue">
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
              {visibleData.map((rowData, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border-4 border-gray-200 text-xs sm:text-sm md:text-base">
                    <td className="px-2 py-2">{rowData.fund}</td>
                    <td className="px-2 py-2">{rowData.shares}</td>
                    <td className="px-2 py-2">{rowData.category}</td>
                    <td className="px-2 py-2">{rowData.profitLoss}</td>
                    <td className="px-2 py-2">{rowData.price}</td>
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
                        <ExpandedRowDetail data={rowData} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`px-3 py-1 rounded-md mr-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-md"
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
