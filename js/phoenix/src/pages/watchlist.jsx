import { useState } from "react";

import { FetchAllWatchlists } from "../components";

const Watchlist = () => {
  const [navData, setNavData] = useState([]);
  return (
    <div className="container mx-auto">
      <div>
        <FetchAllWatchlists setNavData={setNavData} />
      </div>
    </div>
  );
};

export default Watchlist;
