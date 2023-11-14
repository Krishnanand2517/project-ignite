import { Footer, Header } from "./components";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="min-h-screen flex flex-wrap items-stretch">
      <div className="w-full">
        <Header />
      </div>
      <Articles />
      <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <Footer />
      </div>
    </div>
  );
};

export default App;
