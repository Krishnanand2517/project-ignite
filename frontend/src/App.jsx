import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="min-h-screen flex flex-wrap items-stretch">
      <div className="w-full">
        <Header />
      </div>
      <Outlet />
      <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <Footer />
      </div>
    </div>
  );
};

export default App;
