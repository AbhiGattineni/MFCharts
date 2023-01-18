import { FetchAllMf, Input, Label } from "../../components";
import { useEffect, useState } from "react";

export const AddPortfolioFunds = ({ setNavData, setQuantity, setValue }) => {
  const date = new Date();
  return (
    <div className="container mx-auto">
      <form className="grid grid-rows-3 row-span-1">
        <div className="grid grid-cols-2">
          <Label text={`Date: ${date.toDateString()}`} />
        </div>
        <div className="row-span-2">
          {/* <Input placeholder={"Enter Fund Name"} classes={["rounded"]} /> */}
          <FetchAllMf setNavData={setNavData} isMulti={false} />
          <div className="grid grid-cols-2">
            <div className="grid justify-items-center m-1">
              <Input
                placeholder={"Enter quantity"}
                classes={["rounded"]}
                setValue={setQuantity}
              />
            </div>
            <div className="grid justify-items-center m-1">
              <Input
                placeholder={"Enter Value"}
                classes={["rounded"]}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
