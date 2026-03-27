const Home = () => {
    return (
        <div className="bg-gray-50">

            {/* HERO SECTION — Slide 1 */}
            <section className="bg-[#0A0F1C] text-white text-center py-20 px-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">The First AI Platform Purpose-Built for Pro Se Litigants</p>
                <h1 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                    CoCoLaw.ai: Your AI Co-Counsel
                </h1>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                    Leveling the playing field for the 80%+ of litigants who go to court without a lawyer.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                        Get Started
                    </button>
                    <button className="border border-gray-600 text-white px-6 py-3 rounded-md hover:border-white transition">
                        Learn More
                    </button>
                </div>
            </section>

            {/* PROBLEM SECTION — Slide 2 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2">
                    Challenges for Self-Represented Litigants
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                    The Problem: Pro Se Litigants Face an Uphill Battle
                </h2>
                <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10">
                    Millions of Americans navigate courts alone every year across various legal matters, facing significant disadvantages.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 border-l-4 border-[#0A0F1C] p-6 rounded-lg">
                        <h3 className="font-bold mb-2">Low Success Rate</h3>
                        <p className="text-sm text-gray-600">Pro se plaintiffs win only 2–11% of federal civil cases.</p>
                    </div>
                    <div className="bg-gray-50 border-l-4 border-[#0A0F1C] p-6 rounded-lg">
                        <h3 className="font-bold mb-2">Procedural Hurdles</h3>
                        <p className="text-sm text-gray-600">Most cases fail due to early procedural issues such as dismissals, defaults, and sanctions.</p>
                    </div>
                    <div className="bg-gray-50 border-l-4 border-[#0A0F1C] p-6 rounded-lg">
                        <h3 className="font-bold mb-2">Unequal Playing Field</h3>
                        <p className="text-sm text-gray-600">Courts enforce the same complex rules of procedure and evidence as they do for licensed attorneys.</p>
                    </div>
                </div>
            </section>

            {/* WHY EXISTING SOLUTIONS FAIL — Slide 8 */}
            <section className="px-6 md:px-16 py-14 bg-gray-50">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Existing Solutions Fall Short</h2>
                <p className="text-gray-500 text-sm text-center mb-10">Limitations for Pro Se Litigants</p>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Court Self-Help Resources",
                            desc: "Lack sufficient depth and personalized guidance for complex legal issues, often being only a starting point."
                        },
                        {
                            title: "Generic AI Tools",
                            desc: "Not trained on legal data, leading to inaccuracies like hallucinated citations and overlooked jurisdictional rules."
                        },
                        {
                            title: "Traditional Legal Aid",
                            desc: "Overwhelmed by demand and underfunded, limiting capacity to assist eligible individuals."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                            <div className="w-12 h-12 bg-[#0A0F1C] rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">{i + 1}</span>
                            </div>
                            <h3 className="font-bold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-6 italic">
                    The justice gap widens due to increased pro se filings  highlighting a critical need for better support.
                </p>
            </section>

            {/* FEATURES — Slide 9 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">CoCoLaw.ai</h2>
                <p className="text-gray-500 text-sm text-center mb-10">The first AI platform purpose-built for pro se litigants.</p>
                <div className="grid md:grid-cols-4 gap-5">
                    {[
                        { title: "Intelligent Co-Counsel", desc: "Plain-language support for legal research, document drafting, procedural guidance, and preparation." },
                        { title: "Jurisdiction-Specific Research & Drafting", desc: "Tailored legal research and document creation specific to your jurisdiction." },
                        { title: "Procedural Guidance & Deadline Tracking", desc: "Step-by-step guidance through legal procedures with automatic deadline tracking." },
                        { title: "Evidence Organization & Objection Helpers", desc: "Tools to organize evidence and assistance with constructing objections." },
                        { title: "Courtroom Script & Decorum Coaching", desc: "Assistance with preparing courtroom scripts and guidance on legal decorum." },
                        { title: "Emotional Guardrails & Settlement Analysis", desc: "Tools to help manage emotional responses and analyze settlement options." },
                        { title: "Affordable Subscription", desc: "Cost-effective subscription model with support for in forma pauperis cases." },
                        { title: "Secure & Updated", desc: "A secure, private platform continuously updated with the latest legal information." },
                    ].map((item, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#0A0F1C] transition">
                            <div className="w-8 h-8 bg-[#0A0F1C] rounded-full mb-3 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS — Slide 10 */}
            <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">How It Works: Simple User Journey</h2>
                <p className="text-gray-400 text-sm text-center mb-12">A streamlined process for effective legal action.</p>
                <div className="grid md:grid-cols-4 gap-0">
                    {[
                        { num: "01", title: "Describe Your Situation", desc: "Clearly articulate your legal issue in plain English." },
                        { num: "02", title: "AI Legal Analysis", desc: "Our AI rigorously analyzes your facts against relevant laws and rules." },
                        { num: "03", title: "Receive Actionable Outputs", desc: "Get court-ready drafts, essential checklists, and strategic options." },
                        { num: "04", title: "File with Confidence", desc: "Refine your case through guided Q&A and submit documents with assurance." },
                    ].map((step, i) => (
                        <div key={i} className={`relative p-6 ${i < 3 ? 'border-r border-gray-700' : ''}`}>
                            <div className="text-3xl font-black text-gray-700 mb-3">{step.num}</div>
                            <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                            <p className="text-xs text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* MARKET OPPORTUNITY — Slide 11 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Market Opportunity & Traction</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                        { title: "Massive Total Addressable Market (TAM)", desc: "Millions of pro se cases filed annually represent a significant and often underserved market." },
                        { title: "Early Validation", desc: "Initial market interest and product-market fit demonstrated by beta users, waitlist sign-ups, and successful pilot programs." },
                        { title: "Growing Trend", desc: "AI is increasing pro se filings, with certain categories growing over 49%, indicating rising demand for self-representation tools." },
                        { title: "Competitive Landscape", desc: "Specialized, affordable solutions for self-represented individuals, uniquely positioned between generic AI tools and costly traditional legal services." },
                        { title: "Scalable Business Model", desc: "A SaaS approach with tiered subscriptions and premium add-ons for enhanced features and support." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#0A0F1C] transition">
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-[#0A0F1C] shrink-0"></div>
                            <div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA — Slide 12 */}
            <section className="bg-[#0A0F1C] text-white text-center py-16 px-6">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Our Mission</p>
                <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
                    CoCoLaw.ai doesn't replace lawyers  it empowers the millions who cannot afford them.
                </h2>
                <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
                    A justice system where self-representation is not a disadvantage, ensuring access to high-quality legal intelligence for all.
                </p>
                <button className="mt-8 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                    Start Your Legal Journey Today
                </button>
            </section>

        </div>
    );
};

export default Home;