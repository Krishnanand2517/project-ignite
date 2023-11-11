import { Button } from "./index";

const Hero = () => {
  return (
    <div className="font-mono">
      <h1 className="text-7xl mb-8 font-black text-white">
        Project
        <br />
        IGNITE
      </h1>
      <h3 className="text-2xl mb-8 font-semibold text-[#ECF0F1]">
        Of the coders.
        <br />
        By the coders.
        <br />
        For the coders.
      </h3>
      <Button className="font-semibold">Start Learning!</Button>
    </div>
  );
};

export default Hero;
