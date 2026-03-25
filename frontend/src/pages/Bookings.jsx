import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Example reserved dates
const reservedDays = [
    new Date(2026, 2, 17),
    new Date(2026, 2, 20),
];

// Example available dates
const availableDays = [
    new Date(2026, 2, 19),
    new Date(2026, 2, 21),
];

// available time slots
const timeSlots = [
    ["08:00", "AM"],
    ["09:00", "PM"],
    ["10:00", "AM"],
    ["11:00", "PM"]
];

const Bookings = () => {
    const [selected, setSelected] = useState();
    const [selectedTime, setSelectedTime] = useState(null);

    return (
        <>
            {/* Headings + Text */}
            <div>
                <h5 className="text-lg font-medium">Bookings</h5>
                <p className="text-gray-500 text-sm">
                    Steering your confidence - Lock your spot
                </p>
            </div>

            {/* Spots */}
            <div className="flex mt-10 justify-around">
                {/* Reserved */}
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-black rounded-full"></div>
                    <p className="text-sm font-medium">Reserved Spots</p>
                </div>

                {/* Available */}
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <p className="text-sm font-medium">Available Spots</p>
                </div>
            </div>

            {/* Appointment Date + Day */}
            <div className="md:flex justify-around">

                {/* Appointment date */}
                <div className="w-full flex flex-col space-y-1 justify-center items-center mt-6 md:w-1/2">
                    <div className="p-4 text-xs font-medium text-gray-500 border border-gray-400 rounded-md">
                        Select your preferred appointment date
                    </div>

                    {/* Calendar wrapper */}
                    <div className="flex justify-center items-center  rounded">
                        <div className="transform scale-75 origin-center">
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                                modifiers={{
                                    reserved: reservedDays,
                                    available: availableDays,
                                }}
                                modifiersClassNames={{
                                    reserved: "bg-black text-white rounded-full",
                                    available: "bg-gray-300 text-black rounded-full",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Appointment Day */}
                <div className="w-full flex flex-col space-y-1 items-center mt-6 md:w-1/2">
                    <div className="p-4 text-xs font-medium text-gray-500 border border-gray-400 rounded-md">
                        Select your preferred appointment date
                    </div>

                    <div className="grid grid-cols-2 gap-16 mt-6">

                        {timeSlots.map((time,idx) => {
                            const isSelected = selectedTime === time[0];
                            return <div key={idx}>
                                <p className="text-xs font-medium">Spot timings</p>
                                <div className="flex space-x-4">
                                    <h5 className="text-2xl tracking-widest ml-10">{time[0]}</h5>
                                    <div className="flex flex-col">
                                        <p className={`text-xs p-1 rounded font-medium ${time[1] === "AM" ? "bg-gray-200" : "bg-white"}`}>
                                            AM
                                        </p>

                                        <p className={`text-xs p-1 rounded font-medium ${time[1] === "PM" ? "bg-gray-200" : "bg-white"}`}>
                                            PM
                                        </p>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div>
                                    {isSelected ? (
                                        <button
                                            onClick={() => setSelectedTime(null)}
                                            className="text-xs px-2 py-1 bg-gray-300 rounded"
                                        >
                                            Unselect
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedTime(time[0])}
                                            className="text-xs px-2 py-1 bg-black text-white rounded"
                                        >
                                            Select
                                        </button>
                                    )}
                                </div>

                            </div>
                        })}

                    </div>
                </div>
            </div>

            {/* Special Request + Appointment Button */}
            <div className="flex justify-between items-center mt-10 w-full">
                {/* Special Request */}
                <input
                    type="text"
                    placeholder="Special Request (Optional)"
                    className="w-3/5 md:w-1/3 text-xs p-4 border-2 border-gray-300 rounded-md outline-none text-sm "
                />
                {/* Appointment Button */}
                <button
                    className="text-xs px-4 py-2 bg-black text-white rounded-md"
                >
                    Book Appointment
                </button>
            </div>
        </>
    );
};

export default Bookings;