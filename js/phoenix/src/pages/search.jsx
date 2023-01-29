import { useEffect, useState } from "react";

import { FetchAllMf, ModalSave } from "../components";
import { auth } from "../config/firebase";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState({});

  const handleNavData = (e) => {
    let data = {};
    e.map((value, index) => {
      if (value in navData) {
        data[value] = navData[value];
      } else {
        data[value] = { startDate: "", endDate: "" };
      }
    });
    console.log("data", data);
    setNavData(data);
  };

  const handleDateRange = (e, mf) => {
    const temp = {};
    Object.keys(navData).map((navID) => {
      if (navID == mf) {
        setNavData((prevState) => ({
          ...prevState,
          [navID]: {
            ...navData[[navID]],
            startDate: e.startDate,
            endDate: e.endDate,
          },
        }));
      }
    });
    console.log("handledateRange", e.startDate, e.endDate);
  };

  useEffect(() => {
    console.log("useEffect", navData);
  }, [navData]);

  const saveData = (e) => {
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
        if (data.includes(e)) {
          alert("watchlist name already exists");
        } else {
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              userId: auth.currentUser.uid,
              watchlist_name: e,
              navData,
            }),
          };
          fetch("http://127.0.0.1:5000/api/addwatchlist", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto md:mt-5">
      <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={true} />
      <div className="mt-1 md:mt-5">
        {Object.keys(navData).length > 0 && (
          <ModalSave saveData={(e) => saveData(e)} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {navData &&
            Object.keys(navData).map((mf) => (
              <LineGraph
                key={mf}
                id={mf}
                date={navData[mf]}
                setDateRange={(e) => handleDateRange(e, mf)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
