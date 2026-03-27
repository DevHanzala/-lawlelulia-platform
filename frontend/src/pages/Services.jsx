const services = [
    {
        title: "Legal Research & Document Drafting",
        description:
            "Get jurisdiction-specific legal research tailored to your case. CoCoLaw.ai generates court-ready documents — motions, complaints, responses — in plain language you can actually understand and file.",
        features: ["Jurisdiction-aware research", "Motion & complaint drafting", "Plain-language output"],
    },
    {
        title: "Procedural Guidance & Deadline Tracking",
        description:
            "Never miss a filing deadline again. Our AI maps out every procedural step for your case type and sends automatic reminders so you stay on schedule and avoid dismissals.",
        features: ["Step-by-step procedural roadmap", "Automatic deadline alerts", "Case-type specific workflows"],
    },
    {
        title: "Evidence Organization",
        description:
            "Upload and organize your evidence with AI assistance. CoCoLaw.ai helps you catalog exhibits, identify relevance, and prepare objections to opposing evidence before trial.",
        features: ["Evidence cataloging", "Relevance analysis", "Objection drafting"],
    },
    {
        title: "Courtroom Coaching & Decorum",
        description:
            "Walk into the courtroom prepared. Get scripted opening and closing statements, learn proper courtroom etiquette, and practice responses to common judicial questions.",
        features: ["Opening & closing scripts", "Courtroom etiquette guide", "Q&A preparation"],
    },
    {
        title: "Emotional Guardrails & Objectivity Tools",
        description:
            "Legal disputes are personal — but emotion can hurt your case. Our guided tools help you separate facts from feelings and make strategic decisions with a clear head.",
        features: ["Emotion-vs-fact separator", "Strategic decision prompts", "Settlement analysis"],
    },
    {
        title: "Affordable Subscription & Data Privacy",
        description:
            "Access full legal AI support at a fraction of attorney costs. Your data is encrypted, never sold, and always protected under our strict privacy policy.",
        features: ["Flat monthly pricing", "End-to-end encryption", "No data selling — ever"],
    },
];

const Services = () => {
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Hero */}
            <div className="bg-[#0A0F1C] text-white text-center py-14 px-6">
                <h1 className="text-3xl md:text-4xl font-bold">Our Services</h1>
                <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
                    Everything a self-represented litigant needs — from research to the courtroom — powered by AI.
                </p>
            </div>

            {/* Services Grid */}
            <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
                {services.map((service, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-2 h-6 bg-black rounded-full"></div>
                            <h3 className="font-semibold text-base">{service.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <ul className="space-y-1">
                            {service.features.map((f, i) => (
                                <li key={i} className="flex items-center text-xs text-gray-500 space-x-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center pb-16 px-6">
                <h2 className="text-2xl font-semibold">Ready to take on your case?</h2>
                <p className="text-gray-500 text-sm mt-2">Start with CoCoLaw.ai today — no legal background required.</p>
                <button className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Services;