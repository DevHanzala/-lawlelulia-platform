import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, Gavel } from "lucide-react";

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

const HeroPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
        <rect width="800" height="600" fill="url(#grid)"/>
        <circle cx="650" cy="100" r="200" fill="none" stroke="white" strokeWidth="0.5"/>
        <circle cx="650" cy="100" r="150" fill="none" stroke="white" strokeWidth="0.5"/>
    </svg>
);

const stats = [
    { value: "500+", label: "Cases Successfully Handled" },
    { value: "24/7", label: "AI-Powered Legal Support" },
    { value: "98%", label: "Client Satisfaction Rate" },
    { value: "5", label: "Core Practice Areas" },
];

const whyChoose = [
    { icon: "⚖️", title: "Experienced Legal Professionals", desc: "Skilled attorneys across multiple practice areas delivering results-driven representation." },
    { icon: "💻", title: "Technology-Driven Processes", desc: "Faster, more efficient service delivery through intelligent digital systems." },
    { icon: "🔒", title: "Secure & Transparent", desc: "Real-time client communication with bank-grade security at every step." },
    { icon: "🎯", title: "Personalized Strategies", desc: "Tailored legal approaches built around your specific goals  no generic advice." },
    { icon: "🎥", title: "Built-in Video Conferencing", desc: "Meet your lawyer without leaving home. Consultations available on any device." },
    { icon: "📅", title: "Smart Scheduling 24/7", desc: "Book appointments in seconds, any time of day. Instant confirmation guaranteed." },
    { icon: "🤖", title: "AI-Powered Assistant", desc: "Get answers around the clock. Our AI captures leads and answers queries instantly." },
    { icon: "📊", title: "Real-Time Case Updates", desc: "Always know where your case stands  no chasing, no confusion, no waiting." },
];

const practiceAreas = [
    { icon: "🏢", title: "Corporate Law", desc: "Business formation, contracts, compliance, mergers, and shareholder agreements.", path: "/practice-areas" },
    { icon: "⚖️", title: "Criminal Defense", desc: "Aggressive representation protecting your rights at every stage of the criminal process.", path: "/practice-areas" },
    { icon: "👨‍👩‍👧", title: "Family Law", desc: "Divorce, custody, support, and domestic matters handled with empathy and strategy.", path: "/practice-areas" },
    { icon: "🏛️", title: "Civil Litigation", desc: "Evidence-driven dispute resolution from filing through to verdict.", path: "/practice-areas" },
    { icon: "💡", title: "Intellectual Property", desc: "Trademark, copyright, and IP portfolio protection and enforcement.", path: "/practice-areas" },
];

const testimonials = [
    { quote: "Highly professional and incredibly responsive. The entire process was smooth, efficient, and stress-free. I always knew exactly where my case stood.", name: "Verified Client" },
    { quote: "Excellent service from start to finish. Clear communication, a solid legal strategy, and a great result. I would not hesitate to recommend Cocolaw.ai.", name: "Verified Client" },
    { quote: "Modern, reliable, and genuinely easy to work with. The client portal made everything transparent. I always felt in control of my case.", name: "Verified Client" },
];

