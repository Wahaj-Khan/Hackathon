import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full p-6 bg-black fixed top-0 z-50  items-center">
      <div className="flex justify-center sm:justify-normal w-full px-5">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-white"
        >
          AI Software Architect
        </Link>
      </div>
    </header>
  );
};

export default Header;
