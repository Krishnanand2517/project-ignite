import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as storeLogin } from "../../store/authSlice";
import { Input } from "../index";
import { Link } from "react-router-dom";
import accountService from "../../services/accounts";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    const loginObject = {
      email: emailOrUsername.includes("@") ? emailOrUsername : null,
      username: emailOrUsername.includes("@") ? null : emailOrUsername,
      password,
    };
    setIsLoading(true);
    try {
      const response = await accountService.login(loginObject);
      if (response.statusCode === 200) {
        dispatch(storeLogin(response.data.account));
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 404)
        setError("Email or username not found");
      else if (error.response?.status === 401) setError("Incorrect password");
      else setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = isLoading || !emailOrUsername || !password;

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L9.5 5.5H13L10 8.5L11 13L7 10.5L3 13L4 8.5L1 5.5H4.5L7 1Z"
                fill="#0a0a0b"
              />
            </svg>
          </div>
          <h2 className="font-syne font-bold text-2xl text-neutral-100 mb-1">
            Welcome back
          </h2>
          <p className="text-sm font-mono text-[#8a8a84]">
            Sign in to continue to Project IGNITE
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-3">
            <Input
              label="Email or username"
              value={emailOrUsername}
              onChange={({ target }) => setEmailOrUsername(target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          {error && (
            <p className="text-xs font-mono text-red-400 px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-mono text-neutral-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-accent hover:text-amber-300 transition-colors duration-200 underline-link"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
