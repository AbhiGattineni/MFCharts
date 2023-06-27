import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { Label, Separator } from "../../components";
import { PortfolioGraph } from "../PortfolioGraph/PortfolioGraph";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../src/context/AuthContext";

export const DashboardDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName);
        setEmail(user.email);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/overallPortfolioStat/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);

  useEffect(() => {
    console.log("dd", dashboardData);
  }, [dashboardData]);

  const Menu = [
    {
      id: 1,
      title: " All",
    },
    {
      id: 2,
      title: "Mutual",
    },
    {
      id: 3,
      title: "Equity",
    },

  ];
    const [activeindex, setActiveIndex] = useState(1);
    console.log ("index ",activeindex);
    const handleClick = (index) => setActiveIndex(index);
    const checkActive = (index,className) =>
      activeindex === index ? className : "w-20";
  return (
    <div>
<div className="flex justify-between my-5 ml-3">
  <h1 className="text-2xl font-bold ml-4">Welcome {userName}</h1>
  <div className="flex flex-col space-y-4">
    <div className="bg-white border border-gray-800 flex justify-between items-center rounded-full px-1 py-1 w-60 mr-4">
      {Menu.map((item) => (
        <button 
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`${checkActive(
            item.id, 
            "bg-bgColor w-20 py-2 font-medium rounded-full text-white-600 drop-shadow-md"
            )}`}
        >
          {item.title} 
        </button>
      ))} 
    </div>
    </div>
  </div>
  
<div className="grid grid-cols-1  md:grid-cols-2 border-2 justify-items-center mx-2 sm:mx-0">
< div className="w-full place-self-center">
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
        <portfolioGraph />
      </div>
    </div>
  </div>
  );
};

