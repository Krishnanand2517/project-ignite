import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login as storeLogin } from "../../store/authSlice";
import { Input, Button } from "../index";
import { Link } from "react-router-dom";
import accountService from "../../services/accounts";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginObject = {
      email: emailOrUsername.includes("@") ? emailOrUsername : null,
      username: emailOrUsername.includes("@") ? null : emailOrUsername,
      password: password,
    };

    setIsLoading(true);

    const response = await accountService.login(loginObject);

    setIsLoading(false);

    if (response.statusCode === 200) {
      dispatch(storeLogin(response.data.account));
      navigate("/articles");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-14 my-32 2xl:my-48 w-full max-w-md 2xl:max-w-xl rounded-lg flex flex-col gap-5 2xl:gap-10 font-inconsolata mx-auto bg-black bg-opacity-20 backdrop-blur-3xl"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8">
        Login
      </h2>
      <div>
        <Input
          label="E-mail or Username"
          value={emailOrUsername}
          onChange={({ target }) => setEmailOrUsername(target.value)}
        />
      </div>
      <div>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        bgColor="bg-orange-400"
        hoverBgColor="hover:bg-orange-500"
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold my-5 py-3 ${
          isLoading && "bg-orange-800 hover:bg-orange-800"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Log In"}
      </Button>
      <p className="text-secondary text-center">
        <Link to="/register" className="hover:text-orange-400 2xl:text-lg">
          Are you new here? Create a New Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
