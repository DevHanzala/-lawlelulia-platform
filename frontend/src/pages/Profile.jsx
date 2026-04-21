import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useProfileStore from "../store/useProfileStore";

/* ── tiny reveal hook ── */
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

/* ── Field component ── */
const Field = ({ label, required, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {children}
    </div>
);

const inputCls =
    "h-11 px-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed";

const Profile = () => {
    useReveal();
    const { user } = useAuthStore();
    const { updateProfile, loading, error, success, clearStatus } = useProfileStore();

    const isAdmin = user?.role === "admin";

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        professionalTitle: "",
        bio: "",
    });
    const [toast, setToast] = useState(null); // { type: "success"|"error", msg }

    // Pre-fill form from stored user on mount / user change
    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.fullName || "",
                phone: user.phone || "",
                professionalTitle: user.professionalTitle || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    // Show toast on save result
    useEffect(() => {
        if (success) {
            setToast({ type: "success", msg: "Profile updated successfully." });
            clearStatus();
            const t = setTimeout(() => setToast(null), 3500);
            return () => clearTimeout(t);
        }
        if (error) {
            setToast({ type: "error", msg: error });
            clearStatus();
            const t = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(t);
        }
    }, [success, error]);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.fullName.trim()) return;
        await updateProfile(form);
    };

    const initials = user?.fullName
        ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    return (
        <div className="p-4 md:p-6 pb-10 max-w-3xl mx-auto flex flex-col gap-6">
            <style>{`
                @keyframes fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
                .anim-fade { animation: fadein 0.45s ease both; }
                [data-reveal] { opacity:0; transform:translateY(16px); transition:opacity 0.5s ease,transform 0.5s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
                @keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
                .toast-anim { animation: toastIn 0.35s ease both; }
            `}</style>

            {/* ── Toast ── */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 toast-anim flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold border ${toast.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-600"
                    }`}>
                    <span>{toast.type === "success" ? "✓" : "✕"}</span>
                    {toast.msg}
                </div>
            )}

            {/* ── Page header ── */}
            <div className="anim-fade">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Account</p>
                <h1 className="text-xl font-black text-[#0A0F1C]">Profile Settings</h1>
                <p className="text-sm text-gray-400 mt-0.5">
                    Manage your personal information and account preferences.
                </p>
            </div>

            {/* ── Avatar + identity card ── */}
            <div data-reveal className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-[#0A0F1C] flex items-center justify-center text-white text-2xl font-black select-none">
                        {initials}
                    </div>
                    <span className={`absolute -bottom-1.5 -right-1.5 text-xs px-2 py-0.5 rounded-full font-bold border ${isAdmin
                            ? "bg-[#0A0F1C] text-white border-[#0A0F1C]"
                            : "bg-green-100 text-green-700 border-green-200"
                        }`}>
                        {isAdmin ? "Admin" : "Client"}
                    </span>
                </div>

                {/* Identity info */}
                <div className="text-center sm:text-left min-w-0">
                    <h2 className="text-lg font-black text-[#0A0F1C] truncate">{user?.fullName || "—"}</h2>
                    <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
                    {user?.professionalTitle && (
                        <p className="text-xs text-gray-500 mt-1 font-medium">{user.professionalTitle}</p>
                    )}
                    {user?.phone && (
                        <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                    )}
                    {user?.bio && (
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2 max-w-md">{user.bio}</p>
                    )}
                </div>

            </div>

            {/* ── Edit form ── */}
            <form onSubmit={handleSubmit} data-reveal>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* Form header */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-[#0A0F1C]">Personal Information</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Update your name, contact details, and professional bio.
                        </p>
                    </div>

                    <div className="p-6 flex flex-col gap-5">

                        {/* Full name + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Field label="Full Name" required>
                                <input
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Phone Number">
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (000) 000-0000"
                                    className={inputCls}
                                />
                            </Field>
                        </div>

                        {/* Email — read-only */}
                        <Field label="Email Address">
                            <input
                                value={user?.email || ""}
                                disabled
                                className={inputCls}
                            />
                            <p className="text-xs text-gray-400">
                                Email cannot be changed. Contact support if needed.
                            </p>
                        </Field>

                        {/* Professional title */}
                        <Field label="Professional Title">
                            <input
                                name="professionalTitle"
                                value={form.professionalTitle}
                                onChange={handleChange}
                                placeholder={isAdmin ? "e.g. Legal Administrator" : "e.g. Self-Represented Litigant"}
                                className={inputCls}
                            />
                        </Field>

                        {/* Bio */}
                        <Field label="Bio">
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows={4}
                                maxLength={500}
                                placeholder="A brief description about yourself or your legal matter…"
                                className="p-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent resize-none transition bg-gray-50 focus:bg-white leading-relaxed"
                            />
                            <p className="text-xs text-gray-300 text-right">{form.bio.length}/500</p>
                        </Field>

                        {/* Account role — read-only info */}
                        <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-8 h-8 bg-[#0A0F1C] rounded-lg flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-600">
                                    Account Role: <span className="text-[#0A0F1C]">{isAdmin ? "Administrator" : "Client"}</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Role is assigned by the platform and cannot be self-changed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer / save */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
                        <p className="text-xs text-gray-400">
                            Changes are saved to your account immediately.
                        </p>
                        <button
                            type="submit"
                            disabled={loading || !form.fullName.trim()}
                            className="flex items-center gap-2 bg-[#0A0F1C] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Saving…
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
            </form>


        </div>
    );
};

export default Profile;