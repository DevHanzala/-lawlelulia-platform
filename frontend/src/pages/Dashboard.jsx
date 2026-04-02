import { useState, useEffect } from "react";
import {
    FaUsers, FaUserCheck, FaCalendarDay,
    FaClock, FaChevronLeft, FaChevronRight, FaTrash
} from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useSlotStore from "../store/slotStore";
import useAppointmentStore from "../store/appointmentStore";

const formatDateLabel = (d) =>
    new Date(d).toLocaleDateString("en-US", {
        day: "2-digit", month: "long",
        year: "numeric", weekday: "long"
    });

const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit"
    });

const buildISO = (dateObj, timeStr) => {
    const trimmed = timeStr.trim().toUpperCase();
    const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);
    if (!match) return null;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3];
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    const d = new Date(dateObj);
    d.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
};

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
};

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [slotFormError, setSlotFormError] = useState("");
    const [slotFormLoading, setSlotFormLoading] = useState(false);

    const {
        slots, loading: slotsLoading, error: slotsError,
        fetchSlotsByDate, createSlot, deleteSlot, clearError
    } = useSlotStore();

    const { updatingId, updateStatus } = useAppointmentStore();

    useEffect(() => {
        fetchSlotsByDate(date);
    }, [date]);

    const prevDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        setDate(d);
    };

    const nextDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        setDate(d);
    };

    const handleAddSlot = async () => {
        setSlotFormError("");
        if (!startTime || !endTime) {
            setSlotFormError("Both start and end times are required.");
            return;
        }
        const startISO = buildISO(selectedDate, startTime);
        const endISO = buildISO(selectedDate, endTime);
        if (!startISO || !endISO) {
            setSlotFormError("Invalid time format. Use e.g. 08:00 AM or 14:00");
            return;
        }
        setSlotFormLoading(true);
        const res = await createSlot(startISO, endISO);
        setSlotFormLoading(false);
        if (res.success) {
            setShowModal(false);
            setStartTime("");
            setEndTime("");
            if (new Date(selectedDate).toDateString() === new Date(date).toDateString()) {
                fetchSlotsByDate(date);
            }
        } else {
            setSlotFormError(res.error);
        }
    };

    const handleDeleteSlot = async (slotId) => {
        const res = await deleteSlot(slotId);
        if (!res.success) alert(res.error);
    };

    const handleUpdateStatus = async (slot, status) => {
        if (!slot.appointment?._id) {
            alert("Appointment data not found for this slot.");
            return;
        }
        const res = await updateStatus(slot.appointment._id, status);
        if (res.success) {
            fetchSlotsByDate(date);
        } else {
            alert(res.error);
        }
    };

    const bookedSlots = slots.filter((s) => s.isBooked);
    const availableSlots = slots.filter((s) => !s.isBooked);

    const stats = [
        { label: "Total Slots Today", value: slots.length, icon: <FaUsers className="text-3xl text-white opacity-60" /> },
        { label: "Available Slots", value: availableSlots.length, icon: <FaUserCheck className="text-3xl text-green-400" /> },
        { label: "Booked Slots", value: bookedSlots.length, icon: <FaCalendarDay className="text-3xl text-purple-400" /> },
        { label: "Pending Reviews", value: bookedSlots.filter(s => s.appointment?.status === "pending" || !s.appointment?.status).length, icon: <FaClock className="text-3xl text-red-400" /> },
    ];

    return (
        <>
            {/* Add Slot Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-[#0A0F1C]">Add New Slot</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Pick a date and set the time</p>
                            </div>
                            <button
                                onClick={() => { setShowModal(false); setSlotFormError(""); clearError(); }}
                                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold transition"
                            >×</button>
                        </div>

                        <div className="border border-gray-100 rounded-xl p-2">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(d) => d && setSelectedDate(d)}
                                disabled={{ before: new Date() }}
                                className="mx-auto"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Start Time (e.g., 08:00 AM)"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="End Time (e.g., 09:00 AM)"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full p-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent"
                            />
                        </div>

                        {slotFormError && (
                            <p className="text-red-500 text-xs bg-red-50 border border-red-100 p-2.5 rounded-lg">{slotFormError}</p>
                        )}

                        <button
                            onClick={handleAddSlot}
                            disabled={slotFormLoading}
                            className="w-full bg-[#0A0F1C] text-white text-sm font-medium rounded-lg px-4 py-2.5 hover:bg-gray-800 transition disabled:opacity-60"
                        >
                            {slotFormLoading ? "Creating..." : "+ Add Slot"}
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="p-4 md:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((card, i) => (
                    <div key={i} className="bg-[#0A0F1C] text-white rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-sm">
                        <div>
                            <h5 className="text-xl md:text-2xl font-bold">{card.value}</h5>
                            <p className="text-gray-400 text-xs md:text-sm mt-0.5">{card.label}</p>
                        </div>
                        {card.icon}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-6 pb-6">

                {/* Booked Appointments */}
                <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h5 className="text-base font-bold text-[#0A0F1C]">Booked Appointments</h5>
                            <p className="text-xs text-gray-400 mt-0.5">{formatDateLabel(date)}</p>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                            {bookedSlots.length} booked
                        </span>
                    </div>

                    {slotsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="w-6 h-6 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : slotsError ? (
                        <p className="text-red-500 text-sm text-center py-8">{slotsError}</p>
                    ) : bookedSlots.length === 0 ? (
                        <div className="text-center py-12 text-gray-300">
                            <FaCalendarDay className="text-5xl mx-auto mb-3" />
                            <p className="text-sm text-gray-400">No booked appointments for this day</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {bookedSlots.map((slot) => (
                                <div key={slot._id}
                                    className="bg-gray-50 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 hover:border-gray-200 transition">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-[#0A0F1C]">
                                            {formatTime(slot.startTime)} — {formatTime(slot.endTime)}
                                        </p>
                                        {slot.appointment?.user?.fullName && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                👤 {slot.appointment.user.fullName}
                                            </p>
                                        )}
                                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block font-medium ${
                                            statusStyles[slot.appointment?.status || "pending"]
                                        }`}>
                                            {slot.appointment?.status || "pending"}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => handleUpdateStatus(slot, "confirmed")}
                                            disabled={updatingId === slot.appointment?._id || slot.appointment?.status === "confirmed"}
                                            className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-40 transition"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(slot, "cancelled")}
                                            disabled={updatingId === slot.appointment?._id || slot.appointment?.status === "cancelled"}
                                            className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-40 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Availability Panel */}
                <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-base font-bold text-[#0A0F1C]">Availability</h5>
                        <button
                            onClick={() => { setShowModal(true); setSlotFormError(""); }}
                            className="bg-[#0A0F1C] text-xs font-medium rounded-lg px-3 py-1.5 text-white hover:bg-gray-800 transition"
                        >
                            + Add Slot
                        </button>
                    </div>

                    {/* Date Navigator */}
                    <div className="flex justify-between items-center mb-4 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                        <button onClick={prevDay} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#0A0F1C] transition">
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <p className="text-xs font-medium text-gray-600 text-center">
                            {formatDateLabel(date)}
                        </p>
                        <button onClick={nextDay} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#0A0F1C] transition">
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>

                    {/* Slot list */}
                    {slotsLoading ? (
                        <div className="flex justify-center py-6">
                            <div className="w-5 h-5 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : slots.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-8">No slots for this day</p>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                            {slots.map((slot) => (
                                <div key={slot._id}
                                    className={`flex justify-between items-center rounded-xl p-2.5 border ${
                                        slot.isBooked
                                            ? "bg-gray-50 border-gray-200"
                                            : "bg-green-50 border-green-100"
                                    }`}>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">
                                            {formatTime(slot.startTime)} — {formatTime(slot.endTime)}
                                        </p>
                                        <span className={`text-xs font-medium ${slot.isBooked ? "text-gray-400" : "text-green-600"}`}>
                                            {slot.isBooked ? "● Booked" : "● Available"}
                                        </span>
                                    </div>
                                    {!slot.isBooked && (
                                        <button
                                            onClick={() => handleDeleteSlot(slot._id)}
                                            className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;