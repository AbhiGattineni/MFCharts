import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FetchAllMf, Input, Label } from "../../components";
import { useEffect, useState } from "react";

export const AddPortfolioFunds = ({
  setNavData,
  setQuantity,
  setValue,
  setType,
  quantity,
  date,
  setDate,
  value,
  type,
  transactionType,
  onOptionChange,
}) => {
  return (
    <div className="container mx-auto">
      <form className="grid grid-rows-4 ">
        <div className="grid grid-cols-6 md:grid-cols-12 row-span-1">
          <Label text="Date:" />
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="dd/MM/yyyy"
            className="border-2 border-gray-300 rounded-md text-center"
          />
        </div>
        <div className="flex justify-around">
          <div className="flex justify-around items-center">
            <div onClick={()=>setType("Mutual")} className={`p-2 border-black border-2 rounded-l-lg border-r-0 cursor-pointer ${type==="Mutual" ? "bg-bgColor": null}`}>
              Mutual
            </div>
            <div onClick={()=>setType("Equity")} className={`p-2 border-black border-2 rounded-r-lg cursor-pointer ${type==="Equity" ? "bg-bgColor": null}`}>
              Equity
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="px-3">
              <input
                type="radio"
                name="transactionType"
                value="Buy"
                id="Buy"
                checked={transactionType === "Buy"}
                onChange={onOptionChange}
              />
              <label className="ml-3" htmlFor="buy">Buy</label>
            </div>
            <div className="px-3">
              <input
                type="radio"
                name="transactionType"
                value="Sell"
                id="Sell"
                checked={transactionType === "Sell"}
                onChange={onOptionChange}
              />
              <label className="ml-3" htmlFor="sell">Sell</label>
            </div>
          </div>
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
