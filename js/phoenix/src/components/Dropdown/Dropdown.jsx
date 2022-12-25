import React, { useState } from "react";

function Dropdown({ allMutualFunds }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    if (searchTerm.length > 3) {
      setOptions(
        allMutualFunds.filter((option) =>
          option.schemeName.toLowerCase().includes(searchTerm)
        )
      );
    }
  }

  return (
    <div className="relative rounded-md shadow-sm">
      <input
        type="search"
        className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out border-2"
        placeholder="Search options..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select className="form-select py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out border-2">
        {options.map((option, index) => (
          <option key={index} value={option.schemeName}>
            {option.schemeName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
