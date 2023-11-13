const Input = ({ label, type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full py-2 2xl:py-4 px-4 2xl:px-8 rounded-md 2xl:text-2xl ${className}`}
      placeholder={label}
      {...props}
    />
  );
};

export default Input;
