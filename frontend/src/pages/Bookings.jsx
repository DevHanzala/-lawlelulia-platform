import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useSlotStore from "../store/slotStore";
import useAppointmentStore from "../store/appointmentStore";

const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const formatDateShort = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
        day: "2-digit", month: "short", year: "numeric"
    });

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-600 border-red-200",
};

const Bookings = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [specialRequest, setSpecialRequest] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState("");
    const [bookingError, setBookingError] = useState("");

    const {
        slots, loading: slotsLoading,
        fetchSlotsByDate
    } = useSlotStore();

    const {
        history, future, loading: apptLoading,
        fetchAllUserAppointments, bookAppointment
    } = useAppointmentStore();

    useEffect(() => {
        fetchSlotsByDate(selectedDate);
        setSelectedSlotId(null);
        setBookingSuccess("");
        setBookingError("");
    }, [selectedDate]);

    useEffect(() => {
        fetchAllUserAppointments();
    }, []);

    const availableSlots = slots.filter((s) => !s.isBooked);

    const handleBook = async () => {
        if (!selectedSlotId) {
            setBookingError("Please select a time slot.");
            return;
        }
        setBookingError("");
        setBookingSuccess("");
        setBookingLoading(true);
        const res = await bookAppointment(selectedSlotId);
        if (res.success) {
            setBookingSuccess("Appointment booked! Pending confirmation from admin.");
            setSelectedSlotId(null);
            setSpecialRequest("");
            fetchSlotsByDate(selectedDate);
            fetchAllUserAppointments();
        } else {
            setBookingError(res.error);
        }
        setBookingLoading(false);
    };

    return (
        <div className="p-4 md:p-6">

            {/* Header */}
            <div className="mb-5">
                <h5 className="text-xl font-bold text-[#0A0F1C]">Bookings</h5>
                <p className="text-gray-400 text-sm mt-0.5">Steering your confidence  Lock your spot</p>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mb-5 flex-wrap">
                {[
                    { color: "bg-[#0A0F1C]", label: "Selected" },
                    { color: "bg-green-200", label: "Available" },
                    { color: "bg-gray-200", label: "No Slots" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Calendar + Slots */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">

                {/* Calendar */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center">
                    <p className="text-xs font-semibold text-gray-400 mb-3 self-start">
                        SELECT DATE
                    </p>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(d) => d && setSelectedDate(d)}
                        disabled={{ before: new Date() }}
                        modifiersClassNames={{
                            selected: "bg-[#0A0F1C] text-white rounded-full",
                            today: "font-bold text-[#0A0F1C]",
                        }}
                    />
                </div>

                {/* Available Slots */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-1">AVAILABLE SLOTS</p>
                    <p className="text-sm font-medium text-[#0A0F1C] mb-4">
                        {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long", day: "2-digit", month: "long"
                        })}
                    </p>

                    {slotsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="w-6 h-6 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : availableSlots.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="text-4xl mb-2">🗓️</div>
                            <p className="text-sm text-gray-400">No available slots for this date.</p>
                            <p className="text-xs text-gray-300 mt-1">Try selecting a different date.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                            {availableSlots.map((slot) => {
                                const isSelected = selectedSlotId === slot._id;
                                return (
                                    <button
                                        key={slot._id}
                                        onClick={() => setSelectedSlotId(isSelected ? null : slot._id)}
                                        className={`p-3 rounded-xl border text-left transition ${
                                            isSelected
                                                ? "bg-[#0A0F1C] border-[#0A0F1C] shadow-md"
                                                : "bg-green-50 border-green-100 hover:border-green-300"
                                        }`}
                                    >
                                        <p className={`text-sm font-bold ${isSelected ? "text-white" : "text-[#0A0F1C]"}`}>
                                            {formatTime(slot.startTime)}
                                        </p>
                                        <p className={`text-xs mt-0.5 ${isSelected ? "text-gray-300" : "text-gray-400"}`}>
                                            to {formatTime(slot.endTime)}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Feedback messages */}
            {bookingError && (
                <div className="mb-3 text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-xl">
                    ⚠️ {bookingError}
                </div>
            )}
            {bookingSuccess && (
                <div className="mb-3 text-green-700 text-xs bg-green-50 border border-green-100 p-3 rounded-xl">
                    ✅ {bookingSuccess}
                </div>
            )}

            {/* Special Request + Book */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Special Request (Optional)"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition"
                />
                <button
                    onClick={handleBook}
                    disabled={bookingLoading || !selectedSlotId}
                    className="sm:w-48 text-sm font-medium px-6 py-3 bg-[#0A0F1C] text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {bookingLoading ? "Booking..." : "Book Appointment"}
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-6" />

            {/* My Appointments */}
            <div>
                <h5 className="text-base font-bold text-[#0A0F1C] mb-4">My Appointments</h5>

                {apptLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Upcoming */}
                        <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div>
                                    <h6 className="font-bold text-sm text-[#0A0F1C]">Upcoming</h6>
                                    <p className="text-xs text-gray-400">Your scheduled future sessions</p>
                                </div>
                                <span className="text-xs bg-[#0A0F1C] text-white px-2 py-0.5 rounded-full font-medium">
                                    {future.length}
                                </span>
                            </div>
                            {future.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2">📆</div>
                                    <p className="text-xs text-gray-400">No upcoming appointments</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                                    {future.map((appt) => (
                                        <div key={appt._id}
                                            className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                            <div>
                                                <p className="text-sm font-bold text-[#0A0F1C]">
                                                    {formatTime(appt.slot.startTime)} — {formatTime(appt.slot.endTime)}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {formatDateShort(appt.slot.startTime)}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                                statusStyles[appt.status] || "bg-gray-100 text-gray-600"
                                            }`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* History */}
                        <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div>
                                    <h6 className="font-bold text-sm text-[#0A0F1C]">History</h6>
                                    <p className="text-xs text-gray-400">Your past sessions</p>
                                </div>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                    {history.length}
                                </span>
                            </div>
                            {history.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-3xl mb-2">🗂️</div>
                                    <p className="text-xs text-gray-400">No past appointments</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                                    {history.map((appt) => (
                                        <div key={appt._id}
                                            className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                            <div>
                                                <p className="text-sm font-bold text-[#0A0F1C]">
                                                    {formatTime(appt.slot.startTime)} — {formatTime(appt.slot.endTime)}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {formatDateShort(appt.slot.startTime)}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                                statusStyles[appt.status] || "bg-gray-100 text-gray-600"
                                            }`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookings;