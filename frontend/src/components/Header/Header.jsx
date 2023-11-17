import { Logo } from "../index";
import { LogoutBtn } from "../index";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Articles",
      slug: "/articles",
    },
    {
      name: "Projects",
      slug: "/projects",
    },
    {
      name: "Courses",
      slug: "/courses",
    },
    {
      name: "Questions",
      slug: "/questions",
    },
  ];

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
              <button className="inline-block px-4 py-2 duration-200 hover:bg-slate-900 hover:text-orange-400 rounded-2xl">
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <LogoutBtn />
      </nav>
    </header>
  );
};

export default Header;
