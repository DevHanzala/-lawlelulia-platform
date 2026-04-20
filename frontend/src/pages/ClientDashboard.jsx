import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaSync } from "react-icons/fa";
import { useState } from "react";
import useAppointmentStore from "../store/appointmentStore";
import useCaseStore from "../store/caseStore";
import useAuthStore from "../store/authStore";
import usePolling from "../hooks/usePolling";
import { ClientStatSk, BannerSk, UpcomingApptSk, CaseSk } from "../components/Skeleton";

const formatTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

const statusStyles = {
    pending:   "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-600 border-red-200",
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

const ClientDashboard = () => {
    useReveal();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // FIXED: Get user from authStore, not localStorage
    const { user } = useAuthStore();
    const { history, future, loading: apptLoading, fetchAllUserAppointments } = useAppointmentStore();
    const { cases, getCases, loading: casesLoading } = useCaseStore();

    const refreshAll = useCallback(() => {
        fetchAllUserAppointments();
        getCases();
    }, []);

    usePolling(refreshAll, 30000);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await Promise.all([fetchAllUserAppointments(), getCases()]);
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const nextAppt = future[0] || null;
    const confirmedCount = future.filter(a => a.status === "confirmed").length;
    const pendingCount = future.filter(a => a.status === "pending").length;
    const activeCases = cases.filter(c => c.status === "active");

    const now = new Date();
    const nextStart = nextAppt ? new Date(nextAppt.slot.startTime) : null;
    const diffMins = nextStart ? (nextStart - now) / 60000 : null;
    const canJoinNext = diffMins !== null && diffMins <= 15 && diffMins > -60;

    // First name from store (FIXED)
    const firstName = user?.fullName?.split(" ")[0] || "";

    const isFirstApptLoad = apptLoading && future.length === 0 && history.length === 0;
    const isFirstCaseLoad = casesLoading && cases.length === 0;

    return (
        <div className="p-4 md:p-6">
            <style>{`
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .skeleton-shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.6s ease-in-out infinite; border-radius: 6px; }
                @keyframes slideDown { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeUp    { from { opacity:0; transform:translateY(18px);  } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .anim-slide { animation: slideDown 0.45s ease both; }
                .anim-up    { animation: fadeUp 0.5s ease both; }
                .anim-d1 { animation-delay:0.05s; } .anim-d2 { animation-delay:0.12s; }
                .anim-d3 { animation-delay:0.19s; } .anim-d4 { animation-delay:0.26s; }
                .spin-anim { animation: spin 0.8s linear infinite; }
                [data-reveal] { opacity:0; transform:translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>

            {/* Welcome Header */}
            <div className="mb-6 anim-slide flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-[#0A0F1C]">
                        Welcome back{firstName ? `, ${firstName}` : ""} 
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">Here's a summary of your legal activity.</p>
                </div>
                <button onClick={handleManualRefresh}
                    className="flex items-center gap-1.5 text-xs bg-[#0A0F1C] text-white hover:bg-[#0A0F1C]/80 border border-gray-200 hover:border-gray-400 px-3 py-1.5 rounded-lg transition">
                    <FaSync className={`text-xs ${isRefreshing ? "spin-anim" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {isFirstApptLoad ? (
                    Array(4).fill(0).map((_, i) => <ClientStatSk key={i} />)
                ) : (
                    [
                        { label: "Upcoming",     value: future.length,       icon: "📅", sub: "Scheduled sessions", delay: "anim-d1" },
                        { label: "Confirmed",    value: confirmedCount,       icon: "✅", sub: "Ready to attend",    delay: "anim-d2" },
                        { label: "Pending",      value: pendingCount,         icon: "⏳", sub: "Awaiting approval",  delay: "anim-d3" },
                        { label: "Active Cases", value: activeCases.length,   icon: "📁", sub: "Open legal matters", delay: "anim-d4" },
                    ].map((card, i) => (
                        <div key={i} className={`anim-up ${card.delay} bg-[#0A0F1C] text-white rounded-2xl p-4 flex items-start justify-between shadow-sm border border-white/5`}>
                            <div>
                                <h5 className="text-2xl font-black">{card.value}</h5>
                                <p className="text-gray-300 text-xs font-semibold mt-0.5">{card.label}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{card.sub}</p>
                            </div>
                            <span className="text-2xl opacity-60">{card.icon}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Next Appointment Banner */}
            {isFirstApptLoad ? (
                <div className="mb-6"><BannerSk /></div>
            ) : nextAppt ? (
                <div data-reveal className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Next Appointment</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <p className="text-lg font-black text-[#0A0F1C]">
                                {formatTime(nextAppt.slot.startTime)} — {formatTime(nextAppt.slot.endTime)}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">{formatDate(nextAppt.slot.startTime)}</p>
                            {nextAppt.jitsiLink && nextAppt.status === "confirmed" && (
                                <p className="text-xs text-green-600 mt-1 font-medium">🔗 Meeting room is ready</p>
                            )}
                            {nextAppt.status === "pending" && (
                                <p className="text-xs text-yellow-600 mt-1">⏳ Awaiting admin confirmation</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${statusStyles[nextAppt.status] || ""}`}>
                                {nextAppt.status}
                            </span>
                            {canJoinNext && nextAppt.jitsiLink ? (
                                <a href={nextAppt.jitsiLink} target="_blank" rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#0A0F1C] text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition whitespace-nowrap">
                                    🎥 Join Now
                                </a>
                            ) : (
                                <Link to="/bookings" className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-xl hover:border-gray-400 transition whitespace-nowrap">
                                    View Details
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ) : !apptLoading ? (
                <div data-reveal className="mb-6 bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-sm font-semibold text-gray-600">No upcoming appointments</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Book a consultation with our legal team.</p>
                    <Link to="/bookings" className="inline-block bg-[#0A0F1C] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition">
                        → Book Appointment
                    </Link>
                </div>
            ) : null}

            {/* Main Grid */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Upcoming Sessions */}
                <div data-reveal className="w-full lg:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                        <div>
                            <h6 className="font-bold text-sm text-[#0A0F1C]">Upcoming Sessions</h6>
                            <p className="text-xs text-gray-400">All scheduled appointments</p>
                        </div>
                        <Link to="/bookings" className="text-xs text-gray-400 hover:text-[#0A0F1C] underline transition">View all</Link>
                    </div>

                    {isFirstApptLoad ? (
                        <div className="flex flex-col gap-2">
                            {Array(3).fill(0).map((_, i) => <UpcomingApptSk key={i} />)}
                        </div>
                    ) : future.length === 0 ? (
                        <div className="text-center py-8"><div className="text-3xl mb-2">📆</div><p className="text-xs text-gray-400">No upcoming appointments</p></div>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                            {future.map((appt) => {
                                const start = new Date(appt.slot.startTime);
                                const diff = (start - new Date()) / 60000;
                                const canJoin = diff <= 15 && diff > -60;
                                return (
                                    <div key={appt._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="text-sm font-bold text-[#0A0F1C]">{formatTime(appt.slot.startTime)} — {formatTime(appt.slot.endTime)}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{formatDate(appt.slot.startTime)}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border shrink-0 ${statusStyles[appt.status] || ""}`}>{appt.status}</span>
                                        </div>
                                        {canJoin && appt.jitsiLink && (
                                            <a href={appt.jitsiLink} target="_blank" rel="noopener noreferrer"
                                                className="mt-2 w-full flex items-center justify-center gap-1 text-xs font-semibold bg-[#0A0F1C] text-white py-1.5 rounded-lg hover:bg-gray-700 transition">
                                                🎥 Join Meeting
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Active Cases */}
                <div data-reveal className="w-full lg:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                        <div>
                            <h6 className="font-bold text-sm text-[#0A0F1C]">Your Cases</h6>
                            <p className="text-xs text-gray-400">Active legal matters</p>
                        </div>
                        {isFirstCaseLoad
                            ? <div className="h-5 w-14 rounded-full skeleton-shimmer" />
                            : <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{activeCases.length} active</span>
                        }
                    </div>

                    {isFirstCaseLoad ? (
                        <div className="flex flex-col gap-2">
                            {Array(3).fill(0).map((_, i) => <CaseSk key={i} />)}
                        </div>
                    ) : activeCases.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-3xl mb-2">📁</div>
                            <p className="text-xs text-gray-400">No active cases</p>
                            <Link to="/bookings" className="text-xs text-[#0A0F1C] underline mt-1 inline-block">Create one when booking</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                            {activeCases.map((c) => (
                                <div key={c._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-[#0A0F1C] truncate">{c.caseTitle}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{c.caseDescription}</p>
                                            <p className="text-xs text-gray-300 mt-1">{formatDate(c.createdAt)}</p>
                                        </div>
                                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700 border border-green-200 shrink-0">active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div data-reveal className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { icon: "📅", label: "Book Appointment", to: "/bookings",  sub: "Schedule a session" },
                        { icon: "👤", label: "My Profile",       to: "/profile",   sub: "Update your info" },
                        { icon: "⚖️", label: "Our Practice Area",     to: "/practice-areas",  sub: "What we offer" },
                        { icon: "💬", label: "Get Support",      to: "/support",   sub: "Help & FAQs" },
                    ].map((action, i) => (
                        <Link key={i} to={action.to}
                            className="flex flex-col items-center text-center p-3 rounded-xl border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-200 group">
                            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
                            <p className="text-xs font-semibold text-[#0A0F1C]">{action.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{action.sub}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;