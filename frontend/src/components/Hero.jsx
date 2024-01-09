import { Button } from "./index";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="font-fira flex justify-evenly">
      <div className="flex flex-col justify-evenly">
        <h1 className="text-7xl 2xl:text-8xl font-black text-primary">
          Project
          <br />
          IGNITE
        </h1>
        <h3 className="text-2xl 2xl:text-3xl font-semibold text-secondary">
          Of the coders.
          <br />
          By the coders.
          <br />
          For the coders.
        </h3>
        <Button
          className="font-extrabold"
          onClick={() => navigate("/register")}
        >
          Start Learning!
        </Button>
      </div>

      <div className="flex justify-end">
        <img src="/igniteCodeMd.png" alt="ignite-code" className="w-3/4" />
      </div>
    </div>
  );
};

export default Hero;
