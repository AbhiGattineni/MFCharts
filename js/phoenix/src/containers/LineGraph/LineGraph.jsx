import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";
import { ModalDatepicker } from "../../components";

export const LineGraph = ({ navData }) => {
  const [nav, setNav] = useState([]);
  const [name, setName] = useState("");
  const [range, setRange] = React.useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/mutualfund/${navData}/navdata?start=${range.startDate}&end=${range.endDate}`
    )
      .then((response) => response.json())
      .then((data) => setNav(data))
      .catch((error) => {
        console.log("no data available on selected search" + error);
      });
  }, [range]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/mutualfund/${navData}/metadata`)
      .then((response) => response.json())
      .then((data) => setName(data.scheme_name))
      .catch((error) => {
        console.log("no data available on selected search" + error);
      });
  });

  return (
    <div className="border-2 border-slate-300 p-1 m-2 rounded-md">
      <div className=" w-full mt-2 md:mt-5 ">
        <div className="grid justify-items-center">
          <ModalDatepicker setRange={setRange} />
        </div>
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
        name={name}
      />
    </div>
  );
};
