

export const Radio = (classes) => {
  const inputClasses = [
    "focus:shadow-outline",
    "focus:outline-none",
    classes,
  ].join(" ");
  return (
    <div className={inputClasses}>
       <label className="px-3">
        <input checked type="radio"class="mr-1" name="All" value="All"/>
        All
       </label>
       <label className="px-3">
        <input type="radio"class="mr-1" name="All" value="Mutual"/>
        Mutual
       </label>
       <label className="px-3">
        <input type="radio"class="mr-1" name="All" value="Equity"/>
        Equity
       </label>
    </div>
  );
}

