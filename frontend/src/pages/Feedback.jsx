import { useEffect, useState } from "react";

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

const categories = ["General Feedback", "Feature Request", "Document Drafting", "Procedural Guidance", "Courtroom Coaching", "Billing & Account", "Other"];
const ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const highlights = [
    { icon: "🛠️", title: "Shapes the Platform", desc: "Every submission is reviewed by our product team. Your feedback directly influences what we build next." },
    { icon: "⚡", title: "Fast Response", desc: "Feature requests and bug reports receive a response within 2 business days." },
    { icon: "🔒", title: "Private & Secure", desc: "Your feedback is confidential. We never share individual submissions externally." },
];

const Feedback = () => {
    useReveal();
    const [rating, setRating] = useState(null);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim() || !category) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
                <div className="text-center max-w-md animate-fadein">
                    <div className="w-20 h-20 bg-[#0A0F1C] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                    <h2 className="text-2xl font-black text-[#0A0F1C] mb-3">Thank You!</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Your feedback has been received. Our product team reviews every submission — yours genuinely helps us improve CoCoLaw.ai for everyone.
                    </p>
                    <a href="/" className="inline-block bg-[#0A0F1C] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-gray-800 transition">
                        Back to Home
                    </a>
                </div>
                <style>{`.animate-fadein { animation: fadein 0.7s ease both; } @keyframes fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">

            {/* HERO */}
            <div className="bg-[#0A0F1C] text-white py-16 px-6 text-center relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="fg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#fg)"/>
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">We're Listening</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 animate-slidein">Submit Feedback</h1>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed animate-fadein-delay">
                        Help us build a better platform. Every piece of feedback is read, categorized, and acted on by our team.
                    </p>
                </div>
            </div>

            {/* WHY FEEDBACK MATTERS */}
            <section className="px-6 md:px-16 py-12 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
                    {highlights.map((h, i) => (
                        <div key={i} data-reveal className="flex gap-4 items-start">
                            <div className="text-2xl shrink-0">{h.icon}</div>
                            <div>
                                <h3 className="font-bold text-sm text-[#0A0F1C] mb-1">{h.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FORM */}
            <section className="px-6 md:px-16 py-14">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Rating */}
                        <div data-reveal className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-sm font-bold text-[#0A0F1C] mb-4">Overall Experience</label>
                            <div className="flex gap-3 flex-wrap">
                                {ratings.map((r, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onMouseEnter={() => setHoveredRating(i)}
                                        onMouseLeave={() => setHoveredRating(null)}
                                        onClick={() => setRating(i)}
                                        className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-lg border-2 text-sm transition-all duration-150 ${
                                            rating === i
                                                ? "border-[#0A0F1C] bg-[#0A0F1C] text-white"
                                                : "border-gray-200 hover:border-gray-400"
                                        }`}
                                    >
                                        <span>{r}</span>
                                        <span className="text-xs opacity-70">{ratingLabels[i]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div data-reveal className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-sm font-bold text-[#0A0F1C] mb-3">Feedback Category <span className="text-red-400">*</span></label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
                                            category === cat
                                                ? "bg-[#0A0F1C] text-white border-[#0A0F1C]"
                                                : "border-gray-200 text-gray-600 hover:border-[#0A0F1C]"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div data-reveal className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-sm font-bold text-[#0A0F1C] mb-3">Your Feedback <span className="text-red-400">*</span></label>
                            <textarea
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={5}
                                placeholder="Tell us what's working well, what could be improved, or what you'd like to see added…"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0A0F1C] transition resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">{message.length}/2000 characters</p>
                        </div>

                        {/* Email */}
                        <div data-reveal className="bg-white rounded-xl border border-gray-200 p-6">
                            <label className="block text-sm font-bold text-[#0A0F1C] mb-1">Email (optional)</label>
                            <p className="text-xs text-gray-400 mb-3">Include your email if you'd like a response from our team.</p>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0A0F1C] transition"
                            />
                        </div>

                        <div data-reveal>
                            <button
                                type="submit"
                                disabled={!message.trim() || !category}
                                className="w-full bg-[#0A0F1C] text-white py-3.5 rounded-md font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Submit Feedback →
                            </button>
                        </div>
                    </form>
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

export default Feedback;