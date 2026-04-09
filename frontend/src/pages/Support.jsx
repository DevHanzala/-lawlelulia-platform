import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

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

const faqs = [
    { q: "What is CoCoLaw.ai?", a: "CoCoLaw.ai is an AI-powered legal co-counsel platform built specifically for self-represented (pro se) litigants. It provides jurisdiction-aware legal research, document drafting, procedural guidance, evidence organization, and courtroom preparation tools — all in plain language." },
    { q: "Is CoCoLaw.ai a law firm or attorney?", a: "No. CoCoLaw.ai is a legal technology platform, not a law firm. It does not provide legal advice and no attorney-client relationship is created by using it. We strongly recommend consulting a licensed attorney for complex legal matters." },
    { q: "Which courts and jurisdictions are supported?", a: "CoCoLaw.ai supports all 50 U.S. state trial and appellate courts, all federal district courts, U.S. Courts of Appeals, and common administrative tribunals. Jurisdiction-specific rules are applied automatically based on your case details." },
    { q: "How does document drafting work?", a: "Describe your situation in plain English. Our AI analyzes your facts against relevant statutes, procedural rules, and case law, then generates a court-ready draft — motions, complaints, answers, or responses — formatted to your jurisdiction's local rules." },
    { q: "Is my information secure and private?", a: "Yes. All data is encrypted in transit and at rest using AES-256 encryption. We never sell or share your personal information. Your case documents are stored on secure servers and are accessible only by you." },
    { q: "How do I book a legal consultation?", a: "Navigate to the Bookings page from your dashboard or sidebar. Select your case (or create a new one), pick an available date from the calendar, choose a time slot, and click 'Book Appointment'. You'll receive a confirmation email once approved by our team." },
    { q: "What happens after I book an appointment?", a: "Your appointment is created with 'pending' status. Once our admin confirms it, you'll receive a confirmation email with a Jitsi video meeting link. You'll also receive a reminder email 15 minutes before the meeting starts." },
    { q: "Can I cancel my subscription anytime?", a: "Yes. All plans are billed month-to-month with no long-term contracts. Cancel at any time from your account settings — cancellation takes effect at the end of your current billing period." },
    { q: "What if I can't afford a subscription?", a: "CoCoLaw.ai supports in forma pauperis (IFP) cases and offers reduced-rate access for qualifying individuals. Contact support@cocolaw.ai to discuss your situation confidentially." },
    { q: "How current is the legal information?", a: "Our platform is continuously updated with new case law, statutory amendments, and rule changes. You always work with current legal information relevant to your jurisdiction and case type." },
];

const categories = [
    { icon: "🚀", title: "Getting Started", desc: "Account setup, onboarding, and your first case.", links: ["Creating your account", "Setting up your first case", "Navigating the dashboard"] },
    { icon: "📅", title: "Bookings & Appointments", desc: "How to schedule and manage consultations.", links: ["Booking a consultation slot", "Joining your video meeting", "Rescheduling or cancelling"] },
    { icon: "📄", title: "Document Drafting", desc: "Generate, edit, and file AI-drafted documents.", links: ["Generating a motion", "Editing AI drafts", "Jurisdiction formatting rules"] },
    { icon: "📁", title: "Case Management", desc: "Create, track, and manage your legal cases.", links: ["Creating a new case", "Uploading supporting documents", "Viewing appointment history"] },
    { icon: "🔒", title: "Account & Security", desc: "Password resets, billing, and privacy settings.", links: ["Changing your password", "Updating billing info", "Downloading your data"] },
    { icon: "💳", title: "Billing & Plans", desc: "Subscriptions, invoices, and IFP support.", links: ["Upgrading your plan", "Requesting IFP access", "Viewing your invoices"] },
];

