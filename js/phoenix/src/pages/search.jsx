import { useEffect, useState } from "react";

import { FetchAllMf, ModalSave } from "../components";
import { auth } from "../config/firebase";
import { LineGraph } from "../containers";
import { Radio } from "../components/Radio/Radio";

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
  };

  const saveData = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://127.0.0.1:5000/api/watchlists/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((watchlistNames) => {
        let labelExists = false;
        watchlistNames.map((watchlist) => {
          if (watchlist.label === e) {
            labelExists = true;
          }
        });
        if (labelExists) {
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
    <div className="container mx-auto md:mt-3 px-4 sm:px-0">
      <div className="flex items-center">
        <div className="w-10/12">
      <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={true} />
      </div>
      <Radio styles="p-3"></Radio>
      </div>
      <div className=" mt-3">
        {Object.keys(navData).length > 0 && (
          <ModalSave saveData={(e) => saveData(e)} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12 ml-2">
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
