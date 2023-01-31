import React, { useState } from "react";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";
import { Dropdown } from "../../components";

export function FundsDropdown({ isMulti, allValues, setNavData }) {
  const [inputValue, setValue] = useState([]);

  useEffect(() => {
    if ((inputValue.length != 0) & (isMulti == true)) {
      let dropDownValues = [];
      inputValue.map((value) => {
        dropDownValues.push(value.value);
      });
      console.log("dropdown values", dropDownValues);
      setNavData(dropDownValues);
    } else if (isMulti == true) {
      setNavData(inputValue); //added else condition if no values in search then set navData to empty
    }
    if (isMulti == false) {
      setNavData(inputValue);
    }
  }, [inputValue]);

  const filterOptions = (searchTerm) => {
    return allValues.filter((mf) =>
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
      {/* <Dropdown
        loadOptions={loadOptions}
        setValue={setValue}
        isMulti={isMulti}
      /> */}
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={(event) => setValue(event)}
        isMulti={isMulti}
      />
    </div>
  );
}
