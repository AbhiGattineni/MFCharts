import { useEffect, useState } from "react";
import { Button, Counter } from "../components";
import MyChart from "../components/MyChart/MyChart";
import { FundsDropdown, LineGraph } from "../containers";

const Search = () => {
  const [allMutualFunds, setAllMutualFunds] = useState([]);
  const [navData, setNavData] = useState([]);

  //fetching all mutual funds data for dropdown based on selection
  useEffect(() => {
    let names = [];
    let storedValue = sessionStorage.getItem("navData");
    let fruits = storedValue ? storedValue.split(",") : null;
    if (fruits != null) {
      fruits = fruits.map(Number);
      setNavData(fruits);
    }

    fetch("http://127.0.0.1:5000/api/allmutualfunds")
      .then((response) => response.json())
      .then((data) => {
        data[0].all_mutual_funds.map((mf) => {
          names.push({ value: mf.schemeCode, label: mf.schemeName });
        });
        setAllMutualFunds(names);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("navData", navData);
  }, [navData]);

  return (
    <div>
      <FundsDropdown
        isMulti={true}
        allMutualFunds={allMutualFunds}
        setNavData={setNavData}
      />
      {/* <Counter /> */}
      {/* <div>
        <pre>{JSON.stringify(navData, null, 2)}</pre><div></div
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {navData.map((mf) => (
          <LineGraph navData={mf} />
        ))}
      </div>
    </div>
  );
};

export default Search;
