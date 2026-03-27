const Services = () => {
    const mainServices = [
        {
            num: "01",
            title: "Legal Research & Document Drafting",
            subtitle: "Jurisdiction-Specific Research & Drafting",
            desc: "Tailored legal research and document creation specific to your jurisdiction. CoCoLaw.ai generates court-ready documents — motions, complaints, responses  in plain language you can actually understand and file.",
            features: ["Jurisdiction-aware research", "Motion & complaint drafting", "Plain-language output", "Court-ready document generation"],
        },
        {
            num: "02",
            title: "Procedural Guidance & Deadline Tracking",
            subtitle: "Never Miss a Filing Deadline Again",
            desc: "Our AI maps out every procedural step for your case type and sends automatic reminders so you stay on schedule and avoid dismissals.",
            features: ["Step-by-step procedural roadmap", "Automatic deadline alerts", "Case-type specific workflows", "Filing checklists"],
        },
        {
            num: "03",
            title: "Evidence Organization & Objection Helpers",
            subtitle: "Organize. Present. Win.",
            desc: "Upload and organize your evidence with AI assistance. CoCoLaw.ai helps you catalog exhibits, identify relevance, and prepare objections to opposing evidence before trial.",
            features: ["Evidence cataloging", "Relevance analysis", "Objection drafting", "Exhibit preparation"],
        },
        {
            num: "04",
            title: "Courtroom Script & Decorum Coaching",
            subtitle: "Walk in Prepared",
            desc: "Get scripted opening and closing statements, learn proper courtroom etiquette, and practice responses to common judicial questions.",
            features: ["Opening & closing scripts", "Courtroom etiquette guide", "Q&A preparation", "Legal decorum coaching"],
        },
        {
            num: "05",
            title: "Emotional Guardrails & Settlement Analysis",
            subtitle: "Stay Strategic, Not Emotional",
            desc: "Legal disputes are personal  but emotion can hurt your case. Our guided tools help you separate facts from feelings and make strategic decisions with a clear head.",
            features: ["Emotion-vs-fact separator", "Strategic decision prompts", "Settlement analysis", "Objective case review"],
        },
        {
            num: "06",
            title: "Intelligent Co-Counsel",
            subtitle: "Your AI Legal Partner",
            desc: "Provides plain-language support for legal research, document drafting, procedural guidance, and trial preparation  available 24/7 with no legal background required.",
            features: ["24/7 availability", "Plain-language explanations", "Multi-case support", "Continuous legal updates"],
        },
    ];

    const resourcePoints = [
        { title: "Resource & Logistical Constraints", desc: "Pro se litigants often lack financial resources, access to legal databases, and logistical support, impacting their ability to afford expert witnesses or extensive discovery." },
        { title: "Massive Time & Energy Demands", desc: "Navigating legal procedures requires significant time for research and drafting, often leading to exhaustion for individuals balancing other responsibilities." },
        { title: "Lower Success Rates & Systemic Disadvantages", desc: "Lacking legal expertise places pro se litigants at an inherent disadvantage, often resulting in lower success rates." },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* HERO */}
            <div className="bg-[#0A0F1C] text-white text-center py-16 px-6">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Purpose-Built for Pro Se Litigants</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-gray-400 max-w-xl mx-auto text-sm">
                    Everything a self-represented litigant needs — from research to the courtroom — powered by AI.
                </p>
            </div>

            {/* MAIN SERVICES GRID — Slide 9 */}
            <section className="px-6 md:px-16 py-14">
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {mainServices.map((service, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition border-t-2 border-[#0A0F1C]">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#0A0F1C] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {service.num}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-400 mb-1">{service.subtitle}</p>
                                    <h3 className="font-bold text-base mb-2">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((f, fi) => (
                                            <span key={fi} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* RESOURCE, TIME & SYSTEMIC ODDS — Slide 7 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <h2 className="text-2xl font-bold text-center mb-2">Why CoCoLaw.ai Exists</h2>
                <p className="text-gray-500 text-sm text-center mb-10">Addressing the practical limitations and systemic disadvantages faced by pro se litigants.</p>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {resourcePoints.map((item, i) => (
                        <div key={i} className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#0A0F1C] hover:shadow-md transition">
                            <div className="w-14 h-14 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-2xl">
                                    {i === 0 ? "📋" : i === 1 ? "⏱️" : "⚖️"}
                                </span>
                            </div>
                            <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-8 italic">
                    Pro se matters consume disproportionate court resources due to delays and inefficiencies.
                </p>
            </section>

            {/* HOW IT WORKS STEPS — Slide 10 */}
            <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white">
                <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
                <p className="text-gray-400 text-sm text-center mb-12">A streamlined process for effective legal action.</p>
                <div className="grid md:grid-cols-4 gap-0 max-w-5xl mx-auto">
                    {[
                        { num: "01", title: "Describe Your Situation", desc: "Clearly articulate your legal issue in plain English." },
                        { num: "02", title: "AI Legal Analysis", desc: "Our AI rigorously analyzes your facts against relevant laws and rules." },
                        { num: "03", title: "Receive Actionable Outputs", desc: "Get court-ready drafts, essential checklists, and strategic options." },
                        { num: "04", title: "File with Confidence", desc: "Refine your case through guided Q&A and submit with assurance." },
                    ].map((step, i) => (
                        <div key={i} className={`p-5 ${i < 3 ? 'border-r border-gray-700' : ''}`}>
                            <div className="text-4xl font-black text-gray-700 mb-3">{step.num}</div>
                            <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                            <p className="text-xs text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-14 px-6 bg-gray-50">
                <h2 className="text-2xl font-bold">Ready to take on your case?</h2>
                <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                    Start with CoCoLaw.ai today  no legal background required. Investors: join us in closing the justice gap.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <button className="bg-[#0A0F1C] text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                        Get Started
                    </button>
                    <button className="border border-[#0A0F1C] text-[#0A0F1C] px-6 py-3 rounded-md hover:bg-gray-100 transition">
                        Contact Us
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Services;