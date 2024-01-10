import { Link } from "react-router-dom";
import { Logo } from "../index";
import { navItems } from "../../constants";

const Footer = () => {
  return (
    <footer className="text-secondary font-inconsolata">
      <div className="flex justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.name} className="hover:text-orange-300 2xl:text-xl">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center mt-4 hover:text-orange-300 2xl:text-xl">
        &copy; 2024 Project IGNITE. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
