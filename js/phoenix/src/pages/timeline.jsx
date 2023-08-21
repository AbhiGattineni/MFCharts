import { useState } from "react";
import { Dropdown, FetchAllMf } from "../components";
import { TimelineContainer } from "../containers/TimelineContainer/TimelineContainer";
export default function timeline(){
    const [navData, setNavData] = useState(null);
    const handleNavData = (e) => {
        setNavData(e.value);
      };
    return(
        <div className="md:mt-3 mt-2 px-4">
            <FetchAllMf setNavData={(e) => handleNavData(e)} isMulti={false} />
            {navData!=null?<TimelineContainer id={navData} />
             :null}
        </div>
    )
}