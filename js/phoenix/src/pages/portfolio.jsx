import { useState } from "react";
import { Accordion, Button } from "../components";

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
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div className="container mx-auto ">
      <div
        className="grid justify-items-center sm:justify-items-end"
        classes={["rounded"]}
      >
        <Button text={"Add Funds to Portfolio"} />
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
  );
};

export default Portfolio;
