const Button = ({
  children,
  type = "button",
  bgColor = "bg-green-500",
  hoverColor = "hover:bg-green-700",
  textSize = "text-xl 2xl:text-4xl",
  textColor = "text-[#282C34]",
  fontFamily = "font-inconsolata",
  hoverTextColor = "hover:text-[#ECF0F1]",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`py-4 px-8 rounded-lg transition duration-200 ${bgColor} ${textSize} ${hoverColor} ${textColor} ${hoverTextColor} ${fontFamily} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
