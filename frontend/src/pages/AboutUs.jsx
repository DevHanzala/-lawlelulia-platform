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
    </svg>
);

const painPoints = [
    { title: "Lack of Substantive Legal Knowledge", desc: "Insufficient understanding of relevant laws and legal principles to frame a compelling case." },
    { title: "Procedural & Technical Rule Complexity", desc: "Difficulty navigating intricate court rules, filing procedures, and service requirements." },
    { title: "Difficulty with Discovery", desc: "Challenges in gathering, requesting, and presenting evidence from the opposing party." },
    { title: "Evidentiary & Trial Preparation Issues", desc: "Struggles with collecting, organizing, and presenting evidence that will actually be admissible." },
    { title: "Courtroom Inexperience & Decorum", desc: "Unfamiliarity with courtroom etiquette, proper address, and procedural bearing." },
    { title: "Emotional Attachment & Loss of Objectivity", desc: "Personal involvement hindering rational decision-making and strategic judgment." },
    { title: "Resource & Logistical Constraints", desc: "Limited access to financial, informational, and practical support systems." },
    { title: "Massive Time & Energy Demands", desc: "The significant commitment required to manage a legal case alongside daily life." },
    { title: "Perceived/Actual Judicial Bias", desc: "Concerns or direct experiences of unfair treatment by the court or opposing counsel." },
    { title: "Lower Success Rates & Systemic Disadvantages", desc: "Facing an uphill battle due to inherent structural disadvantages in the legal system." },
];

const teamValues = [
    { icon: "⚖️", title: "Access to Justice", desc: "We believe legal representation should not be a luxury. Every person deserves quality legal support regardless of income." },
    { icon: "🔍", title: "Accuracy First", desc: "Our AI is trained specifically on legal data  jurisdiction-aware, citation-verified, and continuously updated." },
    { icon: "🔒", title: "Privacy & Security", desc: "Attorney-client privilege principles guide our data handling. Your case details are encrypted and never sold." },
    { icon: "🤝", title: "Empowerment, Not Replacement", desc: "We don't replace lawyers. We equip you to understand your rights and navigate the system confidently." },
];

