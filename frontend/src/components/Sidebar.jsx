import Icon1 from "../assests/Icon-1.png"
import Icon2 from "../assests/Icon-2.png"
import Icon3 from "../assests/Icon-3.png"
import Icon4 from "../assests/Icon-3.png"

const Sidebar = () => {
    return (
        <div className="bg-white w-48 min-h-screen border border-gray-300 border-solid">
            <div className="flex flex-col p-2 border-b border-solid border-gray-300">
                <h5 className="font-semibold text-md">Lawlelulia</h5>
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
                    <p>History</p>
                </div>

                {/* Profile */}
                <div className="flex space-x-4 ml-4 hover:bg-gray-200 p-1 hover:cursor-pointer">
                    <img className="w-4 h-4" src={Icon4} />
                    <p>Profile</p>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;