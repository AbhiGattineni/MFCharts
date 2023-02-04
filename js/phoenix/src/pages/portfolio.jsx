import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Button,
  FetchAllPortfolios,
  FetchAllWatchlists,
  ModalAddFund,
} from "../components";
import { auth } from "../config/firebase";

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState({});
  const [selectedPortfolio, setSelectedPortfolio] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/userPortfolio/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        setPortfolioData(data);
      });
  }, []);
  const toggle = (index) => {
    console.log(index);
    console.log(open);
    console.log(open === index);
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div className="container mx-auto md:mt-3">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="grid justify-items-center">
            <ModalAddFund />
          </div>
          <div>
            <FetchAllPortfolios setSelectedPortfolio={setSelectedPortfolio} />
            {Object.keys(portfolioData).map((data, index) => {
              return (
                <Accordion
                  key={index}
                  open={index === open}
                  fund={portfolioData[data].schemeName}
                  toggle={() => toggle(index)}
                  desc={data.desc}
                  qty={portfolioData[data].quantity}
                  avg={portfolioData[data].averageValue}
                  holding={portfolioData[data].holdingValue}
                  market={portfolioData[data].marketValue}
                  today={portfolioData[data].tProfitLoss}
                />
              );
            })}
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
};

export default Portfolio;
