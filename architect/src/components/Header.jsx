import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="w-full p-6 border-b-[1px] bg-black border-gray-600 top-0 fixed z-50">
            <Link to="/" className="self-center ml-4 whitespace-nowrap text-sm sm:text-lg font-semibold text-white">
                <span className="px-2 py-2 mr-1 rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-700">
                    Software Architect
                </span>
            </Link>

        </header>
    )
}

export default Header