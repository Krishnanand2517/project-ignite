import { Link } from "react-router-dom";

const ContentCard = ({ id, title, courseSlug, editable, deleteContent }) => {
  return (
    <div className="group relative flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.5)] hover:border-[rgba(245,158,11,0.15)] hover:bg-[rgba(245,158,11,0.01)] transition-all duration-200">
      <Link
        to={`/courses/${courseSlug}/${id}`}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        <div className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center flex-shrink-0">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path
              d="M2 1L8 6L2 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            />
          </svg>
        </div>
        <span className="font-mono text-sm text-neutral-400 group-hover:text-neutral-100 transition-colors duration-200 truncate">
          {title}
        </span>
      </Link>

      {editable && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
          <button
            onClick={() => deleteContent(id)}
            className="text-xs font-mono px-2 py-1 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-red-400 hover:bg-[rgba(239,68,68,0.2)] transition-all"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
