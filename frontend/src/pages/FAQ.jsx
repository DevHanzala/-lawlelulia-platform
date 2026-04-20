import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
            }),
            { threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

const categories = [
    { id: "general",   label: "General",          icon: "⚖️" },
    { id: "platform",  label: "Platform & AI",    icon: "🤖" },
    { id: "legal",     label: "Legal Matters",    icon: "📄" },
    { id: "security",  label: "Privacy & Security", icon: "🔒" },
    { id: "account",   label: "Account",          icon: "👤" },
];

const faqs = [
    // General
    {
        cat: "general",
        q: "What is CoCoLaw.ai?",
        a: "CoCoLaw.ai is the first AI platform purpose-built for pro se litigants  people who represent themselves in court without an attorney. We provide intelligent legal research, document drafting, procedural guidance, and courtroom preparation tools, all in plain language anyone can understand.",
    },
    {
        cat: "general",
        q: "Who is CoCoLaw.ai built for?",
        a: "Our platform is designed for self-represented litigants (pro se) navigating civil, family, employment, landlord-tenant, consumer, civil rights, and probate matters. We also support law students, legal aid organizations, and individuals who simply want to understand their rights before consulting an attorney.",
    },
    {
        cat: "general",
        q: "Does CoCoLaw.ai replace a lawyer?",
        a: "No. CoCoLaw.ai is a legal intelligence tool, not a law firm. We do not provide legal advice or create an attorney-client relationship. What we do is give you the knowledge, documents, and procedural roadmap that levels the playing field so you can navigate the legal system with greater confidence.",
    },
    {
        cat: "general",
        q: "What types of cases does CoCoLaw.ai support?",
        a: "We currently support Family Law, Landlord-Tenant disputes, Employment & Labor claims, Consumer & Debt defense, Civil Rights § 1983 actions, and Probate & Estates. We also have growing support for immigration matters, small claims, and federal civil appeals.",
    },
    {
        cat: "general",
        q: "Is CoCoLaw.ai available outside the United States?",
        a: "Our current focus is on U.S. federal and state court systems across all 50 states. International support is on our roadmap. If you are outside the U.S., some general legal research features may still be useful, but jurisdiction-specific document drafting will be limited.",
    },

    // Platform & AI
    {
        cat: "platform",
        q: "How does the AI legal analysis work?",
        a: "You describe your legal situation in plain English. Our AI analyzes your facts against relevant statutes, case law, and procedural rules for your specific jurisdiction. It then produces court-ready document drafts, procedural checklists, deadline timelines, and strategic options — all tailored to your case.",
    },
    {
        cat: "platform",
        q: "How accurate is the AI? Does it hallucinate citations?",
        a: "CoCoLaw.ai is trained specifically on legal data — statutes, regulations, and case law  and uses retrieval-augmented generation to ground every citation in verified sources. Unlike generic AI tools, we do not fabricate citations. That said, you should always verify any legal authority before filing, and we display source references so you can do exactly that.",
    },
    {
        cat: "platform",
        q: "What is the AI Co-Counsel Bot?",
        a: "The AI Co-Counsel Bot is an always-on conversational assistant available on every page of the platform. You can ask it procedural questions, request document edits, get plain-language explanations of legal terms, or request a strategic review of your case at any time — 24 hours a day, 7 days a week.",
    },
    {
        cat: "platform",
        q: "Can CoCoLaw.ai draft court documents for me?",
        a: "Yes. Our platform can generate motions, complaints, answers, discovery requests, demand letters, and more — formatted to your jurisdiction's local rules and court requirements. Documents are produced in plain language and reviewed against the applicable rules of civil procedure before delivery.",
    },
    {
        cat: "platform",
        q: "Does the platform track filing deadlines automatically?",
        a: "Yes. Once you input your case type, jurisdiction, and key dates (such as service date or hearing date), our procedural guidance engine maps every statutory deadline and sends you automatic reminders. Missing a deadline is one of the most common reasons pro se cases fail — we eliminate that risk.",
    },
    {
        cat: "platform",
        q: "What is the Emotional Guardrails feature?",
        a: "Legal disputes are intensely personal. Our Emotional Guardrails tool helps you separate facts from emotional reactions, provides structured decision-making prompts, and gives you a risk-weighted settlement analysis so you can make strategic choices with a clear head rather than under emotional duress.",
    },

    // Legal Matters
    {
        cat: "legal",
        q: "Can I use CoCoLaw.ai for a criminal case?",
        a: "Our primary focus is civil litigation. For criminal defense matters, we can provide general procedural information and help you understand charges and rights, but we strongly recommend seeking a public defender or criminal defense attorney for any criminal proceeding. Criminal consequences are too serious to navigate without professional representation.",
    },
    {
        cat: "legal",
        q: "Does submitting an inquiry create an attorney-client relationship?",
        a: "No. Submitting an inquiry, using the platform, or interacting with our AI Co-Counsel does not create an attorney-client relationship. CoCoLaw.ai is a legal technology platform. If your matter requires formal legal representation, we can help you identify legal aid resources in your area.",
    },
    {
        cat: "legal",
        q: "Can I use CoCoLaw.ai to respond to an eviction notice?",
        a: "Yes. Eviction defense is one of the most common use cases on our platform. We can help you draft a written answer to the eviction complaint, identify procedural defenses, prepare for your hearing, and understand your rights regarding habitability, proper notice, and retaliation — all specific to your state's landlord-tenant law.",
    },
    {
        cat: "legal",
        q: "How do I file an EEOC complaint using CoCoLaw.ai?",
        a: "Our Employment & Labor module guides you through the EEOC charge filing process step by step — including identifying the correct EEOC field office, drafting the charge narrative, selecting the appropriate bases of discrimination, and meeting the 180/300-day filing deadline. We also help you understand what happens after you file.",
    },
    {
        cat: "legal",
        q: "Can CoCoLaw.ai help me with a § 1983 civil rights claim?",
        a: "Yes. Civil rights § 1983 claims have specific pleading requirements — you must identify a state actor, a constitutional violation, and causation. Our platform helps you draft a properly structured complaint that survives a motion to dismiss, which is where most pro se § 1983 cases fail. We also guide you through exhaustion of administrative remedies where required.",
    },

    // Privacy & Security
    {
        cat: "security",
        q: "How is my data protected?",
        a: "All data transmitted to and from CoCoLaw.ai is encrypted in transit using TLS 1.3. Data at rest is encrypted using AES-256. We do not sell, rent, or share your personal information or case details with any third party, including advertisers. Our infrastructure is hosted on SOC 2 Type II certified cloud providers.",
    },
    {
        cat: "security",
        q: "Is my case information confidential?",
        a: "Yes. Your case information is treated with the same confidentiality principles that govern attorney-client communications. Our team does not access individual case files unless you explicitly request technical support, and even then only with your permission. You can delete your data at any time from your account settings.",
    },
    {
        cat: "security",
        q: "Does CoCoLaw.ai use my data to train its AI?",
        a: "No. Your case data, documents, and queries are never used to train our AI models. Each session is processed in isolation. We use aggregated, anonymized usage metrics only for platform performance improvements — never for model training.",
    },
    {
        cat: "security",
        q: "Can I delete my account and all associated data?",
        a: "Yes. You can request full account and data deletion from your Profile settings at any time. We will permanently delete all personal information, case files, and generated documents from our systems within 30 days of your request, in compliance with applicable data protection regulations.",
    },

    // Account
    {
        cat: "account",
        q: "How do I create an account?",
        a: "Click 'Sign Up' in the navigation bar. You can register with your email address or sign in instantly with your Google account. Once registered, you'll be prompted to complete a brief intake form about your legal matter so the platform can tailor its guidance to your situation.",
    },
    {
        cat: "account",
        q: "Can I use CoCoLaw.ai on my phone?",
        a: "Yes. CoCoLaw.ai is fully responsive and works on all modern smartphones and tablets. You can access your case files, generate documents, and chat with the AI Co-Counsel Bot from any device with a web browser no app download required.",
    },
    {
        cat: "account",
        q: "How do I book a consultation?",
        a: "Navigate to the Bookings section from the navigation menu or your dashboard. You'll see a calendar of available consultation slots. Select a time, confirm your booking, and you'll receive a confirmation email with a video meeting link. Consultations are conducted via our integrated video platform.",
    },
    {
        cat: "account",
        q: "What happens if I forget my password?",
        a: "On the login page, click 'Forgot Password'. Enter your registered email address and we'll send you a secure reset link valid for 30 minutes. If you don't receive the email, check your spam folder or contact support@cocolaw.ai.",
    },
];

const FAQ = () => {
    useReveal();
    const [activeCategory, setActiveCategory] = useState("general");
    const [openIndex, setOpenIndex] = useState(null);
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);

    const isSearching = search.trim().length > 1;

    const filtered = isSearching
        ? faqs.filter(
            (f) =>
                f.q.toLowerCase().includes(search.toLowerCase()) ||
                f.a.toLowerCase().includes(search.toLowerCase())
          )
        : faqs.filter((f) => f.cat === activeCategory);

    const handleCategoryChange = (id) => {
        setActiveCategory(id);
        setOpenIndex(null);
        setSearch("");
    };

    const totalByCategory = (id) => faqs.filter((f) => f.cat === id).length;

    return (
        <div className="bg-gray-50 min-h-screen overflow-x-hidden">

            {/* ── Hero ── */}
            <div className="bg-[#0A0F1C] text-white relative overflow-hidden" style={{ borderBottom: "3px solid #1e2740" }}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="faqgrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M50 0L0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="1000" height="400" fill="url(#faqgrid)"/>
                        <circle cx="820" cy="60"  r="180" fill="none" stroke="white" strokeWidth="0.5"/>
                        <circle cx="820" cy="60"  r="120" fill="none" stroke="white" strokeWidth="0.5"/>
                        <circle cx="820" cy="60"  r="60"  fill="none" stroke="white" strokeWidth="0.5"/>
                    </svg>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-16">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 animate-fadein">Help Center</p>
                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 animate-slidein">
                        Frequently Asked<br />
                        <span className="text-gray-400">Questions</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl animate-fadein-delay">
                        Everything you need to know about CoCoLaw.ai — from how our AI works to billing, security, and your legal rights.
                    </p>

                    {/* Search bar */}
                    <div className="mt-8 max-w-lg animate-fadein-delay">
                        <div className="relative">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search questions…"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:bg-white/15 focus:border-white/40 transition"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition text-lg leading-none"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        {isSearching && (
                            <p className="text-xs text-gray-500 mt-2 pl-1">
                                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main ── */}
            <section className="px-6 md:px-16 py-12 max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ── Category sidebar ── */}
                    {!isSearching && (
                        <aside className="lg:w-56 shrink-0" data-reveal>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Categories</p>
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                                            transition-all duration-200 whitespace-nowrap w-full text-left
                                            ${activeCategory === cat.id
                                                ? "bg-[#0A0F1C] text-white shadow-sm"
                                                : "bg-white border border-gray-100 text-gray-600 hover:border-gray-300 hover:text-[#0A0F1C]"
                                            }
                                        `}
                                    >
                                        <span className="text-base shrink-0">{cat.icon}</span>
                                        <span className="flex-1 text-xs">{cat.label}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                                            activeCategory === cat.id
                                                ? "bg-white/20 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}>
                                            {totalByCategory(cat.id)}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Still have questions card */}
                            <div className="mt-6 hidden lg:block bg-[#0A0F1C] rounded-xl p-5 text-white">
                                <p className="text-xs font-bold mb-1">Still have questions?</p>
                                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                                    Our team responds to every inquiry within 24 business hours.
                                </p>
                                <Link to="/contact"
                                    className="inline-block bg-white text-[#0A0F1C] px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition w-full text-center">
                                    Contact Us →
                                </Link>
                            </div>
                        </aside>
                    )}

                    {/* ── FAQ list ── */}
                    <div className="flex-1 min-w-0">

                        {/* Category header */}
                        {!isSearching && (
                            <div className="mb-6" data-reveal>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">
                                        {categories.find(c => c.id === activeCategory)?.icon}
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-black text-[#0A0F1C]">
                                            {categories.find(c => c.id === activeCategory)?.label}
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {totalByCategory(activeCategory)} question{totalByCategory(activeCategory) !== 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Search results header */}
                        {isSearching && filtered.length > 0 && (
                            <div className="mb-6 flex items-center gap-2" data-reveal>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                </svg>
                                <p className="text-sm text-gray-500">
                                    Showing <strong className="text-[#0A0F1C]">{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for "<em>{search}</em>"
                                </p>
                            </div>
                        )}

                        {/* Empty state */}
                        {filtered.length === 0 && (
                            <div className="text-center py-16" data-reveal>
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">No results found</p>
                                <p className="text-xs text-gray-400 mb-6">
                                    Try a different search term or browse by category
                                </p>
                                <button
                                    onClick={() => setSearch("")}
                                    className="text-xs px-4 py-2 bg-[#0A0F1C] text-white rounded-lg hover:bg-gray-800 transition"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}

                        {/* Accordion */}
                        <div className="flex flex-col gap-2" data-reveal>
                            {filtered.map((faq, i) => {
                                const isOpen = openIndex === i;
                                const catInfo = categories.find(c => c.id === faq.cat);

                                return (
                                    <div
                                        key={i}
                                        className={`
                                            bg-white border rounded-xl overflow-hidden
                                            transition-all duration-200
                                            ${isOpen
                                                ? "border-[#0A0F1C] shadow-sm"
                                                : "border-gray-100 hover:border-gray-300"
                                            }
                                        `}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 group"
                                        >
                                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                                {/* Number indicator */}
                                                <span className={`
                                                    text-xs font-black mt-0.5 shrink-0 w-5 text-right
                                                    ${isOpen ? "text-[#0A0F1C]" : "text-gray-300"}
                                                `}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-bold leading-snug transition-colors ${
                                                        isOpen ? "text-[#0A0F1C]" : "text-gray-700 group-hover:text-[#0A0F1C]"
                                                    }`}>
                                                        {faq.q}
                                                    </p>
                                                    {/* Show category badge when searching */}
                                                    {isSearching && catInfo && (
                                                        <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                                                            {catInfo.icon} {catInfo.label}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Chevron */}
                                            <div className={`
                                                w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5
                                                transition-all duration-200
                                                ${isOpen
                                                    ? "bg-[#0A0F1C] text-white rotate-180"
                                                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                                }
                                            `}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                                                    <polyline points="6 9 12 15 18 9"/>
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Answer panel */}
                                        {isOpen && (
                                            <div className="px-5 pb-5 border-t border-gray-100">
                                                <div className="pl-8 pt-4">
                                                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile CTA */}
                        <div className="mt-10 lg:hidden" data-reveal>
                            <div className="bg-[#0A0F1C] rounded-xl p-5 text-white text-center">
                                <p className="text-sm font-bold mb-1">Still have questions?</p>
                                <p className="text-xs text-gray-400 mb-4">Our team responds within 24 business hours.</p>
                                <Link to="/contact"
                                    className="inline-block bg-white text-[#0A0F1C] px-6 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition">
                                    Contact Us →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          

            {/* ── Animations ── */}
            <style>{`
                @keyframes fadein  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slidein { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
                .animate-fadein       { animation: fadein  0.7s ease both; }
                .animate-fadein-delay { animation: fadein  0.9s 0.2s ease both; }
                .animate-slidein      { animation: slidein 0.8s 0.05s ease both; }
                [data-reveal] { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
                [data-reveal].revealed { opacity:1; transform:translateY(0); }
            `}</style>
        </div>
    );
};

export default FAQ;