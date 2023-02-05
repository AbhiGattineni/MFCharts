import { useEffect, useState } from "react";
import Select from "react-select";

import { auth } from "../../config/firebase";

export const FetchAllWatchlists = ({ setSelectedWatchlist, isMulti }) => {
  const [allWatchlistNames, setAllWatchlistNames] = useState([]);

  //Fetching all watchlist names of user watchlists
  useEffect(() => {
    let watchlistValues = [];
    fetch(`http://127.0.0.1:5000/api/watchlists/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((allWatchlistNames) => {
        allWatchlistNames.map((wl) => {
          watchlistValues.push(wl);
        });
        setAllWatchlistNames(watchlistValues);
      });
  }, []);
  return (
    <Select
      options={allWatchlistNames}
      onChange={(event) => setSelectedWatchlist(event.value)}
      isMulti={isMulti}
      placeholder="Enter Name of the Watchlist"
    />
  );
};
