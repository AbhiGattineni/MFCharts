export const Input = ({
  placeholder,
  setValue,
  type,
  classes = [],
  autoFocus,
  value,
}) => {
  const inputClassNames = [
    "bg-gray-200",
    "appearance-none",
    "border-2",
    "border-gray-300",
    "rounded-full",
    "w-full",
    "py-2",
    "px-4",
    "bg-inherit",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:bg-white",
    "focus:border-bgColor",
    "mb-6",
    ...classes,
  ].join(" ");
  return (
    <input
      className={inputClassNames}
      type={type}
      placeholder={placeholder}
      onChange={(event) => setValue(event.target.value)}
      autoFocus={autoFocus}
      value={value}
    />
  );
};
