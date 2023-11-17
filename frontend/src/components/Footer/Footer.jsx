import { Logo } from "../index";
import { Link } from "react-router-dom";

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
            <li className="hover:text-orange-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-orange-300">
              <Link to="/articles">Articles</Link>
            </li>
            <li className="hover:text-orange-300">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="hover:text-orange-300">
              <Link to="/courses">Courses</Link>
            </li>
            <li className="hover:text-orange-300">
              <Link to="/questions">Questions</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center mt-4 hover:text-orange-300">
        &copy; 2023 Project IGNITE. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
