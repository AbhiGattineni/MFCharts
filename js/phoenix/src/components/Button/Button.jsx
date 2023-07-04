export const Button = ({ text, handleClick, type, classes = [], disabled }) => {
  const inputClasses = [
    "shadow",
    "bg-bgColor",
    "focus:shadow-outline",
    "focus:outline-none",
    "text-black",
    "text-xl",
    "font-semibold",
    "py-2",
    "px-4",
    "pl-10",
    "pr-10",
    "rounded-xl",
    "mt-4",
    ...classes,
  ].join(" ");
  return (
    <button disabled={disabled} className={inputClasses} type={type} onClick={handleClick}>
      {text}
    </button>
  );
};
