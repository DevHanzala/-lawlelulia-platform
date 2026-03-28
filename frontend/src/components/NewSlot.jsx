import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDate from "../utils/formatDate";

const NewSlot = ({ slots, setSlots, setCreateSlot }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // Add new slot
    const addSlot = () => {
        if (!startTime || !endTime) return alert("Please enter both start and end times");

        const day = formatDate(selectedDate);
        const newSlot = `${day} - ${startTime} to ${endTime}`;
        setSlots([...slots, newSlot]);

        // Clear inputs after adding
        setStartTime("");
        setEndTime("");
        setCreateSlot(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg w-100 flex flex-col items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Add New Slot
                </h3>

                {/* Day Picker */}
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-lg"
                />

                {/* Time Inputs */}
                <div className="">
                    <input
                        type="text"
                        placeholder="Start Time (e.g., 08:00 AM)"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                    <input
                        type="text"
                        placeholder="End Time (e.g., 09:00 AM)"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full p-2 rounded border border-gray-300 mt-2"
                    />
                </div>

                <button
                    onClick={addSlot}
                    className="w-full bg-[#0A0F1C] text-white text-sm rounded-md px-3 py-2 hover:bg-black/90 transition"
                >
                    + Add Slot
                </button>
            </div>
        </div>
    );
};

export default NewSlot;