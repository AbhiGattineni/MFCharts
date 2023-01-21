import { useEffect, useState } from "react";
import { BsSave } from "react-icons/bs";

import { Button, FetchAllMf, Input, BareIcon, ModalSave } from "../components";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState({});

  const handleNavData = (e) => {
    let data = {};
    e.map((value, index) => {
      data[value] = { startDate: "", endDate: "" };
    });
    console.log("data", data);
    setNavData(data);
  };

  const handleDateRange = (e, mf) => {
    console.log("handledateRange", navData);
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

  useEffect(() => {
    console.log("useEffect", navData);
  }, [navData]);

  const saveData = (e) => {
    const params = new URLSearchParams();
    Object.entries(navData).forEach(([key, value]) =>
      params.append(key, value)
    );
    console.log("params", params);

    fetch(`http://127.0.0.1:5000/api/watchlistfunds/?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={true} />
      <div className="mt-1 md:mt-5">
        {navData != null ? <ModalSave saveData={(e) => saveData(e)} /> : ""}

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* <div>
            <pre>{JSON.stringify(navData, null, 2)}</pre>
          </div> */}
          {navData != null
            ? Object.keys(navData).map((mf) => (
                <LineGraph
                  id={mf}
                  date={navData[mf]}
                  setDateRange={(e) => handleDateRange(e, mf)}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Search;
