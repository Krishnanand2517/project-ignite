import { Link } from "react-router-dom";

const ArticleCard = ({ slug, imgPath, content, title }) => {
  return (
    <Link to={`/articles/${slug}`}>
      <div className="px-12 py-6 flex gap-x-4 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
        <div className="max-w-xs flex justify-center items-center">
          <img src={imgPath} alt={title} className="w-3/4 2xl:w-11/12" />
        </div>
        <div className="flex flex-wrap">
          <h3 className="w-full font-fira font-semibold text-xl 2xl:text-3xl">
            {title}
          </h3>
          <p className="w-full 2xl:text-2xl">{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
