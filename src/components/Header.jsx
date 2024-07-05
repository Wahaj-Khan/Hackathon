import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full sm:p-6 bg-black fixed top-0 z-50 flex items-center justify-between">
      <div className="flex items-center w-full justify-between px-5">
        <Link
          to="/"
          className="flex items-center text-sm sm:text-xl font-bold text-white"
        >
          AI Software Architect
        </Link>
        <div className="flex items-center space-x-8 mr-10">
          <Link to="/">
            <p className="text-white text-lg hover:text-blue-400 hover:scale-105 transition duration-200">
              Home
            </p>
          </Link>

          <p className="text-white text-lg hover:text-blue-400 hover:scale-105 transition duration-200 cursor-not-allowed">
            Result
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
