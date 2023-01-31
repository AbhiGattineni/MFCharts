import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FetchAllMf, Input, Label } from "../../components";
import { useEffect, useState } from "react";

export const AddPortfolioFunds = ({
  setNavData,
  setQuantity,
  setValue,
  quantity,
  date,
  setDate,
  value,
}) => {
  return (
    <div className="container mx-auto">
      <form className="grid grid-rows-3 row-span-1">
        <div className="grid grid-cols-12">
          <Label text="Date:" />
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="dd/MM/yyyy"
            className="border-2 border-gray-300 rounded-md text-center"
          />
        </div>
        <div className="row-span-2">
          <FetchAllMf setNavData={setNavData} isMulti={false} />
          <div className="grid grid-cols-2 mt-3">
            <div className="">
              <Input
                placeholder={"Enter quantity"}
                classes={["rounded"]}
                setValue={setQuantity}
                value={quantity}
              />
            </div>
            <div className="">
              <Input
                placeholder={"Enter Value"}
                classes={["rounded"]}
                setValue={setValue}
                value={value}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
