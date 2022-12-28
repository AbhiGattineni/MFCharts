import React, { useState } from "react";
import { useEffect } from "react";
import AsyncSelect from "react-select/async";

export const Dropdown = ({ loadOptions, setValue, isMulti }) => {
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={(event) => setValue(event)}
      isMulti
    />
  );
};
