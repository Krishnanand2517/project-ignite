import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
  const isOwner = userId === authorId;

  return (
    <div className="group relative flex gap-5 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.5)] hover:border-[rgba(245,158,11,0.15)] hover:bg-[rgba(245,158,11,0.015)] transition-all duration-300">
      {/* Owner actions */}
      {isOwner && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => navigate(`/edit-article/${slug}`)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.25)] text-blue-400 hover:bg-[rgba(59,130,246,0.2)] transition-all duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this article?")) {
                deleteArticle(slug);
              }
            }}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-red-400 hover:bg-[rgba(239,68,68,0.2)] transition-all duration-150"
          >
            Delete
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <div className="w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <img
          src={imgPath}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 pr-16">
        <Link to={`/articles/${slug}`}>
          <h3 className="font-syne font-bold text-neutral-200 text-base leading-snug hover:text-accent transition-colors duration-200 line-clamp-2 mb-1">
            {title}
          </h3>
        </Link>
        <p className="text-xs font-mono text-neutral-500 mb-3">
          by {authorName}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tags?.map((tag, index) => (
            <span key={`${tag}-${index}`} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
