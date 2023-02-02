import { useState } from "react";
import { Accordion, Button, ModalAddFund } from "../components";

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const accordionData = [
    {
      title: "Tata",
      qty: "20",
      avg_price: "2.64",
      holding_val: "1776.32",
      market_val: "3028.85",
      today_pl: "2994",
      desc: "none",
    },
    {
      title: "Reliance",
      qty: "20",
      avg_price: "2.64",
      holding_val: "1776.32",
      market_val: "3028.85",
      today_pl: "2994",
      desc: "node",
    },
    {
      title: "Vedantha",
      qty: "20",
      avg_price: "2.64",
      holding_val: "1776.32",
      market_val: "3028.85",
      today_pl: "2994",
      desc: "three",
    },
  ];
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
            {accordionData.map((data, index) => {
              return (
                <Accordion
                  key={index}
                  open={index === open}
                  fund={data.title}
                  toggle={() => toggle(index)}
                  desc={data.desc}
                  qty={data.qty}
                  avg={data.avg_price}
                  holding={data.holding_val}
                  market={data.market_val}
                  today={data.today_pl}
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
