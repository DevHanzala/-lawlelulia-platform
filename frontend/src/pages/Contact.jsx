import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useInquiryStore from "../store/useInquiryStore";

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
            }),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

const practiceAreas = [
    "Family Law","Landlord–Tenant","Employment & Labor",
    "Consumer & Debt","Civil Rights § 1983","Probate & Estates",
    "Criminal Defense","Immigration","General Inquiry",
];

const contactInfo = [
    { label:"Phone", value:"+1 (213) 555-0192", sub:"Mon–Fri, 9am–6pm PT", href:"tel:+12135550192",
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.87 1.18 2 2 0 012.86 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>},
    { label:"Email", value:"support@cocolaw.ai", sub:"Response within 24 hours", href:"mailto:support@cocolaw.ai",
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>},
    { label:"Office", value:"350 S Grand Ave, Suite 2800", sub:"Los Angeles, CA 90071", href:"https://maps.google.com",
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>},
    { label:"Live Chat", value:"AI Co-Counsel Bot", sub:"Available 24/7 on every page", href:null,
      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>},
];

const faqs = [
    { q:"How quickly will I receive a response?", a:"Our team responds within 24 business hours. For urgent matters, use our live AI chat — available 24/7." },
    { q:"Does submitting this form create an attorney-client relationship?", a:"No. Submitting an inquiry does not create an attorney-client relationship. CoCoLaw.ai provides AI-powered legal guidance, not traditional legal representation." },
    { q:"Is my information kept confidential?", a:"Yes. All information is encrypted in transit and at rest. We never sell or share your personal data with third parties." },
];

