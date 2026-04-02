import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) =>
        `hover:text-gray-300 transition ${isActive(path) ? "text-white border-b border-white pb-0.5" : "text-gray-400"}`;

    return (
        <nav className="w-full bg-[#0A0F1C] flex p-2 justify-between items-center z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center font-semibold text-2xl text-[#0A0F1C]">
                    C
                </div>
                <div className="text-white mt-1 text-xl">Cocolaw.ai</div>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex space-x-6 text-xs font-semibold">
                <Link to="/" className={navLinkClass("/")}>Home</Link>
                {isAdmin && (
                    <>
                        <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
                        <Link to="/appointments" className={navLinkClass("/appointments")}>Appointments</Link>
                    </>
                )}
                {authed && !isAdmin && (
                    <Link to="/bookings" className={navLinkClass("/bookings")}>Bookings</Link>
                )}
                <Link to="/services" className={navLinkClass("/services")}>Services</Link>
                <Link to="/aboutus" className={navLinkClass("/aboutus")}>About Us</Link>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-3">
                {authed ? (
                    <>
                        {isAdmin && (
                            <span className="text-xs px-2 py-0.5 bg-white text-[#0A0F1C] rounded-full font-bold">
                                Admin
                            </span>
                        )}
                        <Link to="/profile" className={`text-sm ${isActive("/profile") ? "text-white font-bold" : "text-gray-300 hover:text-white"} transition`}>
                            Welcome, <b>{user?.fullName?.split(" ")[0] || "User"}</b>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-xs px-3 py-1.5 border border-gray-500 text-gray-300 rounded-md hover:border-white hover:text-white transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-xs px-3 py-1.5 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="text-xs px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-200 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            {/* Hamburger — fixed: use button for proper click handling */}
            <button
                className="md:hidden flex flex-col space-y-1 cursor-pointer p-1 bg-transparent border-none outline-none"
   onClick={() => {
        setSidebarOpen(prev => {
            return !prev;
        });
    }}
                aria-label="Toggle sidebar"
            >
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
            </button>
        </nav>
    );
};

export default Navbar;