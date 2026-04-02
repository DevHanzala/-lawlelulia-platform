import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

/* ─── SVG assets ─────────────────────────────────────────────── */
const ScalesSVG = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="18" r="5" fill="currentColor" opacity="0.8"/>
        <rect x="58" y="22" width="4" height="36" fill="currentColor" opacity="0.6"/>
        <line x1="60" y1="38" x2="22" y2="52" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <line x1="60" y1="38" x2="98" y2="52" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <ellipse cx="22" cy="62" rx="16" ry="8" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="98" cy="52" rx="16" ry="8" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="57" y="58" width="6" height="30" fill="currentColor" opacity="0.4"/>
        <rect x="40" y="88" width="40" height="4" rx="2" fill="currentColor" opacity="0.5"/>
        <text x="22" y="65" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.7">PRO SE</text>
        <text x="98" y="55" textAnchor="middle" fill="currentColor" fontSize="7" opacity="0.7">ATTY</text>
    </svg>
);

const GavelSVG = () => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="10" y="28" width="36" height="16" rx="4" transform="rotate(-65 50 3)" fill="currentColor" opacity="0.7"/>
        <rect x="38" y="8" width="14" height="28" rx="3" transform="rotate(-45 38 8)" fill="currentColor" opacity="0.4"/>
        <line x1="8" y1="72" x2="48" y2="32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
        <line x1="2" y1="74" x2="74" y2="74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
    </svg>
);

const ShieldSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M32 4L8 14v18c0 13 10.5 22.5 24 26 13.5-3.5 24-13 24-26V14L32 4z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 32l7 7 13-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    </svg>
);

const DocSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="12" y="6" width="36" height="48" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="6" width="24" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        <line x1="20" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <line x1="20" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <line x1="20" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="48" cy="48" r="10" fill="currentColor" opacity="0.8"/>
        <path d="M44 48l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const HeroPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)"/>
        <circle cx="650" cy="100" r="200" fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx="650" cy="100" r="150" fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx="650" cy="100" r="100" fill="none" stroke="white" strokeWidth="0.5"/>
    </svg>
);

/* ─── Stats counter ──────────────────────────────────────────── */
const stats = [
    { value: "80%+", label: "Litigants go to court without a lawyer" },
    { value: "2–11%", label: "Pro se success rate in federal cases" },
    { value: "49%", label: "Rise in AI-assisted pro se filings" },
    { value: "24/7", label: "AI Co-Counsel availability" },
];

const features = [
    { icon: "01", title: "Intelligent Co-Counsel", desc: "Plain-language support for legal research, document drafting, procedural guidance, and preparation." },
    { icon: "02", title: "Jurisdiction-Specific Research", desc: "Tailored legal research and document creation specific to your jurisdiction and court." },
    { icon: "03", title: "Procedural Guidance", desc: "Step-by-step guidance through legal procedures with automatic deadline tracking." },
    { icon: "04", title: "Evidence Organization", desc: "Tools to organize evidence and assistance with constructing objections before trial." },
    { icon: "05", title: "Courtroom Coaching", desc: "Assistance with preparing courtroom scripts and guidance on proper legal decorum." },
    { icon: "06", title: "Settlement Analysis", desc: "Tools to help manage emotional responses and analyze settlement options objectively." },
    { icon: "07", title: "Affordable Subscription", desc: "Cost-effective subscription model with support for in forma pauperis cases." },
    { icon: "08", title: "Secure & Private", desc: "A secure, private platform continuously updated with the latest legal information." },
];

const howItWorks = [
    { num: "01", title: "Describe Your Situation", desc: "Clearly articulate your legal issue in plain English. No legal jargon required — our AI understands natural language.", icon: "💬" },
    { num: "02", title: "AI Legal Analysis", desc: "Our AI rigorously analyzes your facts against relevant laws, rules, and jurisdiction-specific precedents.", icon: "⚖️" },
    { num: "03", title: "Receive Actionable Outputs", desc: "Get court-ready drafts, essential checklists, filing deadlines, and strategic options tailored to your case.", icon: "📄" },
    { num: "04", title: "File with Confidence", desc: "Refine your case through guided Q&A and submit documents with full understanding of what you're filing.", icon: "✅" },
];

