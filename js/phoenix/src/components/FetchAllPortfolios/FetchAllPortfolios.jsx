import { useEffect, useState } from "react";
import Select from "react-select";

import { auth } from "../../config/firebase";

export const FetchAllPortfolios = ({ isMulti, setNavData }) => {
  const [allPortfolioNames, setAllPortfolioNames] = useState([]);
  // console.log(allPortfolioNames);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        const portfolioValues = Object.keys(data).map((pf) => ({
          value: parseInt(pf), label: data[pf].schemeName, date:
          Object.keys(data[pf].transactions).map((key) => ({ date: data[pf].transactions[key].date })),
          category : data[pf].category,
        }));
        setAllPortfolioNames(portfolioValues);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Select
      options={allPortfolioNames}
      onChange={(selectedOption) => setNavData(selectedOption)}
      isMulti={isMulti}
      placeholder="Enter Name of the Portfolio"
    />
  );
};
