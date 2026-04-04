import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {  Gavel } from "lucide-react";

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

/* Scroll to hash on mount (for footer anchor links) */
function useHashScroll() {
    const { hash } = useLocation();
    useEffect(() => {
        if (!hash) return;
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
        }
    }, [hash]);
}


const mainServices = [
    {
        num: "01", icon: "📄",
        id: "legal-research",
        title: "Legal Research & Document Drafting",
        subtitle: "Jurisdiction-Specific Research & Drafting",
        desc: "CoCoLaw.ai generates court-ready documents — motions, complaints, responses — in plain language you can actually understand and file. Every document is checked against the local rules of your jurisdiction.",
        features: ["Jurisdiction-aware research", "Motion & complaint drafting", "Plain-language output", "Court-ready document generation"],
        detail: "Supports federal district courts, state courts, and appellate filings across all 50 states.",
    },
    {
        num: "02", icon: "📅",
        id: "procedural-guidance",
        title: "Procedural Guidance & Deadline Tracking",
        subtitle: "Never Miss a Filing Deadline Again",
        desc: "Our AI maps out every procedural step for your case type and sends automatic reminders so you stay on schedule and avoid dismissals due to missed deadlines or improper filings.",
        features: ["Step-by-step procedural roadmap", "Automatic deadline alerts", "Case-type specific workflows", "Filing checklists"],
        detail: "Covers civil, family, small claims, and appellate court procedures with jurisdiction-specific timelines.",
    },
    {
        num: "03", icon: "🗂️",
        id: "evidence-organization",
        title: "Evidence Organization & Objection Helpers",
        subtitle: "Organize. Present. Win.",
        desc: "Upload and organize your evidence with AI assistance. CoCoLaw.ai helps you catalog exhibits, identify relevance, assess admissibility, and prepare objections to opposing evidence before trial.",
        features: ["Evidence cataloging", "Relevance analysis", "Objection drafting", "Exhibit preparation"],
        detail: "AI flags hearsay, authentication issues, and privilege concerns before they surprise you in court.",
    },
    {
        num: "04", icon: "🎙️",
        id: "courtroom-coaching",
        title: "Courtroom Script & Decorum Coaching",
        subtitle: "Walk in Prepared",
        desc: "Get scripted opening and closing statements, learn proper courtroom etiquette, and practice responses to common judicial questions. Know exactly what to say — and what never to say.",
        features: ["Opening & closing scripts", "Courtroom etiquette guide", "Q&A preparation", "Legal decorum coaching"],
        detail: "Includes judge-specific research on courtroom preferences and procedural tendencies.",
    },
    {
        num: "05", icon: "🧠",
        id: "emotional-guardrails",
        title: "Emotional Guardrails & Settlement Analysis",
        subtitle: "Stay Strategic, Not Emotional",
        desc: "Legal disputes are intensely personal — but emotion can devastate your case. Our guided tools help you separate facts from feelings and make strategic decisions with a clear, objective head.",
        features: ["Emotion-vs-fact separator", "Strategic decision prompts", "Settlement analysis", "Objective case review"],
        detail: "AI provides risk-weighted settlement analysis so you can make informed decisions under pressure.",
    },
    {
        num: "06", icon: "⚖️",
        id: "co-counsel",
        title: "Intelligent Co-Counsel",
        subtitle: "Your AI Legal Partner",
        desc: "Available 24/7, CoCoLaw.ai provides plain-language support for legal research, document drafting, procedural guidance, and trial preparation — no legal background required to get started.",
        features: ["24/7 availability", "Plain-language explanations", "Multi-case support", "Continuous legal updates"],
        detail: "Continuously updated with new case law, rule amendments, and procedural changes in real time.",
    },
];

const resourcePoints = [
    { icon: "📋", title: "Resource & Logistical Constraints", desc: "Pro se litigants often lack financial resources, access to legal databases, and logistical support — impacting their ability to afford expert witnesses or conduct meaningful discovery." },
    { icon: "⏱️", title: "Massive Time & Energy Demands",      desc: "Navigating legal procedures requires significant time for research and drafting, often leading to exhaustion for individuals balancing employment and family responsibilities." },
    { icon: "⚖️", title: "Lower Success Rates & Systemic Disadvantages", desc: "Without legal expertise, pro se litigants face an inherent structural disadvantage that compounds at every stage of litigation, from pleadings to trial." },
];

