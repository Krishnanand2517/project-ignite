import { Link, useNavigate } from "react-router-dom";

const difficultyColor = (d) => {
  const lower = (d || "").toLowerCase();
  if (lower.includes("beginner") || lower.includes("easy")) return "badge-easy";
  if (lower.includes("intermediate") || lower.includes("medium"))
    return "badge-medium";
  if (lower.includes("advanced") || lower.includes("hard")) return "badge-hard";
  return "";
};

const CourseCard = ({
  slug,
  title,
  imgPath,
  duration,
  difficulty,
  editable,
  deleteCourse,
}) => {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] hover:border-[rgba(245,158,11,0.2)] transition-all duration-300 overflow-hidden flex flex-col">
      {/* Edit/Delete */}
      {editable && (
        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => navigate(`/edit-course/${slug}`)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(10,10,11,0.85)] border border-[rgba(59,130,246,0.3)] text-blue-400 hover:bg-[rgba(59,130,246,0.1)] transition-all duration-150 backdrop-blur-sm"
          >
            Edit
          </button>
          <button
            onClick={() => deleteCourse(slug)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(10,10,11,0.85)] border border-[rgba(239,68,68,0.3)] text-red-400 hover:bg-[rgba(239,68,68,0.1)] transition-all duration-150 backdrop-blur-sm"
          >
            Delete
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <Link
        to={`/courses/${slug}`}
        className="block aspect-video overflow-hidden bg-[rgba(255,255,255,0.02)]"
      >
        <img
          src={imgPath}
          alt={title}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/courses/${slug}`}>
          <h3 className="font-syne font-bold text-neutral-100 text-base leading-snug hover:text-accent transition-colors duration-200 mb-2">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          {duration && (
            <span className="text-xs font-mono text-neutral-400">
              ⏱ {duration}
            </span>
          )}
          {difficulty && (
            <span className={`tag ${difficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link to={`/courses/${slug}`}>
            <button className="w-full py-2.5 rounded-xl font-syne font-semibold text-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#a8a89e] hover:border-amber-500 hover:text-accent hover:bg-[rgba(245,158,11,0.05)] transition-all duration-200">
              View Course →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
