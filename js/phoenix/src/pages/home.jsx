import Link from "next/link";

import { Card, Table, Label } from "../components";
import { Navbar } from "../containers";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center basis-1/3">
        <div className="basis-1/3 p-10">
          <Card>
            <div className="flex">
              <div className="m-4">
                <Label text="Name" classes={["text-3xl , text-white"]} />
                <Label
                  text="Abhishek Gattineni"
                  classes={["text-xs , text-white"]}
                />
              </div>
              <div className="m-4">
                <Label text="Email" classes={["text-3xl , text-white"]} />
                <Label
                  text="abhishekgattineni@gmail.com"
                  classes={["text-xs , text-white"]}
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="basis-2/3 p-10">
          <Card>
            <div className="flex">
              <div className="m-4">
                <Label
                  text="Investment Value"
                  classes={["text-xs , text-white"]}
                />
                <Label text="$23,000" classes={["text-3xl , text-white"]} />
              </div>
              <div className="m-4">
                <Label
                  text="Current Value"
                  classes={["text-xs , text-white"]}
                />
                <Label text="$93,000" classes={["text-3xl , text-white"]} />
              </div>
            </div>
            <div className="flex">
              <div className="m-4">
                <Label
                  text="Total Gain/Loss"
                  classes={["text-xs , text-white"]}
                />
                <Label text="$23,000" classes={["text-3xl , text-white"]} />
              </div>
              <div className="m-4">
                <Label
                  text="Today's Gain/Loss"
                  classes={["text-xs , text-white"]}
                />
                <Label text="$23,000" classes={["text-3xl , text-white"]} />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex p-10 flex-col">
        <Table />
      </div>
    </div>
  );
};

export default Home;
