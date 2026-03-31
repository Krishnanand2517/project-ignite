const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-syne font-semibold transition-all duration-200 rounded-lg border cursor-pointer select-none";

  const variants = {
    primary: disabled
      ? "bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.2)] text-[rgba(245,158,11,0.4)] cursor-not-allowed"
      : "bg-accent border-accent text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98]",
    secondary:
      "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-neutral-100 hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] active:scale-[0.98]",
    ghost:
      "bg-transparent border-transparent text-[#a8a89e] hover:text-neutral-100 hover:bg-[rgba(255,255,255,0.05)]",
    danger: disabled
      ? "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.15)] text-[rgba(239,68,68,0.4)] cursor-not-allowed"
      : "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.25)] text-red-400 hover:bg-[rgba(239,68,68,0.18)] active:scale-[0.98]",
    edit: "bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.25)] text-blue-400 hover:bg-[rgba(59,130,246,0.18)] active:scale-[0.98]",
  };

  const sizes = {
    xs: "text-xs px-2.5 py-1",
    sm: "text-xs px-4 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3",
    xl: "text-base px-10 py-4",
  };

  // Legacy props compatibility
  const bgColor = props.bgColor;
  const hoverBgColor = props.hoverBgColor;
  delete props.bgColor;
  delete props.hoverBgColor;
  delete props.textSize;
  delete props.textColor;
  delete props.hoverTextColor;
  delete props.fontFamily;

  // Detect legacy orange -> primary, legacy green -> primary
  let resolvedVariant = variant;
  if (bgColor?.includes("orange") || bgColor?.includes("amber"))
    resolvedVariant = "primary";
  if (bgColor?.includes("red")) resolvedVariant = "danger";
  if (bgColor?.includes("blue")) resolvedVariant = "edit";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[resolvedVariant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
