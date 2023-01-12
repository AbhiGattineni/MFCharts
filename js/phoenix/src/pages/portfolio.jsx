import { useState } from "react";
import { Accordion } from "../components";

const Portfolio = () => {
  const [open, setOpen] = useState(false);
  const accordionData = [
    { title: "one", desc: "none" },
    { title: "two", desc: "node" },
    { title: "three", desc: "three" },
  ];
  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div className="container mx-auto">
      {accordionData.map((data, index) => {
        return (
          <Accordion
            key={index}
            open={index === open}
            title={data.title}
            toggle={() => toggle(index)}
            desc={data.desc}
          />
        );
      })}
    </div>
  );
};

export default Portfolio;
