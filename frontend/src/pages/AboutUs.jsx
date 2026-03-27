const AboutUs = () => {
    const painPoints = [
        { title: "Lack of Substantive Legal Knowledge", desc: "Insufficient understanding of relevant laws and legal principles." },
        { title: "Procedural & Technical Rule Complexity", desc: "Difficulty navigating intricate court rules and filing procedures." },
        { title: "Difficulty with Discovery", desc: "Challenges in gathering and presenting evidence from the opposing party." },
        { title: "Evidentiary & Trial Preparation Issues", desc: "Struggles with collecting, organizing, and presenting evidence for trial." },
        { title: "Courtroom Inexperience & Decorum", desc: "Unfamiliarity with courtroom etiquette, procedures, and bearing." },
        { title: "Emotional Attachment & Loss of Objectivity", desc: "Personal involvement hindering rational decision-making." },
        { title: "Resource & Logistical Constraints", desc: "Limited access to financial, informational, and practical support." },
        { title: "Massive Time & Energy Demands", desc: "The significant commitment required to manage a legal case." },
        { title: "Perceived/Actual Judicial Bias", desc: "Concerns or experiences related to unfair treatment by the court." },
        { title: "Lower Success Rates & Systemic Disadvantages", desc: "Facing an uphill battle due to inherent disadvantages in the legal system." },
    ];

    return (
        <div className="bg-gray-50">

            {/* HEADER */}
            <div className="bg-[#0A0F1C] text-white text-center py-14 px-6">
                <h1 className="text-3xl md:text-4xl font-bold">About CoCoLaw.ai</h1>
                <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
                    Empowering self-represented litigants with AI-driven legal support
                </p>
            </div>

            {/* VISION — Slide 12 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Our Mission</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-5">Vision & Call to Action</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        A justice system where self-representation is not a disadvantage, ensuring access to high-quality legal intelligence for all.
                    </p>
                    <blockquote className="border-l-4 border-[#0A0F1C] pl-5 text-left text-gray-700 italic text-sm bg-gray-50 py-4 pr-4 rounded-r-lg">
                        "CoCoLaw.ai doesn't replace lawyers  it empowers the millions who cannot afford them."
                    </blockquote>
                </div>
            </section>

            {/* PROBLEM — Slide 2 */}
            <section className="px-6 md:px-16 py-14 bg-gray-50">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-2">
                    Challenges for Self-Represented Litigants
                </p>
                <h2 className="text-2xl font-bold text-center mb-3">The Problem: Pro Se Litigants Face an Uphill Battle</h2>
                <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10">
                    Millions of Americans navigate courts alone every year across various legal matters, facing significant disadvantages.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#0A0F1C]">
                        <h3 className="font-bold mb-2">Low Success Rate</h3>
                        <p className="text-sm text-gray-600">Pro se plaintiffs win only 2–11% of federal civil cases.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#0A0F1C]">
                        <h3 className="font-bold mb-2">Procedural Hurdles</h3>
                        <p className="text-sm text-gray-600">Most cases fail due to early procedural issues such as dismissals, defaults, and sanctions.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#0A0F1C]">
                        <h3 className="font-bold mb-2">Unequal Playing Field</h3>
                        <p className="text-sm text-gray-600">Courts enforce the same complex rules of procedure and evidence as they do for licensed attorneys.</p>
                    </div>
                </div>
            </section>

            {/* TOP 10 PAIN POINTS — Slide 3 */}
            <section className="px-6 md:px-16 py-14 bg-white">
                <h2 className="text-2xl font-bold text-center mb-2">Top 10 Pain Points for Pro Se Litigants</h2>
                <p className="text-gray-500 text-sm text-center mb-10">A high-level overview of the challenges faced by self-represented individuals.</p>
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {painPoints.map((point, i) => (
                        <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-[#0A0F1C] hover:shadow-sm transition">
                            <div className="w-7 h-7 rounded-full bg-[#0A0F1C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{point.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{point.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-8 italic">
                    These pain points are deeply interconnected; a single mistake can lead to case-ending disasters.
                </p>
            </section>

            {/* DEEP DIVES — Slides 4, 5, 6 */}
            <section className="px-6 md:px-16 py-14 bg-gray-50">
                <h2 className="text-2xl font-bold text-center mb-10">Pain Point Deep Dives</h2>
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Knowledge & Research — Slide 4 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Knowledge & Research Gaps</p>
                        <h3 className="font-bold mb-3">Legal Knowledge & Discovery</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Difficulty recalling specific statutes, elements, and foundational case law.</li>
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Vast and ever-evolving legal information requires constant learning.</li>
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Challenges identifying and analyzing relevant information in complex litigation.</li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-4 italic border-t pt-3">
                            Even strong factual cases collapse when not framed with the correct statutes and case law.
                        </p>
                    </div>

                    {/* Procedural — Slide 5 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Challenges & Consequences</p>
                        <h3 className="font-bold mb-3">Procedural & Evidentiary Traps</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Understanding the myriad rules governing legal processes from initial filings to final judgments.</li>
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Ensuring evidence is admissible, properly handled, and trial preparation executed flawlessly.</li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-4 italic border-t pt-3">
                            Non-compliance consequences include denied motions, excluded evidence, and case dismissal.
                        </p>
                    </div>

                    {/* Human/Emotional — Slide 6 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Key Challenges</p>
                        <h3 className="font-bold mb-3">Human & Emotional Barriers</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Unfamiliar procedural rules and etiquette can be intimidating and stressful.</li>
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> High personal stakes cloud judgment, making rational perspective difficult.</li>
                            <li className="flex gap-2"><span className="text-[#0A0F1C] font-bold">•</span> Concerns about fairness and impartiality impact trust in the legal process.</li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-4 italic border-t pt-3">
                            Personal stakes inherently cloud judgment —judges cannot offer advice without jeopardizing impartiality.
                        </p>
                    </div>
                </div>
            </section>

            {/* HOW COCOLAW HELPS */}
            <section className="px-6 md:px-16 py-14 bg-[#0A0F1C] text-white text-center">
                <h2 className="text-2xl font-bold mb-3">How CoCoLaw.ai Helps</h2>
                <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10">Addressing every pain point with purpose-built AI tools.</p>
                <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                    {[
                        { title: "Jurisdiction-Specific Research", desc: "Tailored legal research and document creation specific to your jurisdiction." },
                        { title: "Procedural Guidance", desc: "Step-by-step guidance through legal procedures with automatic deadline tracking." },
                        { title: "Evidence & Courtroom Support", desc: "Organize evidence, draft objections, and prepare courtroom scripts." },
                        { title: "Emotional & Settlement Tools", desc: "Manage emotional responses and analyze settlement options with guided tools." },
                        { title: "Affordable & Secure", desc: "Cost-effective subscription model with privacy and up-to-date legal information." },
                        { title: "Intelligent Co-Counsel", desc: "Plain-language support available 24/7  no legal background required." },
                    ].map((item, i) => (
                        <div key={i} className="border border-gray-700 rounded-lg p-5 text-left hover:border-gray-400 transition">
                            <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <button className="mt-10 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                    Start Your Case
                </button>
            </section>

        </div>
    );
};

export default AboutUs;