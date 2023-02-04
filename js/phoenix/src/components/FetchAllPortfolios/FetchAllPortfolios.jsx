import { useEffect, useState } from "react";
import Select from "react-select";

import { auth } from "../../config/firebase";

export const FetchAllPortfolios = ({ isMulti, setSelectedPortfolio }) => {
  const [allPortfolioNames, setAllPortfolioNames] = useState([]);

  //   Fetching all watchlist names of user watchlists
  useEffect(() => {
    let portfolioValues = [];

    fetch(`http://127.0.0.1:5000/api/userPortfolioData/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((portfolioNames) => {
        portfolioNames.map((pf) => {
          portfolioValues.push(pf);
        });
        setAllPortfolioNames(portfolioValues);
      });
  }, []);
  return (
    <Select
      options={allPortfolioNames}
      onChange={(event) => setSelectedPortfolio(event.value)}
      isMulti={isMulti}
      placeholder="Enter Name of the Portfolio"
    />
  );
};
