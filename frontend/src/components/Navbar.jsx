import { Link } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <nav className="w-full bg-[#0A0F1C] flex p-2 justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center font-semibold text-2xl">
                    L
                </div>
                <div className="text-white mt-1">awlelulia</div>
            </div>

            {/* Nav links */}
            <div className="hidden md:block flex space-x-6 text-white text-xs font-semibold">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/appointments" className="hover:text-gray-300">Appointments</Link>
                <Link to="/bookings" className="hover:text-gray-300">Bookings</Link>
                <Link to="/about" className="hover:text-gray-300">About Us</Link>
            </div>

            {/* Welcome Text */}
            <div className="hidden md:block text-white mr-4">
                <p>Welcome, <b>Admin</b></p>
            </div>

            {/* Hamburger Iconoverlay ( only for mobile screens) */}
            <div className="md:hidden flex flex-col space-y-1 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
            </div>

        </nav>
    );
};

export default Navbar;