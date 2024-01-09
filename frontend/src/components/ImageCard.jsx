const ImageCard = ({ path, alt = "", className = "", ...props }) => {
  return (
    <div className="p-8 rounded-lg border border-white w-full max-w-[240px] 2xl:max-w-[360px] mb-8 2xl:mb-10">
      <img
        src={path}
        alt={alt}
        className={`w-2/3 mx-auto ${className}`}
        {...props}
      />
    </div>
  );
};

export default ImageCard;
