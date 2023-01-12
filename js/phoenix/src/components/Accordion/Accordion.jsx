import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const Accordion = ({ open, toggle, title, desc }) => {
  return (
    <div className="pt-[10px] border-2 border-gray-300 rounded-sm mt-3">
      <div
        className="bg-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <p className="text-[22px] font-semibold">{title}</p>
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
