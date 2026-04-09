import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useSlotStore from "../store/slotStore";
import useAppointmentStore from "../store/appointmentStore";
import useCaseStore from "../store/caseStore";

const formatTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
const formatDateShort = (iso) => new Date(iso).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

const statusStyles = {
    pending:   "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-600 border-red-200",
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

const Bookings = () => {
    useReveal();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [specialRequest, setSpecialRequest] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState("");
    const [bookingError, setBookingError] = useState("");
    const [selectedCaseId, setSelectedCaseId] = useState("");
    const [showCreateCase, setShowCreateCase] = useState(false);
    const [caseTitle, setCaseTitle] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const [file, setFile] = useState(null);

    const { slots, loading: slotsLoading, fetchSlotsByDate } = useSlotStore();
    const { history, future, loading: apptLoading, fetchAllUserAppointments, bookAppointment } = useAppointmentStore();
    const { cases, getCases, createCase, loading: caseLoading, error: caseError } = useCaseStore();

    useEffect(() => { getCases(); }, []);
    useEffect(() => { fetchSlotsByDate(selectedDate); setSelectedSlotId(null); setBookingSuccess(""); setBookingError(""); }, [selectedDate]);
    useEffect(() => { fetchAllUserAppointments(); }, []);

    const availableSlots = slots.filter(s => !s.isBooked);

    const handleBook = async () => {
        if (!selectedSlotId) { setBookingError("Please select a time slot."); return; }
        if (!selectedCaseId) { setBookingError("Please select a case for this appointment."); return; }
        setBookingError(""); setBookingSuccess(""); setBookingLoading(true);
        const res = await bookAppointment(selectedSlotId, selectedCaseId, file);
        if (res.success) {
            setBookingSuccess("Appointment booked! Pending confirmation. A confirmation email will be sent once approved.");
            setSelectedSlotId(null); setSpecialRequest(""); setFile(null);
            fetchSlotsByDate(selectedDate); fetchAllUserAppointments();
        } else { setBookingError(res.error); }
        setBookingLoading(false);
    };

    const fileNewCase = async () => {
        if (!caseTitle || !caseDescription) { setBookingError("Provide both title and description for the case."); return; }
        setBookingError(""); setBookingSuccess(""); setBookingLoading(true);
        const res = await createCase(caseTitle, caseDescription);
        if (!res.success) { setBookingError(res.message || "Failed to create case."); setBookingLoading(false); return; }
        setBookingLoading(false); setCaseTitle(""); setCaseDescription(""); setShowCreateCase(false);
    };

    return (
        <div className="p-4 md:p-6">
            <style>{`
                @keyframes slideDown { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeUp    { from { opacity:0; transform:translateY(18px);  } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeIn    { from { opacity:0; }                              to { opacity:1; } }
                .anim-slide { animation: slideDown 0.45s ease both; }
                .anim-up    { animation: fadeUp   0.5s  ease both; }
                .anim-in    { animation: fadeIn   0.3s  ease both; }
                .anim-d1 { animation-delay:0.05s; } .anim-d2 { animation-delay:0.12s; }
                .anim-d3 { animation-delay:0.19s; } .anim-d4 { animation-delay:0.26s; }
                [data-reveal] { opacity:0; transform:translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>

            {/* Header */}
            <div className="mb-6 anim-slide">
                <h5 className="text-xl font-black text-[#0A0F1C]">Book a Consultation</h5>
                <p className="text-gray-400 text-sm mt-0.5">Select your case, pick a date, choose a time — it's that simple.</p>
            </div>

            {/* Step 1 — Case */}
            <div data-reveal className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#0A0F1C] text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
                    <p className="text-sm font-bold text-[#0A0F1C]">Select Your Case</p>
                </div>
                <p className="text-xs text-gray-400 mb-3 ml-8">Choose an existing case or create a new one for this appointment.</p>
                <select value={selectedCaseId}
                    onChange={(e) => { const v = e.target.value; if (v === "new") { setShowCreateCase(true); setSelectedCaseId(""); } else { setShowCreateCase(false); setSelectedCaseId(v); } }}
                    className="w-full h-11 px-3 border border-gray-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition">
                    <option value="">— Select a case —</option>
                    {cases.map(c => <option key={c._id} value={c._id}>{c.caseTitle}</option>)}
                    <option value="new">+ Create New Case</option>
                </select>

                {showCreateCase && (
                    <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col gap-3 anim-in">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-[#0A0F1C]">New Case Details</p>
                            <button onClick={() => setShowCreateCase(false)} className="text-xs text-gray-400 hover:text-gray-700 transition">✕ Cancel</button>
                        </div>
                        <input type="text" placeholder="Case Title (e.g. Employment Dispute 2025)" value={caseTitle}
                            onChange={e => setCaseTitle(e.target.value)}
                            className="h-11 px-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] transition bg-white" />
                        <textarea placeholder="Case Description — briefly describe your legal situation (50–1500 characters)" value={caseDescription}
                            onChange={e => setCaseDescription(e.target.value)} rows={3}
                            className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] resize-none transition bg-white" />
                        {caseError && <div className="text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-xl">⚠️ {caseError}</div>}
                        <div className="flex justify-end">
                            <button onClick={fileNewCase} disabled={caseLoading}
                                className="text-sm px-5 h-10 bg-[#0A0F1C] text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50">
                                {caseLoading ? "Filing..." : "File Case →"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Step 2 — Date & Slot */}
            <div data-reveal className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#0A0F1C] text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
                    <p className="text-sm font-bold text-[#0A0F1C]">Pick a Date & Time Slot</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Calendar */}
                    <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center">
                        <p className="text-xs font-semibold text-gray-400 mb-3 self-start uppercase tracking-wider">Select Date</p>
                        <DayPicker mode="single" selected={selectedDate} onSelect={(d) => d && setSelectedDate(d)}
                            disabled={{ before: new Date() }}
                            modifiersClassNames={{ selected: "bg-[#0A0F1C] text-white rounded-full", today: "font-bold text-[#0A0F1C]" }} />
                    </div>
                    {/* Slots */}
                    <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Available Slots</p>
                        <p className="text-sm font-bold text-[#0A0F1C] mb-4">
                            {selectedDate.toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long" })}
                        </p>
                        {slotsLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="w-6 h-6 border-4 border-[#0A0F1C] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : availableSlots.length === 0 ? (
                            <div className="text-center py-10 flex flex-col items-center gap-2">
                                <div className="text-4xl">🗓️</div>
                                <p className="text-sm text-gray-500 font-medium">No available slots for this date</p>
                                <p className="text-xs text-gray-400">Try selecting a different date using the calendar.</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-xs text-gray-400 mb-3">{availableSlots.length} slot{availableSlots.length !== 1 ? "s" : ""} available — tap one to select</p>
                                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                    {availableSlots.map((slot) => {
                                        const isSelected = selectedSlotId === slot._id;
                                        return (
                                            <button key={slot._id} onClick={() => setSelectedSlotId(isSelected ? null : slot._id)}
                                                className={`p-3 rounded-xl border text-left transition-all duration-200 ${isSelected ? "bg-[#0A0F1C] border-[#0A0F1C] shadow-md scale-[1.02]" : "bg-green-50 border-green-100 hover:border-green-400 hover:shadow-sm"}`}>
                                                <p className={`text-sm font-bold ${isSelected ? "text-white" : "text-[#0A0F1C]"}`}>{formatTime(slot.startTime)}</p>
                                                <p className={`text-xs mt-0.5 ${isSelected ? "text-gray-300" : "text-gray-400"}`}>to {formatTime(slot.endTime)}</p>
                                                {isSelected && <p className="text-xs text-green-300 mt-1 font-medium">✓ Selected</p>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Step 3 — File + Book */}
            <div data-reveal className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#0A0F1C] text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
                    <p className="text-sm font-bold text-[#0A0F1C]">Add Details & Confirm</p>
                </div>
                <p className="text-xs text-gray-400 mb-4 ml-8">Optionally upload a supporting document and add any special requests before booking.</p>

                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <label className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition cursor-pointer border border-gray-200 whitespace-nowrap">
                        📎 Upload Document
                        <input type="file" accept="image/png,image/jpeg,image/jpg,application/pdf" className="hidden"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    {file && (
                        <div className="flex-1 flex items-center justify-between bg-blue-50 border border-blue-100 p-2.5 rounded-xl text-xs text-blue-700 anim-in">
                            <span className="truncate font-medium">📄 {file.name}</span>
                            <button onClick={() => setFile(null)} className="ml-2 text-blue-400 hover:text-red-500 font-bold transition">✕</button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input type="text" placeholder="Special Request (Optional)" value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        className="flex-1 p-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition" />
                    <button onClick={handleBook} disabled={bookingLoading || !selectedSlotId}
                        className="sm:w-52 text-sm font-semibold px-6 py-3 bg-[#0A0F1C] text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                        {bookingLoading ? "Booking..." : "→ Book Appointment"}
                    </button>
                </div>

                {/* Checklist hint */}
                {(!selectedSlotId || !selectedCaseId) && (
                    <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 border border-gray-100 anim-in">
                        <p className="font-medium text-gray-500 mb-1">Before booking, make sure:</p>
                        <p className={selectedCaseId ? "text-green-600" : "text-gray-400"}>
                            {selectedCaseId ? "✓" : "○"} Case selected
                        </p>
                        <p className={selectedSlotId ? "text-green-600" : "text-gray-400"}>
                            {selectedSlotId ? "✓" : "○"} Time slot selected
                        </p>
                    </div>
                )}

                {bookingError && (
                    <div className="mt-3 text-red-600 text-xs bg-red-50 border border-red-100 p-3 rounded-xl anim-in">⚠️ {bookingError}</div>
                )}
                {bookingSuccess && (
                    <div className="mt-3 text-green-700 text-xs bg-green-50 border border-green-100 p-3 rounded-xl anim-in">✅ {bookingSuccess}</div>
                )}
            </div>

            <div className="border-t border-gray-100 mb-6" />

            {/* My Appointments */}
            <div data-reveal>
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
                                    <p className="text-xs text-gray-400">Scheduled future sessions</p>
                                </div>
                                <span className="text-xs bg-[#0A0F1C] text-white px-2 py-0.5 rounded-full font-medium">{future.length}</span>
                            </div>
                            {future.length === 0 ? (
                                <div className="text-center py-8"><div className="text-3xl mb-2">📆</div><p className="text-xs text-gray-400">No upcoming appointments</p></div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                                    {future.map((appt) => {
                                        const now = new Date();
                                        const start = new Date(appt.slot.startTime);
                                        const diffMins = (start - now) / 60000;
                                        const canJoin = diffMins <= 15 && diffMins > -60;
                                        return (
                                            <div key={appt._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0A0F1C]">{formatTime(appt.slot.startTime)} — {formatTime(appt.slot.endTime)}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">{formatDateShort(appt.slot.startTime)}</p>
                                                        {appt.jitsiLink && appt.status === "confirmed" && (
                                                            <p className="text-xs text-green-600 mt-1 font-medium">🔗 Meeting ready</p>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border shrink-0 ml-2 ${statusStyles[appt.status] || "bg-gray-100 text-gray-600"}`}>
                                                        {appt.status}
                                                    </span>
                                                </div>
                                                {canJoin && appt.jitsiLink && (
                                                    <a href={appt.jitsiLink} target="_blank" rel="noopener noreferrer"
                                                        className="mt-2 w-full flex items-center justify-center gap-1 text-xs font-semibold bg-[#0A0F1C] text-white py-2 rounded-lg hover:bg-gray-700 transition anim-in">
                                                        🎥 Join Meeting Now
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {/* History */}
                        <div className="w-full md:w-1/2 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <div>
                                    <h6 className="font-bold text-sm text-[#0A0F1C]">History</h6>
                                    <p className="text-xs text-gray-400">Past sessions</p>
                                </div>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{history.length}</span>
                            </div>
                            {history.length === 0 ? (
                                <div className="text-center py-8"><div className="text-3xl mb-2">🗂️</div><p className="text-xs text-gray-400">No past appointments</p></div>
                            ) : (
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                                    {history.map((appt) => (
                                        <div key={appt._id} className="flex justify-between items-center bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-gray-200 transition">
                                            <div>
                                                <p className="text-sm font-bold text-[#0A0F1C]">{formatTime(appt.slot.startTime)} — {formatTime(appt.slot.endTime)}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{formatDateShort(appt.slot.startTime)}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusStyles[appt.status] || "bg-gray-100 text-gray-600"}`}>
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