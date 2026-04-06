import React, { useState } from "react";

const getInitials = (name) =>
    name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const CasesCard = ({ cases }) => {
    const [openIds, setOpenIds] = useState({});

    //Calculate active and closed cases
    const activeCases = cases.filter((c) => c.status === "active").length;
    const closedCases = cases.filter((c) => c.status === "closed").length;

    const toggle = (id) => setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="w-full p-4 shadow-sm border border-gray-100 rounded-xl">
            {/* Header */}
            <div className="py-6 border-b border-gray-100 mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Review Your Cases
                </h1>
                <p className="text-sm text-gray-500">
                    Manage and track your filed cases, appointments, and documents.
                </p>

                {/* Case Counters */}
                <span className="mt-3 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {activeCases} active cases
                </span>
                <span className="mt-3 ml-2 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                    {closedCases} closed cases
                </span>
            </div>

            {/* Case List */}
            {cases.length === 0 ? (
                <p className="text-center text-gray-400 py-12 italic">
                    No cases found.
                </p>
            ) : (
                cases.map((c, i) => (
                    <div
                        key={c._id}
                        className="border border-gray-200 rounded-xl mb-3 overflow-hidden hover:border-gray-300 transition-colors"
                    >
                        {/* Collapsed Header */}
                        <button
                            onClick={() => toggle(c._id)}
                            className="w-full flex items-start gap-3 p-5 text-left"
                        >
                            <div className="w-9 h-9 rounded-full bg-[#0A0F1C] text-white flex items-center justify-center text-sm font-medium shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{c.caseTitle}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400">{fmtDate(c.createdAt)}</span>
                                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                                        {c.status === "closed" ? "Closed" : "Active"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center shrink-0 transition-transform ${openIds[c._id] ? "rotate-180" : ""
                                    }`}
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </button>

                        {/* Expanded Body */}
                        {openIds[c._id] && (
                            <div className="px-5 pb-5">
                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 border-l-4 border-emerald-300 rounded-lg px-4 py-3 mb-4">
                                    {c.caseDescription}
                                </p>

                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                                    Filed by
                                </p>
                                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium shrink-0">
                                        {getInitials(c.user.fullName)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{c.user.fullName}</p>
                                        <p className="text-xs text-gray-400">{c.user.email}</p>
                                    </div>
                                </div>

                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                                    Appointments ({c.appointments.length})
                                </p>
                                {c.appointments.length === 0 ? (
                                    <p className="text-sm text-gray-400 italic">
                                        No appointments scheduled yet.
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {c.appointments.map((app) => (
                                            <div
                                                key={app._id}
                                                className="border border-gray-100 rounded-xl p-3"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                                                        <svg
                                                            className="w-3.5 h-3.5 text-amber-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
                                                            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.8" strokeLinecap="round" />
                                                            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.8" strokeLinecap="round" />
                                                            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.8" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800">
                                                        {fmtDate(app.createdAt)}
                                                    </span>
                                                </div>
                                                {app.fileId && app.fileName ? (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        <a
                                                            key={app.fileId}
                                                            href={app.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md hover:bg-blue-100 transition-colors"
                                                        >
                                                            {app.fileName}
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">
                                                        No documents uploaded.
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CasesCard;