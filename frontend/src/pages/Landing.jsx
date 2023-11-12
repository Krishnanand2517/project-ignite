import { Hero, Resource } from "../components";

const Landing = () => {
  return (
    <>
      <div className="w-full py-4 px-20 bg-primary">
        <Hero />
      </div>
      <div className="w-full py-16 px-20 bg-secondary">
        <Resource />
      </div>
    </>
  );
};

export default Landing;