const caseTypes = [
    {
        icon: "🏠", title: "Family Law",
        tags: ["Divorce", "Child Custody", "Restraining Orders", "Adoption"],
        desc: "Navigate emotionally charged family proceedings with structured guidance on custody filings, support calculations, and divorce documentation.",
        stat: "~72%", statLabel: "of family court filings involve at least one self-represented party",
    },
    {
        icon: "🏢", title: "Landlord–Tenant",
        tags: ["Eviction Defense", "Habitability Claims", "Security Deposits", "Lease Disputes"],
        desc: "Fight evictions, assert habitability rights, and recover wrongfully withheld deposits with properly drafted responses and demand letters.",
        stat: "~90%", statLabel: "of tenants in eviction proceedings appear without an attorney",
    },
    {
        icon: "💼", title: "Employment & Labor",
        tags: ["Wrongful Termination", "Wage Theft", "Discrimination", "EEOC Filings"],
        desc: "Assert your workplace rights through properly filed EEOC complaints, demand letters, and state labor board submissions.",
        stat: "58%", statLabel: "of employment discrimination claims are filed pro se",
    },
    {
        icon: "💳", title: "Consumer & Debt",
        tags: ["Debt Collection Defense", "FDCPA Violations", "Small Claims", "Credit Disputes"],
        desc: "Defend against debt collectors, file small claims actions, and challenge credit reporting errors with jurisdiction-correct filings.",
        stat: "$0", statLabel: "filing fee threshold for small claims in many states",
    },
    {
        icon: "🏛️", title: "Civil Rights",
        tags: ["§ 1983 Claims", "ADA Violations", "Police Misconduct", "Due Process"],
        desc: "Bring federal civil rights claims under 42 U.S.C. § 1983 with properly structured complaints and exhaustion of administrative remedies.",
        stat: "High", statLabel: "dismissal rate for pro se § 1983 complaints due to pleading errors",
    },
    {
        icon: "📜", title: "Probate & Estates",
        tags: ["Small Estate Affidavits", "Will Contests", "Guardianship", "Trust Disputes"],
        desc: "Handle straightforward probate proceedings, contest a will, or establish guardianship without costly attorney retainers.",
        stat: "~65%", statLabel: "of probate matters qualify for simplified small estate procedures",
    },
];