const AboutUs = () => {
    useReveal();

    return (
        <div className="bg-gray-50 overflow-x-hidden">

            {/* ── HEADER ── */}
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 text-white opacity-20 hidden lg:block pointer-events-none">
                    <ScalesSVG />
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 animate-fadein">Our Story</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 animate-slidein">About CoCoLaw.ai</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        Empowering self-represented litigants with AI-driven legal support — because access to justice should never depend on the size of your bank account.
                    </p>
                </div>
            </div>

            {/* ── VISION ── */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-2" data-reveal>Our Mission</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-5" data-reveal>Vision & Call to Action</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6" data-reveal>
                        A justice system where self-representation is not a disadvantage where every person, regardless of income, has access to high-quality legal intelligence when they need it most.
                    </p>
                    <blockquote className="border-l-4 border-[#0A0F1C] pl-5 text-left text-gray-700 italic text-sm bg-gray-50 py-4 pr-4 rounded-r-lg" data-reveal>
                        "CoCoLaw.ai doesn't replace lawyers  it empowers the millions who cannot afford them."
                    </blockquote>
                </div>
            </section>

            {/* ── OUR VALUES ── */}
            <section className="px-6 md:px-16 py-14 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>What Drives Us</p>
                    <h2 className="text-2xl font-bold text-center mb-10" data-reveal>Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {teamValues.map((v, i) => (
                            <div key={i} data-reveal className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300 text-center">
                                <div className="text-3xl mb-3">{v.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{v.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROBLEM ── */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>
                        Challenges for Self-Represented Litigants
                    </p>
                    <h2 className="text-2xl font-bold text-center mb-3" data-reveal>The Problem: An Uphill Battle</h2>
                    <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10" data-reveal>
                        Millions of Americans navigate courts alone every year. The statistics are stark  and they reveal a system that was never designed for self-representation.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: "📉", title: "Low Success Rate", desc: "Pro se plaintiffs win only 2–11% of federal civil cases. With representation, that number climbs to over 40%." },
                            { icon: "🚧", title: "Procedural Hurdles", desc: "Most cases fail due to early procedural issues  improper service, missed deadlines, and deficient pleadings." },
                            { icon: "⚖️", title: "Unequal Playing Field", desc: "Courts enforce the same complex rules of procedure and evidence for both licensed attorneys and self-represented individuals." },
                        ].map((item, i) => (
                            <div key={i} data-reveal className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#0A0F1C] hover:shadow-md transition-all duration-300">
                                <div className="text-2xl mb-3">{item.icon}</div>
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PAIN POINTS ── */}
            <section className="px-6 md:px-16 py-14 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-2" data-reveal>Top 10 Pain Points for Pro Se Litigants</h2>
                    <p className="text-gray-500 text-sm text-center mb-10" data-reveal>A high-level overview of the interconnected challenges self-represented individuals face at every stage.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {painPoints.map((point, i) => (
                            <div key={i} data-reveal className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300">
                                <div className="w-7 h-7 rounded-full bg-[#0A0F1C] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                    {i + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#0A0F1C]">{point.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-8 italic" data-reveal>
                        These pain points are deeply interconnected — a single procedural mistake can cascade into case-ending disasters.
                    </p>
                </div>
            </section>

            {/* ── DEEP DIVES ── */}
           <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white" style={{ borderBottom: "1px solid #1e2740" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-10" data-reveal>Pain Point Deep Dives</h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        {[ 
                            {
                                tag: "Knowledge & Research Gaps",
                                title: "Legal Knowledge & Discovery",
                                points: [
                                    "Difficulty recalling specific statutes, elements, and foundational case law for your jurisdiction.",
                                    "Vast and ever-evolving legal information requires constant learning across multiple domains.",
                                    "Challenges identifying and analyzing relevant information in complex, multi-issue litigation."
                                ],
                                note: "Even strong factual cases collapse when not framed with the correct statutes and case law."
                            },
                            {
                                tag: "Challenges & Consequences",
                                title: "Procedural & Evidentiary Traps",
                                points: [
                                    "Understanding the myriad rules governing legal processes from initial filings to final judgments.",
                                    "Ensuring evidence is admissible, properly handled, and trial preparation executed without error.",
                                    "Missing a single filing deadline can end a case before the merits are ever heard."
                                ],
                                note: "Non-compliance leads to denied motions, excluded evidence, and outright case dismissal."
                            },
                            {
                                tag: "Key Challenges",
                                title: "Human & Emotional Barriers",
                                points: [
                                    "Unfamiliar procedural rules and courtroom etiquette can be deeply intimidating under pressure.",
                                    "High personal stakes cloud judgment, making rational, strategic perspective extremely difficult.",
                                    "Concerns about fairness and impartiality undermine trust and confidence in the process."
                                ],
                                note: "Judges cannot offer advice without jeopardizing their impartiality — leaving you truly alone."
                            }
                        ].map((item, i) => (
                            <div key={i} data-reveal className="bg-[#111827] rounded-xl border border-gray-700 p-6 hover:border-white hover:shadow-md transition-all duration-300">
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{item.tag}</p>
                                <h3 className="font-bold mb-3">{item.title}</h3>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    {item.points.map((p, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <span className="font-bold">•</span> {p}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-gray-500 mt-4 italic border-t border-gray-700 pt-3">
                                    {item.note}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ── HOW COCOLAW HELPS ── */}
           <section className="px-6 md:px-16 py-16 bg-white text-black" style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-2" data-reveal>How CoCoLaw.ai Helps</h2>
                    <p className="text-gray-500 text-sm max-w-xl mx-auto text-center mb-10" data-reveal>
                        Addressing every pain point with purpose-built AI tools — available 24/7, no legal background required.
                    </p>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: "🔍", title: "Jurisdiction-Specific Research", desc: "Tailored legal research and document creation specific to your jurisdiction and court rules." },
                            { icon: "📋", title: "Procedural Guidance", desc: "Step-by-step guidance through legal procedures with automatic deadline tracking and reminders." },
                            { icon: "🗂️", title: "Evidence & Courtroom Support", desc: "Organize evidence, draft objections, and prepare courtroom scripts before you ever step foot inside." },
                            { icon: "🧠", title: "Emotional & Settlement Tools", desc: "Manage emotional responses and analyze settlement options with guided decision-making tools." },
                            { icon: "🔒", title: "Affordable & Secure", desc: "Cost-effective subscription model with bank-grade privacy and continuously updated legal information." },
                            { icon: "⚖️", title: "Intelligent Co-Counsel", desc: "Plain-language support available 24/7 — no legal background required to get started." },
                        ].map((item, i) => (
                            <div key={i} data-reveal className="border border-gray-200 rounded-xl p-5 hover:border-black hover:shadow-sm transition-all duration-300">
                                <div className="text-2xl mb-2">{item.icon}</div>
                                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center" data-reveal>
                        <Link to="/signup" className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition text-sm mr-4">
                            Start Your Case →
                        </Link>
                        <Link to="/services" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:border-black hover:text-black transition text-sm">
                            View All Services
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

export default AboutUs;