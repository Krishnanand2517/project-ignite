import { Button } from "./index";
import { Link } from "react-router-dom";

const QuestionCard = ({
  problemLink,
  solutionLink,
  topics,
  companyTags,
  title,
  difficulty,
}) => {
  return (
    <div className="px-8 py-3 flex justify-between items-center font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
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
