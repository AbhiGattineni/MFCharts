import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { Button } from "../../components";

export const DashboardPortfolio = () => {
  const [portfolioNames, setPortfolioNames] = useState({});
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        setPortfolioNames(data);
      });
  }, []);

  return (
    <div className="border-2 m-5 ">
      <div className="grid justify-items-center font-bold border-b-2">
        Portfolio Funds
      </div>
      <div className="grid grid-cols-2 p-3">
        {Object.keys(portfolioNames).map((e, index) => {
          return <li>{portfolioNames[e].schemeName}</li>;
        })}
      </div>
    </div>
  );
};
