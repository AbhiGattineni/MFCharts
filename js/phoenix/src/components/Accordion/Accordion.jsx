import { Collapse } from "react-collapse";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { Button } from "../Button/Button";
import { Separator } from "../Separator/Separator";

export const Accordion = ({
  open,
  toggle,
  fund,
  desc,
  qty,
  avg,
  holding,
  market,
  today,
  transactions,
}) => {
  return (
    <div className=" border-2 border-gray-300 rounded-sm mt-3">
      <div
        className="bg-white py-[10px] px-[15px] flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="text-[22px]">
          <div className="text-left">
            <text className="text-xxl">{fund}</text>
          </div>
          <div className="border-t-2 border-gray-400  w-full"></div>
          <div className="grid grid-cols-6">
            <div className="">
              <text className="text-xs ">Quantity:</text>
              <text className="text-xs">{qty}</text>
            </div>

            <div className="">
              <text className="text-xs ">Holding Value:</text>
              <text className="text-xs">{holding}</text>
            </div>
            <div className="">
              <text className="text-xs ">Average Fund Value:</text>
              <text className="text-xs">{avg}</text>
            </div>
            <div className="">
              <text className="text-xs  px-2">Market Value:</text>
              <text className="text-xs">{market}</text>
            </div>
            <div className="">
              <text className="text-xs ">Total Profit/Loss:</text>
              <text className="text-xs">{today}</text>
            </div>
          </div>
        </div>
        <div className="text-[20px]">
          {open ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="border-t-2 border-gray-400  w-full "></div>
        {transactions.map((transaction, index) => (
          <div className="grid grid-cols-5 truncate p-3">
            <div className="bg-white text-xs">{transaction.date}</div>
            <div className="bg-white text-xs">
              {transaction.transactionType}
            </div>
            <div className="bg-white text-xs">{transaction.quantity}</div>
            <div className="bg-white text-xs">{transaction.navValue}</div>
            <div className="bg-white text-xs">
              {transaction.transactionValue.toFixed(3)}
            </div>
          </div>
        ))}
      </Collapse>
    </div>
  );
};
