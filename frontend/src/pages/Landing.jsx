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
    <div className="min-h-screen bg-[#0a0a0b]">
      {isAuthenticated ? (
        <>
          <ProfileCard userData={userData} />
          <Resource />
          <Contribution />
        </>
      ) : (
        <>
          <Hero />
          <About />
          <Resource />
          <CTA />
        </>
      )}
    </div>
  );
};

export default Landing;
