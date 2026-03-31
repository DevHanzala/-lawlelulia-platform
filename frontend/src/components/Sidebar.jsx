import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, isAuthenticated } = useAuthStore();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    return (
        <div
            className={`bg-white w-48 h-screen border-r border-gray-300 border-solid
            fixed top-0 left-0 z-50 transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:sticky md:translate-x-0 md:block`}
        >
            {/* Brand */}
            <div className="flex flex-col p-2 border-b border-solid border-gray-300">
                <div className="flex justify-between">
                    <Link to="/">
                        <h5 className="font-semibold text-md">Cocolaw.ai</h5>
                    </Link>
                    {sidebarOpen && (
                        <button
                            className="text-black font-bold text-lg"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ×
                        </button>
                    )}
                </div>
                <p className="text-gray-500 text-xs">Law Management</p>
                {/* Show current role badge */}
                {authed && (
                    <span className={`mt-1 text-xs px-2 py-0.5 rounded-full w-fit font-medium ${
                        isAdmin
                            ? "bg-[#0A0F1C] text-white"
                            : "bg-[#0A0F1C] text-white"
                    }`}>
                        {isAdmin ? "Admin" : "User"}
                    </span>
                )}
            </div>

            {/* Links */}
            <div className="flex flex-col mt-4 font-semibold text-sm space-y-1">

                {/* Home — everyone */}
                <Link
                    to="/"
                    className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                >
                    <img className="w-4 h-4" src={Icon1} alt="" />
                    <p>Home</p>
                </Link>

                {/* Dashboard — admin only */}
                {isAdmin && (
                    <Link
                        to="/dashboard"
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                    >
                        <img className="w-4 h-4" src={Icon1} alt="" />
                        <p>Dashboard</p>
                    </Link>
                )}

                {/* Appointments — admin only */}
                {isAdmin && (
                    <Link
                        to="/appointments"
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                    >
                        <img className="w-4 h-4" src={Icon2} alt="" />
                        <p>Appointments</p>
                    </Link>
                )}

                {/* Bookings — logged in users */}
                {authed && (
                    <Link
                        to="/bookings"
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                    >
                        <img className="w-4 h-4" src={Icon3} alt="" />
                        <p>Bookings</p>
                    </Link>
                )}

                {/* Profile — logged in users */}
                {authed && (
                    <Link
                        to="/profile"
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                    >
                        <img className="w-4 h-4" src={Icon4} alt="" />
                        <p>Profile</p>
                    </Link>
                )}

                {/* About Us — everyone */}
                <Link
                    to="/aboutus"
                    className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                >
                    <img className="w-4 h-4" src={Icon4} alt="" />
                    <p>About Us</p>
                </Link>

                {/* Services — everyone */}
                <Link
                    to="/services"
                    className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
                >
                    <img className="w-4 h-4" src={Icon4} alt="" />
                    <p>Services</p>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;