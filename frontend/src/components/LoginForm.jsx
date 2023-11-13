import { Input, Button } from "./index";

const LoginForm = () => {
  return (
    <form className="p-14 my-32 2xl:my-48 w-full max-w-md 2xl:max-w-xl rounded-lg flex flex-col gap-5 2xl:gap-10 font-inconsolata mx-auto bg-black bg-opacity-20 backdrop-blur-3xl">
      <h2 className="text-2xl 2xl:text-4xl font-fira font-bold text-primary text-center mb-8">
        Login
      </h2>
      <div>
        <Input label="E-mail" />
      </div>
      <div>
        <Input label="Password" type="password" />
      </div>
      <Button
        bgColor="bg-orange-400"
        hoverBgColor="hover:bg-orange-500"
        textSize="text-lg 2xl:text-2xl"
        className="font-bold my-5 py-3"
      >
        Log In
      </Button>
      <p className="text-secondary text-center">
        <a href="#" className="hover:text-orange-400 2xl:text-lg">
          Are you new here? Create a New Account
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
