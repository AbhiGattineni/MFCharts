export const Input = ({
  placeholder,
  type,
  classes,
  autoFocus,
  value,
  error,
  name,
  onChange,
  disabled
}) => {
  const inputClassNames = [
    "bg-gray-200",
    "appearance-none",
    "border-2",
    `${error?"border-red-500":"border-gray-300"}`,
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
    "mt-6",
    classes,
  ].join(" ");
  return (
    <div className="">
      <input
        className={inputClassNames}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
        value={value}
        disabled={disabled}
      />
      <p className="text-red-500 px-3 text-sm">{error}</p>
    </div>
  );
};
