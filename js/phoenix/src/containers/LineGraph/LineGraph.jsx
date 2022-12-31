import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";

export const LineGraph = ({ navData }) => {
  const [nav, setNav] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    console.log("mycharts");
    console.log(navData);
    fetch(
      `http://127.0.0.1:5000/api/mutualfund/${navData}?start=${state.startDate}&end=${state.endDate}`
    )
      .then((response) => response.json())
      .then((data) => setNav(data))
      .catch((error) => {
        console.log("no data available on selected search" + error);
      });
  }, [navData]);

  return (
    <div>
      <div className="w-full">
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
        />
      </div>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
      <MyChart nav={nav} navData={navData} />
    </div>
  );
};
