import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./index";

const ArticleCard = ({
  slug,
  imgPath,
  authorName,
  authorId,
  title,
  tags,
  deleteArticle,
}) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userData?._id);

  const renderEditOptions = () => {
    if (userId === authorId) {
      return (
        <div className="absolute top-0 right-0 m-2 z-50">
          <Button
            bgColor="bg-blue-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs"
            className="py-[2px] px-[3px] rounded-sm opacity-70 hover:opacity-100 mr-2"
            onClick={() => navigate(`/edit-article/${slug}`)}
          >
            Edit
          </Button>
          <Button
            bgColor="bg-red-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs"
            className="py-[2px] px-[3px] rounded-sm opacity-70 hover:opacity-100 mr-2"
            onClick={() => deleteArticle(slug)}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="relative w-full h-36 2xl:h-40 p-6 flex gap-x-4 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
      {renderEditOptions()}

      <div className="w-40 2xl:w-48 flex justify-center items-center rounded-md">
        <img src={imgPath} alt={title} className="w-full rounded-md" />
      </div>
      <div className="flex flex-wrap">
        <Link to={`/articles/${slug}`}>
          <h3 className="w-full font-fira font-bold text-xl 2xl:text-2xl hover:text-orange-400">
            {title}
          </h3>
        </Link>
        <p className="w-full 2xl:text-xl">by {authorName}</p>

        <div className="w-full flex gap-2 mt-2 text-sm 2xl:text-base">
          Tags:{" "}
          {tags.map((tag) => (
            <span
              key={tag}
              className="border-[1px] px-1 border-white hover:bg-white hover:text-black rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