const Home = () => {
    useReveal();

    return (
        <div className="bg-gray-50 overflow-x-hidden">

            {/* ── HERO ── */}
            <section className="relative bg-[#0A0F1C] text-white overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <HeroPattern />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none opacity-5">
                    <Scale size={250} color="white" strokeWidth={0.8} />
                </div>
                <div className="absolute left-6 bottom-24 hidden lg:block pointer-events-none opacity-5">
                    <Gavel size={200} color="white" strokeWidth={0.8} />
                </div>

                <div className="relative z-10 text-center py-24 px-6 max-w-4xl mx-auto">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-600 text-xs uppercase tracking-widest text-gray-400 animate-fadein">
                        Strategic Legal Counsel  Smarter. Faster. Better.
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto leading-tight tracking-tight animate-slidein">
                        Welcome to<br />
                        <span className="text-gray-300">Cocolaw.ai</span>
                    </h1>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed animate-fadein-delay">
                        A modern law firm powered by intelligent technology. We deliver a seamless, efficient, and results-driven legal experience for <strong className="text-white">individuals, entrepreneurs, and businesses</strong> who expect more from their legal team.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fadein-delay2">
                        <Link to="/bookings" className="bg-white text-black px-8 py-3.5 rounded-md font-semibold hover:bg-gray-100 transition text-sm">
                            Book a Consultation →
                        </Link>
                        <Link to="/practice-areas" className="border border-gray-500 text-white px-8 py-3.5 rounded-md hover:border-white hover:bg-white hover:text-black transition text-sm font-medium">
                            Our Practice Areas
                        </Link>
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-gray-500 animate-fadein-delay2">
                        <span className="flex items-center gap-1.5">🔒 Enterprise-Grade Security</span>
                        <span className="flex items-center gap-1.5">🎥 Built-in Video Conferencing</span>
                        <span className="flex items-center gap-1.5">📅 Smart Scheduling 24/7</span>
                        <span className="flex items-center gap-1.5">🤖 AI-Powered Assistant</span>
                    </div>
                </div>

                {/* Stats bar */}
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

            {/* ── WHY CHOOSE ── */}
            <section className="px-6 md:px-16 py-16 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Why Cocolaw.ai</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" data-reveal>Why Choose Cocolaw.ai</h2>
                    <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-12" data-reveal>
                        We built more than just a law firm. Cocolaw.ai is a fully integrated legal platform that combines experienced legal representation with powerful digital tools  giving you clarity, control, and convenience at every stage of your case.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {whyChoose.map((item, i) => (
                            <div key={i} data-reveal className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#0A0F1C] transition-all duration-300 group">
                                <div className="text-2xl mb-3">{item.icon}</div>
                                <h3 className="font-bold text-sm mb-2 text-[#0A0F1C]">{item.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SMARTER WAY ── */}
            <section className="px-6 md:px-16 py-16 bg-gray-50" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2" data-reveal>
                            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">A Smarter Way to Access Legal Services</p>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0A0F1C]">Digital Convenience Meets Legal Expertise</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Cocolaw.ai bridges traditional legal expertise with modern digital convenience. From booking your first consultation to tracking the progress of your case in real time, every feature
                                 is designed to give you full control and complete clarity  without the confusion that typically comes with legal processes.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Our platform is mobile-first, lightning-fast, and built to rank on Google  so when you need legal help, you find us immediately, and once you do, getting started takes minutes.
                            </p>
                            <Link to="/bookings" className="inline-block bg-[#0A0F1C] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-gray-800 transition">
                                Book Your Consultation →
                            </Link>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-4" data-reveal>
                            {[
                                { icon: "🎥", title: "Video Consultations", desc: "Meet your lawyer without leaving home. Secure, private, encrypted." },
                                { icon: "📅", title: "Instant Scheduling", desc: "View real-time availability and confirm in under 60 seconds." },
                                { icon: "📊", title: "Live Case Tracking", desc: "Always know what is happening. No chasing for updates." },
                                { icon: "🔒", title: "Secure Portal", desc: "Your private legal dashboard  documents, messages, and dates in one place." },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-300">
                                    <div className="text-xl mb-2">{item.icon}</div>
                                    <h3 className="font-bold text-xs mb-1 text-[#0A0F1C]">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRACTICE AREAS ── */}
            <section className="px-6 md:px-16 py-16 bg-[#0A0F1C] text-white relative overflow-hidden" style={{ borderTop: "3px solid #1e2740", borderBottom: "3px solid #1e2740" }}>
                <HeroPattern />
                <div className="max-w-5xl mx-auto relative z-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-2" data-reveal>Legal Expertise</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" data-reveal>Our Practice Areas</h2>
                    <p className="text-gray-400 text-sm text-center max-w-xl mx-auto mb-10" data-reveal>
                        Comprehensive legal services across all major practice areas — handled by attorneys with specialized experience and a results-focused approach.
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                        {practiceAreas.map((area, i) => (
                            <Link key={i} to={area.path} data-reveal
                                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group">
                                <div className="text-2xl mb-3">{area.icon}</div>
                                <h3 className="font-bold text-sm mb-2">{area.title}</h3>
                                <p className="text-xs text-gray-400 leading-relaxed">{area.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center" data-reveal>
                        <Link to="/practice-areas" className="inline-block border border-white/30 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-white hover:text-[#0A0F1C] transition-all duration-200">
                            View All Practice Areas →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="px-6 md:px-16 py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2" data-reveal>Client Stories</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" data-reveal>What Our Clients Say About Cocolaw.ai</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} data-reveal className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#0A0F1C] hover:shadow-md transition-all duration-300">
                                <div className="text-2xl text-gray-300 font-serif mb-3">"</div>
                                <p className="text-sm text-gray-600 leading-relaxed italic mb-4">{t.quote}</p>
                                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                                    <div className="w-9 h-9 rounded-full bg-[#0A0F1C] flex items-center justify-center text-white text-xs font-bold shrink-0">✓</div>
                                    <p className="text-xs font-bold text-[#0A0F1C]">{t.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-white text-[#0A0F1C] text-center py-20 px-6" style={{ borderTop: "1px solid #e5e7eb" }}>
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3" data-reveal>Get Started Today</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4" data-reveal>
                        Book your consultation today and experience smarter legal services.
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8" data-reveal>
                        Our attorneys come to every consultation fully prepared. We invest real time in understanding your situation so we can give you real, actionable guidance from the very first conversation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4" data-reveal>
                        <Link to="/bookings" className="bg-[#0A0F1C] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-gray-800 transition text-sm">
                            Book a Consultation →
                        </Link>
                        <Link to="/features" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3.5 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                            Explore Features
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slidein { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
                .animate-fadein       { animation: fadein  0.7s ease both; }
                .animate-fadein-delay  { animation: fadein  0.9s 0.2s ease both; }
                .animate-fadein-delay2 { animation: fadein  0.9s 0.4s ease both; }
                .animate-slidein      { animation: slidein 0.8s 0.1s ease both; }
                [data-reveal] { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>
        </div>
    );
};

export default Home;