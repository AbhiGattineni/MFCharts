import { Button } from "../../components";

export const DashboardPortfolio = () => {
  const mfList = [
    "Tata",
    "Birla",
    "Madhyalo",
    "Layla",
    "Tata",
    "Birla",
    "Madhyalo",
    "Layla",
    "Tata",
    "Birla",
    "Madhyalo",
    "Layla",
    "Tata",
    "Birla",
    "Madhyalo",
    "Layla",
  ];
  return (
    <div className="border-2 m-5 ">
      <div className="grid justify-items-center font-bold border-b-2">
        Portfolio
      </div>
      <div className="grid grid-cols-6 p-3">
        {mfList.map((e, index) => {
          return <li>{e}</li>;
        })}
      </div>
    </div>
  );
};
