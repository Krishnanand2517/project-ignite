import { Button } from "./index";

const QuestionCard = ({ title, difficulty }) => {
  return (
    <a href="#">
      <div className="px-8 py-3 flex justify-between font-inconsolata text-secondary border border-white rounded-md hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-3xl">
        <div className="flex flex-wrap">
          <h3 className="w-full font-fira font-semibold text-lg 2xl:text-2xl">
            {title}
          </h3>
          <p className="w-full text-sm 2xl:text-lg">{difficulty}</p>
        </div>

        <Button
          textSize="text-base 2xl:text-xl"
          className="py-0 px-16 font-bold"
        >
          Solve
        </Button>
      </div>
    </a>
  );
};

export default QuestionCard;
