import React from "react";
import { Link } from "react-router-dom";

const ContentCard = ({ content }) => {
  return (
    <div className="relative px-8 py-4 flex justify-between items-center font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
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
