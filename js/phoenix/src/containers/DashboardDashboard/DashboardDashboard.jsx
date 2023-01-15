import { Label, Separator } from "../../components";

export const DashboardDashboard = () => {
  return (
    <div className="grid grid-cols-2 md:m-5 border-2 justify-items-center">
      <div className="w-full place-self-center">
        <div className="grid grid-cols-2 justify-items-center">
          <div>
            <Label text={"Invested"} classes={["text-xs", "font-light"]} />
            <Label text={"1,00,000"} classes={["text-xl", "font-bold"]} />
          </div>
          <div>
            <Label text={"Current"} classes={["text-xs", "font-light"]} />
            <Label text={"10,00,000"} classes={["text-xl", "font-bold"]} />
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
              text={"9,00,000"}
              classes={["text-xl", "font-bold", "place-self-center"]}
            />
          </div>
        </div>
      </div>
      <div className="place-self-center">Graph</div>
    </div>
  );
};
