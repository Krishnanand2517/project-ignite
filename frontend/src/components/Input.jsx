const Input = ({ label, type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full py-2.5 px-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-neutral-100 font-mono text-sm placeholder-[#5a5a54] transition-all duration-200 hover:border-[rgba(255,255,255,0.14)] focus:border-amber-500 focus:bg-[rgba(245,158,11,0.03)] outline-none ${className}`}
      placeholder={label}
      {...props}
    />
  );
};

export default Input;
