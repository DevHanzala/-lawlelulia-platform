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

const sections = [
    {
        id: "1", icon: "📋", title: "Information We Collect",
        content: `We may collect and process the following types of information:\n\na. Personal Information\nWhen you interact with us, you may voluntarily provide personal 
        data including: full name, email address, phone number, mailing address, and any information submitted through contact forms or consultation 
        requests.\n\nb. Non-Personal Information\nWe may automatically collect certain non-identifiable information such as: IP address, browser type and version, device
         information, pages visited and time spent on our website.\n\nc. Sensitive Information\nIf you provide legal details regarding your case, we treat this information with the highest level of 
         confidentiality and security.`,
    },
    {
        id: "2", icon: "🎯", title: "How We Use Your Information",
        content: `We use the collected data for the following purposes:\n\n→ To respond to inquiries and provide legal consultations\n→ To deliver
         and improve our legal services\n→ To communicate updates, responses, or relevant information\n→ To ensure website functionality and security\n→ To comply 
         with legal obligations\n\nWe do not sell, rent, or trade your personal information.`,
    },
    {
        id: "3", icon: "🔐", title: "Confidentiality of Legal Communications",
        content: `Any communication between you and Cocolaw.ai is handled with strict confidentiality. However:\n\n→ Contacting us does not automatically create an
         attorney-client relationship\n→ Confidentiality is only guaranteed once a formal agreement is established`,
    },
    {
        id: "4", icon: "🍪", title: "Cookies and Tracking Technologies",
        content: `Our website may use cookies to enhance user experience. Cookies help us:\n\n→ Understand user behavior\n→ Improve website 
        performance\n→ Customize content\n\nYou can disable cookies through your browser settings at any time.`,
    },
    {
        id: "5", icon: "🤝", title: "Data Sharing and Disclosure",
        content: `We may disclose your information only in the following circumstances:\n\n→ When required by law or legal process\n→ To protect our legal rights 
        or prevent fraud\n→ With trusted service providers assisting in website operations (under confidentiality agreements)\n\nWe ensure that any third-party
         handling of data meets strict privacy standards.`,
    },
    {
        id: "6", icon: "🛡️", title: "Data Security",
        content: `We implement appropriate technical and organizational measures to protect your data, including:\n\n→ Secure servers
         and encryption\n→ Restricted access to sensitive information\n→ Regular monitoring and security updates`,
    },
];

const Privacy = () => {
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
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs><pattern id="pp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                        <rect width="800" height="400" fill="url(#pp)"/>
                    </svg>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Legal</p>
                    <h1 className="text-3xl md:text-4xl font-black mb-3 animate-slidein">Privacy Policy</h1>
                    <p className="text-gray-400 text-sm animate-fadein-delay">Effective: January 1, 2025 · Last updated: January 1, 2025</p>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed mt-3 animate-fadein-delay">
                        At Cocolaw.ai, we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
                    </p>
                </div>
            </div>

            {/* Key Points */}
            <section className="px-6 md:px-16 py-10 bg-white" style={{ borderBottom: "1px solid #e5e7eb" }}>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs uppercase tracking-widest text-slate-400 text-center mb-6" data-reveal>Key Points at a Glance</p>
                    <div className="grid sm:grid-cols-3 gap-4" data-reveal>
                        {[
                            { icon: "🔒", label: "Your Data is Secure", sub: "All client data is encrypted in transit and at rest using enterprise-grade standards." },
                            { icon: "🚫", label: "We Don't Sell Data", sub: "We never sell, rent, or trade your personal information to third parties." },
                            { icon: "⚖️", label: "Legal Confidentiality", sub: "Legal communications are handled with the highest level of confidentiality." },
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

            

            {/* Sections */}
            <section className="px-6 md:px-16 py-14">
                <div className="max-w-3xl mx-auto space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} data-reveal className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors duration-200">
                            <button className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition"
                                onClick={() => setActive(active === section.id ? null : section.id)}>
                                <span className="text-lg shrink-0">{section.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-gray-400 font-medium">Section {section.id}</span>
                                    <h2 className="font-bold text-sm text-[#0A0F1C]">{section.title}</h2>
                                </div>
                                <span className={`text-[#0A0F1C] font-bold text-lg transition-transform duration-200 shrink-0 ${active === section.id ? "rotate-45" : ""}`}>+</span>
                            </button>
                            {active === section.id && (
                                <div className="px-6 pb-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-600 leading-relaxed pt-4 whitespace-pre-line">{section.content}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Privacy;