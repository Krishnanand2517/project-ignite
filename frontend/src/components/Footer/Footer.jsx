const Footer = () => {
  return (
    <footer className="text-secondary font-inconsolata">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl 2xl:text-4xl font-fira font-black text-primary">
            Project
            <br />
            IGNITE
          </h2>
        </div>

        <div>
          <ul className="flex space-x-4">
            <li className="hover:text-orange-300">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-orange-300">
              <a href="#">Articles</a>
            </li>
            <li className="hover:text-orange-300">
              <a href="#">Projects</a>
            </li>
            <li className="hover:text-orange-300">
              <a href="#">Questions</a>
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
