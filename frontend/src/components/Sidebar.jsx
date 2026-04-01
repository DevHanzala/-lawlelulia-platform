import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    const handleLogout = async () => {
        await logout();
        setSidebarOpen(false);
        navigate("/login");
    };

    const handleClose = () => setSidebarOpen(false);

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={handleClose}
                />
            )}

            <div
                className={`bg-white w-56 border-r border-gray-300
                fixed top-0 left-0 z-50 transform transition-transform duration-300
                flex flex-col overflow-y-auto
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:sticky md:translate-x-0 md:flex`}
                style={{ height: '100%', maxHeight: '-webkit-fill-available' }}
            >
                {/* Brand */}
                <div className="flex flex-col p-3 border-b border-gray-300 shrink-0">
                    <div className="flex justify-between items-center">
                        <Link to="/" onClick={handleClose}>
                            <h5 className="font-semibold text-md">Cocolaw.ai</h5>
                        </Link>
                        <button
                            className="md:hidden text-black font-bold text-xl px-1"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-gray-500 text-xs">Law Management</p>
                    {authed && (
                        <span className="mt-1 text-xs px-2 py-0.5 rounded-full w-fit font-medium bg-[#0A0F1C] text-white">
                            {isAdmin ? "Admin" : "User"}
                        </span>
                    )}
                </div>

                {/* Nav Links */}
                <div className="flex flex-col mt-4 font-semibold text-sm space-y-1 shrink-0">

                    {/* Home — everyone */}
                    <Link to="/" onClick={handleClose}
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                        <img className="w-4 h-4" src={Icon1} alt="" />
                        <p>Home</p>
                    </Link>

                    {/* Dashboard — admin only */}
                    {isAdmin && (
                        <Link to="/dashboard" onClick={handleClose}
                            className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                            <img className="w-4 h-4" src={Icon1} alt="" />
                            <p>Dashboard</p>
                        </Link>
                    )}

                    {/* Appointments — admin only */}
                    {isAdmin && (
                        <Link to="/appointments" onClick={handleClose}
                            className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                            <img className="w-4 h-4" src={Icon2} alt="" />
                            <p>Appointments</p>
                        </Link>
                    )}

                    {/* Bookings — logged in users */}
                    {authed && (
                        <Link to="/bookings" onClick={handleClose}
                            className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                            <img className="w-4 h-4" src={Icon3} alt="" />
                            <p>Bookings</p>
                        </Link>
                    )}

                    {/* Profile — logged in users */}
                    {authed && (
                        <Link to="/profile" onClick={handleClose}
                            className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                            <img className="w-4 h-4" src={Icon4} alt="" />
                            <p>Profile</p>
                        </Link>
                    )}

                    {/* About Us — everyone */}
                    <Link to="/aboutus" onClick={handleClose}
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                        <img className="w-4 h-4" src={Icon4} alt="" />
                        <p>About Us</p>
                    </Link>

                    {/* Services — everyone */}
                    <Link to="/services" onClick={handleClose}
                        className="flex space-x-4 ml-4 hover:bg-gray-200 p-2 rounded cursor-pointer">
                        <img className="w-4 h-4" src={Icon4} alt="" />
                        <p>Services</p>
                    </Link>
                </div>

                {/* Auth section — inline after nav, always visible */}
                <div className="border-t border-gray-200 p-3 mt-6 md:hidden shrink-0">
                    {authed ? (
                        <div className="flex flex-col space-y-2">
                            {/* User info */}
                            <div className="flex items-center space-x-2 px-1 py-1">
                                <div className="w-8 h-8 rounded-full bg-[#0A0F1C] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs font-bold text-gray-800 truncate">
                                        {user?.fullName}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            {/* Logout button */}
                            <button
                                onClick={handleLogout}
                                className="w-full text-xs px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition text-left font-semibold"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/login"
                                onClick={handleClose}
                                className="w-full text-xs px-3 py-2 border border-[#0A0F1C] text-[#0A0F1C] rounded-md text-center font-semibold hover:bg-gray-50 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={handleClose}
                                className="w-full text-xs px-3 py-2 bg-[#0A0F1C] text-white rounded-md text-center font-semibold hover:bg-gray-800 transition"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default Sidebar;