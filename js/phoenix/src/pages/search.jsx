import { useEffect, useState } from "react";

import { Button, FetchAllMf, ModalSave } from "../components";
import { auth } from "../config/firebase";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState({});
  const [selectedOption, setSelectedOption] = useState('All');
  const options = [
    { id: '1', value: 'All' },
    { id: '2', value: 'Mutual' },
    { id: '3', value: 'Equity' },
  ];

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
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
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
      <div className="mx-2 md:mx-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:basis-10/12">
            <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={true} />
          </div>
          <div className="md:basis-2/12">
            <div className="flex justify-between flex-row md:flex-col py-3">
              <div className="flex flex-nowrap justify-evenly items-center">
                {options.map((option) => (
                  <label className="flex flex-nowrap items-center px-3 text-sm" htmlFor={option.id} key={option.id}>
                    <input
                      className="mr-1"
                      type="radio"
                      id={option.id}
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={handleOptionChange}
                    />
                    {option.value}
                  </label>
                ))}
              </div>
              <div className="md:mt-3 flex justify-end">
                {Object.keys(navData).length > 0 && (
                  <ModalSave saveData={(e) => saveData(e)} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
