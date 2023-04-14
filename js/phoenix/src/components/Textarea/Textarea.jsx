export const Textarea = ({
    placeholder,
    onChange,
    classes,
    autoFocus,
    value,
    name,
    error
}) => {
    const inputClassNames = [
        "bg-gray-200",
        "appearance-none",
        "border-2",
        `${error?"border-red-500":"border-gray-300"}`,
        "rounded-3xl",
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
    ].join(" ")
    return (
        <div className="">
            <textarea
                className={inputClassNames}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                autoFocus={autoFocus}
                value={value}
            />
            <p className={"text-red-500 px-3 text-sm"}>{error}</p>
        </div>
    );
}