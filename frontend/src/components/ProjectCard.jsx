import { Link } from "react-router-dom";

const ProjectCard = ({ slug, title, difficulty, duration }) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="group p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(17,17,20,0.6)] hover:border-[rgba(245,158,11,0.2)] hover:bg-[rgba(245,158,11,0.02)] transition-all duration-300">
        <h3 className="font-syne font-bold text-neutral-100 text-base mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono text-neutral-600">{duration}</p>
        <span className="tag mt-2 inline-block">{difficulty}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
