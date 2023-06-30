import React, { useState } from "react";

const PortfolioDropdown = ({ data }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6 flex justify-center items-center p-4">
        Graph
      </div>
      <div className="col-span-6 flex justify-center items-center p-4">
        Timeline
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4 p-4 items-center">
        <div className="col-span-12 sm:col-span-9 md:col-span-12 lg:col-span-12">
          <div className="flex flex-col sm:flex-row sm:items-center ">
            <textarea
              className="flex-grow border border-gray-300 rounded-md py-2 px-3 resize-y sm:mr-2 sm:mb-0 mb-2"
              placeholder="Add Timeline"
              value={inputValue}
              onChange={handleChange}
            />
            <button className="flex-grow-0 flex-shrink-0 sm:w-1/4 bg-blue-500 text-white rounded-md py-2">
              Add Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDropdown;
