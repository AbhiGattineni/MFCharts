import { useState } from "react";
import { Dropdown, FetchAllMf } from "../components";
export default function timeline(){
    const [navData, setNavData] = useState({});
    const handleNavData = (e) => {
        setNavData(e.value);
      };
      console.log(navData);
    return(
        <div className="md:mt-3 mt-2 px-4">
            <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={false} />
        </div>
    )
}