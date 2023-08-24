import { useEffect, useState } from "react";

import { FundsDropdown } from "../../containers";

export const FetchAllMf = ({ setNavData, isMulti }) => {
  // const [allMutualFunds, setAllMutualFunds] = useState([]);

  //fetching all mutual funds names for user selection
  useEffect(() => {
    // fetch(`http://127.0.0.1:5000/api/allmutualfunds/${"ZEEL"}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("data", data);
    //     const names = data[0].all_mutual_funds.map((mf) => ({
    //       value: mf.schemeCode,
    //       label: mf.schemeName,
    //       type: "EQ",
    //     }));
    //     setAllMutualFunds(names);
    //   });
  }, []);

  return (
    <FundsDropdown
      isMulti={isMulti}
      // allValues={allMutualFunds}
      setNavData={setNavData}
    />
  );
};
