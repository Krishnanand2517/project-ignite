const SelectInput = ({ label, options = [], className = "", ...props }) => {
  return (
    <select
      className={`w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-neutral-100 font-mono text-sm transition-all duration-200 hover:border-[rgba(255,255,255,0.14)] focus:border-amber-500 outline-none appearance-none cursor-pointer ${className}`}
      {...props}
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#111114]">
          {opt}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
