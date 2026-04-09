// src/components/Skeleton.jsx
// Professional skeleton loading components matching CoCoLaw theme

const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s ease-in-out infinite;
    border-radius: 6px;
  }
`;

// Base skeleton block
export const Sk = ({ className = "" }) => (
    <>
        <style>{shimmer}</style>
        <div className={`skeleton-shimmer ${className}`} />
    </>
);

// Stat card skeleton (matches dark bg-[#0A0F1C] cards)
export const StatCardSk = () => (
    <div className="bg-[#0A0F1C] rounded-2xl p-4 md:p-5 flex items-start justify-between">
        <div className="flex flex-col gap-2 w-full">
            <div className="h-8 w-12 rounded-lg" style={{ background: "rgba(255,255,255,0.12)", animation: "shimmer 1.6s ease-in-out infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 75%)" }} />
            <div className="h-3 w-24 rounded" style={{ background: "rgba(255,255,255,0.08)", animation: "shimmer 1.6s ease-in-out infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)" }} />
            <div className="h-3 w-16 rounded" style={{ background: "rgba(255,255,255,0.05)", animation: "shimmer 1.6s ease-in-out infinite", backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)" }} />
        </div>
        <div className="w-8 h-8 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
);

// Appointment row skeleton
export const AppointmentRowSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 flex flex-col gap-2">
                <Sk className="h-4 w-40" />
                <Sk className="h-3 w-24" />
                <Sk className="h-3 w-16 rounded-full" />
            </div>
            <div className="flex gap-2 shrink-0">
                <Sk className="h-7 w-16 rounded-lg" />
                <Sk className="h-7 w-16 rounded-lg" />
            </div>
        </div>
    </>
);

// Slot pill skeleton
export const SlotSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-green-50 rounded-xl border border-green-100 p-3">
            <Sk className="h-4 w-16 mb-1" />
            <Sk className="h-3 w-12" />
        </div>
    </>
);

// Case row skeleton
export const CaseRowSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <Sk className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
                <Sk className="h-4 w-48" />
                <Sk className="h-3 w-32" />
            </div>
            <Sk className="w-4 h-4 rounded shrink-0" />
        </div>
    </>
);

// Banner skeleton (next appointment)
export const BannerSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <Sk className="h-3 w-32 mb-3" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-2">
                    <Sk className="h-7 w-48" />
                    <Sk className="h-3 w-24" />
                    <Sk className="h-3 w-32" />
                </div>
                <div className="flex items-center gap-3">
                    <Sk className="h-7 w-20 rounded-full" />
                    <Sk className="h-9 w-28 rounded-xl" />
                </div>
            </div>
        </div>
    </>
);

// Dashboard booked slot skeleton
export const BookedSlotSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 flex flex-col gap-2">
                <Sk className="h-4 w-36" />
                <Sk className="h-3 w-28" />
                <Sk className="h-3 w-44" />
                <Sk className="h-5 w-16 rounded-full" />
            </div>
            <div className="flex gap-2 shrink-0">
                <Sk className="h-7 w-16 rounded-lg" />
                <Sk className="h-7 w-16 rounded-lg" />
            </div>
        </div>
    </>
);

// Availability slot skeleton
export const AvailSlotSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-green-50 border border-green-100 rounded-xl p-2.5 flex justify-between items-center">
            <div className="flex flex-col gap-1.5">
                <Sk className="h-3 w-28" />
                <Sk className="h-3 w-16" />
            </div>
            <Sk className="w-7 h-7 rounded-lg" />
        </div>
    </>
);

// Appointment management row skeleton
export const ApptMgmtSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
                <Sk className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex gap-2 items-center">
                        <Sk className="h-4 w-32" />
                        <Sk className="h-5 w-20 rounded-full" />
                    </div>
                    <Sk className="h-3 w-20" />
                    <Sk className="h-3 w-36" />
                    <Sk className="h-3 w-48" />
                </div>
            </div>
            <div className="flex gap-2 shrink-0">
                <Sk className="h-7 w-16 rounded-lg" />
                <Sk className="h-7 w-16 rounded-lg" />
            </div>
        </div>
    </>
);

// Summary stat card (colored)
export const SummaryStatSk = ({ bg = "bg-gray-50", border = "border-gray-100" }) => (
    <>
        <style>{shimmer}</style>
        <div className={`${bg} border ${border} rounded-2xl p-4 flex justify-between items-center`}>
            <div className="flex flex-col gap-2">
                <Sk className="h-3 w-20" />
                <Sk className="h-8 w-12" />
            </div>
            <Sk className="w-10 h-10 rounded-full" />
        </div>
    </>
);

// Booking slot skeleton (grid)
export const BookingSlotSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
            <Sk className="h-5 w-16 mb-1" />
            <Sk className="h-3 w-12" />
        </div>
    </>
);

// Upcoming appointment skeleton
export const UpcomingApptSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col gap-1.5">
                    <Sk className="h-4 w-36" />
                    <Sk className="h-3 w-20" />
                </div>
                <Sk className="h-5 w-16 rounded-full shrink-0" />
            </div>
        </div>
    </>
);

// History appointment skeleton
export const HistoryApptSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex flex-col gap-1.5">
                <Sk className="h-4 w-36" />
                <Sk className="h-3 w-20" />
            </div>
            <Sk className="h-5 w-16 rounded-full shrink-0" />
        </div>
    </>
);

// Client dashboard stat card
export const ClientStatSk = () => (
    <div className="bg-[#0A0F1C] rounded-2xl p-4 flex items-start justify-between">
        <div className="flex flex-col gap-2 flex-1">
            <div className="h-8 w-10 rounded-lg" style={{ background: "rgba(255,255,255,0.12)", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.08) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.6s ease-in-out infinite" }} />
            <div className="h-3 w-20 rounded" style={{ background: "rgba(255,255,255,0.08)", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.05) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.6s ease-in-out infinite" }} />
            <div className="h-3 w-14 rounded" style={{ background: "rgba(255,255,255,0.05)", backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.6s ease-in-out infinite" }} />
        </div>
        <div className="w-8 h-8 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
);

// Case card skeleton (client dashboard)
export const CaseSk = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <Sk className="h-4 w-44" />
                    <Sk className="h-3 w-full max-w-64" />
                    <Sk className="h-3 w-20" />
                </div>
                <Sk className="h-5 w-14 rounded-full shrink-0" />
            </div>
        </div>
    </>
);

export default Sk;