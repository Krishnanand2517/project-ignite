import { Button } from "./index";
import { Link } from "react-router-dom";

const CourseCard = ({ slug, title, imgPath, duration, difficulty }) => {
  return (
    <div className="w-72 2xl:w-96 h-96 flex flex-col justify-center bg-opacity-60 bg-slate-700 font-inconsolata text-secondary border border-white rounded-md">
      <div>
        <Link to={slug} className="flex justify-center items-center">
          <img src={imgPath} alt={title} className="w-1/2" />
        </Link>
      </div>
      <hr className="my-4" />
      <div>
        <div className="px-4 2xl:px-8">
          <h3 className="w-full font-fira font-semibold text-lg 2xl:text-2xl">
            {title}
          </h3>
          <p className="text-sm 2xl:text-base opacity-70">{duration}</p>
          <p className="2xl:text-xl opacity-80">Difficulty: {difficulty}</p>
        </div>

        <Link
          to={slug}
          className="mx-12 2xl:mx-20 mt-4 flex justify-center items-center"
        >
          <Button
            textSize="text-lg 2xl:text-2xl"
            className="w-full font-fira font-bold"
          >
            Check
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
