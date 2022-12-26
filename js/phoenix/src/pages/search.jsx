import { useEffect, useState } from "react";

import { Input } from "../components";
import { Table } from "../components";
import Dropdown from "../components/Dropdown/Dropdown";
import { SearchData } from "../containers/SearchData/searchdata";

const Search = () => {
  const [mutualFund, setMutualFund] = useState("");
  const [allMutualFunds, setAllMutualFunds] = useState([]);
  const [mutualFundsSearch, setMutualFundsSearch] = useState([]);
  const [value, setValue] = useState("");

  //fetching all mutual funds data for dropdown based on selection
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/allmutualfunds")
      .then((response) => response.json())
      .then((data) => {
        setAllMutualFunds(data[0].all_mutual_funds);
      });
  }, []);

  //useeffect for fetching mutual fund details ith full nav data based on selection from variable Value
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/mutualfund/${value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log("no data found " + error));
  }, [value]);

  const setVal = (e) => {
    setValue(e);
  };
  return (
    <div>
      <Dropdown allMutualFunds={allMutualFunds} setValue={setVal} />
      <div className="flex flex-grow w-full p-3">
        <SearchData mutualFundsSearch={allMutualFunds} />
      </div>
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
