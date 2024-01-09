import { Link, useNavigate } from "react-router-dom";

import { Button } from "./index";

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

  const renderEditOptions = () => {
    if (editable) {
      return (
        <div className="absolute top-0 right-0 m-2 2xl:m-4">
          <Button
            bgColor="bg-blue-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs 2xl:text-sm"
            className="py-[2px] 2xl:py-1 px-[3px] 2xl:px-[6px] rounded-sm opacity-70 hover:opacity-100 mr-2"
            onClick={() => navigate(`/edit-course/${slug}`)}
          >
            Edit
          </Button>
          <Button
            bgColor="bg-red-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs 2xl:text-sm"
            className="py-[2px] 2xl:py-1 px-[3px] 2xl:px-[6px] rounded-sm opacity-70 hover:opacity-100"
            onClick={() => deleteCourse(slug)}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="relative w-60 2xl:w-80 h-96 2xl:h-[30rem] flex flex-col justify-center bg-opacity-60 bg-slate-700 font-inconsolata text-secondary border border-white rounded-md">
      {renderEditOptions()}

      <Link
        to={`/courses/${slug}`}
        className="flex justify-center items-center"
      >
        <div className="h-36 2xl:h-44 flex justify-center items-center">
          <img
            src={imgPath}
            alt={title}
            className="h-36 2xl:h-44 w-60 2xl:w-80 rounded-md"
          />
        </div>
      </Link>
      <hr />
      <div className="flex flex-1 flex-col justify-between items-center py-4">
        <div className="px-4 2xl:px-8">
          <h3 className="w-full font-fira font-semibold text-lg 2xl:text-2xl">
            {title}
          </h3>
          <p className="text-sm 2xl:text-lg opacity-70">{duration}</p>
          <p className="2xl:text-2xl opacity-80">{difficulty}</p>
        </div>

        <Link
          to={`/courses/${slug}`}
          className="mx-12 2xl:mx-16 my-4 flex justify-center items-center self-stretch"
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
