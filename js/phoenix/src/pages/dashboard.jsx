import { useRouter } from "next/router";

import { DashboardPortfolio } from "../containers";

const Dashboard = () => {
  return (
    <div className="container mx-auto grid justify-items-center grid-rows-3">
      <div className="grid row-span-1 w-full">
        <DashboardPortfolio />
      </div>
    </div>
  );
};

export default Dashboard;
