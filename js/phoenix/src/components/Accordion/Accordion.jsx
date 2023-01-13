import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../Button/Button";

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
}) => {
  return (
    <div className="pt-[10px] border-2 border-gray-300 rounded-sm mt-3">
      <div
        className="bg-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="text-[22px] font-semibold grid grid-cols-6 w-full">
          <div className="grid grid-row-6">
            <text className="text-xs">Fund:</text>
            <text className="text-xs sm:text-xl">{fund}</text>
          </div>
          <div className="grid grid-row-6">
            <text className="text-xs">Qty:</text>
            <text className="text-xs sm:text-xl">{qty}</text>
          </div>
          <div className="grid grid-row-6">
            <text className="text-xs">Avg:</text>
            <text className="text-xs sm:text-xl">{avg}</text>
          </div>
          <div className="grid grid-row-6">
            <text className="text-xs">Holding Val:</text>
            <text className="text-xs sm:text-xl">{holding}</text>
          </div>
          <div className="grid grid-row-6">
            <text className="text-xs">Market Value:</text>
            <text className="text-xs sm:text-xl">{market}</text>
          </div>
          <div className="grid grid-row-6">
            <text className="text-xs">Today P/L:</text>
            <text className="text-xs sm:text-xl">{today}</text>
          </div>
        </div>
        <div className="text-[30px]">
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="bg-white px-[50px] pb-[20px]">{desc}</div>
      </Collapse>
    </div>
  );
};
