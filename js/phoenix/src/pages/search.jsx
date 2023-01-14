import { useState } from "react";
import { FetchAllMf } from "../components";
import { LineGraph } from "../containers";

const Search = () => {
  const [navData, setNavData] = useState([]);

  return (
    <div>
      <FetchAllMf setNavData={setNavData} isMulti={true} />
      {/* <Counter /> */}
      {/* <div>
        <pre>{JSON.stringify(navData, null, 2)}</pre>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {navData.map((mf) => (
          <LineGraph navData={mf} />
        ))}
      </div>
    </div>
  );
};

export default Search;
