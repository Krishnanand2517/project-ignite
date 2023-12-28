const SelectInput = ({ label, options, className = "", ...props }) => {
  return (
    <select
      className={`w-full py-2 2xl:py-4 px-4 2xl:px-8 rounded-md 2xl:text-2xl outline-orange-400 ${className}`}
      {...props}
    >
      <option value="" disabled selected>
        {label}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="hover:bg-orange-400"
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
