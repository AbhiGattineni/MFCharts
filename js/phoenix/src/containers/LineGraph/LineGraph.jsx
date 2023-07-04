import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import MyChart from "../../components/MyChart/MyChart";
import { Button, Input, ModalDatepicker } from "../../components";
import { Timeline } from "../../components/Timeline/Timeline";

export const LineGraph = ({ id, date, setDateRange, setId }) => {
  const [nav, setNav] = useState([]);
  const [name, setName] = useState("");
  const [mfDataAvailability, setMfDataAvailability] = useState(true);
  const [timeline, setTimeline] = useState(false);
  const Timelinedata = [
    {
      id: 1,
      date: "21-02-2023",
      message: "Buy the Tata shares in it will increase periodically. And growing the shares and demand",
      link: "https://github.com/"
    },
    {
      id: 2,
      date: "21-02-2023",
      message: "Buy the Tata shares in it will increase periodically. And growing the shares and demand",
      link: "",
    },
    {
      id: 3,
      date: "21-02-2023",
      message: "Buy the Tata shares in it will increase periodically. And growing the shares and demand",
    },
    {
      id: 4,
      date: "21-02-2023",
      message: "Buy the Tata shares in it will increase periodically. And growing the shares and demand",
    },
  ]

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
            <div className="hover:bg-red-500 hover:text-white font-medium bg-gray-300 duration-200 cursor-pointer w-10 py-1 text-center rounded-tr-md absolute right-0 top-0">X</div>
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
            <Button handleClick={() => setTimeline(!timeline)} text="Timeline" classes="w-full" />
          </div>
          {timeline ?
            <>
              <Timeline Timelinedata={Timelinedata} />
              <div className="px-5 mb-3">
                <Input placeholder="Add timeline ..." classes="w-full" />
                <div className="flex flex-col items-center">
                  <Button text="Add timeline" classes={["w-1/3 "]} />
                </div>
              </div>
            </>
            : null}
        </div>
      ) : (
        <div className="font-bold p-3 text-red-600">
          Selected Mutual Fund data is Not Available
        </div>
      )}
    </div>
  );
};
