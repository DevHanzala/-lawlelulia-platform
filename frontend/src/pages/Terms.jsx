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

const terms = [
    { id: "1", icon: "👤", title: "Acceptance of Terms", content: `By accessing or using CoCoLaw.ai ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, you must not use the Platform. These Terms constitute a binding legal agreement between you and CoCoLaw.ai, Inc.\n\nWe reserve the right to modify these Terms at any time. Material changes will be communicated via email at least 14 days before taking effect. Continued use after changes constitutes acceptance.` },
    { id: "2", icon: "📋", title: "Description of Service", content: `CoCoLaw.ai is a legal technology platform providing AI-powered tools for self-represented ("pro se") litigants, including legal research assistance, document drafting, procedural guidance, and courtroom preparation tools.\n\nThe Platform is a software tool only. CoCoLaw.ai is not a law firm. No attorney-client relationship is created by your use of the Platform. Information generated does not constitute legal advice.` },
    { id: "3", icon: "✅", title: "Eligibility & Accounts", content: `You must be at least 18 years of age to create an account. By registering, you represent that all information you provide is accurate.\n\nYou are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately at security@cocolaw.ai of any unauthorized access.` },
    { id: "4", icon: "⚖️", title: "Permitted & Prohibited Use", content: `Permitted: You may use the Platform solely for lawful purposes in connection with your own legal matters.\n\nProhibited: You may not (a) generate content to harass or harm any person; (b) submit false information to courts; (c) resell Platform outputs without written consent; (d) reverse-engineer our AI models; or (e) use the Platform in violation of applicable law.` },
    { id: "5", icon: "🤖", title: "AI Outputs & Disclaimer", content: `The Platform uses artificial intelligence to generate legal documents, research, and guidance. While we strive for accuracy, AI-generated content may contain errors or outdated information.\n\nYOU ARE SOLELY RESPONSIBLE FOR REVIEWING, VERIFYING, AND CORRECTING ALL AI-GENERATED OUTPUTS BEFORE FILING OR RELYING ON THEM. CoCoLaw.ai makes no warranty that any document generated will be accepted by any court.` },
    { id: "7", icon: "🔐", title: "Intellectual Property", content: `All software, AI models, and proprietary processes are owned by CoCoLaw.ai, Inc. and protected by applicable intellectual property laws. You receive a limited, non-exclusive license to use the Platform during your subscription.\n\nYou retain full ownership of all content you submit. You grant CoCoLaw.ai a limited license to process your content solely for delivering services. We do not use your content to train our AI models.` },
    { id: "8", icon: "🛡️", title: "Limitation of Liability", content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, COCOLAW.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF CASE OUTCOME OR LOST PROFITS.\n\nIN NO EVENT SHALL COCOLAW.AI'S TOTAL LIABILITY EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM OR (B) $100.` },
    { id: "9", icon: "⚖️", title: "Dispute Resolution", content: `These Terms are governed by the laws of the State of Delaware. Any dispute shall be resolved by binding individual arbitration under AAA Commercial Arbitration Rules. Class actions are waived.\n\nBefore initiating arbitration, contact us at legal@cocolaw.ai and allow 30 days for informal resolution.` },
    { id: "10", icon: "📬", title: "Contact", content: `General questions: legal@cocolaw.ai\nPrivacy matters: privacy@cocolaw.ai\nBilling matters: billing@cocolaw.ai\n\nCoCoLaw.ai, Inc. | Last updated: January 1, 2025` },
];

const Terms = () => {
    useReveal();
    const [active, setActive] = useState(null);

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
                <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none">
                    <Scale size={180} color="white" strokeWidth={0.8} />
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="tg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#tg)"/>
                        <circle cx="700" cy="50" r="200" fill="none" stroke="white" strokeWidth="0.4"/>
                    </svg>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Legal</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 animate-slidein">Terms of Service</h1>
                    <p className="text-gray-400 text-sm animate-fadein-delay">Effective: January 1, 2025 · Last updated: January 1, 2025</p>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed mt-3 animate-fadein-delay">
                        These Terms govern your use of CoCoLaw.ai. Please read them carefully before using our platform.
                    </p>
                </div>
            </div>

            {/* Key Points */}
            <section className="px-6 md:px-16 py-10 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-6" data-reveal>Key Points at a Glance</p>
                    <div className="grid sm:grid-cols-3 gap-4" data-reveal>
                        {[
                            { icon: "⚖️", label: "Not a law firm", sub: "No attorney-client relationship is created by using this platform." },
                            { icon: "🔍", label: "Verify all AI outputs", sub: "You are responsible for reviewing all AI-generated content before filing." },
                            { icon: "🗓️", label: "Cancel anytime", sub: "Month-to-month subscriptions — no long-term contracts required." },
                        ].map((b, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 hover:border-[#0A0F1C] transition-colors duration-200">
                                <div className="text-2xl mb-2">{b.icon}</div>
                                <div className="font-bold text-sm text-[#0A0F1C] mb-1">{b.label}</div>
                                <div className="text-xs text-gray-500 leading-relaxed">{b.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Terms Sections */}
            <section className="px-6 md:px-16 py-14">
                <div className="max-w-3xl mx-auto space-y-4">
                    {terms.map((term) => (
                        <div key={term.id} id={`term-${term.id}`} data-reveal className="bg-white rounded-xl border border-gray-200 overflow-hidden scroll-mt-6 hover:border-gray-300 transition-colors duration-200">
                            <button className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition"
                                onClick={() => setActive(active === term.id ? null : term.id)}>
                                <span className="text-lg shrink-0">{term.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-gray-400 font-medium">Section {term.id}</span>
                                    <h2 className="font-bold text-sm text-[#0A0F1C]">{term.title}</h2>
                                </div>
                                <span className={`text-[#0A0F1C] font-bold text-lg transition-transform duration-200 shrink-0 ${active === term.id ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {active === term.id && (
                                <div className="px-6 pb-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-600 leading-relaxed pt-4 whitespace-pre-line">{term.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
};

export default Terms;