import { useEffect } from "react";
import { Link } from "react-router-dom";

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

const portalFeatures = [
    { icon: "📊", title: "Monitor Case Progress", desc: "Track your case in real time with status updates from your attorney. No need to call  the dashboard tells you everything." },
    { icon: "📄", title: "Document Management", desc: "Securely upload, download, and organize all case-related documents in one place  accessible any time." },
    { icon: "💬", title: "Direct Communication", desc: "Message your legal team directly through encrypted messaging  no email chains, no confusion, no delays." },
    { icon: "📅", title: "Appointments & Deadlines", desc: "Track all upcoming appointments, court dates, and critical deadlines  all visible at a glance." },
    { icon: "🎥", title: "One-Click Video Calls", desc: "Join your scheduled video consultations with a single click  directly from your dashboard. No third-party apps needed." },
    { icon: "💳", title: "Billing & Invoices", desc: "Access your billing history, invoices, and payment records  full financial transparency at all times." },
];

export const ClientPortal = () => {
    useReveal();
    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="cp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#cp)"/>
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Secure Client Dashboard</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">Your Legal Dashboard. Simplified.</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        Once you sign in to Cocolaw.ai, you enter a secure, private environment designed entirely around your needs as a client. No more calling the office to ask for updates.
                    </p>
                </div>
            </div>

            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>What You Can Do Inside Your Portal</p>
                    <h2 className="text-2xl font-bold text-center mb-3" data-reveal>Everything in One Secure Location</h2>
                    <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10" data-reveal>
                        No more searching through email threads for documents. No more calling the office for updates. Your entire legal world, organized and accessible 24/7.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {portalFeatures.map((f, i) => (
                            <div key={i} data-reveal className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300">
                                <div className="text-2xl mb-3">{f.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{f.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white" style={{ borderTop: "3px solid #1e2740" }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4" data-reveal>This is not just a feature.</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8" data-reveal>
                        This is how Cocolaw.ai changes the relationship between clients and their legal team — built on transparency, convenience, and trust. The client portal is built on the principle that informed clients are better clients. When you always know what is happening with your case, the process becomes less stressful, more collaborative, and more effective for everyone involved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/signup" className="bg-white text-[#0A0F1C] px-8 py-3 rounded-md font-semibold text-sm hover:bg-gray-100 transition">
                            Create Your Account →
                        </Link>
                        <Link to="/bookings" className="border border-white/30 text-white px-8 py-3 rounded-md font-medium text-sm hover:bg-white/10 transition">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fadein  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slidein { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
                .animate-fadein       { animation: fadein  0.7s ease both; }
                .animate-fadein-delay { animation: fadein  0.9s 0.2s ease both; }
                .animate-slidein      { animation: slidein 0.8s 0.1s ease both; }
                [data-reveal] { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>
        </div>
    );
};

export default ClientPortal;