import React, { useState } from "react";
import { TimelineContainer } from "../TimelineContainer/TimelineContainer";

const PortfolioDropdown = ({ data }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-center">Graph</div>
      <TimelineContainer id={data.schemeCode} />
    </div>
  );
};

export default PortfolioDropdown;
