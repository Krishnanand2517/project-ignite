import { useState } from "react";

const Input = ({ label, type = "text", className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={label}
        className={`w-full py-2.5 px-4 ${
          isPassword ? "pr-12" : ""
        } rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono placeholder-gray-500 transition-all duration-200 hover:border-white/20 focus:border-amber-500 focus:bg-amber-500/5 outline-none ${className}`}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400 hover:text-amber-400 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;
