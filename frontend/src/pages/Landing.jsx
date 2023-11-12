import { Hero, Resource, CTA, About, Footer } from "../components";

const Landing = () => {
  return (
    <>
      <div className="w-full py-4 px-20 bg-primary">
        <Hero />
      </div>
      <div className="w-full pt-36 pb-10 px-20 bg-secondary">
        <About />
      </div>
      <div className="w-full py-16 px-20 bg-primary">
        <Resource />
      </div>
      <div className="w-full pt-16 pb-36 px-20 bg-secondary">
        <CTA />
      </div>
      <div className="w-full pt-24 pb-8 px-20 bg-primary">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
