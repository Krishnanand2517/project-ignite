import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout as storeLogout } from "../../store/authSlice";
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
    <button
      disabled={isLoading}
      onClick={handleLogout}
      className="text-xs font-mono text-neutral-500 hover:text-[#a8a89e] transition-colors duration-200"
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
