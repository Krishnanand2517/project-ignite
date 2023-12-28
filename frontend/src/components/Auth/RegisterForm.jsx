import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login as storeLogin } from "../../store/authSlice";
import { Button, Input, ImageInput } from "../index";
import { Link } from "react-router-dom";
import accountService from "../../services/accounts";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = async (event) => {
    event.preventDefault();

    const registerFormData = new FormData();
    registerFormData.append("username", username);
    registerFormData.append("email", email);
    registerFormData.append("password", password);
    registerFormData.append("fullName", fullName);

    registerFormData.append(
      "accountType",
      isStudent ? "student" : "instructor"
    );

    registerFormData.append("avatar", avatar);

    if (isStudent) {
      registerFormData.append("collegeName", institutionName);
      registerFormData.append("collegeProgramme", institutionCourse);
      registerFormData.append("year", Number(institutionYear));
    }

    setIsLoading(true);

    const response = await accountService.register(registerFormData);

    if (response.statusCode === 201) {
      const loginObject = {
        username: username,
        password: password,
      };

      const loginResponse = await accountService.login(loginObject);

      setIsLoading(false);

      if (loginResponse.statusCode === 200) {
        dispatch(storeLogin(loginResponse.data.account));
        navigate("/articles");
      }
    }

    setIsLoading(false);
  };

  const renderStudentInputFields = () => {
    if (!isStudent) return null;

    return (
      <>
        <div className="mt-6">
          <Input
            label="Name of Your Institution"
            value={institutionName}
            onChange={({ target }) => setInstitutionName(target.value)}
          />
        </div>
        <div>
          <Input
            label="Course Pursuing (e.g. B.Tech, M.A)"
            value={institutionCourse}
            onChange={({ target }) => setInstitutionCourse(target.value)}
          />
        </div>
        <div>
          <Input
            label="Year of Study (e.g. 3)"
            type="number"
            min={1}
            max={6}
            value={institutionYear}
            onChange={({ target }) => setInstitutionYear(target.value)}
          />
        </div>
      </>
    );
  };

  return (
    <form
      onSubmit={handleRegister}
      className="p-14 my-32 2xl:my-48 w-full max-w-lg 2xl:max-w-2xl rounded-lg flex flex-col gap-5 2xl:gap-10 font-inconsolata mx-auto bg-black bg-opacity-20 backdrop-blur-3xl"
    >
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8">
        Create New Account
      </h2>
      <div>
        <Input
          label="Full Name"
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
        />
      </div>
      <div>
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        <Input
          label="username (only lowercase)"
          className="lowercase"
          value={username}
          onChange={({ target }) => setUsername(target.value.toLowerCase())}
        />
      </div>

      <div className="text-primary flex justify-around">
        <span className="text-lg 2xl:text-2xl">Are you an instructor?</span>
        <input
          type="checkbox"
          className="w-6 2xl:w-8 accent-orange-500 rounded-md"
          onChange={() => setIsStudent(!isStudent)}
        />
      </div>

      {renderStudentInputFields()}

      <div>
        <ImageInput
          label="Profile Picture"
          className="text-primary mt-6"
          setOutputImage={setAvatar}
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
      <div>
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          className={`border-2 border-white ${
            password && password === confirmPassword
              ? "border-green-500 outline-green-500"
              : confirmPassword && "border-red-500 outline-red-500"
          }`}
        />
      </div>
      <Button
        textSize="text-lg 2xl:text-2xl"
        className={`font-bold my-5 py-3 ${
          isLoading && "bg-green-800 hover:bg-green-800"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create New Account"}
      </Button>
      <p className="text-secondary text-center">
        <Link to="/login" className="hover:text-orange-400 2xl:text-lg">
          Already have an account? Log In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
