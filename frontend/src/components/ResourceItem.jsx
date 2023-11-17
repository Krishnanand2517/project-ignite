import { Button, ImageCard } from "./index";
import { useNavigate } from "react-router-dom";

const ResourceItem = ({
  slug,
  imagePath,
  buttonText,
  imageAlt = "",
  paraText = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-stretch w-full max-w-[240px]">
      <ImageCard path={imagePath} alt={imageAlt} />
      <Button
        bgColor="bg-orange-400"
        hoverBgColor="hover:bg-orange-600"
        textSize="text-lg 2xl:text-3xl"
        className="font-bold"
        onClick={() => navigate(`/${slug}`)}
      >
        {buttonText}
      </Button>
      <p className="mt-2 text-center">{paraText}</p>
    </div>
  );
};

export default ResourceItem;
