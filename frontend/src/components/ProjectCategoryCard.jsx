import { Link } from "react-router-dom";

const ProjectCategoryCard = ({ slug, title }) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="group w-64 h-40 flex items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] hover:border-[rgba(245,158,11,0.2)] hover:bg-[rgba(245,158,11,0.02)] transition-all duration-300">
        <h3 className="font-syne font-bold text-neutral-100 text-xl group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCategoryCard;