const Services = () => {
    useReveal();
    useHashScroll();

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">

            {/* ── HERO ── */}
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-8 bottom-0 w-36 h-36 text-white opacity-5 hidden lg:block pointer-events-none">
                    <Gavel size={150} color="white" strokeWidth={0.8} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Purpose-Built for Pro Se Litigants</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">Our Services</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        Everything a self-represented litigant needs — from initial research through final filing — powered by AI trained specifically on legal data.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-gray-500 animate-fadein-delay">
                        <span>📄 Document Drafting</span>
                        <span>⚖️ Legal Research</span>
                        <span>📅 Deadline Tracking</span>
                        <span>🎙️ Courtroom Prep</span>
                    </div>
                </div>
            </div>

            {/* ── MAIN SERVICES — light bg ── */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>What We Offer</p>
                    <h2 className="text-2xl font-bold text-center mb-2" data-reveal>Six Core Services</h2>
                    <p className="text-gray-500 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>
                        Each service maps directly to a documented challenge pro se litigants face — nothing is generic.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {mainServices.map((service, i) => (
                            <div
                                key={i}
                                id={service.id}
                                data-reveal
                                className="bg-gray-50 rounded-xl border-t-2 border-[#0A0F1C] p-6 hover:shadow-md transition-all duration-300 group scroll-mt-20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 bg-[#0A0F1C] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 group-hover:scale-110 transition-transform duration-200">
                                        {service.num}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{service.icon}</span>
                                            <p className="text-xs text-gray-400">{service.subtitle}</p>
                                        </div>
                                        <h3 className="font-bold text-base mb-2 text-[#0A0F1C]">{service.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{service.desc}</p>
                                        <p className="text-xs text-gray-400 italic mb-3">{service.detail}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.map((f, fi) => (
                                                <span key={fi} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASE TYPES — light bg ── */}
            <section className="px-6 md:px-16 py-14 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Who It's Built For</p>
                    <h2 className="text-2xl font-bold text-center mb-2" data-reveal>Case Types We Support</h2>
                    <p className="text-gray-500 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>
                        CoCoLaw.ai is calibrated for the most common legal matters where individuals represent themselves — and where the stakes are highest.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {caseTypes.map((c, i) => (
                            <div key={i} data-reveal className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#0A0F1C] hover:shadow-md transition-all duration-300 group flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-[#0A0F1C] rounded-lg flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform duration-200">
                                        {c.icon}
                                    </div>
                                    <h3 className="font-bold text-sm text-[#0A0F1C]">{c.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {c.tags.map((tag, ti) => (
                                        <span key={ti} className="text-xs bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{c.desc}</p>
                                <div className="border-t border-gray-100 pt-3 mt-auto flex items-start gap-2">
                                    <span className="text-lg font-black text-[#0A0F1C] leading-none">{c.stat}</span>
                                    <span className="text-xs text-gray-400 leading-snug">{c.statLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-8 italic" data-reveal>
                        Don't see your case type? CoCoLaw.ai also supports immigration, bankruptcy, civil appeals, and more.
                    </p>
                </div>
            </section>

            {/* ── WHY COCOLAW EXISTS — NOW DARK ── */}
            <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white relative overflow-hidden" style={{ borderTop: "3px solid #1e2740", borderBottom: "3px solid #1e2740" }}>
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-2xl font-bold text-center mb-2" data-reveal>Why CoCoLaw.ai Exists</h2>
                    <p className="text-gray-400 text-sm text-center mb-10" data-reveal>
                        Addressing the practical limitations and systemic disadvantages faced by pro se litigants every day.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resourcePoints.map((item, i) => (
                            <div key={i} data-reveal className="text-center p-6 border border-gray-700 rounded-xl hover:border-gray-400 hover:bg-white/5 transition-all duration-300">
                                <div className="w-14 h-14 bg-white/10 border border-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-sm mb-2 text-white">{item.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-8 italic" data-reveal>
                        Pro se matters consume disproportionate court resources due to delays and inefficiencies that proper guidance could prevent.
                    </p>
                </div>
            </section>

            {/* ── HOW IT WORKS — NOW LIGHT ── */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-2 text-[#0A0F1C]" data-reveal>How It Works</h2>
                    <p className="text-gray-500 text-sm text-center mb-12" data-reveal>Four steps from your first question to your final filing.</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-0 border border-gray-200 rounded-xl overflow-hidden">
                        {[
                            { num: "01", icon: "💬", title: "Describe Your Situation", desc: "Articulate your legal issue in plain English. No jargon required." },
                            { num: "02", icon: "⚖️", title: "AI Legal Analysis",       desc: "Our AI analyzes your facts against relevant laws and jurisdiction-specific rules." },
                            { num: "03", icon: "📄", title: "Receive Actionable Outputs", desc: "Get court-ready drafts, checklists, deadlines, and strategic options." },
                            { num: "04", icon: "✅", title: "File with Confidence",    desc: "Refine your case through guided Q&A and submit with full understanding." },
                        ].map((step, i) => (
                            <div key={i} data-reveal
                                className={`p-6 bg-white ${i < 3 ? "md:border-r border-gray-200" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""} border-gray-200`}>
                                <div className="text-4xl font-black text-gray-200 mb-1">{step.num}</div>
                                <div className="text-xl mb-3">{step.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{step.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="text-center py-14 px-6 bg-gray-50">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2" data-reveal>Ready to take on your case?</h2>
                    <p className="text-gray-500 text-sm mt-2 mb-6 leading-relaxed" data-reveal>
                        Start with CoCoLaw.ai today — no legal background required. Professional legal AI at a price that makes sense.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/signup" className="bg-[#0A0F1C] text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-semibold text-sm">
                            Get Started Free →
                        </Link>
                        <Link to="/bookings" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── ANIMATIONS ── */}
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

export default Services;