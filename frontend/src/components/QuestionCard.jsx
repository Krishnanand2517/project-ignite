import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const difficultyClass = (d) => {
  const lower = (d || "").toLowerCase();
  if (lower === "easy") return "text-emerald-400";
  if (lower === "medium") return "text-amber-400";
  if (lower === "hard") return "text-red-400";
  return "text-[#a8a89e]";
};

const QuestionCard = ({
  id,
  problemLink,
  solutionLink,
  topics,
  companyTags,
  title,
  difficulty,
  addedById,
  deleteQuestion,
}) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userData?._id);
  const isOwner = userId === addedById;

  return (
    <div className="group relative px-6 py-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.5)] hover:border-[rgba(245,158,11,0.12)] hover:bg-[rgba(245,158,11,0.01)] transition-all duration-300 flex items-start justify-between gap-6">
      {/* Owner actions */}
      {isOwner && (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => navigate(`/edit-question/${id}`)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.25)] text-blue-400 hover:bg-[rgba(59,130,246,0.2)] transition-all duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => deleteQuestion(id)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-red-400 hover:bg-[rgba(239,68,68,0.2)] transition-all duration-150"
          >
            Delete
          </button>
        </div>
      )}

      {/* Left content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-syne font-bold text-neutral-100 text-base leading-snug">
            {title}
          </h3>
          {difficulty && (
            <span
              className={`text-xs font-mono flex-shrink-0 ${difficultyClass(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="tag"
              style={{
                borderColor: "rgba(245,158,11,0.2)",
                color: "rgba(245,158,11,0.7)",
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        {companyTags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-neutral-500">
              asked by:
            </span>
            {companyTags.map((company) => (
              <span key={company} className="tag">
                {company}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 pr-20">
        <Link to={problemLink} target="_blank" rel="noopener noreferrer">
          <button className="font-syne font-semibold text-xs px-4 py-2 rounded-lg bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all duration-200 active:scale-[0.97]">
            Solve
          </button>
        </Link>
        <Link to={solutionLink} target="_blank" rel="noopener noreferrer">
          <button className="font-syne font-semibold text-xs px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#a8a89e] hover:border-[rgba(255,255,255,0.16)] hover:text-neutral-100 transition-all duration-200">
            Solution
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
