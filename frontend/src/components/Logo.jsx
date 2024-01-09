const Logo = ({ className = "", ...props }) => {
  return (
    <h2
      className={`text-2xl 2xl:text-4xl font-fira font-black text-primary hover:text-orange-400 ${className}`}
      {...props}
    >
      Project
      <br />
      IGNITE
    </h2>
  );
};

export default Logo;
