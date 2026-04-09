import { useState, useEffect, useCallback } from "react";
import { FaSync } from "react-icons/fa";
import useSlotStore from "../store/slotStore";
import useAppointmentStore from "../store/appointmentStore";
import usePolling from "../hooks/usePolling";
import { ApptMgmtSk, StatCardSk } from "../components/Skeleton";

const formatTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
const formatDateShort = (iso) => new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

const statusConfig = {
    pending:   { pill: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-400", label: "Pending" },
    confirmed: { pill: "bg-green-100 text-green-700 border-green-200",   dot: "bg-green-500",  label: "Confirmed" },
    cancelled: { pill: "bg-red-100 text-red-600 border-red-200",         dot: "bg-red-500",    label: "Cancelled" },
};

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
            { threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

// Colored summary skeleton (not dark bg)
const ColoredStatSk = ({ bg, border }) => (
    <div className={`${bg} border ${border} rounded-2xl p-4 flex items-center justify-between`}>
        <div className="flex flex-col gap-2">
            <div className="h-3 w-20 rounded skeleton-shimmer" />
            <div className="h-8 w-10 rounded skeleton-shimmer" />
        </div>
        <div className="w-10 h-10 rounded-full skeleton-shimmer" />
    </div>
);

const Appointments = () => {
    useReveal();
    const [filterStatus, setFilterStatus] = useState("all");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { slots, loading: slotsLoading, error: slotsError, fetchSlotsByDate } = useSlotStore();
    const { updatingId, updateStatus } = useAppointmentStore();

    const loadToday = useCallback(() => {
        const now = new Date();
        fetchSlotsByDate(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0)));
    }, []);

    usePolling(loadToday, 30000);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        loadToday();
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const handleStatusUpdate = async (slot, status) => {
        if (!slot.appointment?._id) { alert("No appointment found for this slot."); return; }
        const res = await updateStatus(slot.appointment._id, status);
        if (res.success) loadToday();
        else alert(res.error);
    };

    const appointmentSlots = slots.filter(s => s.appointment !== null);
    const filtered = filterStatus === "all" ? appointmentSlots
        : appointmentSlots.filter(s => (s.appointment?.status || "pending") === filterStatus);

    const counts = {
        all: appointmentSlots.length,
        pending: appointmentSlots.filter(s => !s.appointment?.status || s.appointment?.status === "pending").length,
        confirmed: appointmentSlots.filter(s => s.appointment?.status === "confirmed").length,
        cancelled: appointmentSlots.filter(s => s.appointment?.status === "cancelled").length,
    };

    const isFirstLoad = slotsLoading && slots.length === 0;

    return (
        <div className="p-4 md:p-6">
            <style>{`
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .skeleton-shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.6s ease-in-out infinite; border-radius: 6px; }
                @keyframes slideDown { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeUp    { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .anim-slide { animation: slideDown 0.45s ease both; }
                .anim-up    { animation: fadeUp 0.45s ease both; }
                .anim-d1 { animation-delay:0.05s; } .anim-d2 { animation-delay:0.12s; }
                .anim-d3 { animation-delay:0.19s; } .anim-d4 { animation-delay:0.26s; }
                .spin-anim { animation: spin 0.8s linear infinite; }
                [data-reveal] { opacity:0; transform:translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>

            {/* Header */}
            <div className="mb-6 anim-slide flex items-center justify-between">
                <div>
                    <h5 className="font-black text-xl text-[#0A0F1C]">Appointment Management</h5>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                </div>
                <button onClick={handleManualRefresh}
                    className="flex items-center gap-1.5 text-xs bg-[#0A0F1C] text-white hover:bg-[#0A0F1C]/80 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition">
                    <FaSync className={`text-xs ${isRefreshing ? "spin-anim" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {isFirstLoad ? (
                    <>
                        <StatCardSk />
                        {[
                            { bg: "bg-yellow-50", border: "border-yellow-100" },
                            { bg: "bg-green-50", border: "border-green-100" },
                            { bg: "bg-red-50", border: "border-red-100" },
                        ].map((s, i) => <ColoredStatSk key={i} {...s} />)}
                    </>
                ) : (
                    [
                        { key: "all",       label: "Total",     icon: "📅", bg: "bg-[#0A0F1C]", text: "text-white",      sub: "text-gray-400" },
                        { key: "pending",   label: "Pending",   icon: "⏳", bg: "bg-yellow-50",  text: "text-yellow-700", sub: "text-yellow-400", border: "border border-yellow-100" },
                        { key: "confirmed", label: "Confirmed", icon: "✅", bg: "bg-green-50",   text: "text-green-700",  sub: "text-green-400",  border: "border border-green-100" },
                        { key: "cancelled", label: "Cancelled", icon: "❌", bg: "bg-red-50",     text: "text-red-600",    sub: "text-red-300",    border: "border border-red-100" },
                    ].map((item, i) => (
                        <button key={item.key} onClick={() => setFilterStatus(item.key)}
                            className={`anim-up anim-d${i + 1} text-left p-4 rounded-2xl shadow-sm transition-all duration-200 ${item.bg} ${item.border || ""} ${filterStatus === item.key ? "ring-2 ring-offset-1 ring-[#0A0F1C]" : "hover:shadow-md"}`}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-lg">{item.icon}</span>
                                <span className={`text-2xl font-black ${item.text}`}>{counts[item.key]}</span>
                            </div>
                            <p className={`text-xs font-semibold ${item.sub}`}>{item.label}</p>
                        </button>
                    ))
                )}
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 flex-wrap anim-slide items-center">
                <p className="text-xs text-gray-400 self-center mr-1 font-medium">Filter:</p>
                {["all", "pending", "confirmed", "cancelled"].map((status) => (
                    <button key={status} onClick={() => setFilterStatus(status)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 capitalize ${
                            filterStatus === status
                                ? "bg-[#0A0F1C] text-white border-[#0A0F1C] shadow-sm"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                        }`}>
                        {status}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filterStatus === status ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                            {counts[status]}
                        </span>
                    </button>
                ))}
            </div>

            {slotsError ? (
                <div className="text-center py-12">
                    <p className="text-red-500 text-sm">{slotsError}</p>
                    <button onClick={loadToday} className="mt-3 text-xs px-4 py-2 bg-[#0A0F1C] text-white rounded-lg">Retry</button>
                </div>
            ) : (
                <div data-reveal className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                        <div>
                            <h5 className="text-sm font-bold text-[#0A0F1C]">
                                {filterStatus === "all" ? "All Appointments" : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Appointments`}
                            </h5>
                            <p className="text-xs text-gray-400 mt-0.5">Today  click confirm or cancel to manage</p>
                        </div>
                        {isFirstLoad
                            ? <div className="h-6 w-16 rounded-full skeleton-shimmer" />
                            : <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{filtered.length} shown</span>
                        }
                    </div>

                    {isFirstLoad ? (
                        <div className="flex flex-col gap-2">
                            {Array(4).fill(0).map((_, i) => <ApptMgmtSk key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-3">📭</div>
                            <p className="text-sm font-semibold text-gray-500">No {filterStatus !== "all" ? filterStatus : ""} appointments today</p>
                            <p className="text-xs text-gray-400 mt-1">Appointments appear here once clients book slots</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {filtered.map((slot) => {
                                const now = new Date();
                                const start = new Date(slot.startTime);
                                const diffMins = (start - now) / 60000;
                                const canJoin = diffMins <= 15 && diffMins > -60;
                                const status = slot.appointment?.status || "pending";
                                const cfg = statusConfig[status] || statusConfig.pending;

                                return (
                                    <div key={slot._id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${cfg.dot}`} />
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm font-bold text-[#0A0F1C]">
                                                        {formatTime(slot.startTime)} — {formatTime(slot.endTime)}
                                                    </p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${cfg.pill}`}>{cfg.label}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-0.5">{formatDateShort(slot.startTime)}</p>
                                                {slot.appointment?.user?.fullName && (
                                                    <p className="text-xs text-gray-600 mt-1 font-medium">👤 {slot.appointment.user.fullName}</p>
                                                )}
                                                {slot.appointment?.user?.email && (
                                                    <p className="text-xs text-gray-400 mt-0.5">✉️ {slot.appointment.user.email}</p>
                                                )}
                                                {slot.appointment?.jitsiLink && (
                                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                        🎥 <span className="truncate max-w-xs">{slot.appointment.jitsiLink}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                                            {canJoin && slot.appointment?.jitsiLink && (
                                                <a href={slot.appointment.jitsiLink} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#0A0F1C] text-white rounded-lg hover:bg-gray-700 transition">
                                                    🎥 Join Now
                                                </a>
                                            )}
                                            <button onClick={() => handleStatusUpdate(slot, "confirmed")}
                                                disabled={updatingId === slot.appointment?._id || status === "confirmed"}
                                                className="px-3 py-1.5 text-xs font-medium bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-40 transition whitespace-nowrap">
                                                ✓ Confirm
                                            </button>
                                            <button onClick={() => handleStatusUpdate(slot, "cancelled")}
                                                disabled={updatingId === slot.appointment?._id || status === "cancelled"}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-40 transition whitespace-nowrap">
                                                ✗ Cancel
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointments;