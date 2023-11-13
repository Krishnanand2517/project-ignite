import { Footer, LoginForm } from "../components";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-wrap items-stretch">
      <div className="w-full py-4 px-20 bg-gradient-to-b from-primary via-slate-800 to-secondary">
        <LoginForm />
      </div>
      <div className="w-full pt-36 pb-10 px-20 bg-gradient-to-t from-primary via-slate-800 to-secondary">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
