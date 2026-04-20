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
        `transition text-xs font-semibold ${
            isActive(path)
                ? "text-white border-b border-white pb-0.5"
                : "text-gray-400 hover:text-white"
        }`;

    return (
        <nav className="w-full bg-[#0A0F1C] border-b border-gray-800 flex px-4 py-3 justify-between items-center sticky top-0 z-50">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center font-bold text-base text-[#0A0F1C] shrink-0">
                    C
                </div>
                <span className="text-white font-bold text-base tracking-wide">Cocolaw.ai</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/"               className={navLinkClass("/")}>Home</Link>
                <Link to="/practice-areas" className={navLinkClass("/practice-areas")}>Practice Areas</Link>
                <Link to="/features"       className={navLinkClass("/features")}>Features</Link>
                <Link to="/aboutus"        className={navLinkClass("/aboutus")}>About</Link>
                <Link to="/contact"        className={navLinkClass("/contact")}>Contact</Link>

                {/* Admin-only */}
                {isAdmin && (
                    <>
                        <Link to="/dashboard"    className={navLinkClass("/dashboard")}>Dashboard</Link>
                        <Link to="/appointments" className={navLinkClass("/appointments")}>Appointments</Link>
                    </>
                )}

                {/* User-only */}
                {authed && !isAdmin && (
                    <>
                        <Link to="/bookings"          className={navLinkClass("/bookings")}>Bookings</Link>
                        <Link to="/client-dashboard"  className={navLinkClass("/client-dashboard")}>Dashboard</Link>
                    </>
                )}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-3 shrink-0">
                {authed ? (
                    <>
                        {isAdmin && (
                            <span className="text-xs px-2.5 py-0.5 bg-white text-[#0A0F1C] rounded-full font-bold">
                                Admin
                            </span>
                        )}
                        <Link
                            to="/profile"
                            className={`text-sm transition ${
                                isActive("/profile") ? "text-white font-bold" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Welcome, <b>{user?.fullName?.split(" ")[0] || "User"}</b>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-xs px-3 py-1.5 border border-gray-600 text-gray-300 rounded-md hover:border-white hover:text-white transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login"
                            className="text-xs px-3 py-1.5 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
                            Login
                        </Link>
                        <Link to="/bookings"
                            className="text-xs px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-200 transition font-semibold">
                            Book Consultation
                        </Link>
                    </>
                )}
            </div>

            {/* Hamburger — mobile only */}
            <button
                className="md:hidden flex flex-col justify-center space-y-1 p-1 bg-transparent border-none outline-none cursor-pointer"
                onClick={() => setSidebarOpen(prev => !prev)}
                aria-label="Toggle sidebar"
            >
                <span className="block w-6 h-0.5 bg-white rounded" />
                <span className="block w-6 h-0.5 bg-white rounded" />
                <span className="block w-6 h-0.5 bg-white rounded" />
            </button>
        </nav>
    );
};

export default Navbar;