const testimonials = [
    { quote: "CoCoLaw.ai helped me understand my rights and file my motion correctly. I felt prepared walking into court for the first time.", name: "Marcus T.", role: "Pro Se Litigant, Civil Case" },
    { quote: "The procedural guidance alone saved my case from being dismissed. I had no idea about filing deadlines until CoCoLaw flagged it.", name: "Priya S.", role: "Self-Represented, Family Court" },
    { quote: "As someone with no legal background, having a 24/7 AI co-counsel changed everything. The document drafting feature is invaluable.", name: "James R.", role: "Pro Se Plaintiff, Employment Case" },
];

const market = [
    { title: "Massive Total Addressable Market", desc: "Millions of pro se cases filed annually represent a significant and often underserved market.", metric: "60M+", metricLabel: "cases/year" },
    { title: "Early Validation", desc: "Initial market interest demonstrated by beta users, waitlist sign-ups, and successful pilot programs.", metric: "2K+", metricLabel: "beta users" },
    { title: "Growing Trend", desc: "AI is increasing pro se filings, with certain categories growing over 49%, indicating rising demand.", metric: "49%", metricLabel: "growth" },
    { title: "Scalable SaaS Model", desc: "Tiered subscriptions and premium add-ons for enhanced features and dedicated support.", metric: "$2B+", metricLabel: "TAM" },
];

