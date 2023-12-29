import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./index";

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

  const renderEditOptions = () => {
    if (userId === addedById) {
      return (
        <div className="absolute top-0 right-0 m-2">
          <Button
            bgColor="bg-blue-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs"
            className="py-[2px] px-[3px] rounded-sm opacity-70 hover:opacity-100 mr-2"
            onClick={() => navigate(`/edit-question/${id}`)}
          >
            Edit
          </Button>
          <Button
            bgColor="bg-red-500"
            hoverBgColor="hover:bg-black"
            textColor="text-white"
            textSize="text-xs"
            className="py-[2px] px-[3px] rounded-sm opacity-70 hover:opacity-100"
            onClick={() => deleteQuestion(id)}
          >
            Delete
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="relative px-8 py-4 flex justify-between items-center font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
      {renderEditOptions()}

      {/* Contents */}
      <div className="flex flex-wrap">
        <h3 className="w-full font-fira font-semibold text-lg 2xl:text-2xl">
          {title}
        </h3>
        <p className="w-full text-sm 2xl:text-lg">{difficulty}</p>
        <div className="w-full flex gap-2 mt-1 text-sm 2xl:text-lg">
          {topics.map((topic) => (
            <span
              key={topic}
              className="border-[1px] px-1 border-orange-400 hover:bg-orange-400 hover:text-black rounded-md"
            >
              {topic}
            </span>
          ))}
        </div>
        <div className="w-full flex gap-2 mt-2 text-sm 2xl:text-lg">
          Companies Asked:{" "}
          {companyTags.map((company) => (
            <span
              key={company}
              className="border-[1px] px-1 border-white hover:bg-white hover:text-black rounded-md"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <Link to={`${problemLink}`}>
          <Button
            textSize="text-base 2xl:text-xl"
            className="py-0 px-16 font-bold"
          >
            Solve
          </Button>
        </Link>

        <Link to={`${solutionLink}`}>
          <Button
            bgColor="bg-orange-400"
            hoverBgColor="hover:bg-orange-500"
            textSize="text-xs 2xl:text-base"
            className="py-0 px-3 font-bold ml-4"
          >
            Solution
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
