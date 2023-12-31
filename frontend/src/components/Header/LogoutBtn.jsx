import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout as storeLogout } from "../../store/authSlice";
import { Button } from "../index";
import accountService from "../../services/accounts";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (event) => {
    try {
      event.preventDefault();

      setIsLoading(true);
      const response = await accountService.logout();
      setIsLoading(false);

      if (response.statusCode === 200) {
        dispatch(storeLogout());
        navigate("/");
      }
    } catch {
      console.log("Logging out due to error");
      dispatch(storeLogout());
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