const Support = () => {
    useReveal();
    const [openFaq, setOpenFaq] = useState(null);
    const [search, setSearch] = useState("");
    const filtered = faqs.filter(f =>
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            <style>{`
                @keyframes fadein  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slidein { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
                .animate-fadein       { animation: fadein  0.7s ease both; }
                .animate-fadein-delay { animation: fadein  0.9s 0.2s ease both; }
                .animate-slidein      { animation: slidein 0.8s 0.1s ease both; }
                [data-reveal] { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>

            {/* Hero */}
            <div className="bg-[#0A0F1C] text-white py-20 px-6 text-center relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none">
                    <Scale size={200} color="white" strokeWidth={0.6} />
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="sg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#sg)"/>
                        <circle cx="150" cy="200" r="150" fill="none" stroke="white" strokeWidth="0.5"/>
                    </svg>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 animate-fadein">Help Center</p>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 animate-slidein">How Can We Help?</h1>
                    <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed animate-fadein-delay">
                        Search our knowledge base, browse by category, or contact our team directly.
                    </p>
                    <div className="relative animate-fadein-delay max-w-lg mx-auto">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search for answers…"
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-2xl pl-10 pr-10 py-4 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">✕</button>
                        )}
                    </div>
                    {search && (
                        <p className="text-xs text-gray-500 mt-3">
                            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<span className="text-gray-300">{search}</span>"
                        </p>
                    )}
                </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                    <a href="mailto:support@cocolaw.ai" className="flex items-center gap-1.5 hover:text-[#0A0F1C] transition font-medium">
                        ✉️ support@cocolaw.ai
                    </a>
                    <span className="flex items-center gap-1.5">🕐 Response within 24 hours</span>
                    <span className="flex items-center gap-1.5">🔒 Secure & confidential</span>
                    <Link to="/bookings" className="flex items-center gap-1.5 hover:text-[#0A0F1C] transition font-semibold text-[#0A0F1C]">
                        📅 Book a consultation →
                    </Link>
                </div>
            </div>

            {/* Categories */}
            {!search && (
                <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Browse by Topic</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0A0F1C]" data-reveal>Support Categories</h2>
                        <p className="text-gray-500 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>
                            Find detailed guides and answers organized by topic.
                        </p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {categories.map((cat, i) => (
                                <div key={i} data-reveal className="border border-gray-200 rounded-2xl p-5 hover:border-[#0A0F1C] hover:shadow-md transition-all duration-300 group cursor-pointer bg-white">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#0A0F1C] group-hover:border-[#0A0F1C] transition-all duration-300">
                                        <span className="group-hover:grayscale-0 transition-all">{cat.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-sm text-[#0A0F1C] mb-1">{cat.title}</h3>
                                    <p className="text-xs text-gray-400 mb-4">{cat.desc}</p>
                                    <ul className="space-y-2">
                                        {cat.links.map((l, li) => (
                                            <li key={li} className="text-xs text-gray-500 flex items-center gap-2 hover:text-[#0A0F1C] transition-colors cursor-pointer">
                                                <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                                {l}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="px-6 md:px-16 py-14" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>
                        {search ? "Search Results" : "Frequently Asked Questions"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#0A0F1C]" data-reveal>
                        {search ? `Results for "${search}"` : "Common Questions"}
                    </h2>
                    <p className="text-gray-500 text-sm text-center mb-10" data-reveal>
                        {search ? "" : "Everything you need to know about CoCoLaw.ai."}
                    </p>

                    {(search ? filtered : faqs).length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4">🔍</div>
                            <p className="text-base font-semibold text-gray-600">No results for "{search}"</p>
                            <p className="text-sm text-gray-400 mt-1 mb-4">Try different keywords or contact us directly.</p>
                            <a href="mailto:support@cocolaw.ai"
                                className="inline-block bg-[#0A0F1C] text-white text-xs px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition">
                                Email Support →
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {(search ? filtered : faqs).map((faq, i) => (
                                <div key={i} data-reveal className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-200">
                                    <button
                                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    >
                                        <span className="text-sm font-semibold text-[#0A0F1C] flex-1 leading-relaxed">{faq.q}</span>
                                        <span className={`w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-[#0A0F1C] font-bold text-sm transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-45 bg-[#0A0F1C] text-white border-[#0A0F1C]" : ""}`}>
                                            +
                                        </span>
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-5 pb-5 border-t border-gray-100">
                                            <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


        </div>
    );
};

export default Support;