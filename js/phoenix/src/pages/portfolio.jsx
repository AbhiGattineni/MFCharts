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
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div className="container mx-auto md:mt-3">
      <div className="flex justify-center">
        {/* <FetchAllPortfolios setSelectedPortfolio={setSelectedPortfolio} /> */}
        <ModalAddFund />
      </div>
      <div>
        {Object.keys(portfolioData).map((data, index) => {
          return (
            <Accordion
              key={index}
              open={index === open}
              fund={portfolioData[data].schemeName}
              toggle={() => toggle(index)}
              desc={portfolioData[data].schemeName}
              qty={portfolioData[data].quantity}
              avg={portfolioData[data].averageValue}
              holding={portfolioData[data].holdingValue}
              market={portfolioData[data].marketValue}
              today={portfolioData[data].tProfitLoss}
              transactions={portfolioData[data].transactions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
