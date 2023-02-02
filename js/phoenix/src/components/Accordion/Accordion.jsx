import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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
}) => {
  return (
    <div className=" border-2 border-gray-300 rounded-sm mt-3">
      <div
        className="bg-white py-[25px] px-[30px] flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="text-[22px] font-semibold">
          <div className="text-center">
            <text className="text-xs sm:text-xl">{fund}</text>
          </div>
          <div className="border-t-2 border-gray-400  w-full"></div>
          <div className="grid grid-cols-2">
            <div className="">
              <text className="text-xs">Qty:</text>
              <text className="text-xs">{qty}</text>
            </div>

            <div className="">
              <text className="text-xs">HV:</text>
              <text className="text-xs">{holding}</text>
            </div>
            <div className="">
              <text className="text-xs">Avg:</text>
              <text className="text-xs">{avg}</text>
            </div>
            <div className="">
              <text className="text-xs">MV:</text>
              <text className="text-xs">{market}</text>
            </div>
            <div className="">
              <text className="text-xs">T P/L:</text>
              <text className="text-xs">{today}</text>
            </div>
          </div>
        </div>
        <div className="text-[20px]">
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="bg-white px-[50px] pb-[20px]">{desc}</div>
      </Collapse>
    </div>
  );
};
