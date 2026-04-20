import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

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

const values = [
    { icon: "⚖️", title: "Integrity", desc: "Integrity in every client interaction and legal representation no compromises, no shortcuts." },
    { icon: "🔒", title: "Confidentiality", desc: "Strict confidentiality and data protection at every touchpoint of your engagement with us." },
    { icon: "🎯", title: "Excellence", desc: "Excellence in legal execution  we do not cut corners. Every case receives our full attention." },
    { icon: "🏆", title: "Client Success", desc: "Unwavering commitment to client success as the primary outcome of everything we do." },
];

const approach = [
    { num: "01", title: "Deep Understanding", desc: "We begin by thoroughly understanding your specific legal needs and commercial context  no assumptions, no templates." },
    { num: "02", title: "Risk Analysis", desc: "We analyze risks, liabilities, and strategic opportunities unique to your situation before formulating any strategy." },
    { num: "03", title: "Tailored Strategy", desc: "We develop a customized legal strategy built around your goals  not generic advice recycled from previous cases." },
    { num: "04", title: "Precise Execution", desc: "We execute with precision, transparency, and regular communication so you always know where your case stands." },
    { num: "05", title: "Continuous Review", desc: "We review outcomes and refine strategy as your situation evolves  because legal matters rarely stay static." },
];

export const AboutUs = () => {
    useReveal();
    return (
        <div className="bg-gray-50 overflow-x-hidden">
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute right-18 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block pointer-events-none">
                    <Scale size={200} color="white" strokeWidth={0.8} />
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 animate-fadein">Our Story</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 animate-slidein">A Modern Law Firm Built on Innovation and Trust</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        Cocolaw.ai was built with one purpose: to redefine what it means to work with a law firm.
                    </p>
                </div>
            </div>

            {/* Mission */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-2" data-reveal>Our Mission</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-5" data-reveal>Why We Built Cocolaw.ai</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6" data-reveal>
                        We recognized that the legal industry had fallen behind the expectations of modern clients  slow processes, limited transparency, and inconvenient access. We built something different.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 text-left mb-8" data-reveal>
                        {[
                            { icon: "🌐", label: "Accessible", desc: "Available to anyone, anywhere, on any device  no barriers to getting legal help." },
                            { icon: "⚡", label: "Efficient", desc: "Faster processes without sacrificing quality. Technology accelerates our work." },
                            { icon: "📊", label: "Transparent", desc: "Clients always know where their case stands. No chasing for updates." },
                            { icon: "🎯", label: "Results-Driven", desc: "Strategies built around your specific goals  not generic legal templates." },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex gap-3">
                                <span className="text-xl shrink-0">{item.icon}</span>
                                <div>
                                    <p className="font-bold text-sm text-[#0A0F1C]">{item.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <blockquote className="border-l-4 border-[#0A0F1C] pl-5 text-left text-gray-700 italic text-sm bg-gray-50 py-4 pr-4 rounded-r-lg" data-reveal>
                        "We bring together experienced attorneys and intelligent digital systems to deliver legal solutions that are as effective as they are convenient."
                    </blockquote>
                </div>
            </section>

            {/* Approach */}
            <section className="px-6 md:px-16 py-14 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>How We Work</p>
                    <h2 className="text-2xl font-bold text-center mb-10" data-reveal>Our Approach</h2>
                    <div className="grid md:grid-cols-5 gap-4">
                        {approach.map((step, i) => (
                            <div key={i} data-reveal className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300 text-center">
                                <div className="text-3xl font-black text-gray-100 mb-2">{step.num}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{step.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>What Drives Us</p>
                    <h2 className="text-2xl font-bold text-center mb-10" data-reveal>Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {values.map((v, i) => (
                            <div key={i} data-reveal className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300 text-center">
                                <div className="text-3xl mb-3">{v.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{v.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-14 px-6 bg-gray-50">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3" data-reveal>Work with a law firm that works around you.</h2>
                    <p className="text-gray-500 text-sm mb-6" data-reveal>Book a consultation today and experience the Cocolaw.ai difference.</p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/signup" className="bg-[#0A0F1C] text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-semibold text-sm">
                            Get Started →
                        </Link>
                        <Link to="/bookings" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                            Book Consultation
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

export default AboutUs;