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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/allmutualfunds")
      .then((response) => response.json())
      .then((data) => {
        setAllMutualFunds(data[0].all_mutual_funds);
      });
  }, []);
  function logValue() {}
  const setVal = (e) => {
    setMutualFund(e);

    //fetching searched mutual funds from all the mutual funds based on search input
    let mutualFundsSearch = [];
    if (mutualFund.length > 3) {
      // allMutualFunds.map((mf) => {
      //   if (mf.schemeName.toLowerCase().includes(mutualFund)) {
      //     mutualFundsSearch.push(mf);
      //   }
      // });
      // setMutualFundsSearch(mutualFundsSearch);
      mutualFundsSearch = allMutualFunds.filter((option) =>
        option.schemeName.toLowerCase().includes(mutualFund)
      );
      setMutualFundsSearch(mutualFundsSearch);
    }
  };
  return (
    <Dropdown allMutualFunds={allMutualFunds} />
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
