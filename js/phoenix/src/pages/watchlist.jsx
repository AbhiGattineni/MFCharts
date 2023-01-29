import { useEffect, useState } from "react";

import { FetchAllWatchlists } from "../components";

const Watchlist = () => {
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [wlNavData, setWlNavData] = useState([]);

  useEffect(() => {
    let wlNavData = [];
    fetch(`http://127.0.0.1:5000/api/wlnavdata/${selectedWatchlist}`)
      .then((response) => response.json())
      .then((data) => {
        data.map((navData) => wlNavData.push(navData));
        setWlNavData(wlNavData);
      })
      .catch((error) => console.error(error));
  }, [selectedWatchlist]);

  useEffect(() => {
    console.log("wlND", wlNavData);
  }, [wlNavData]);
  return (
    <div className="container mx-auto">
      <div>
        <FetchAllWatchlists setSelectedWatchlist={setSelectedWatchlist} />
      </div>
    </div>
  );
};

export default Watchlist;
