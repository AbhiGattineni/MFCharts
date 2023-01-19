import { useEffect, useState } from "react";
import { BsSave } from "react-icons/bs";

import { Button, FetchAllMf, Input, BareIcon, ModalSave } from "../components";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState({});

  const handleClick = () => {};

  const handleNavData = (e) => {
    let data = {};
    e.map((value, index) => {
      data[value] = { startDate: "", endDate: "" };
    });
    setNavData(data);
  };

  const handleRange = (e, mf) => {
    navData[mf];
  };

  useEffect(() => {
    console.log(navData);
  }, [navData]);

  return (
    <div>
      <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={true} />
      <div className="mt-1 md:mt-5">
        {navData != null ? <ModalSave /> : ""}

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* <div>
            <pre>{JSON.stringify(navData, null, 2)}</pre>
          </div> */}
          {navData != null
            ? Object.keys(navData).map((mf) => <LineGraph id={mf} />)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Search;
