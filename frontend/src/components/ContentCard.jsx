import { Link } from "react-router-dom";

import { Button } from "./index";

const ContentCard = ({ content, deleteContent, isOwner }) => {
  const renderEditOptions = () => {
    if (isOwner) {
      return (
        <div className="absolute top-0 right-0 m-2">
          <Button
            bgColor="bg-red-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs"
            className="py-[2px] px-[3px] rounded-sm opacity-70 hover:opacity-100"
            onClick={() => deleteContent(content._id)}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="relative px-8 py-4 flex justify-between items-center font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
      {renderEditOptions()}

      <div className="flex flex-wrap">
        <Link to={`/contents/${content._id}`}>
          <h1 className="w-full font-fira font-semibold text-lg 2xl:text-2xl hover:text-orange-400">
            {content.contentTitle}
          </h1>
        </Link>
        <p className="w-full text-sm 2xl:text-lg">{content.contentType}</p>
      </div>
    </div>
  );
};

export default ContentCard;
