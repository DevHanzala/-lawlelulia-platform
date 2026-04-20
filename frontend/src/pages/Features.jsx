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

const features = [
    {
        icon: "🎥",
        id: "video-conferencing",
        title: "Meet Your Lawyer Without Leaving Home",
        subtitle: "Online Lawyer Consultation  Video Call with Your Attorney",
        desc: "We know your time is valuable. That is why every consultation at Cocolaw.ai can be conducted through a secure, private video call  directly on our platform. No travel, no waiting rooms, no rearranging your schedule around an office visit.",
        bullets: [
            "Connect with your attorney from anywhere  your home, your office, or on the go",
            "Private and confidential  your conversations stay between you and your lawyer",
            "Nothing to install or download just click and connect",
            "Available on your phone, tablet, or computer",
        ],
        cta: "Getting legal advice should not feel like a logistical challenge. With Cocolaw.ai, speaking to your attorney is as simple as joining a call.",
    },
    {
        icon: "📅",
        id: "scheduling",
        title: "Book an Appointment in Seconds",
        subtitle: "Smart Scheduling  Law Firm Appointment Booking 24/7",
        desc: "No more phone tags, no more waiting for a callback just to find a time that works. Cocolaw.ai lets you see exactly when our attorneys are available and confirm your consultation instantly  any time of day.",
        bullets: [
            "View live availability and book at a time that suits you",
            "Open for bookings 24 hours a day, 7 days a week",
            "Instant confirmation sent to you as soon as your appointment is booked",
            "Your consultation details are always visible inside your personal account",
        ],
        cta: "We put you in control of your schedule  because starting a relationship with your legal team should never be the hard part.",
    },
    {
        icon: "📊",
        id: "case-tracking",
        title: "Always Know What Is Happening With Your Case",
        subtitle: "Real-Time Case Tracking  Legal Updates for Clients",
        desc: "One of the most common frustrations clients have with law firms is not knowing what is going on. At Cocolaw.ai, we solve that completely. You will always be informed, on time, without having to chase anyone for an update.",
        bullets: [
            "Receive timely reminders before every scheduled call or appointment",
            "Get notified about important dates, filings, and case developments",
            "Never miss a deadline or lose track of an upcoming court date",
            "All updates come directly to you  no need to call and ask",
        ],
        cta: "We believe that a well-informed client is a confident client. Keeping you updated is not just a feature  it is a commitment.",
    },
    {
        icon: "🔒",
        id: "client-portal",
        title: "Your Personal Legal Space  Private and Secure",
        subtitle: "Secure Client Portal  Legal Document Management",
        desc: "Every Cocolaw.ai client receives access to a private online portal  your own dedicated space where everything related to your case lives in one organized, secure location. Think of it as your personal legal dashboard, available whenever you need it.",
        bullets: [
            "See exactly where your case stands at any given moment",
            "Access, share, and store your legal documents safely",
            "Message your legal team directly  no email chains, no confusion",
            "Review your upcoming appointments and important case dates",
        ],
        cta: "Everything you need is in one place, protected, and accessible only by you and your authorized legal team.",
    },
    {
        icon: "🤖",
        id: "ai-assistant",
        title: "Get Answers Anytime  Day or Night",
        subtitle: "24/7 Legal Support  AI-Powered Legal Assistant",
        desc: "Legal questions do not follow business hours. Whether it is a Sunday evening or early morning, Cocolaw.ai's AI-powered assistant is always available to help  answering your questions, guiding you through your options, and connecting you with the right person when needed.",
        bullets: [
            "Instant responses to common legal questions at any hour",
            "Guidance on what to expect from the consultation process",
            "Book a consultation directly through the chat  no phone call required",
            "Seamlessly connects you to a real attorney for anything that needs a human touch",
        ],
        cta: "You should never feel alone when facing a legal situation. Our assistant ensures there is always someone  or something  ready to help the moment you need it.",
    },
];

const Features = () => {
    useReveal();

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">

            {/* Hero */}
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6 relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="fg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#fg)"/>
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Platform Features & Functionality</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">Everything You Need. All in One Place.</h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed animate-fadein-delay">
                        At Cocolaw.ai, we built our platform around one simple idea: your experience as a client should be as stress-free as possible. Every tool is designed to make your legal journey clearer, faster, and more convenient.
                    </p>
                </div>
            </div>

            {/* Features list */}
            <section className="px-6 md:px-16 py-14 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-4xl mx-auto flex flex-col gap-12">
                    {features.map((feature, i) => (
                        <div key={i} id={feature.id} data-reveal className="scroll-mt-20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-[#0A0F1C] rounded-xl flex items-center justify-center text-2xl shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">{feature.subtitle}</p>
                                    <h2 className="text-lg font-bold text-[#0A0F1C]">{feature.title}</h2>
                                </div>
                            </div>
                            <div className="ml-16">
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.desc}</p>
                                <ul className="space-y-2 mb-4">
                                    {feature.bullets.map((b, bi) => (
                                        <li key={bi} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500 italic border-l-4 border-[#0A0F1C] pl-4 bg-gray-50 py-2 pr-4 rounded-r-lg">
                                    {feature.cta}
                                </p>
                            </div>
                            {i < features.length - 1 && <div className="mt-10 border-b border-gray-100" />}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-14 px-6 bg-gray-50">
                <p className="text-sm text-gray-500 mb-2" data-reveal>Every feature is here for one reason  to make your experience easier.</p>
                <h2 className="text-2xl font-bold mb-6" data-reveal>Book your consultation today and discover what it feels like to have a law firm that works around you.</h2>
                <div className="flex flex-wrap justify-center gap-4" data-reveal>
                    <Link to="/bookings" className="bg-[#0A0F1C] text-white px-8 py-3 rounded-md font-semibold text-sm hover:bg-gray-800 transition">
                        Book a Consultation →
                    </Link>
                    <Link to="/client-portal" className="border border-[#0A0F1C] text-[#0A0F1C] px-8 py-3 rounded-md hover:bg-[#0A0F1C] hover:text-white transition text-sm font-medium">
                        Explore Client Portal
                    </Link>
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

export default Features;