import { useSelector } from "react-redux";
import {
  Hero,
  Resource,
  CTA,
  About,
  ProfileCard,
  Contribution,
} from "../components";

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="w-full pt-32 2xl:pt-44 pb-4 2xl:pb-8 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
            <ProfileCard userData={userData} />
          </div>
          <div className="w-full pt-36 2xl:pt-40 pb-10 2xl:pb-14 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
            <Resource />
          </div>
          <div className="w-full pt-24 2xl:pt-28 pb-16 2xl:pb-20 px-20 bg-gradient-to-t from-secondary via-slate-800 to-primary">
            <Contribution />
          </div>
        </>
      ) : (
        <>
          <div className="w-full pt-32 2xl:pt-36 pb-4 2xl:pb-8 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
            <Hero />
          </div>
          <div className="w-full pt-36 2xl:pt-40 pb-10 2xl:pb-14 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
            <About />
          </div>
          <div className="w-full py-16 2xl:py-20 px-20 bg-gradient-to-t from-secondary via-slate-800 to-primary">
            <Resource />
          </div>
          <div className="w-full pt-16 2xl:pt-28 pb-36 2xl:pb-40 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
            <CTA />
          </div>
        </>
      )}
    </>
  );
};

export default Landing;
