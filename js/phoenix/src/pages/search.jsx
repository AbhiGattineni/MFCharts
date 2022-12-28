import { useEffect, useState } from "react";

import { Input, Table } from "../components";
import Dropdown from "../components/Dropdown/Dropdown";
import MyChart from "../components/MyChart/MyChart";
import { FundsDropdown } from "../containers";
import { SearchData } from "../containers/SearchData/searchdata";

const Search = () => {
  const [mutualFund, setMutualFund] = useState("");
  const [allMutualFunds, setAllMutualFunds] = useState([]);
  const [mutualFundsSearch, setMutualFundsSearch] = useState([]);
  const [value, setValue] = useState("");
  const [navData, setNavData] = useState([]);

  //fetching all mutual funds data for dropdown based on selection
  useEffect(() => {
    let names = [];
    fetch("http://127.0.0.1:5000/api/allmutualfunds")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].all_mutual_funds);
        data[0].all_mutual_funds.map((mf) => {
          names.push({ value: mf.schemeCode, label: mf.schemeName });
        });
      });
    setAllMutualFunds(names);
  }, []);

  //useeffect for fetching mutual fund details ith full nav data based on selection from variable Value
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:5000/api/mutualfund/${value}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => console.log("no data found " + error));
  // }, [value]);

  const setVal = (e) => {
    setValue(e);
  };
  return (
    <div>
      <FundsDropdown
        isMulti={true}
        allMutualFunds={allMutualFunds}
        setNavData={setNavData}
      />
      <MyChart navData={navData} />
    </div>
    // <div className="flex flex-col h-screen ">
    //   <div className="flex space-x-4">
    //     <div className="grid justify-items-center">
    //       <Input
    //         type="search"
    //         classes="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out"
    //         placeholder="Search options..."
    //         setValue={setVal}
    //       />
    //       <select className="form-select py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out">
    //         {mutualFundsSearch.map((option, index) => (
    //           <option key={index} value={option.schemeName}>
    //             {option.schemeName}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </div>
    //   <div className="flex flex-grow w-full p-3">
    //     <SearchData mutualFundsSearch={mutualFundsSearch} />
    //   </div>
    // </div>
  );
};

export default Search;
