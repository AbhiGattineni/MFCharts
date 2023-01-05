import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";
import { ModalDatepicker } from "../../components";

export const LineGraph = ({ navData }) => {
  const [nav, setNav] = useState([]);
  const [date, setDate] = useState();
  const [range, setRange] = React.useState({});

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    console.log(range.startDate);
    fetch(
      `http://127.0.0.1:5000/api/mutualfund/${navData}/navdata?start=${range.startDate}&end=${range.endDate}`
    )
      .then((response) => response.json())
      .then((data) => setNav(data))
      .catch((error) => {
        console.log("no data available on selected search" + error);
      });
  }, [range]);

  return (
    <div>
      <div className="w-full">
        <ModalDatepicker setRange={setRange} />
        {/* <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
        /> */}
      </div>
      <div>{/* <pre>{JSON.stringify(nav, null, 2)}</pre> */}</div>
      <MyChart
        keys={Object.keys(nav)}
        values={Object.values(nav)}
        navData={navData}
      />
    </div>
  );
};
