import React, { useState } from "react";

const getInitials = (name) =>
    name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "??";

const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const fmtTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const statusStyles = {
    pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
};

const CasesCard = ({ cases }) => {
    const [openIds, setOpenIds] = useState({});
    const [selectedCase, setSelectedCase] = useState(null);

    const activeCases = cases.filter(c => c.status === "active").length;
    const closedCases = cases.filter(c => c.status === "closed").length;
    const toggle = (id) => setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));

    // Detail modal
    if (selectedCase) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                {/* Back button */}
                <button
                    onClick={() => setSelectedCase(null)}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#0A0F1C] mb-5 transition group"
                >
                    <span className="text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
                    Back to all cases
                </button>

                {/* Case Header */}
                <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-[#0A0F1C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {getInitials(selectedCase.caseTitle)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg font-bold text-[#0A0F1C]">{selectedCase.caseTitle}</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                selectedCase.status === "active"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-500 border-gray-200"
                            }`}>
                                {selectedCase.status}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Filed {fmtDate(selectedCase.createdAt)}</p>
                    </div>
                </div>

                {/* Case Description */}
                <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Case Description</p>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 border-l-4 border-[#0A0F1C] rounded-r-xl px-4 py-3">
                        {selectedCase.caseDescription}
                    </p>
                </div>

                {/* Filed By */}
                <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Filed By</p>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                        <div className="w-9 h-9 rounded-full bg-[#0A0F1C] text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {getInitials(selectedCase.user?.fullName || "?")}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{selectedCase.user?.fullName || "Unknown"}</p>
                            <p className="text-xs text-gray-400">{selectedCase.user?.email || ""}</p>
                        </div>
                    </div>
                </div>

                {/* Appointments */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Appointments ({selectedCase.appointments?.length || 0})
                    </p>

                    {(!selectedCase.appointments || selectedCase.appointments.length === 0) ? (
                        <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl">
                            <div className="text-3xl mb-2">📅</div>
                            <p className="text-sm text-gray-400">No appointments scheduled yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {selectedCase.appointments.map((appt, i) => (
                                <div key={appt._id || i} className="border border-gray-200 rounded-xl p-4 bg-white hover:border-gray-300 transition">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                            {appt.slot?.startTime && (
                                                <p className="text-sm font-bold text-[#0A0F1C]">
                                                    🕐 {fmtTime(appt.slot.startTime)} — {fmtTime(appt.slot.endTime)}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Booked {fmtDate(appt.createdAt)}
                                            </p>
                                        </div>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium border shrink-0 ${
                                            statusStyles[appt.status] || "bg-gray-100 text-gray-600"
                                        }`}>
                                            {appt.status}
                                        </span>
                                    </div>

                                    {/* Document */}
                                    <div className="border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-400 mb-2 font-medium">📎 Document</p>
                                        {appt.fileId && appt.fileUrl ? (
                                            <a href={appt.fileUrl} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs bg-[#0A0F1C] text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition font-medium">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                {appt.fileName || "View Document"}
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg border border-dashed border-gray-200">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                No document uploaded
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // List view
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            {/* Header */}
            <div className="pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold text-[#0A0F1C]">All Cases</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Review filed cases, appointments, and documents</p>
                    </div>
                    <span className="text-xs bg-[#0A0F1C] text-white px-2.5 py-1 rounded-full font-medium">{cases.length} total</span>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-full px-3 py-1 text-xs text-green-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        {activeCases} active
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                        {closedCases} closed
                    </span>
                </div>
            </div>

            {cases.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-4xl mb-3">📂</div>
                    <p className="text-sm text-gray-400">No cases found.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {cases.map((c, i) => (
                        <button
                            key={c._id}
                            onClick={() => setSelectedCase(c)}
                            className="w-full text-left border border-gray-200 rounded-xl p-4 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-200 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#0A0F1C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-semibold text-gray-900 text-sm truncate">{c.caseTitle}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                                            c.status === "active"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-gray-100 text-gray-500 border-gray-200"
                                        }`}>
                                            {c.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-400">{fmtDate(c.createdAt)}</span>
                                        <span className="text-xs text-gray-400">
                                            {c.appointments?.length || 0} appointment{c.appointments?.length !== 1 ? "s" : ""}
                                        </span>
                                        {c.user?.fullName && (
                                            <span className="text-xs text-gray-400 truncate">👤 {c.user.fullName}</span>
                                        )}
                                    </div>
                                </div>
                                <svg className="w-4 h-4 text-gray-300 group-hover:text-[#0A0F1C] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CasesCard;