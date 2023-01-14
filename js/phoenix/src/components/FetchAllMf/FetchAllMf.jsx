import { useEffect, useState } from "react";

import { FundsDropdown } from "../../containers";

export const FetchAllMf = ({ setNavData, isMulti }) => {
  const [allMutualFunds, setAllMutualFunds] = useState([]);
  //fetching all mutual funds data for dropdown based on selection
  useEffect(() => {
    let names = [];
    fetch("http://127.0.0.1:5000/api/allmutualfunds")
      .then((response) => response.json())
      .then((data) => {
        data[0].all_mutual_funds.map((mf) => {
          names.push({ value: mf.schemeCode, label: mf.schemeName });
        });
        setAllMutualFunds(names);
      });
  }, []);
  return (
    <FundsDropdown
      isMulti={isMulti}
      allMutualFunds={allMutualFunds}
      setNavData={setNavData}
    />
  );
};
