import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

export const Datepicker = ({ setRange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const { startDate, endDate } = state[0];
    let obj = {};
    // let startdate = JSON.stringify(state[0].startDate);
    // startdate = startdate.substring(1, 11);

    // let enddate = JSON.stringify(state[0].endDate);
    // enddate = enddate.substring(1, 11);
    obj["startDate"] = startDate;
    obj["endDate"] = endDate;
    setRange(obj);
  }, [state]);
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
