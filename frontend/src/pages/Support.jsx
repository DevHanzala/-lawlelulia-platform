import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

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

const faqs = [
    { q: "What is CoCoLaw.ai?", a: "CoCoLaw.ai is an AI-powered legal co-counsel platform purpose-built for self-represented (pro se) litigants. It provides jurisdiction-aware legal research, document drafting, procedural guidance, and courtroom preparation tools." },
    { q: "Is CoCoLaw.ai a law firm or attorney?", a: "No. CoCoLaw.ai is a legal technology platform, not a law firm, and does not provide legal advice. It is a research and drafting tool designed to help you understand your rights and prepare your case. Always consider consulting a licensed attorney for complex matters." },
    { q: "Which courts and jurisdictions are supported?", a: "CoCoLaw.ai supports federal district courts, state trial and appellate courts across all 50 U.S. states, and common administrative tribunals. Jurisdiction-specific rules are applied automatically based on your case details." },
    { q: "How does document drafting work?", a: "Describe your situation in plain English. Our AI analyzes your facts against relevant statutes, rules, and case law, then generates a court-ready draft — motions, complaints, responses — formatted to your jurisdiction's local rules." },
    { q: "Is my information secure and private?", a: "Yes. All data is encrypted in transit and at rest using bank-grade AES-256 encryption. We never sell or share your personal information with third parties." },
    { q: "Can I cancel my subscription anytime?", a: "Absolutely. All plans are month-to-month with no long-term contracts. You can cancel at any time from your account settings, effective at the end of your billing period." },
    { q: "What if I can't afford a subscription?", a: "CoCoLaw.ai supports in forma pauperis (IFP) cases and offers reduced-rate access for qualifying individuals. Contact our support team to discuss your situation." },
    { q: "How current is the legal information?", a: "Our platform is continuously updated with new case law, statutory amendments, and rule changes in real time, so you always work with current legal information." },
];

const categories = [
    { icon: "🚀", title: "Getting Started", desc: "Account setup, onboarding, and your first case.", links: ["Creating your account", "Setting up your first case", "Navigating the dashboard"] },
    { icon: "📄", title: "Document Drafting", desc: "Generate, edit, and file AI-drafted documents.", links: ["Generating a motion", "Editing AI drafts", "Jurisdiction formatting"] },
    { icon: "📅", title: "Deadlines & Procedures", desc: "Managing timelines, alerts, and procedural steps.", links: ["Setting deadline alerts", "Reading your procedural roadmap", "Interpreting local rules"] },
    { icon: "🔒", title: "Account & Security", desc: "Password resets, billing, privacy settings.", links: ["Changing your password", "Updating billing info", "Downloading your data"] },
    { icon: "⚖️", title: "Case Strategy", desc: "Settlement analysis, evidence tools, courtroom prep.", links: ["Using settlement analysis", "Organizing exhibits", "Courtroom script builder"] },
    { icon: "💳", title: "Billing & Plans", desc: "Subscriptions, invoices, IFP support.", links: ["Upgrading your plan", "Requesting IFP access", "Viewing invoices"] },
];

const Support = () => {
    useReveal();
    const [openFaq, setOpenFaq] = useState(null);
    const [search, setSearch] = useState("");
    const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

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
            <div className="bg-[#0A0F1C] text-white py-16 px-6 text-center relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none">
                    <Scale size={180} color="white" strokeWidth={0.8} />
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="sg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#sg)"/>
                    </svg>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 animate-fadein">Help Center</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">How Can We Help You?</h1>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed animate-fadein-delay">
                        Search our knowledge base or browse by category below.
                    </p>
                    <div className="relative animate-fadein-delay">
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for answers…"
                            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-white/50 transition" />
                        {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-sm">✕</button>}
                    </div>
                    {search && (
                        <p className="text-xs text-gray-500 mt-3 animate-fadein">
                            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
                        </p>
                    )}
                </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-4">
                <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                    <a href="mailto:support@cocolaw.ai" className="flex items-center gap-1.5 hover:text-[#0A0F1C] transition">✉️ support@cocolaw.ai</a>
                    <span className="flex items-center gap-1.5">🕐 Response within 24 hours</span>
                    <span className="flex items-center gap-1.5">🔒 Secure & confidential</span>
                    <Link to="/bookings" className="flex items-center gap-1.5 hover:text-[#0A0F1C] transition font-medium">📅 Book a consultation →</Link>
                </div>
            </div>

            {/* Categories */}
            {!search && (
                <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Browse by Topic</p>
                        <h2 className="text-2xl font-bold text-center mb-2" data-reveal>Support Categories</h2>
                        <p className="text-gray-500 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>Select a topic to find detailed guides and answers.</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {categories.map((cat, i) => (
                                <div key={i} data-reveal className="border border-gray-200 rounded-xl p-5 hover:border-[#0A0F1C] hover:shadow-md transition-all duration-300 group cursor-pointer">
                                    <div className="text-2xl mb-3">{cat.icon}</div>
                                    <h3 className="font-bold text-sm text-[#0A0F1C] mb-1">{cat.title}</h3>
                                    <p className="text-xs text-gray-400 mb-3">{cat.desc}</p>
                                    <ul className="space-y-1.5">
                                        {cat.links.map((l, li) => (
                                            <li key={li} className="text-xs text-gray-500 flex items-center gap-1.5 group-hover:text-[#0A0F1C] transition-colors">
                                                <span className="text-gray-300 font-bold">→</span> {l}
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
            <section className="px-6 md:px-16 py-14 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Frequently Asked Questions</p>
                    <h2 className="text-2xl font-bold text-center mb-10" data-reveal>{search ? `Results for "${search}"` : "Common Questions"}</h2>
                    {(search ? filtered : faqs).length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3">🔍</div>
                            <p className="text-sm font-semibold text-gray-500">No results found for "{search}"</p>
                            <p className="text-xs text-gray-400 mt-1">Try different keywords or <a href="mailto:support@cocolaw.ai" className="text-[#0A0F1C] underline">contact us directly</a>.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {(search ? filtered : faqs).map((faq, i) => (
                                <div key={i} data-reveal className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#0A0F1C] transition-colors duration-200">
                                    <button className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                        <span className="text-sm font-semibold text-[#0A0F1C] flex-1">{faq.q}</span>
                                        <span className={`text-[#0A0F1C] text-xl shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
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