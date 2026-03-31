import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as storeLogin } from "../../store/authSlice";
import { Input, ImageInput } from "../index";
import { Link } from "react-router-dom";
import accountService from "../../services/accounts";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [institutionName, setInstitutionName] = useState("");
  const [institutionCourse, setInstitutionCourse] = useState("");
  const [institutionYear, setInstitutionYear] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    formData.append("accountType", isStudent ? "student" : "instructor");
    formData.append("avatar", avatar);
    if (isStudent) {
      formData.append("collegeName", institutionName);
      formData.append("collegeProgramme", institutionCourse);
      formData.append("year", Number(institutionYear));
    }
    setIsLoading(true);
    try {
      const response = await accountService.register(formData);
      if (response.statusCode === 201) {
        const loginResponse = await accountService.login({
          username,
          password,
        });
        if (loginResponse.statusCode === 200) {
          dispatch(storeLogin(loginResponse.data.account));
          navigate("/");
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const passwordsMatch = !confirmPassword || password === confirmPassword;
  const disabled =
    !password ||
    !fullName ||
    !username ||
    !email ||
    (isStudent &&
      (!institutionName || !institutionCourse || !institutionYear)) ||
    isLoading ||
    password !== confirmPassword;

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
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
            Create your account
          </h2>
          <p className="text-sm font-mono text-[#8a8a84]">
            Already have one?{" "}
            <Link
              to="/login"
              className="text-accent hover:text-amber-300 transition-colors underline-link"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-3">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
              Basic info
            </p>
            <Input
              label="Full Name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Input
              label="Username (lowercase only)"
              className="lowercase"
              value={username}
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
            />
          </div>

          {/* Account type toggle */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-[#a8a89e]">
                I am an instructor
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setIsStudent(!isStudent)}
                />
                <div className="w-9 h-5 bg-[rgba(255,255,255,0.06)] rounded-full border border-[rgba(255,255,255,0.1)] peer-checked:bg-accent transition-all duration-200 peer-checked:border-amber-500" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[#5a5a54] rounded-full transition-all duration-200 peer-checked:translate-x-4 peer-checked:bg-black" />
              </label>
            </div>
          </div>

          {/* Student fields */}
          {isStudent && (
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-3">
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                Institution
              </p>
              <Input
                label="Institution name"
                value={institutionName}
                onChange={({ target }) => setInstitutionName(target.value)}
              />
              <Input
                label="Program (e.g. B.Tech, M.A)"
                value={institutionCourse}
                onChange={({ target }) => setInstitutionCourse(target.value)}
              />
              <Input
                label="Year of study"
                type="number"
                min={1}
                max={6}
                value={institutionYear}
                onChange={({ target }) => setInstitutionYear(target.value)}
              />
            </div>
          )}

          {/* Avatar + password */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,17,20,0.7)] backdrop-blur-xl p-6 space-y-3">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
              Security & avatar
            </p>
            <ImageInput
              label="Profile Picture"
              className="text-primary"
              setOutputImage={setAvatar}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <div>
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                className={
                  !passwordsMatch
                    ? "border-red-500"
                    : password && confirmPassword
                    ? "border-emerald-500"
                    : ""
                }
              />
              {!passwordsMatch && confirmPassword && (
                <p className="text-xs font-mono text-red-400 mt-1.5">
                  {"Passwords don't match"}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-xs font-mono text-red-400 px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="w-full py-3 rounded-xl font-syne font-semibold text-sm bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
          >
            {isLoading ? "Creating account..." : "Create account →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
