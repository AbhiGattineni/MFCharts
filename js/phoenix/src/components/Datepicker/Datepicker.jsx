import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

export const Datepicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
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
