import { useEffect, useState } from "react";
import { Button, Counter } from "../components";
import MyChart from "../components/MyChart/MyChart";
import { FundsDropdown } from "../containers";

const Search = () => {
  const [allMutualFunds, setAllMutualFunds] = useState([]);
  const [navData, setNavData] = useState([]);
  const [navData1, setNavData1] = useState([]);

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
    <div>
      <FundsDropdown
        isMulti={true}
        allMutualFunds={allMutualFunds}
        setNavData={setNavData}
      />
      <Counter />
      <div>
        <pre>{JSON.stringify(navData, null, 2)}</pre>
      </div>
      <div className="">
        {navData.map((mf) => (
          <MyChart className="" navData={mf} />
        ))}
      </div>
    </div>
  );
};

export default Search;
