const Button = ({
  children,
  type = "button",
  bgColor = "bg-green-500",
  hoverBgColor = "hover:bg-green-600",
  textSize = "text-xl 2xl:text-3xl",
  textColor = "text-[#282C34]",
  fontFamily = "font-inconsolata",
  hoverTextColor = "hover:text-[#ECF0F1]",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`py-4 2xl:py-6 px-8 rounded-lg transition duration-200 ${bgColor} ${textSize} ${hoverBgColor} ${textColor} ${hoverTextColor} ${fontFamily} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
