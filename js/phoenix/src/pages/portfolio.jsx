import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { auth } from "../config/firebase";
import Data from "../mockData/data.json";
import PortfolioDropdown from "../containers/PortfolioDropdown/PortfolioDropdown";
import { Button, ModalAddFund } from "../components";
import { FundType, BASE_URL, formatDate } from "../components/Constant";

const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropValue, setDropValue] = useState(FundType.ALL)
  const [expandedRow, setExpandedRow] = useState(null);
  const [portfolioData, setPortfolioData] = useState({});
  const [filterData, setFilterData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [totalAmount, setTotalAmount] = useState(0);
  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = Object.keys(filterData).slice(indexOfFirstRecord, indexOfLastRecord);
  const [fundData, setFundData] = useState({});

  const updateField = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsPut = {
      method: "PUT",
      headers: myHeaders
    }
    fetch(`${BASE_URL}/deleteTransaction/${auth.currentUser.uid}`, requestOptionsPut)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  const UserData = async () => {
    await fetch(`${BASE_URL}/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        let pages = Object.keys(data).length;
        setTotalPages(Math.ceil(pages / pageSize));
        setPortfolioData(data);
        setFilterData(data);
        fundCurrentData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    UserData();
    updateField();
  }, []);
  function fundCurrentData(data) {
    Object.keys(data).map((id) => {
      fetch(`https://api.mfapi.in/mf/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const funds = fundData;
          funds[id] = data.data[0].nav;
          setFundData(funds);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })
  }
  function deletetranscation(fundid,FundDate) {
    console.log(fundid,FundDate);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsPut = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: fundid,
        date: FundDate
      })
    }
    fetch(`${BASE_URL}/removetransaction/${auth.currentUser.uid}`, requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {UserData();})
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    let filter = {};
    if (dropValue === FundType.ALL) {
      filter = portfolioData;
    }
    else if (dropValue === FundType.MUTUAL) {
      Object.keys(portfolioData).map((data) => {
        if (portfolioData[data].category.toLowerCase() === "mutual fund") {
          filter[data] = portfolioData[data];
        }
      });
    }
    else {
      Object.keys(portfolioData).map((data) => {
        if (portfolioData[data].category.toLowerCase() === "equity fund") {
          filter[data] = portfolioData[data];
        }
      });
    }
    setFilterData(filter);
    let pages = Object.keys(filter).length;
    setTotalPages(Math.ceil(pages / pageSize));
  }, [dropValue, portfolioData])


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

  useEffect(() => {
    let total = Object.keys(filterData).reduce((sum, key) => {
      let dataF = filterData[key].transactions;
      return sum + dataF.reduce((total, transaction) => {
        if (transaction.transactionType === "Buy") {
          return total + transaction.navValue;
        } else {
          return total - transaction.navValue;
        }
      }, 0);
    }, 0);

    setTotalAmount(total);
  }, [filterData]);
  console.log(portfolioData);

  return (
    <div className="container mx-auto p-3 md:mt-3">
      <div className="border-gray-600 border-2 rounded-xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-3 p-4 border-b-2 place-items-center justify-items-end">
          <div className="w-full flex justify-center">
            <span className="font-semibold mr-1">All Funds:</span>
            <span>{Object.keys(filterData).length}</span>
          </div>
          <div className="w-full flex justify-center">
            <span className="font-semibold">Amount: ₹</span>
            <span>{totalAmount.toFixed(2)}</span>
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
                    {FundType.ALL}
                  </a>
                  <a
                    onClick={() => { setDropValue("Mutual"); setIsOpen(!isOpen) }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {FundType.MUTUAL}
                  </a>
                  <a
                    onClick={() => { setDropValue("Equity"); setIsOpen(!isOpen) }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {FundType.EQUITY}
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
              {currentRecords.map((key, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border-4 border-gray-200 text-xs sm:text-sm md:text-base">
                    <td className="px-2 py-2">
                      {filterData[key].schemeName}
                    </td>
                    <td className="px-2 py-2">{portfolioData[key].quantity}</td>
                    <td className="px-2 py-2">{portfolioData[key].category}</td>
                    <td className={`px-2 py-2 ${portfolioData[key].holdingValue >= fundData[key] ? "text-green-500" : "text-red-500"}`}>
                      {fundData[key] ? (portfolioData[key].holdingValue - fundData[key]).toFixed(2) : "loading..."}
                    </td>
                    <td className="px-2 py-2 w-24">
                      ₹ {portfolioData[key].holdingValue}
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
                    <>
                      <tr className="text-center">
                        <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">Date</th>
                        <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">Price</th>
                        <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">Quantity</th>
                        <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left">Type</th>
                        <th className="px-2 py-2 text-xs text-black sm:text-sm md:text-base text-left" colSpan="2">value</th>
                      </tr>
                      {portfolioData[key].transactions.map((transaction, index) => (
                        <tr key={index} className="bg-white border-2 border-gray-200 text-xs sm:text-sm md:text-base">
                          <td className="py-3 pl-3">{formatDate(transaction.date)}</td>
                          <td className="py-3 pl-3">{transaction.transactionValue.toFixed(2)}</td>
                          <td className="py-3 pl-3">{transaction.quantity}</td>
                          <td className="py-3 pl-3">{transaction.transactionType}</td>
                          <td className="py-3 pl-3">{transaction.transactionValue.toFixed(2)}</td>
                          <td className="py-3 pl-3"><RiDeleteBin6Line onClick={() => deletetranscation(portfolioData[key].id,transaction.date)} className="cursor-pointer" /></td>
                        </tr>
                      ))
                      }
                      <tr>
                        <td colSpan="6">
                          <PortfolioDropdown data={portfolioData[key]} />
                        </td>
                      </tr>
                    </>
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
