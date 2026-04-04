import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";


const Sidebar = ({ sidebarOpen, setSidebarOpen, hideOnDesktop }) => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);



    const handleLogout = async () => {
        await logout();
        setSidebarOpen(false);
        navigate("/login");
    };

    const handleClose = () => setSidebarOpen(false);

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center space-x-3 px-3 py-2 rounded-lg font-medium cursor-pointer transition text-sm ${isActive(path)
            ? "bg-[#0A0F1C] text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`;

    return (
        <>
            {/* Overlay — mobile only */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={handleClose}
                />
            )}

            <div
                className={`bg-white w-56 border-r border-gray-200
                  fixed top-10 left-0 z-50 transform transition-transform duration-300 ease-in-out
    flex flex-col
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    ${hideOnDesktop
                        ? "md:hidden"
                        : "md:sticky md:top-0 md:translate-x-0 md:flex md:h-screen"
                    }
    `}
                style={{ height: "100dvh" }}
            >
                {/* Brand */}
                <div className="flex flex-col p-3 border-b border-gray-200 shrink-0">
                    <div className="flex justify-between items-center">
                        <Link to="/" onClick={handleClose}>
                            <h5 className="font-bold text-lg text-[#0A0F1C]">Cocolaw.ai</h5>
                        </Link>
                        <button
                            className="md:hidden w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold text-lg hover:bg-gray-200 transition"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">Law Management</p>
                    {authed && (
                        <span className="mt-1.5 text-xs px-2 py-0.5 rounded-full w-fit font-semibold bg-[#0A0F1C] text-white">
                            {isAdmin ? "Admin" : "User"}
                        </span>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col mt-3 text-sm space-y-0.5 flex-1 overflow-y-auto px-2 pb-2">

                    <Link to="/" onClick={handleClose} className={linkClass("/")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" />
                        <p>Home</p>
                    </Link>

                    <Link to="/aboutus" onClick={handleClose} className={linkClass("/aboutus")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" />
                        <p>About Us</p>
                    </Link>

                    <Link to="/services" onClick={handleClose} className={linkClass("/services")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" />
                        <p>Services</p>
                    </Link>

                    {isAdmin && (
                        <Link to="/dashboard" onClick={handleClose} className={linkClass("/dashboard")}>
                            <img className="w-4 h-4 opacity-70" src={Icon1} alt="" />
                            <p>Dashboard</p>
                        </Link>
                    )}

                    {isAdmin && (
                        <Link to="/appointments" onClick={handleClose} className={linkClass("/appointments")}>
                            <img className="w-4 h-4 opacity-70" src={Icon2} alt="" />
                            <p>Appointments</p>
                        </Link>
                    )}

                    {authed && !isAdmin && (
                        <Link to="/bookings" onClick={handleClose} className={linkClass("/bookings")}>
                            <img className="w-4 h-4 opacity-70" src={Icon3} alt="" />
                            <p>Bookings</p>
                        </Link>
                    )}

                    {authed && (
                        <Link to="/profile" onClick={handleClose} className={linkClass("/profile")}>
                            <img className="w-4 h-4 opacity-70" src={Icon4} alt="" />
                            <p>Profile</p>
                        </Link>
                    )}
                </nav>

                {/* Bottom auth section */}
                <div className="border-t border-gray-200 p-3 shrink-0">
                    {authed ? (
                        <div className="flex flex-col space-y-2">
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
                            <button
                                onClick={handleLogout}
                                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition font-semibold text-left"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Link
                                to="/login"
                                onClick={handleClose}
                                className="w-full text-xs px-3 py-2 border border-[#0A0F1C] text-[#0A0F1C] rounded-lg text-center font-semibold hover:bg-gray-50 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={handleClose}
                                className="w-full text-xs px-3 py-2 bg-[#0A0F1C] text-white rounded-lg text-center font-semibold hover:bg-gray-800 transition"
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