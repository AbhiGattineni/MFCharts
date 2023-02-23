import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { Label, Separator } from "../../components";
import { PortfolioGraph } from "../PortfolioGraph/PortfolioGraph";

export const DashboardDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/overallPortfolioStat/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-2 justify-items-center mx-2 sm:mx-0">
      <div className="w-full place-self-center">
        <div className="grid grid-cols-2 justify-items-center">
          <div>
            <Label text={"Invested"} classes={["text-xs", "font-light"]} />
            <Label
              text={dashboardData.totalHoldingValue}
              classes={["text-xl", "font-bold"]}
            />
          </div>
          <div>
            <Label text={"Current"} classes={["text-xs", "font-light"]} />
            <Label
              text={dashboardData.totalMarketValue}
              classes={["text-xl", "font-bold"]}
            />
          </div>
        </div>
        <div className="grid justify-items-center">
          <div className="border-t-2 border-gray-200  w-2/3 m-3"></div>
        </div>
        <div className="grid justify-items-center">
          <div className="grid grid-cols-2 justify-items-center">
            <Label
              text={"Profit/Loss:"}
              classes={["text-xs", "font-light", "place-self-center"]}
            />
            <Label
              text={dashboardData.totalProfitAndLoss}
              classes={["text-xl", "font-bold", "place-self-center"]}
            />
          </div>
        </div>
      </div>
      <div className="place-self-center">
        <PortfolioGraph />
      </div>
    </div>
  );
};
