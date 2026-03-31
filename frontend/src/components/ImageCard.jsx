const ImageCard = ({ path, alt = "", className = "", ...props }) => {
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] overflow-hidden w-full mb-5">
      <img
        src={path}
        alt={alt}
        className={`w-2/3 mx-auto py-6 opacity-90 ${className}`}
        {...props}
      />
    </div>
  );
};
export default ImageCard;
