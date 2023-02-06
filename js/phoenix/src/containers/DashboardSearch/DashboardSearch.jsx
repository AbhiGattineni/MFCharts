import { Button, FetchAllMf } from "../../components";

export const DashboardSearch = ({ setNavData }) => {
  return (
    <div className=" m-5 ">
      <div className="grid justify-items-center font-bold ">Search</div>
      <div className="p-3">
        <FetchAllMf setNavData={setNavData} isMulti={true} />
      </div>
    </div>
  );
};
