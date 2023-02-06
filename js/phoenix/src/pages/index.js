import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  DashboardDashboard,
  DashboardPortfolio,
  DashboardSearch,
  DashboardWatchlist,
} from "../containers";

const Home = () => {
  const [navData, setNavData] = useState({});

  useEffect(() => {
    console.log("theer", navData);
  }, [navData]);
  return (
    <div className="container mx-auto grid justify-items-center grid-rows-4">
      <div className="grid row-span-1 w-full">
        <DashboardDashboard />
      </div>
      <div className="grid row-span-1 w-full">
        <DashboardSearch setNavData={setNavData} />
      </div>
      <div className="grid row-span-1 w-full">
        <DashboardPortfolio />
      </div>
      <div className="grid row-span-1 w-full">
        <DashboardWatchlist />
      </div>
    </div>
  );
};

export default Home;
