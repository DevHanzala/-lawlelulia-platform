import Icon1 from "../assests/Icon-1.png";
import Icon2 from "../assests/Icon-2.png";
import Icon3 from "../assests/Icon-3.png";
import Icon4 from "../assests/Icon-3.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect, useRef } from "react";
import logo from "../assests/logo.png";

// Must match the navbar height exactly (py-3 + content = ~48px)
const NAVBAR_H = 48;

const Sidebar = ({ sidebarOpen, setSidebarOpen, hideOnDesktop }) => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";
    const navRef = useRef(null);

    // Auto-close on route change
    useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

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
            {/* Dark overlay — only on mobile when open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={handleClose}
                />
            )}

            {/*
             * Mobile:  fixed, starts exactly below the sticky navbar (top: NAVBAR_H px),
             *          height = 100dvh - navbar so the logout is always visible.
             * Desktop: sticky column; if hideOnDesktop → md:hidden.
             */}
            <div
                ref={navRef}
                style={{
                    // Applied on mobile only (overridden by Tailwind md:* classes on desktop)
                    top: `${NAVBAR_H}px`,
                    height: `calc(100dvh - ${NAVBAR_H}px)`,
                }}
                className={`
                    bg-white border-r border-gray-200
                    flex flex-col
                    fixed left-0 z-50
                    transform transition-transform duration-300 ease-in-out
                    w-72 sm:w-72

                    /* Slide in/out on mobile */
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

                    /* Desktop behaviour */
                    ${hideOnDesktop
                        ? "md:hidden"
                        : "md:sticky md:top-0 md:translate-x-0 md:h-screen md:w-56"
                    }
                `}
            >
                {/* Brand */}
                <div className="flex flex-col p-3 border-b border-gray-200 shrink-0">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 shrink-0">
                            <img
                                src={logo}
                                alt="Cocolaw.ai Logo"
                                className="w-32 h-24 object-contain shrink-0"
                            />
                        </Link>
                        <button
                            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold text-lg hover:bg-gray-200 transition"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">Legal Services Platform</p>
                    {authed && (
                        <span className="mt-1.5 text-xs px-2 py-0.5 rounded-full w-fit font-semibold bg-[#0A0F1C] text-white">
                            {isAdmin ? "Admin" : "Client"}
                        </span>
                    )}
                </div>

                {/* Nav Links — flex-1 + overflow-y-auto so it never pushes logout off screen */}
                <nav className="flex flex-col mt-3 text-sm space-y-0.5 flex-1 overflow-y-auto px-3 pb-2">

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 pt-1 pb-0.5">Explore</p>
                    <Link to="/" onClick={handleClose} className={linkClass("/")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>Home</span>
                    </Link>
                    <Link to="/practice-areas" onClick={handleClose} className={linkClass("/practice-areas")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>Practice Areas</span>
                    </Link>
                    <Link to="/features" onClick={handleClose} className={linkClass("/features")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>Features</span>
                    </Link>
                    <Link to="/aboutus" onClick={handleClose} className={linkClass("/aboutus")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>About Us</span>
                    </Link>
                    <Link to="/contact" onClick={handleClose} className={linkClass("/contact")}>
                        <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>Contact</span>
                    </Link>

                    {/* Admin */}
                    {isAdmin && (
                        <>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 pt-3 pb-0.5">Admin</p>
                            <Link to="/dashboard" onClick={handleClose} className={linkClass("/dashboard")}>
                                <img className="w-4 h-4 opacity-70" src={Icon1} alt="" /><span>Dashboard</span>
                            </Link>
                            <Link to="/appointments" onClick={handleClose} className={linkClass("/appointments")}>
                                <img className="w-4 h-4 opacity-70" src={Icon2} alt="" /><span>Appointments</span>
                            </Link>
                        </>
                    )}

                    {/* Client */}
                    {authed && !isAdmin && (
                        <>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 pt-3 pb-0.5">My Account</p>
                            <Link to="/client-dashboard" onClick={handleClose} className={linkClass("/client-dashboard")}>
                                <img className="w-4 h-4 opacity-70" src={Icon1} alt="" /><span>Dashboard</span>
                            </Link>
                            <Link to="/bookings" onClick={handleClose} className={linkClass("/bookings")}>
                                <img className="w-4 h-4 opacity-70" src={Icon3} alt="" /><span>Bookings</span>
                            </Link>
                        </>
                    )}

                    {authed && (
                        <Link to="/profile" onClick={handleClose} className={linkClass("/profile")}>
                            <img className="w-4 h-4 opacity-70" src={Icon4} alt="" /><span>Profile</span>
                        </Link>
                    )}
                </nav>

                {/* Bottom auth — shrink-0 ensures it never collapses */}
                <div className="border-t border-gray-200 p-3 shrink-0 bg-white">
                    {authed ? (
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2 px-1 py-1">
                                <div className="w-9 h-9 rounded-full bg-[#0A0F1C] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {user?.fullName?.charAt(0)?.toUpperCase()}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs font-bold text-gray-800 truncate">{user?.fullName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition font-semibold text-left"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Link to="/login" onClick={handleClose}
                                className="w-full text-xs px-3 py-2.5 border border-[#0A0F1C] text-[#0A0F1C] rounded-lg text-center font-semibold hover:bg-gray-50 transition">
                                Login
                            </Link>
                            <Link to="/bookings" onClick={handleClose}
                                className="w-full text-xs px-3 py-2.5 bg-[#0A0F1C] text-white rounded-lg text-center font-semibold hover:bg-gray-800 transition">
                                Book Consultation
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;