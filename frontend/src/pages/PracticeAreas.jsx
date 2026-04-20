import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Gavel } from "lucide-react";

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

const practiceAreas = [
    {
        num: "01", icon: "🏢", id: "corporate-law",
        title: "Corporate Law",
        subtitle: "Business Formation, Contracts & Compliance",
        desc: "We help businesses of all sizes operate efficiently, grow confidently, and stay fully compliant with applicable laws and regulations.",
        features: [
            "Business formation  incorporation, LLC setup, and structure advisory",
            "Contract drafting, review, and negotiation",
            "Corporate governance and regulatory compliance",
            "Mergers, acquisitions, and business restructuring",
            "Shareholder agreements and partnership disputes",
        ],
    },
    {
        num: "02", icon: "⚖️", id: "criminal-defense",
        title: "Criminal Defense",
        subtitle: "Aggressive Protection of Your Rights",
        desc: "When your freedom and reputation are on the line, you need a defense team that is aggressive, prepared, and relentless. We protect your rights at every stage of the criminal process.",
        features: [
            "Case evaluation and defense strategy development from day one",
            "Full representation throughout all court proceedings",
            "Appeals, post-conviction relief, and sentence mitigation",
            "Bail hearings and pre-trial strategy",
            "Protecting client rights against unlawful search, seizure, or procedure",
        ],
    },
    {
        num: "03", icon: "👨‍👩‍👧", id: "family-law",
        title: "Family Law",
        subtitle: "Sensitive Matters Handled with Expertise & Empathy",
        desc: "We handle the most sensitive personal legal matters with discretion, empathy, and strategic clarity. Family law cases require both legal expertise and human understanding we provide both.",
        features: [
            "Divorce proceedings and marital asset division",
            "Child custody arrangements and parenting plans",
            "Spousal and child support agreements",
            "Settlement negotiations and mediation",
            "Domestic violence legal protection orders",
        ],
    },
    {
        num: "04", icon: "🏛️", id: "civil-litigation",
        title: "Civil Litigation",
        subtitle: "Strategic Dispute Resolution from Filing to Verdict",
        desc: "When disputes escalate into legal action, you need a litigation team with the strategic depth to win. We represent clients in civil disputes with a clear, evidence-driven approach.",
        features: [
            "Commercial and contractual disputes",
            "Property and real estate litigation",
            "Tort claims and personal injury representation",
            "Alternative dispute resolution  mediation and arbitration",
            "Pre-litigation strategy and demand letter drafting",
        ],
    },
    {
        num: "05", icon: "💡", id: "intellectual-property",
        title: "Intellectual Property",
        subtitle: "Protecting Your Ideas, Brand & Creative Work",
        desc: "Your ideas, brand, and creative work have commercial value. We protect that value with proactive IP strategy and enforcement.",
        features: [
            "Trademark registration and brand protection",
            "Copyright registration and infringement defense",
            "IP licensing and commercialization agreements",
            "Cease and desist actions against unauthorized use",
            "IP portfolio management and advisory",
        ],
    },
];

const PracticeAreas = () => {
    useReveal();

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">

            {/* Hero */}
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-8 bottom-0 opacity-5 hidden lg:block pointer-events-none">
                    <Gavel size={160} color="white" strokeWidth={0.8} />
                </div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#pg)"/>
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Comprehensive Legal Services</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">Our Practice Areas</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        Cocolaw.ai provides expert legal representation and strategic counsel across a broad range of practice areas. Whatever your legal challenge, our attorneys bring specialized experience
                         and a results-focused approach.
                    </p>
                </div>
            </div>

            {/* Practice Areas */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col gap-8">
                        {practiceAreas.map((area, i) => (
                            <div key={i} id={area.id} data-reveal
                                className="bg-gray-50 rounded-2xl border-l-4 border-[#0A0F1C] p-6 md:p-8 hover:shadow-md transition-all duration-300 scroll-mt-20">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="md:w-12 flex items-start justify-start md:justify-center pt-1 shrink-0">
                                        <div className="w-11 h-11 bg-[#0A0F1C] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {area.num}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl">{area.icon}</span>
                                            <p className="text-xs text-gray-400">{area.subtitle}</p>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#0A0F1C] mb-3">{area.title}</h2>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{area.desc}</p>
                                        <ul className="space-y-2">
                                            {area.features.map((f, fi) => (
                                                <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-[#0A0F1C] font-bold mt-0.5 shrink-0">→</span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-14 px-6 bg-gray-50">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3" data-reveal>Ready to take on your case?</h2>
                    <p className="text-gray-500 text-sm mt-2 mb-6 leading-relaxed" data-reveal>
                        Book a consultation today. Our attorneys come prepared  no generic advice, just real, actionable guidance from the first conversation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/bookings" className="bg-[#0A0F1C] text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-semibold text-sm">
                            Book a Consultation →
                        </Link>
                        <Link to="/contact" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                            Contact Us
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

export default PracticeAreas;