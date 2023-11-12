import { Hero, Resource, CTA, About, Footer } from "../components";

const Landing = () => {
  return (
    <>
      <div className="w-full py-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <Hero />
      </div>
      <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <About />
      </div>
      <div className="w-full py-16 px-20 bg-gradient-to-t from-secondary via-slate-800 to-primary">
        <Resource />
      </div>
      <div className="w-full pt-16 pb-36 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <CTA />
      </div>
      <div className="w-full pt-24 pb-8 px-20 bg-gradient-to-t from-secondary via-slate-800 to-primary">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
