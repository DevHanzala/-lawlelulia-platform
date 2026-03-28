import { FaUsers, FaUserCheck, FaCalendarDay, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AppointmentItem from "../components/AppointmentItem";
import { useState } from "react";
import TimeSlotItem from "../components/TimeSlotItem";
import formatDate from "../utils/formatDate";
import NewSlot from "../components/NewSlot";

const Dashboard = () => {

    const [date, setDate] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [createSlot, setCreateSlot] = useState(false);

    const prevDay = () => setDate(new Date(date.setDate(date.getDate() - 1)));
    const nextDay = () => setDate(new Date(date.setDate(date.getDate() + 1)));

    return (
        <>

            {/* Day Picker + Time Input */}
            {createSlot ? <NewSlot slots={slots} setSlots={setSlots} setCreateSlot={setCreateSlot} /> : null}


            <div className="p-6 flex flex-wrap gap-6 justify-between">
                {/* Total Clients */}
                <div className="bg-[#0A0F1C] text-white shadow-sm rounded-2xl p-5 flex items-center justify-between w-full sm:w-[48%] lg:w-[23%]">
                    <div>
                        <h5 className="text-2xl font-bold text-white">120</h5>
                        <p className="text-gray-400">Total Clients</p>
                    </div>
                    <FaUsers className="text-blue-400 text-3xl" />
                </div>

                {/* Active Clients */}
                <div className="bg-[#0A0F1C] text-white shadow-sm rounded-2xl p-5 flex items-center justify-between w-full sm:w-[48%] lg:w-[23%]">
                    <div>
                        <h5 className="text-2xl font-bold text-white">42</h5>
                        <p className="text-gray-400">Active Clients</p>
                    </div>
                    <FaUserCheck className="text-green-400 text-3xl" />
                </div>

                {/* Today's Appointments */}
                <div className="bg-[#0A0F1C] text-white shadow-sm rounded-2xl p-5 flex items-center justify-between w-full sm:w-[48%] lg:w-[23%]">
                    <div>
                        <h5 className="text-2xl font-bold text-white">8</h5>
                        <p className="text-gray-400">Today's Appointments</p>
                    </div>
                    <FaCalendarDay className="text-purple-400 text-3xl" />
                </div>

                {/* Pending Requests */}
                <div className="bg-[#0A0F1C] text-white shadow-sm rounded-2xl p-5 flex items-center justify-between w-full sm:w-[48%] lg:w-[23%]">
                    <div>
                        <h5 className="text-2xl font-bold text-white">5</h5>
                        <p className="text-gray-400">Pending Requests</p>
                    </div>
                    <FaClock className="text-red-400 text-3xl" />
                </div>
            </div>

            <div className="flex p-4">

                {/* Appointment List */}
                <div className="w-2/3 p-2 rounded-lg shadow-sm">
                    <h5 className="text-lg font-medium mb-4">Today's Schedule</h5>
                    <div className="flex flex-col items-center">
                        <AppointmentItem time={"8:00 AM - 9:00 AM"} status={"pending"} name={"John Doe"} />
                        <AppointmentItem time={"8:00 AM - 9:00 AM"} status={"pending"} name={"John Doe"} />
                        <AppointmentItem time={"8:00 AM - 9:00 AM"} status={"confirmed"} name={"John Doe"} />
                        <AppointmentItem time={"8:00 AM - 9:00 AM"} status={"cancelled"} name={"John Doe"} />

                        <button className="bg-[#0A0F1C] text-sm  rounded-md px-3 py-1 text-white mt-4">View All</button>
                    </div>
                </div>

                {/* Availability Panel */}
                <div className="w-1/3 p-2 rounded-lg shadow-sm">
                    <div className="flex justify-between">
                        <h5 className="text-md font-medium">Availability</h5>
                        <button
                            className="bg-[#0A0F1C] text-sm  rounded-md px-3 py-1 text-white "
                            onClick={() => setCreateSlot(true)}
                        >+ Add Slot</button>
                    </div>

                    {/* Date Navigator */}
                    <div className="w-3/4 flex justify-between items-center mb-4 mt-4">
                        <button
                            onClick={prevDay}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            <FaChevronLeft />
                        </button>
                        <p className="text-sm font-medium text-gray-500">{formatDate(date)}</p>
                        <button
                            onClick={nextDay}
                            className="text-xs text-gray-500 hover:text-gray-700"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    {/* Slots */}
                    <TimeSlotItem time={"8:00 AM - 10:00AM"} />
                    <TimeSlotItem time={"8:00 AM - 10:00AM"} />
                    <TimeSlotItem time={"8:00 AM - 10:00AM"} />
                </div>
            </div>

        </>
    );
};

export default Dashboard;