import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as storeLogout } from "../../store/authSlice";
import { Logo, AvatarIcon, LogoutBtn } from "../index";
import accountService from "../../services/accounts";
import { navItems } from "../../constants";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userImg = useSelector((state) => state.auth.userData?.avatarImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await accountService.getCurrent();
      } catch (error) {
        dispatch(storeLogout());
      }
    };

    fetchData();
  }, [dispatch]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,11,0.9)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-accent bg-[rgba(245,158,11,0.08)]"
                    : "text-[#a8a89e] hover:text-neutral-100 hover:bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Auth */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <AvatarIcon image={userImg} />
            <LogoutBtn />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-mono text-[#a8a89e] hover:text-neutral-100 transition-colors px-4 py-2"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-syne font-semibold px-4 py-2 rounded-lg bg-accent text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-200 active:scale-[0.98]"
            >
              Get started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
