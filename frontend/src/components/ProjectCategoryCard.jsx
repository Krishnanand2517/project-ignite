import { Link } from "react-router-dom";

const ProjectCategoryCard = ({ slug, title }) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="w-72 h-48 flex items-center bg-slate-700 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
        <h3 className="w-full text-center font-fira font-semibold text-2xl 2xl:text-4xl">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCategoryCard;
