import { Button } from "./index";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <div className="font-inconsolata text-secondary text-xl 2xl:text-3xl flex justify-evenly">
      <div className="flex flex-col items-stretch gap-8 w-full max-w-xs">
        <p>{"I'm new here. I want to start learning!"}</p>
        <Button
          textSize="text-xl 2xl:text-4xl"
          className="font-bold"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
      <div className="flex flex-col items-stretch gap-8 w-full max-w-xs">
        <p>{"I already have an account (and I love this platform)."}</p>
        <Button
          bgColor="bg-orange-400"
          hoverBgColor="hover:bg-orange-500"
          textSize="text-xl 2xl:text-4xl"
          className="font-bold"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default CTA;
