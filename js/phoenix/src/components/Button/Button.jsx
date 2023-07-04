export const Button = ({ text, handleClick, type, classes = [], disabled }) => {
  const inputClasses = [
    "shadow",
    "bg-bgColor",
    "focus:shadow-outline",
    "focus:outline-none",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded-full",
    "mt-6",
    ...classes,
  ].join(" ");
  return (
    <button disabled={disabled} className={inputClasses} type={type} onClick={handleClick}>
      {text}
    </button>
  );
};
