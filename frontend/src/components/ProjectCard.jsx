import { Link } from "react-router-dom";

const ProjectCard = ({ slug, title, difficulty, duration }) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="w-60 2xl:w-72 h-32 2xl:h-44 flex flex-col justify-center bg-slate-700 font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
        <div className="px-4 2xl:px-8">
          <h3 className="w-full font-fira font-semibold text-lg 2xl:text-2xl">
            {title}
          </h3>
          <p className="text-sm 2xl:text-base opacity-70">{duration}</p>
          <p className="2xl:text-xl opacity-80">Difficulty: {difficulty}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
