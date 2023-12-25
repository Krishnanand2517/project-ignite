import { Button, Input, ImageInput } from "./index";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <form className="p-14 my-32 2xl:my-48 w-full max-w-lg 2xl:max-w-2xl rounded-lg flex flex-col gap-5 2xl:gap-10 font-inconsolata mx-auto bg-black bg-opacity-20 backdrop-blur-3xl">
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8">
        Create New Account
      </h2>
      <div>
        <Input label="Full Name" />
      </div>
      <div>
        <Input label="E-mail" />
      </div>
      <div>
        <Input label="Name of Your Institution" />
      </div>
      <div>
        <Input label="Course Pursuing (e.g. B.Tech, M.Sc.)" />
      </div>
      <div>
        <Input
          label="Year of Study (e.g. 3)"
          type="number"
          min={1}
          max={6}
          className="mb-6"
        />
      </div>
      <div>
        <ImageInput label="Profile Picture" className="text-primary" />
      </div>
      <div>
        <Input label="Password" type="password" />
      </div>
      <div>
        <Input label="Confirm Password" type="password" />
      </div>
      <Button textSize="text-lg 2xl:text-2xl" className="font-bold my-5 py-3">
        Create New Account
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
