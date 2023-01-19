import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";

export const Datepicker = ({ setState, state }) => {
  return (
    <DateRangePicker
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      direction="horizontal"
      preventSnapRefocus={true}
      calendarFocus="backwards"
    />
  );
};
