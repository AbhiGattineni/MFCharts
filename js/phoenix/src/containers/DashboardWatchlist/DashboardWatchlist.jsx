import { Button } from "../../components";

export const DashboardWatchlist = () => {
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
        Watchlist
      </div>
      <div className="grid grid-cols-6 p-3">
        {mfList.map((e, index) => {
          return (
            <div>
              <Button text={e} classes={["rounded"]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
