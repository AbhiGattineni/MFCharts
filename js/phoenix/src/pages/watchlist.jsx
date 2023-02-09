import { useEffect, useState } from "react";

import { FetchAllWatchlists } from "../components";
import { LineGraph } from "../containers";

const Watchlist = () => {
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [wlNavData, setWlNavData] = useState([]);

  useEffect(() => {
    let wlNavData = [];
    fetch(`http://127.0.0.1:5000/api/wlnavdata/${selectedWatchlist}`)
      .then((response) => response.json())
      .then((data) => {
        setWlNavData(data);
      })
      .catch((error) => console.error(error));
  }, [selectedWatchlist]);

  const handleDateRange = (e, mf) => {
    const temp = {};
    Object.keys(wlNavData).map((navID) => {
      if (navID == mf) {
        setWlNavData((prevState) => ({
          ...prevState,
          [navID]: {
            ...wlNavData[[navID]],
            startDate: e.startDate,
            endDate: e.endDate,
          },
        }));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div>
        <FetchAllWatchlists setSelectedWatchlist={setSelectedWatchlist} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {wlNavData &&
          Object.keys(wlNavData).map((mf) => (
            <LineGraph
              key={mf}
              id={mf}
              date={wlNavData[mf]}
              setDateRange={(e) => handleDateRange(e, mf)}
            />
          ))}
      </div>
    </div>
  );
};

export default Watchlist;
