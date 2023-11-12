import { Button, ImageCard } from "./index";

const ResourceItem = ({
  imagePath,
  buttonText,
  imageAlt = "",
  paraText = "",
}) => {
  return (
    <div className="flex flex-col items-stretch w-full max-w-[240px]">
      <ImageCard path={imagePath} alt={imageAlt} />
      <Button
        bgColor="bg-orange-400"
        hoverBgColor="hover:bg-orange-600"
        textSize="text-lg 2xl:text-3xl"
        className="font-bold"
      >
        {buttonText}
      </Button>
      <p className="mt-2 text-center">{paraText}</p>
    </div>
  );
};

export default ResourceItem;
