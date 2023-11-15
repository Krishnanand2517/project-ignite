import { Button } from "../index";

const LogoutBtn = () => {
  return (
    <Button
      bgColor="bg-orange-400"
      hoverBgColor="hover:bg-orange-500"
      textSize="text-lg 2xl:text-2xl"
      className="py-1 px-6 font-bold rounded-2xl"
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
