import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (

        // Hiding sidebar on small screen displaying it on Hamburger icon click and preventing screen translate
        <div
            className={`${!sidebarOpen ? "hidden " : ""} md:block bg-white w-48 min-h-screen border border-gray-300 border-solid
        fixed md:relative z-50 top-0 left-0 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            }>

            {/* Platform name */}
            <div className="flex flex-col p-2 border-b border-solid border-gray-300">
                <div className="flex justify-between">
                    <h5 className="font-semibold text-md">Lawlelulia</h5>

                    {/* Display cross sign to off sidebar on small screens */}
                    {sidebarOpen ? <button
                        className="text-black font-bold text-lg"
                        onClick={() => setSidebarOpen(false)}>
                        ×
                    </button> : null}
                </div>
                <p className="text-gray-500 text-xs">Law Management</p>
            </div>

            {/* Links */}
            <div className="flex flex-col mt-4 font-semibold text-sm space-y-4 ">

                {/* Dashboard */}
                <div className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                    <img className="w-4 h-4" src={Icon1} />
                    <p>Dashboard</p>
                </div>

                {/* Appointments */}
                <div className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                    <img className="w-4 h-4" src={Icon2} />
                    <p>Appointments</p>
                </div>

                {/* History */}
                <div className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                    <img className="w-4 h-4" src={Icon3} />
                    <p>Bookings</p>
                </div>

                {/* Profile */}
                <div className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                    <img className="w-4 h-4" src={Icon4} />
                    <p>Profile</p>
                </div>

                {/* About us (only for small screens) */}
                <div className="flex md:hidden space-x-4 ml-4 hover:bg-gray-200 p-1 cursor-pointer">
                    <img className="w-4 h-4" src={Icon4} />
                    <p>About Us</p>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;