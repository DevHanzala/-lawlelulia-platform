import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"
import { Link } from "react-router-dom"; // Optional if using React Router

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            {/* Sidebar */}
            <div
                className={`bg-white w-48 min-h-screen border border-gray-300 border-solid
          fixed top-0 left-0 z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block`}>

                {/* Platform name */}
                <div className="flex flex-col p-2 border-b border-solid border-gray-300">
                    <div className="flex justify-between">
                        <h5 className="font-semibold text-md">Cocolaw.ai</h5>
                        {sidebarOpen ? (
                            <button
                                className="text-black font-bold text-lg"
                                onClick={() => setSidebarOpen(false)}
                            >
                                ×
                            </button>
                        ) : null}
                    </div>
                    <p className="text-gray-500 text-xs">Law Management</p>
                </div>

                {/* Links */}
                <div className="flex flex-col mt-4 font-semibold text-sm space-y-4">

                    {/* Dashboard */}
                    <Link to="/" className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                        <img className="w-4 h-4" src={Icon1} />
                        <p>Dashboard</p>
                    </Link>

                    {/* Appointments */}
                    <Link to="/appointments" className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                        <img className="w-4 h-4" src={Icon2} />
                        <p>Appointments</p>
                    </Link>

                    {/* Bookings */}
                    <Link to="/bookings" className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                        <img className="w-4 h-4" src={Icon3} />
                        <p>Bookings</p>
                    </Link>

                    {/* Profile */}
                    <Link to="/profile" className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                        <img className="w-4 h-4" src={Icon4} />
                        <p>Profile</p>
                    </Link>

                    {/* About us (only for small screens) */}
                    <Link to="/aboutus" className="flex md:hidden space-x-4 ml-4 hover:bg-gray-200 p-1 cursor-pointer">
                        <img className="w-4 h-4" src={Icon4} />
                        <p>About Us</p>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Sidebar;