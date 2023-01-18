import React, { useState } from "react";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Dropdown } from "../../components";

export function FundsDropdown({ isMulti, allMutualFunds, setNavData }) {
  const [inputValue, setValue] = useState([]);

  useEffect(() => {
    if ((inputValue.length != 0) & (isMulti == true)) {
      let dropDownValues = [];
      inputValue.map((value) => {
        dropDownValues.push(value.value);
      });
      console.log("dropdown values", dropDownValues);
      setNavData(dropDownValues);
    }
    if (isMulti == false) {
      setNavData(inputValue);
    }
  }, [inputValue]);

  const filterOptions = () => {
    console.log("Here", allMutualFunds);

    return allMutualFunds.filter((mf) => mf.label.toLowerCase());
  };

  return (
    <div>
      <Dropdown options={filterOptions} setValue={setValue} isMulti={isMulti} />
    </div>
  );
}
