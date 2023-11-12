import { Hero, Resource, CTA } from "../components";

const Landing = () => {
  return (
    <>
      <div className="w-full py-4 px-20 bg-primary">
        <Hero />
      </div>
      <div className="w-full py-16 px-20 bg-secondary">
        <Resource />
      </div>
      <div className="w-full py-16 px-20 bg-primary">
        <CTA />
      </div>
    </>
  );
};

export default Landing;
