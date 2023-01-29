import { useEffect } from "react";

import { auth } from "../../config/firebase";
import { FundsDropdown } from "../../containers";

export const FetchAllWatchlists = () => {
  //Fetching all watchlist names of user watchlists
  useEffect(() => {
    let watchlistValues = [];
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var watchlistOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        userId: auth.currentUser.uid,
      }),
    };
    fetch("http://127.0.0.1:5000/api/watchlists", watchlistOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("FAWL", data);
      });
  });
  return (
    <div></div>
    // <FundsDropdown isMulti={isMulti} allValues={} setWatchlist={setNavData} />
  );
};
