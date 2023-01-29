import { useEffect, useState } from "react";
import Select from "react-select";

import { auth } from "../../config/firebase";
import { FundsDropdown } from "../../containers";

export const FetchAllWatchlists = ({ setNavData, isMulti }) => {
  const [allWatchlistNames, setAllWatchlistNames] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");

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
      .then((allWatchlistNames) => {
        allWatchlistNames.map((wl) => {
          watchlistValues.push(wl);
        });
        setAllWatchlistNames(watchlistValues);
      });
  }, []);

  useEffect(() => {
    console.log("selectedWatchlist", typeof selectedWatchlist);
  }, [selectedWatchlist]);
  return (
    <Select
      options={allWatchlistNames}
      onChange={(event) => setSelectedWatchlist(event.value)}
      isMulti={isMulti}
    />
  );
};
