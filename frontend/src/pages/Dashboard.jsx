import { useState, useEffect, useCallback } from "react";
import {
    FaUsers, FaUserCheck, FaCalendarDay, FaClock,
    FaChevronLeft, FaChevronRight, FaSync
} from "react-icons/fa";
import useSlotStore from "../store/slotStore";
import useAppointmentStore from "../store/appointmentStore";
import useCaseStore from "../store/caseStore";
import CasesCard from "../components/CasesCard";
import usePolling from "../hooks/usePolling";
import { StatCardSk, BookedSlotSk, AvailSlotSk } from "../components/Skeleton";

const formatDateLabel = (d) =>
    new Date(d).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric", weekday: "long" });

const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const statusStyles = {
    pending:   "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
};

// Days off label helper
const getDayLabel = (date) => {
    const day = new Date(date).getDay();
    if (day === 0) return "Sunday — Office Closed";
    return null;
};

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
            }),
            { threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

const Dashboard = () => {
    useReveal();
    const [date, setDate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { slots, loading: slotsLoading, error: slotsError, fetchSlotsByDate } = useSlotStore();
    const { updatingId, updateStatus } = useAppointmentStore();
    const { cases, getCasesWithAppointments } = useCaseStore();

    const refreshDashboard = useCallback(() => {
        fetchSlotsByDate(date);
        getCasesWithAppointments();
    }, [date]);

    usePolling(refreshDashboard, 30000);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await Promise.all([fetchSlotsByDate(date), getCasesWithAppointments()]);
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const prevDay = () => setDate(prev => { const d = new Date(prev); d.setDate(d.getDate() - 1); return d; });
    const nextDay = () => setDate(prev => { const d = new Date(prev); d.setDate(d.getDate() + 1); return d; });

    const handleUpdateStatus = async (slot, status) => {
        if (!slot.appointment?._id) { alert("Appointment data not found."); return; }
        const res = await updateStatus(slot.appointment._id, status);
        if (res.success) fetchSlotsByDate(date);
        else alert(res.error);
    };

    const bookedSlots    = slots.filter(s => s.isBooked);
    const availableSlots = slots.filter(s => !s.isBooked);

    const stats = [
        { label: "Total Slots",    value: slots.length,           icon: <FaUsers className="text-2xl text-white opacity-50" />,    sub: "For selected day" },
        { label: "Available",      value: availableSlots.length,  icon: <FaUserCheck className="text-2xl text-green-400" />,       sub: "Ready to book" },
        { label: "Booked",         value: bookedSlots.length,     icon: <FaCalendarDay className="text-2xl text-purple-400" />,   sub: "Appointments set" },
        { label: "Pending Review", value: bookedSlots.filter(s => s.appointment?.status === "pending" || !s.appointment?.status).length,
                                                                   icon: <FaClock className="text-2xl text-yellow-400" />,         sub: "Awaiting action" },
    ];

    const offDayLabel = getDayLabel(date);

    return (
        <>
            <style>{`
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .skeleton-shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.6s ease-in-out infinite; border-radius: 6px; }
                @keyframes slideDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeUp    { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .anim-slide-down { animation: slideDown 0.5s ease both; }
                .anim-fade-up    { animation: fadeUp 0.5s ease both; }
                .anim-delay-1    { animation-delay: 0.05s; }
                .anim-delay-2    { animation-delay: 0.12s; }
                .anim-delay-3    { animation-delay: 0.19s; }
                .anim-delay-4    { animation-delay: 0.26s; }
                .spin-anim { animation: spin 0.8s linear infinite; }
                [data-reveal] { opacity:0; transform:translateY(18px); transition: opacity 0.55s ease, transform 0.55s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>

            {/* Header */}
            <div className="px-4 md:px-6 pt-6 pb-2 anim-slide-down flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-[#0A0F1C]">Admin Dashboard</h1>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {formatDateLabel(new Date())} · Slots auto-generated 9AM–9PM EST · Mon–Sat
                    </p>
                </div>
                <button onClick={handleManualRefresh}
                    className="flex items-center gap-1.5 text-xs bg-[#0A0F1C] text-white hover:bg-[#0A0F1C]/80 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition">
                    <FaSync className={`text-xs ${isRefreshing ? "spin-anim" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="p-4 md:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {slotsLoading && slots.length === 0
                    ? Array(4).fill(0).map((_, i) => <StatCardSk key={i} />)
                    : stats.map((card, i) => (
                        <div key={i} data-reveal className={`bg-[#0A0F1C] text-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-white/5 anim-fade-up anim-delay-${i + 1}`}>
                            <div>
                                <h5 className="text-2xl font-black">{card.value}</h5>
                                <p className="text-gray-300 text-xs font-semibold mt-0.5">{card.label}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{card.sub}</p>
                            </div>
                            {card.icon}
                        </div>
                    ))
                }
            </div>

            {/* Main */}
            <div className="flex flex-col lg:flex-row gap-4 px-4 md:px-6 pb-6">

                {/* Booked Appointments */}
                <div data-reveal className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                        <div>
                            <h5 className="text-sm font-bold text-[#0A0F1C]">Booked Appointments</h5>
                            <p className="text-xs text-gray-400 mt-0.5">{formatDateLabel(date)}</p>
                        </div>
                        <span className="text-xs bg-[#0A0F1C] text-white px-2.5 py-1 rounded-full font-medium">{bookedSlots.length} booked</span>
                    </div>

                    {slotsLoading ? (
                        <div className="flex flex-col gap-2">
                            {Array(3).fill(0).map((_, i) => <BookedSlotSk key={i} />)}
                        </div>
                    ) : slotsError ? (
                        <div className="text-center py-10">
                            <p className="text-red-500 text-sm mb-2">{slotsError}</p>
                            <button onClick={() => fetchSlotsByDate(date)} className="text-xs px-4 py-2 bg-[#0A0F1C] text-white rounded-lg">Retry</button>
                        </div>
                    ) : offDayLabel ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3">🔒</div>
                            <p className="text-sm text-gray-500 font-semibold">{offDayLabel}</p>
                            <p className="text-xs text-gray-400 mt-1">No appointments are scheduled on this day.</p>
                        </div>
                    ) : bookedSlots.length === 0 ? (
                        <div className="text-center py-12">
                            <FaCalendarDay className="text-4xl mx-auto mb-3 text-gray-200" />
                            <p className="text-sm text-gray-400">No booked appointments for this day</p>
                            <p className="text-xs text-gray-300 mt-1">Clients can book any open slot between 9AM–9PM EST</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                            {bookedSlots.map((slot) => {
                                const now = new Date();
                                const start = new Date(slot.startTime);
                                const diffMins = (start - now) / 60000;
                                const canJoin = diffMins <= 15 && diffMins > -60;
                                return (
                                    <div key={slot._id} className="bg-gray-50 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-[#0A0F1C]">{formatTime(slot.startTime)} — {formatTime(slot.endTime)}</p>
                                            {slot.appointment?.user?.fullName && (
                                                <p className="text-xs text-gray-500 mt-1">👤 {slot.appointment.user.fullName}</p>
                                            )}
                                            {slot.appointment?.jitsiLink && (
                                                <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">🎥 {slot.appointment.jitsiLink}</p>
                                            )}
                                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block font-medium ${statusStyles[slot.appointment?.status || "pending"]}`}>
                                                {slot.appointment?.status || "pending"}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 shrink-0 flex-wrap">
                                            {canJoin && slot.appointment?.jitsiLink && (
                                                <a href={slot.appointment.jitsiLink} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#0A0F1C] text-white rounded-lg hover:bg-gray-700 transition">
                                                    🎥 Join
                                                </a>
                                            )}
                                            <button onClick={() => handleUpdateStatus(slot, "confirmed")}
                                                disabled={updatingId === slot.appointment?._id || slot.appointment?.status === "confirmed"}
                                                className="px-3 py-1.5 text-xs font-medium bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-40 transition">
                                                Confirm
                                            </button>
                                            <button onClick={() => handleUpdateStatus(slot, "cancelled")}
                                                disabled={updatingId === slot.appointment?._id || slot.appointment?.status === "cancelled"}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-40 transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Schedule Overview (replaces manual Availability panel) */}
                <div data-reveal className="w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h5 className="text-sm font-bold text-[#0A0F1C]">Schedule</h5>
                            <p className="text-xs text-gray-400 mt-0.5">9AM–9PM EST · Mon–Sat</p>
                        </div>
                        {/* Schedule badge */}
                        <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">Auto</span>
                    </div>

                    {/* Day nav */}
                    <div className="flex justify-between items-center mb-4 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                        <button onClick={prevDay} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#0A0F1C] transition">
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <p className="text-xs font-medium text-gray-600 text-center leading-snug">{formatDateLabel(date)}</p>
                        <button onClick={nextDay} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#0A0F1C] transition">
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>

                    {offDayLabel ? (
                        <div className="text-center py-8">
                            <div className="text-3xl mb-2">🔒</div>
                            <p className="text-xs text-gray-500 font-medium">{offDayLabel}</p>
                            <p className="text-xs text-gray-400 mt-1">No slots on Sundays</p>
                        </div>
                    ) : slotsLoading ? (
                        <div className="flex flex-col gap-2">
                            {Array(4).fill(0).map((_, i) => <AvailSlotSk key={i} />)}
                        </div>
                    ) : slots.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-3xl mb-2">🗓️</div>
                            <p className="text-xs text-gray-400">No slots for this day</p>
                            <p className="text-xs text-gray-300 mt-0.5">Try a Mon–Sat date</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                            {slots.map((slot, i) => (
                                <div key={slot._id || `virtual-${i}`}
                                    className={`flex justify-between items-center rounded-xl p-2.5 border transition-all duration-200 ${slot.isBooked ? "bg-gray-50 border-gray-200" : "bg-green-50 border-green-100"}`}>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">{formatTime(slot.startTime)} — {formatTime(slot.endTime)}</p>
                                        <span className={`text-xs font-medium ${slot.isBooked ? "text-gray-400" : "text-green-600"}`}>
                                            {slot.isBooked ? "● Booked" : "● Available"}
                                        </span>
                                    </div>
                                    {slot.isBooked && slot.appointment?.user?.fullName && (
                                        <span className="text-xs text-gray-400 truncate max-w-[80px]">
                                            {slot.appointment.user.fullName.split(" ")[0]}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Info note */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-xs text-blue-600 font-medium">ℹ️ Slots are auto-generated</p>
                        <p className="text-xs text-blue-400 mt-0.5">12 slots per day · Mon–Sat · 9AM–9PM EST. Clients book directly; no manual setup needed.</p>
                    </div>
                </div>
            </div>

            {/* Cases */}
            <div data-reveal className="px-4 md:px-6 pb-6">
                <CasesCard cases={cases} />
            </div>
        </>
    );
};

export default Dashboard;