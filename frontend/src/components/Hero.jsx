import { Button } from "./index";

const Hero = () => {
  return (
    <div className="font-mono flex justify-evenly">
      <div className="flex flex-col justify-evenly">
        <h1 className="text-7xl 2xl:text-9xl font-black text-white">
          Project
          <br />
          IGNITE
        </h1>
        <h3 className="text-2xl 2xl:text-4xl font-semibold text-[#ECF0F1]">
          Of the coders.
          <br />
          By the coders.
          <br />
          For the coders.
        </h3>
        <Button className="font-semibold">Start Learning!</Button>
      </div>

      <div className="flex justify-end">
        <img src="/igniteCodeMd.png" alt="ignite-code" className="w-3/4" />
      </div>
    </div>
  );
};

export default Hero;
