import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Dropdown, FetchAllMf, FetchAllPortfolios, FetchAllWatchlists, Input, Label } from "../../components";
import { useEffect, useState } from "react";
import { yesterday } from "../../components/Constant";

export const AddPortfolioFunds = ({
  setNavData,
  setQuantity,
  setValue,
  setType,
  quantity,
  date,
  navDate,
  setDate,
  value,
  type,
  navType,
  transactionType,
  onOptionChange,
}) => {
  // function handleType(navType) {
  //   if (transactionType == "Buy") {
  //     console.log(transactionType, navType);
  //     setType(navType);
  //   }
  // }
  return (
    <div className="container mx-auto">
      <form className="grid grid-rows-3 gap-3">
        {transactionType === "Sell" ?
          <FetchAllPortfolios isMulti={false} setNavData={setNavData} />
          :
          <FetchAllMf setNavData={setNavData} isMulti={false} />
        }
        <div className="grid grid-cols-6 md:grid-cols-12">
          <Label text="Date:" />
          <DatePicker
            selected={date}
            onChange={setDate}
            minDate={transactionType == "Sell" ? navDate : null}
            maxDate={transactionType == "Buy" ? yesterday : yesterday}
            dateFormat="dd/MM/yyyy"
            className="border-2 border-gray-300 rounded-md text-center"
          />
        </div>
        <div className="flex justify-around">
          <div className="flex justify-around items-center">
            <div onClick={transactionType == "Buy" ? () => setType("mutual fund") : setType(navType)} className={`p-2 border-black border-2 rounded-l-lg border-r-0 cursor-pointer ${type === "mutual fund" ? "bg-bgColor" : null}`}>
              Mutual
            </div>
            <div onClick={transactionType == "Buy" ? () => setType("equity fund") : setType(navType)} className={`p-2 border-black border-2 rounded-r-lg cursor-pointer ${type === "equity fund" ? "bg-bgColor" : null}`}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="">
              <div className="">No of Shares</div>
              <Input
                placeholder={"Enter quantity"}
                classes="mt-2"
                setValue={setQuantity}
                value={quantity}
              />
            </div>
            <div className="">
              <div className="">Amount</div>
              <Input
                placeholder={"Enter Value"}
                classes="mt-2"
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
