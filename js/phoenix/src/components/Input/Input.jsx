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
    "font-semibold",
    "border-2",
    `${error?"border-red-500":"border-gray-600"}`,
    "rounded-lg",
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
    "mb-3",
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
      <p className="text-red-500 px-3 text-sm ml-5">{error}</p>
    </div>
  );
};
