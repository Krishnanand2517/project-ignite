import { useNavigate } from "react-router-dom";
import { Button } from "./index";

const Contribution = () => {
  const navigate = useNavigate();

  return (
    <div className="font-inconsolata text-secondary text-xl 2xl:text-3xl flex justify-evenly">
      <div className="flex flex-col items-stretch justify-between gap-8 w-full max-w-xs">
        <p>{"I want to contribute a new coding question to Project IGNITE!"}</p>
        <Button
          textSize="text-xl 2xl:text-4xl"
          className="font-bold"
          onClick={() => navigate("/add-question")}
        >
          Contribute Question
        </Button>
      </div>
      <div className="flex flex-col items-stretch justify-between gap-8 w-full max-w-xs">
        <p>
          {"I have an article that will help the community on Project IGNITE!"}
        </p>
        <Button
          textSize="text-xl 2xl:text-4xl"
          className="font-bold"
          // onClick={() => navigate("/login")}
        >
          Contribute Article
        </Button>
      </div>
    </div>
  );
};

export default Contribution;