const Contact = () => {
    useReveal();
    const { isAuthenticated, user } = useAuthStore();
    const authed = isAuthenticated();
    const isAdmin = authed && user?.role === "admin";
    const { submitInquiry, loading } = useInquiryStore();

    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [apiError, setApiError] = useState("");
    const [form, setForm] = useState({ name: user?.fullName || "", email: user?.email || "", phone: "", subject: "", message: "" });

    const handleChange = (e) => { setApiError(""); setForm({ ...form, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setApiError("");
        const res = await submitInquiry({ name:form.name, email:form.email, phone:form.phone, subject:form.subject, message:form.message });
        if (res.success) setSubmitted(true);
        else setApiError(res.error || "Something went wrong. Please try again.");
    };

    const charLimit = 2000;
    const filled = form.name && form.email && form.message;

    if (submitted) return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md animate-fadein">
                <div className="w-20 h-20 bg-[#0A0F1C] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-9 h-9"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-2xl font-black text-[#0A0F1C] mb-3">Inquiry Received</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">Thank you, <strong>{form.name.split(" ")[0]}</strong>. Our team will review your inquiry and respond within 24 business hours.</p>
                <p className="text-gray-400 text-xs mb-8">A confirmation will be sent to <strong>{form.email}</strong></p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/" className="inline-block bg-[#0A0F1C] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">Back to Home</Link>
                    {!isAdmin && <Link to="/bookings" className="inline-block border border-[#0A0F1C] text-[#0A0F1C] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0A0F1C] hover:text-white transition">Book a Consultation</Link>}
                </div>
            </div>
            <style>{`@keyframes fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.animate-fadein{animation:fadein 0.6s ease both;}`}</style>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">
            {/* Hero */}
            <div className="bg-[#0A0F1C] text-white relative overflow-hidden" style={{borderBottom:"3px solid #1e2740"}}>
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="cg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#cg)"/>
                        <circle cx="700" cy="80" r="160" fill="none" stroke="white" strokeWidth="0.4"/>
                        <circle cx="700" cy="80" r="110" fill="none" stroke="white" strokeWidth="0.4"/>
                    </svg>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-16">
                    <div className="max-w-xl">
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Get in Touch</p>
                        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 animate-slidein">We Respond.<br/><span className="text-gray-400">Fast.</span></h1>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed animate-fadein-delay">Whether you have a specific legal question, need to understand your options, or are ready to engage our services — our team responds promptly.</p>
                        <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 animate-fadein-delay">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"/>24h response time</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"/>Enterprise-grade security</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"/>No-obligation inquiry</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main */}
            <section className="px-6 md:px-16 py-14">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left */}
                        <div className="lg:w-5/12 flex flex-col gap-6" data-reveal>
                            <div>
                                <h2 className="font-bold text-[#0A0F1C] mb-4 uppercase tracking-wider text-xs">Contact Information</h2>
                                <div className="flex flex-col gap-3">
                                    {contactInfo.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#0A0F1C] hover:shadow-sm transition-all duration-200 group">
                                            <div className="w-10 h-10 bg-[#0A0F1C] rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200">{item.icon}</div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                                                {item.href ? <a href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="text-sm font-semibold text-[#0A0F1C] hover:underline mt-0.5 block">{item.value}</a> : <p className="text-sm font-semibold text-[#0A0F1C] mt-0.5">{item.value}</p>}
                                                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {!isAdmin && (
                                <div className="bg-[#0A0F1C] rounded-xl p-6 text-white">
                                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Skip the Wait</p>
                                    <p className="text-base font-bold mb-1">Ready to Book?</p>
                                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">Schedule a consultation directly — available 24/7.</p>
                                    <Link to="/bookings" className="inline-block bg-white text-[#0A0F1C] px-5 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition">Book a Consultation →</Link>
                                </div>
                            )}
                            <div>
                                <h2 className="text-xs font-bold text-[#0A0F1C] mb-3 uppercase tracking-wider">Common Questions</h2>
                                <div className="flex flex-col gap-2">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-200">
                                            <button onClick={() => setOpenFaq(openFaq===i?null:i)} className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
                                                <span className="text-xs font-semibold text-[#0A0F1C] leading-snug">{faq.q}</span>
                                                <span className={`text-gray-400 text-lg leading-none shrink-0 transition-transform duration-200 ${openFaq===i?"rotate-45":""}`}>+</span>
                                            </button>
                                            {openFaq===i && <div className="px-4 pb-4 border-t border-gray-100"><p className="text-xs text-gray-500 leading-relaxed pt-3">{faq.a}</p></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: form */}
                        <div className="lg:w-7/12" data-reveal>
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="mb-6 pb-5 border-b border-gray-100">
                                    <h2 className="text-xl font-black text-[#0A0F1C]">Submit an Inquiry</h2>
                                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">Tell us about your legal matter. Our team reviews every inquiry and responds within 24 business hours.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name <span className="text-red-400">*</span></label>
                                            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="h-11 px-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition bg-gray-50 focus:bg-white"/>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-400">*</span></label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="h-11 px-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition bg-gray-50 focus:bg-white"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone (Optional)</label>
                                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-0000" className="h-11 px-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition bg-gray-50 focus:bg-white"/>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Practice Area</label>
                                            <select name="subject" value={form.subject} onChange={handleChange} className="h-11 px-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent transition bg-gray-50 focus:bg-white text-gray-700">
                                                <option value="">Select a practice area</option>
                                                {practiceAreas.map(a=><option key={a}>{a}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Message <span className="text-red-400">*</span></label>
                                            <span className={`text-xs ${form.message.length>charLimit*0.9?"text-red-400":"text-gray-300"}`}>{form.message.length}/{charLimit}</span>
                                        </div>
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={6} maxLength={charLimit} placeholder="Tell us about your legal matter. Include relevant dates, parties involved, and any deadlines you're facing…" className="p-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0A0F1C] focus:border-transparent resize-none transition bg-gray-50 focus:bg-white leading-relaxed"/>
                                    </div>
                                    {apiError && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium"><span>⚠</span>{apiError}</div>}
                                    <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="w-8 h-8 bg-[#0A0F1C] rounded-lg flex items-center justify-center shrink-0">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 mb-0.5">Your information is protected</p>
                                            <p className="text-xs text-gray-400 leading-relaxed">Encrypted in transit and at rest. Submitting this form does not create an attorney-client relationship.</p>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={!filled||loading} className="w-full bg-[#0A0F1C] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 active:scale-[0.99] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        {loading ? (<><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Submitting…</>) : (<>Submit Inquiry<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>)}
                                    </button>
                                    <p className="text-xs text-gray-400 text-center">Prefer to talk directly? <a href="tel:+12135550192" className="text-[#0A0F1C] font-semibold hover:underline">Call us +1 (213) 555-0192</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
                @keyframes slidein{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
                .animate-fadein{animation:fadein 0.7s ease both}
                .animate-fadein-delay{animation:fadein 0.9s 0.25s ease both}
                .animate-slidein{animation:slidein 0.8s 0.05s ease both}
                [data-reveal]{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}
                [data-reveal].revealed{opacity:1;transform:translateY(0)}
            `}</style>
        </div>
    );
};

export default Contact;