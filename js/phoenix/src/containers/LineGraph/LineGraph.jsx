import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";
import { ModalDatepicker } from "../../components";

export const LineGraph = ({ id, date, setDateRange }) => {
  const [nav, setNav] = useState([]);
  const [name, setName] = useState("");
  const [mfDataAvailability, setMfDataAvailability] = useState(true);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/mutualfund/${id}/navdata?start=${date.startDate}&end=${date.endDate}`
    )
      .then((response) => response.json())
      .then((data) => setNav(data))
      .catch((error) => {
        console.log("no mf data available on selected search" + error);
      });
  }, [date]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/mutualfund/${id}/metadata`)
      .then((response) => response.json())
      .then((data) => setName(data.scheme_name))
      .catch((error) => {
        console.log("no meta data available on selected search" + error);
        setMfDataAvailability(false);
      });
  }, []);

  return (
    <div>
      {mfDataAvailability ? (
        <div className="border-2 border-slate-300 py-1 my-2 md:mr-2 rounded-md">
          <div>
            <div className=" w-full mt-2 md:mt-5 ">
              <div className="grid justify-items-center">
                <ModalDatepicker setDateRange={setDateRange} />
              </div>
            </div>
            <div className="grid justify-items-center">
            <MyChart
              keys={Object.keys(nav)}
              values={Object.values(nav)}
              name={name}
            />
            </div>
          </div>
        </div>
      ) : (
        <div className="font-bold p-3 text-red-600">
          Selected Mutual Fund data is Not Available
        </div>
      )}
    </div>
  );
};
