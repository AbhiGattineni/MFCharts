import React, { useState } from "react";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Dropdown } from "../../components";

export function FundsDropdown({ isMulti, allMutualFunds, setNavData }) {
  const [inputValue, setValue] = useState([]);

  useEffect(() => {
    console.log(inputValue);
    if ((inputValue.length != 0) & (isMulti == true)) {
      let dropDownValues = [];
      inputValue.map((value) => {
        dropDownValues.push(value.value);
      });
      console.log("dropdown values", dropDownValues);
      setNavData(dropDownValues);
    } else {
      setNavData(inputValue); //added else condition if no values in search then set navData to empty
    }
    if (isMulti == false) {
      setNavData(inputValue);
    }
  }, [inputValue]);

  const filterOptions = (searchTerm) => {
    return allMutualFunds.filter((mf) =>
      mf.label.toLowerCase().includes(searchTerm)
    );
  };

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length > 3) {
      setTimeout(() => {
        callback(filterOptions(inputValue));
      }, 1000);
    }
  };

  return (
    <div>
      <Dropdown
        loadOptions={loadOptions}
        setValue={setValue}
        isMulti={isMulti}
      />
    </div>
    // <div className="relative rounded-md shadow-sm">
    //   <input
    //     type="search"
    //     className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out border-2"
    //     placeholder="Search options..."
    //     value={searchTerm}
    //     onChange={handleSearch}
    //   />
    //   <select
    //     onChange={(event) => {
    //       setValue(event.target.value);
    //     }}
    //     className="form-select py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out border-2"
    //   >
    //     <option value="" disabled hidden>
    //       Please select an option
    //     </option>
    //     {options.map((option, index) => (
    //       <option key={index} value={option.schemeName}>
    //         {option.schemeCode + ":" + option.schemeName}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
}
