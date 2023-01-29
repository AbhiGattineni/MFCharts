import { IconContext } from "react-icons";

export const BareIcon = ({ IconComponent, classes = [] }) => {
  const classNames = ["m-2", "text-2xl", ...classes].join(" ");
  return (
    <IconContext.Provider value={{ className: classNames }}>
      {IconComponent}
    </IconContext.Provider>
  );
};
