import { useEffect, useState } from "react";
import { BsSave } from "react-icons/bs";

import { Button, FetchAllMf, Input, BareIcon } from "../components";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState([]);
  const [saveLabel, setSaveLabel] = useState("");

  const handleClick = () => {};

  return (
    <div>
      <FetchAllMf setNavData={setNavData} isMulti={true} />
      <div className="mt-1 md:mt-5">
        {navData.length != 0 ? (
          <div className="grid grid-cols-6">
            <Input
              placeholder={"Enter label you want to save"}
              classes={["rounded"]}
              setValue={setSaveLabel}
            />
            {console.log("nav", navData)}
            <div onClick={handleClick}>
              <BareIcon
                IconComponent={<BsSave />}
                classes={["cursor-pointer"]}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="grid grid-cols-1 md:grid-cols-2">
          {navData.map((mf) => (
            <LineGraph navData={mf} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
