const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <div className="dot-loader flex gap-2">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
