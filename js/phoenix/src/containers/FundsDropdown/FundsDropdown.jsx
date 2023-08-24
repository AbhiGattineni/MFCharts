import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export function FundsDropdown({ isMulti, setNavData }) {
  const [inputValue, setValue] = useState([]);

  useEffect(() => {
    if (inputValue.length !== 0 && isMulti) {
      let dropDownValues = inputValue.map((value) => value.value);
      setNavData(dropDownValues);
    } else if (isMulti) {
      setNavData([]); // Reset navData to empty if no values in search
    } else {
      setNavData(inputValue);
    }
  }, [inputValue]);

  const fetchOptions = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/allmutualfunds/${searchTerm}`
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Unexpected data shape from backend:", data);
        return [];
      }

      return data.map((mf) => ({
        value: mf.schemeCode,
        label: mf.schemeName,
        type: mf.type,
      }));
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  };

  const loadOptions = async (inputValue, callback) => {
    if (inputValue.length > 3) {
      const options = await fetchOptions(inputValue);
      callback(options);
    }
  };

  const formatOptionLabel = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px", fontWeight: "bold" }}>
        {option.type}
      </span>
      <span style={{ marginRight: "10px", fontWeight: "bold" }}>
        {option.value}
      </span>
      {option.label}
    </div>
  );

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={(event) => setValue(event)}
        isMulti={isMulti}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
}
