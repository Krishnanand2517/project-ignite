const AvatarIcon = ({ image, ...props }) => {
  return (
    <div
      className="h-12 w-12 2xl:h-14 2xl:w-14 rounded-full border-2 border-solid border-white hover:border-orange-500"
      {...props}
    >
      <img src={image} className="w-full h-full rounded-full" />
    </div>
  );
};

export default AvatarIcon;
