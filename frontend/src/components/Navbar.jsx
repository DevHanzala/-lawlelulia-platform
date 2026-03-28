import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const authed = isAuthenticated();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0A0F1C] flex p-2 justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center font-semibold text-2xl text-[#0A0F1C]">C</div>
        <div className="text-white mt-1">ocolaw.ai</div>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex space-x-6 text-white text-xs font-semibold">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/appointments" className="hover:text-gray-300">Appointments</Link>
        <Link to="/bookings" className="hover:text-gray-300">Bookings</Link>
        <Link to="/services" className="hover:text-gray-300">Services</Link>
        <Link to="/aboutus" className="hover:text-gray-300">About Us</Link>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center space-x-3">
        {authed ? (
          <>
            <span className="text-white text-sm">
              Welcome, <b>{user?.fullName?.split(" ")[0] || "User"}</b>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 border border-gray-500 text-gray-300 rounded-md hover:border-white hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs px-3 py-1.5 border border-white text-white rounded-md hover:bg-white hover:text-black transition">
              Login
            </Link>
            <Link to="/signup" className="text-xs px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-200 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Hamburger (mobile) */}
      <div className="md:hidden flex flex-col space-y-1 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </div>
    </nav>
  );
};

export default Navbar;