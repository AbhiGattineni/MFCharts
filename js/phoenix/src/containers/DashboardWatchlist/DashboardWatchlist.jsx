import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { Button } from "../../components";

export const DashboardWatchlist = () => {
  const [watchListNames, setWatchListNames] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/watchlists/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWatchListNames(data);
      });
  }, []);
  return (
    <div className="border-2 m-5 ">
      <div className="grid justify-items-center font-bold border-b-2">
        Watchlist
      </div>
      <div className="grid grid-cols-6 p-3">
        {watchListNames.map((e, index) => {
          return (
            <div>
              <Button text={e.label} classes={["rounded"]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
