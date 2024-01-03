import { Link } from "react-router-dom";

const ArticleCard = ({ slug, imgPath, authorName, title, tags }) => {
  return (
    <Link to={`/articles/${slug}`}>
      <div className="p-6 flex gap-x-4 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
        <div className="w-40 2xl:w-48 flex justify-center items-center rounded-md">
          <img src={imgPath} alt={title} className="w-full rounded-md" />
        </div>
        <div className="flex flex-wrap">
          <h3 className="w-full font-fira font-bold text-xl 2xl:text-2xl">
            {title}
          </h3>
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
    </Link>
  );
};

export default ArticleCard;
