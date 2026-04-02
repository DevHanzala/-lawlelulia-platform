import { useState, useEffect } from "react";
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

const Appointments = () => {
    const [filterStatus, setFilterStatus] = useState("all");

    const {
        slots, loading: slotsLoading, error: slotsError,
        fetchSlotsByDate
    } = useSlotStore();

    const { updatingId, updateStatus } = useAppointmentStore();

    useEffect(() => {
        fetchSlotsByDate(new Date());
    }, []);

    const handleStatusUpdate = async (slot, status) => {
        if (!slot.appointment?._id) {
            alert("No appointment found for this slot.");
            return;
        }
        const res = await updateStatus(slot.appointment._id, status);
        if (res.success) {
            fetchSlotsByDate(new Date());
        } else {
            alert(res.error);
        }
    };

    const appointmentSlots = slots.filter(s => s.appointment !== null);

    const filtered = filterStatus === "all"
        ? appointmentSlots
        : appointmentSlots.filter(s =>
            (s.appointment?.status || "pending") === filterStatus
        );

    const pendingCount = appointmentSlots.filter(s =>
        !s.appointment?.status || s.appointment?.status === "pending"
    ).length;
    const confirmedCount = appointmentSlots.filter(s =>
        s.appointment?.status === "confirmed"
    ).length;
    const cancelledCount = appointmentSlots.filter(s =>
        s.appointment?.status === "cancelled"
    ).length;

    const tabCounts = {
        all: appointmentSlots.length,
        pending: pendingCount,
        confirmed: confirmedCount,
        cancelled: cancelledCount,
    };

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-5">
                <h5 className="font-bold text-xl text-[#0A0F1C]">Appointment Management</h5>
                <p className="text-sm text-gray-400 mt-0.5">
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long", day: "2-digit", month: "long", year: "numeric"
                    })}
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
                {["all", "pending", "confirmed", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition capitalize ${
                            filterStatus === status
                                ? "bg-[#0A0F1C] text-white border-[#0A0F1C]"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                        }`}
                    >
                        {status}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                            filterStatus === status ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                            {tabCounts[status]}
                        </span>
                    </button>
                ))}
            </div>

            {slotsLoading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="w-8 h-8 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : slotsError ? (
                <div className="text-center py-12">
                    <p className="text-red-500 text-sm">{slotsError}</p>
                    <button onClick={() => fetchSlotsByDate(new Date())}
                        className="mt-3 text-xs px-4 py-2 bg-[#0A0F1C] text-white rounded-lg">
                        Retry
                    </button>
                </div>
            ) : (
                <div className="w-full flex flex-col md:flex-row gap-4">

                    {/* Appointments List */}
                    <div className="w-full md:w-3/5 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                            <h5 className="text-sm font-bold text-[#0A0F1C]">Today's Appointments</h5>
                            <span className="text-xs bg-[#0A0F1C] text-white px-2.5 py-1 rounded-full font-medium">
                                {filtered.length} total
                            </span>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-12 text-gray-300">
                                <div className="text-4xl mb-3">📅</div>
                                <p className="text-sm text-gray-400">
                                    No {filterStatus !== "all" ? filterStatus : ""} appointments found
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                                {filtered.map((slot) => (
                                    <div key={slot._id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-100 hover:border-gray-200 transition">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-[#0A0F1C]">
                                                {formatTime(slot.startTime)} — {formatTime(slot.endTime)}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {formatDateShort(slot.startTime)}
                                            </p>
                                            {slot.appointment?.user?.fullName && (
                                                <p className="text-xs text-gray-500 mt-1 font-medium">
                                                    👤 {slot.appointment.user.fullName}
                                                </p>
                                            )}
                                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block font-medium border ${
                                                statusStyles[slot.appointment?.status || "pending"]
                                            }`}>
                                                {slot.appointment?.status || "pending"}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => handleStatusUpdate(slot, "confirmed")}
                                                disabled={
                                                    updatingId === slot.appointment?._id ||
                                                    slot.appointment?.status === "confirmed"
                                                }
                                                className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-40 transition"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(slot, "cancelled")}
                                                disabled={
                                                    updatingId === slot.appointment?._id ||
                                                    slot.appointment?.status === "cancelled"
                                                }
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

                    {/* Summary Panel */}
                    <div className="w-full md:w-2/5 flex flex-col gap-3">

                        {/* Summary Cards */}
                        {[
                            { label: "Total Appointments", value: appointmentSlots.length, bg: "bg-[#0A0F1C]", text: "text-white", sub: "text-gray-400" },
                            { label: "Pending", value: pendingCount, bg: "bg-yellow-50", text: "text-yellow-700", sub: "text-yellow-400", border: "border border-yellow-100" },
                            { label: "Confirmed", value: confirmedCount, bg: "bg-green-50", text: "text-green-700", sub: "text-green-400", border: "border border-green-100" },
                            { label: "Cancelled", value: cancelledCount, bg: "bg-red-50", text: "text-red-600", sub: "text-red-300", border: "border border-red-100" },
                        ].map((item, i) => (
                            <div key={i} className={`flex justify-between items-center p-4 rounded-2xl shadow-sm ${item.bg} ${item.border || ""}`}>
                                <div>
                                    <p className={`text-xs font-medium ${item.sub || "text-gray-400"}`}>{item.label}</p>
                                    <p className={`text-2xl font-bold mt-0.5 ${item.text}`}>{item.value}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    i === 0 ? "bg-white/10" : "bg-white"
                                }`}>
                                    <span className={`text-lg font-black ${item.text}`}>{item.value}</span>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => fetchSlotsByDate(new Date())}
                            className="text-xs text-gray-400 hover:text-[#0A0F1C] underline text-center transition py-1"
                        >
                            ↻ Refresh data
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;