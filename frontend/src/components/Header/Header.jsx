import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout as storeLogout } from "../../store/authSlice";

import { Button, Logo, LogoutBtn, AvatarIcon } from "../index";
import accountService from "../../services/accounts";
import { navItems } from "../../constants";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userImg = useSelector((state) => state.auth.userData?.avatarImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await accountService.getCurrent();
    };

    try {
      fetchData();
    } catch (error) {
      console.log("Logging out with error:", error);
      dispatch(storeLogout());
    }
  }, [dispatch]);

  return (
    <header className="w-full py-4 px-10 font-fira bg-black bg-opacity-20 backdrop-blur-lg fixed z-10">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/">
            <Logo className="text-lg 2xl:text-2xl" />
          </Link>
        </div>

        <ul className="flex gap-x-4 text-secondary 2xl:text-xl">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className="inline-block px-4 py-2 duration-200 hover:bg-slate-900 hover:text-orange-400 rounded-2xl"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {isAuthenticated ? (
          <div className="flex justify-around items-center gap-x-6">
            <AvatarIcon image={userImg} />
            <LogoutBtn />
          </div>
        ) : (
          <Button
            textSize="text-xl 2xl:text-4xl"
            className="font-bold"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