/* ─── Component ──────────────────────────────────────────────── */
const Home = () => {
    useReveal();

    return (
        <div className="bg-gray-50 overflow-x-hidden">

            {/* ── HERO ── */}
            <section className="relative bg-[#0A0F1C] text-white overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <HeroPattern />

                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-20 hidden lg:block pointer-events-none">
                    <ScalesSVG />
                </div>
                <div className="absolute left-6 bottom-24 w-24 h-24 text-white opacity-20 hidden lg:block pointer-events-none">
                    <GavelSVG />
                </div>

                <div className="relative z-10 text-center py-24 px-6 max-w-4xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-600 text-xs uppercase tracking-widest text-gray-400 animate-fadein">
                        The First AI Platform Purpose-Built for Pro Se Litigants
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto leading-tight tracking-tight animate-slidein">
                        CoCoLaw.ai:<br />
                        <span className="text-gray-300">Your AI Co-Counsel</span>
                    </h1>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed animate-fadein-delay">
                        Leveling the playing field for the <strong className="text-white">80%+ of litigants</strong> who go to court without a lawyer.
                        Professional legal intelligence at a fraction of the cost.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fadein-delay2">
                        <Link to="/signup" className="bg-white text-black px-8 py-3.5 rounded-md font-semibold hover:bg-gray-100 transition text-sm">
                            Get Started Free →
                        </Link>
                        <Link to="/services" className="border border-gray-500 text-white px-8 py-3.5 rounded-md hover:border-white hover:bg-white hover:text-black transition text-sm font-medium">
                            Explore Services
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-500 animate-fadein-delay2">
                        <span className="flex items-center gap-1.5">🔒 Bank-grade Security</span>
                        <span className="flex items-center gap-1.5">⚖️ Jurisdiction-Aware AI</span>
                        <span className="flex items-center gap-1.5">📋 Court-Ready Documents</span>
                        <span className="flex items-center gap-1.5">🕐 24/7 Availability</span>
                    </div>
                </div>

                <div className="relative z-10 border-t border-gray-800 bg-[#0d1324]">
                    <div className="grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
                        {stats.map((s, i) => (
                            <div key={i} className={`px-6 py-5 text-center ${i < 3 ? "border-r border-gray-800" : ""} ${i >= 2 ? "border-t border-gray-800 md:border-t-0" : ""}`}>
                                <p className="text-2xl font-black text-white">{s.value}</p>
                                <p className="text-xs text-gray-400 mt-1 leading-snug">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROBLEM ── */}
            <section className="px-6 md:px-16 py-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>
                        Challenges for Self-Represented Litigants
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" data-reveal>
                        Pro Se Litigants Face an Uphill Battle
                    </h2>
                    <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10" data-reveal>
                        Millions of Americans navigate courts alone every year. Without legal representation, even valid cases fail — not because of weak facts, but due to procedural mistakes.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: "📉", title: "Low Success Rate", desc: "Pro se plaintiffs win only 2–11% of federal civil cases, compared to 40%+ with representation. The gap is stark and well-documented." },
                            { icon: "🚧", title: "Procedural Hurdles", desc: "Most cases fail due to early procedural issues — dismissals for improper service, missed deadlines, deficient pleadings, and unfiled motions." },
                            { icon: "⚖️", title: "Unequal Playing Field", desc: "Courts enforce identical complex rules of procedure and evidence for both licensed attorneys and self-represented individuals." },
                        ].map((item, i) => (
                            <div key={i} data-reveal className="bg-gray-50 border-l-4 border-[#0A0F1C] p-6 rounded-lg group hover:shadow-md transition-all duration-300">
                                <div className="text-2xl mb-3">{item.icon}</div>
                                <h3 className="font-bold mb-2 text-[#0A0F1C]">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY EXISTING FAIL ── */}
            <section className="px-6 md:px-16 py-16 bg-gray-50" style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" data-reveal>Why Existing Solutions Fall Short</h2>
                    <p className="text-gray-500 text-sm text-center mb-10" data-reveal>The tools available today were never built with pro se litigants in mind.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { num: 1, title: "Court Self-Help Resources", desc: "Provide only surface-level guidance with no personalization, leaving litigants lost when their case hits complexity.", icon: "🏛️" },
                            { num: 2, title: "Generic AI Tools", desc: "Not trained on legal data hallucinate citations, ignore jurisdictional rules, and can't draft court-ready documents.", icon: "🤖" },
                            { num: 3, title: "Traditional Legal Aid", desc: "Overwhelmed by demand and chronically underfunded — most eligible individuals are turned away or face multi-month waits.", icon: "🏢" },
                        ].map((item, i) => (
                            <div key={i} data-reveal className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:border-[#0A0F1C] transition-all duration-300">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <div className="w-8 h-8 bg-[#0A0F1C] rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{item.num}</span>
                                </div>
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center p-4 bg-white rounded-lg border border-gray-200" data-reveal>
                        <p className="text-sm text-gray-500 italic">
                            The justice gap widens every year  pro se filings are up 49% in some categories, yet the support infrastructure has barely moved.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="px-6 md:px-16 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2" data-reveal>Platform Features</p>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" data-reveal>Everything You Need to Fight Your Case</h2>
                        <p className="text-gray-500 text-sm max-w-xl mx-auto" data-reveal>The first AI platform purpose-built for pro se litigants  covering every stage of litigation.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {features.map((item, i) => (
                            <div key={i} data-reveal className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#0A0F1C] transition-all duration-300 group">
                                <div className="w-9 h-9 bg-[#0A0F1C] rounded-full mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                    <span className="text-white text-xs font-bold">{item.icon}</span>
                                </div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="px-6 md:px-16 py-16 bg-[#0A0F1C] text-white relative overflow-hidden" style={{ borderTop: "3px solid #1e2740", borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-0 top-0 bottom-0 w-64 opacity-20 flex items-center justify-center pointer-events-none lg:flex">
                    <div className="w-48 h-48 text-white"><ScalesSVG /></div>
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" data-reveal>How It Works</h2>
                    <p className="text-gray-400 text-sm text-center mb-12" data-reveal>From your first question to your final filing  a streamlined journey.</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-0">
                        {howItWorks.map((step, i) => (
                            <div key={i} data-reveal className={`p-6 ${i < 3 ? "md:border-r border-gray-700" : ""} ${i === 1 || i === 3 ? "sm:border-l border-gray-700 md:border-l-0" : ""} border-b md:border-b-0 border-gray-800`}>
                                <div className="text-4xl font-black text-gray-700 mb-1">{step.num}</div>
                                <div className="text-xl mb-3">{step.icon}</div>
                                <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center" data-reveal>
                        <Link to="/signup" className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition text-sm">
                            Start Your Case Now →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="px-6 md:px-16 py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Real Users, Real Results</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" data-reveal>What Our Users Say</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} data-reveal className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-md transition-all duration-300">
                                <div className="text-2xl text-gray-300 font-serif mb-3">"</div>
                                <p className="text-sm text-gray-600 leading-relaxed italic mb-4">{t.quote}</p>
                                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                                    <div className="w-9 h-9 rounded-full bg-[#0A0F1C] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#0A0F1C]">{t.name}</p>
                                        <p className="text-xs text-gray-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MARKET OPPORTUNITY ── */}
            <section className="px-6 md:px-16 py-16 bg-white" style={{ borderTop: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" data-reveal>Market Opportunity & Traction</h2>
                    <p className="text-gray-500 text-sm text-center mb-10" data-reveal>A vast, underserved market ready for a purpose-built solution.</p>
                    <div className="grid md:grid-cols-2 gap-5">
                        {market.map((item, i) => (
                            <div key={i} data-reveal className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300">
                                <div className="shrink-0 text-right w-16">
                                    <p className="text-lg font-black text-[#0A0F1C] leading-none">{item.metric}</p>
                                    <p className="text-xs text-gray-400">{item.metricLabel}</p>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES PREVIEW — NOW DARK ── */}
            <section className="px-6 md:px-16 py-16 bg-[#0A0F1C] text-white relative overflow-hidden" style={{ borderTop: "3px solid #1e2740", borderBottom: "3px solid #1e2740" }}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <HeroPattern />
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-48 opacity-20 hidden lg:flex items-center justify-center pointer-events-none">
                    <div className="w-36 h-36 text-white"><GavelSVG /></div>
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-2" data-reveal>What We Offer</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white" data-reveal>Purpose-Built Legal Tools</h2>
                    <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>Every feature was designed around the specific challenges pro se litigants face — from research to the courtroom.</p>
                    <div className="grid md:grid-cols-3 gap-5 mb-8">
                        {[
                            { icon: <div className="w-12 h-12 text-white"><DocSVG /></div>, title: "Legal Research & Drafting", desc: "Court-ready motions, complaints, and responses — drafted by AI, tailored to your jurisdiction." },
                            { icon: <div className="w-12 h-12 text-white"><ShieldSVG /></div>, title: "Evidence & Objections", desc: "Organize exhibits, flag admissibility issues, and prepare legally sound objections before trial." },
                            { icon: <div className="text-3xl">🎯</div>, title: "Courtroom Preparation", desc: "Scripted opening statements, decorum guides, and judicial Q&A practice sessions." },
                        ].map((item, i) => (
                            <div key={i} data-reveal className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/25 transition-all duration-300 text-center">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-white">{item.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" data-reveal>
                        <Link to="/services" className="inline-block border border-white/30 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-white hover:text-[#0A0F1C] transition-all duration-200">
                            View All Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── OUR MISSION — NOW LIGHT ── */}
            <section className="bg-white text-[#0A0F1C] text-center py-20 px-6" style={{ borderTop: "1px solid #e5e7eb" }}>
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3" data-reveal>Our Mission</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0A0F1C]" data-reveal>
                        CoCoLaw.ai doesn't replace lawyers  it empowers the millions who cannot afford them.
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm leading-relaxed mb-8" data-reveal>
                        A justice system where self-representation is not a disadvantage. Access high-quality legal intelligence, right when you need it.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/signup" className="bg-[#0A0F1C] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-gray-800 transition text-sm">
                            Start Your Legal Journey Today →
                        </Link>
                        <Link to="/bookings" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3.5 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── ANIMATIONS ── */}
            <style>{`
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes slidein {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fadein       { animation: fadein  0.7s ease both; }
                .animate-fadein-delay  { animation: fadein  0.9s 0.2s ease both; }
                .animate-fadein-delay2 { animation: fadein  0.9s 0.4s ease both; }
                .animate-slidein      { animation: slidein 0.8s 0.1s ease both; }

                [data-reveal] {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                [data-reveal].revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
};

export default Home;