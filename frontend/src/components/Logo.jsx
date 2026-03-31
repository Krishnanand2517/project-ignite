const Logo = ({ className = "", ...props }) => {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`} {...props}>
      <h2 className="font-syne font-bold text-neutral-100 tracking-tight leading-none group-hover:text-accent transition-colors duration-200">
        Project
        <br />
        IGNITE
      </h2>
    </div>
  );
};

export default Logo;
