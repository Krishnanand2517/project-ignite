import { Link } from "react-router-dom";
import { Logo } from "../index";
import { navItems } from "../../constants";

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-sm font-mono text-neutral-500 hover:text-[#a8a89e] transition-colors duration-200 underline-link"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm font-mono text-neutral-500">
          © 2026 Project IGNITE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
