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

  if (isAuthenticated) {
    return (
      <>
        <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
          <ProfileCard userData={userData} />
        </div>
        <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
          <Resource />
        </div>
        <div className="w-full pt-24 pb-16 px-20 bg-gradient-to-t from-secondary via-slate-800 to-primary">
          <Contribution />
        </div>
        {/* <div className="w-full pt-16 pb-36 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
          
        </div> */}
      </>
    );
  }

  return (
    <>
      <div className="w-full pt-32 pb-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
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
    </>
  );
};

export default Landing;
