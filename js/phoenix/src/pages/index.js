import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  DashboardDashboard,
  DashboardPortfolio,
  DashboardSearch,
  DashboardWatchlist,
} from "../containers";
import { LineGraph } from "../containers";
import { Accordion } from "../components";

const Home = () => {
  const [navData, setNavData] = useState({});
  const [dashboardPortfolio, setDashboardPortfolio] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("theer", dashboardPortfolio);
  }, [dashboardPortfolio]);

  const handleNavData = (e) => {
    let data = {};
    if (e.length != 0) {
      data[e.value] = { startDate: "", endDate: "" };
      setNavData(data);
    }
  };

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  return (
    <>
      <div className="container mx-auto grid justify-items-center grid-rows-4">
        <div className="grid row-span-1 w-full">
          <DashboardDashboard />
        </div>
        <div className="grid row-span-1 w-full">
          {/* <DashboardSearch setNavData={(e) => handleNavData(e)} /> */}
        </div>
        <div className="grid row-span-1 w-full">
          {/* <DashboardPortfolio
            setDashboardPortfolio={(e) => setDashboardPortfolio(e)}
          /> */}
        </div>
        <div className="grid row-span-1 w-full">
          {/* <DashboardWatchlist /> */}
        </div>
      </div>
      {Object.keys(navData).length != 0 && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 sm:mx-0">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Mutual Fund</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setNavData({})}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {Object.keys(navData).map((mf) => (
                  <LineGraph
                    key={mf}
                    id={mf}
                    date={navData[mf]}
                    setDateRange={(e) => handleDateRange(e, mf)}
                  />
                ))}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setNavData({})}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {Object.keys(dashboardPortfolio).length != 0 && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 sm:mx-0">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {dashboardPortfolio.schemeName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDashboardPortfolio({})}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <Accordion
                  open={open}
                  fund={dashboardPortfolio.schemeName}
                  toggle={() => toggle(true)}
                  desc={dashboardPortfolio.schemeName}
                  qty={dashboardPortfolio.quantity}
                  avg={dashboardPortfolio.averageValue}
                  holding={dashboardPortfolio.holdingValue}
                  market={dashboardPortfolio.marketValue}
                  today={dashboardPortfolio.tProfitLoss}
                  transactions={dashboardPortfolio.transactions}
                />
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDashboardPortfolio({})}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Home;
