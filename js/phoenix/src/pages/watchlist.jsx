import { useEffect, useState } from "react";

import { FetchAllWatchlists } from "../components";
import { LineGraph } from "../containers";
import { auth } from "../config/firebase";
import Notification from "../components/Notification/Notification";

const Watchlist = () => {
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [wlNavData, setWlNavData] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [close, setClose] = useState("");

  function deleteWatchlist() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptionsDelete = {
      method: "DELETE",
      headers: myHeaders,
    };
    fetch(`http://127.0.0.1:5000/watchlistapi/deleteallWatclist/${auth.currentUser.uid}/${selectedWatchlist}`, requestOptionsDelete)
      .then((response) => response)
      .then((data) => showToast("Watchlist Deleted", "error"))
      .catch((error) => console.error(error));
  }
  const showToast = (message, type) => {
    const newToast = { message, type, id: Date.now() };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 3000);
  };
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptionsPut = {
      method: "PUT",
      headers: myHeaders,
    };
    fetch(`http://127.0.0.1:5000/watchlistapi/deleteWatchlist/${auth.currentUser.uid}/${selectedWatchlist}/${close}`, requestOptionsPut)
      .then((response) => response)
      .then((data) => { console.log("data ", wlNavData) })
      .catch((error) => console.error(error));
    setClose("");
  }, [close]);

  useEffect(() => {
    let wlNavData = [];
    fetch(`http://127.0.0.1:5000/api/wlnavdata/${selectedWatchlist}`)
      .then((response) => response.json())
      .then((data) => {
        setWlNavData(data);
      })
      .catch((error) => console.error(error));
  }, [selectedWatchlist, close]);

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
              setClose={setClose}
              date={wlNavData[mf]}
              setDateRange={(e) => handleDateRange(e, mf)}
            />
          ))}
      </div>
      {toasts.map((toast) => (
        <Notification
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
};

export default Watchlist;
