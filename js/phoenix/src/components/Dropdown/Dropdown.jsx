import React, { useState } from "react";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";

export const Dropdown = ({ options, setValue, isMulti }) => {
  return (
    <AsyncSelect
      options={options}
      onChange={(event) => setValue(event)}
      isMulti={isMulti}
    />
  );
};
