import { Footer, Header } from "./components";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import ProjectCategory from "./pages/ProjectCategory";
import Projects from "./pages/Projects";
import Questions from "./pages/Questions";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="min-h-screen flex flex-wrap items-stretch">
      <div className="w-full">
        <Header />
      </div>
      <ProjectCategory />
      <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <Footer />
      </div>
    </div>
  );
};

export default App;
