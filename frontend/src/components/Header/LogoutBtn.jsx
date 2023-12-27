import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";
import accountService from "../../services/accounts";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const response = await accountService.logout();
    setIsLoading(false);

    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <Button
      bgColor="bg-orange-400"
      hoverBgColor="hover:bg-orange-500"
      textSize="text-lg 2xl:text-2xl"
      className={`py-1 px-6 font-bold rounded-2xl ${
        isLoading && "bg-orange-800 hover:bg-orange-800"
      }`}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
