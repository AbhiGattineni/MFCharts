import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";
import { Button, Input, ModalDatepicker } from "../../components";
import { TimelineContainer } from "../TimelineContainer/TimelineContainer";

export const LineGraph = ({ id, date, setDateRange, setId }) => {
  const [nav, setNav] = useState([]);
  const [name, setName] = useState("");
  const [mfDataAvailability, setMfDataAvailability] = useState(true);
  const [timeline, setTimeline] = useState(false);

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
        <div className="border-2 border-slate-300 my-2 md:mr-2 rounded-md relative">
          <div>
            <div className="hover:bg-red-500 hover:text-white font-medium bg-gray-300 duration-200 cursor-pointer w-10 py-1 text-center rounded-tr-md absolute right-0 top-0">
              X
            </div>
            <div className=" w-full mt-2 md:mt-5">
              <div className="grid justify-items-center">
                <ModalDatepicker setDateRange={setDateRange} />
              </div>
            </div>
            <div className="">
              <MyChart
                keys={Object.keys(nav)}
                values={Object.values(nav)}
                name={name}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 px-3 mb-3">
            <Button
              handleClick={() => setTimeline(!timeline)}
              text="Timeline"
              classes="w-full"
            />
          </div>
          {timeline ? (
            <>
              <TimelineContainer id={id}/>
            </>
          ) : null}
        </div>
      ) : (
        <div className="font-bold p-3 text-red-600">
          Selected Mutual Fund data is Not Available
        </div>
      )}
    </div>
  );
};
